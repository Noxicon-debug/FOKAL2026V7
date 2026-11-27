import type { Context } from 'https://edge.netlify.com';

const supported = new Set([
  '/', '/about', '/services', '/gallery', '/contact', '/booking', '/project-brief', '/photography',
  '/projects/guardians-of-the-sea', '/projects/governor-allan-bird-cocoa-training',
  '/projects/bougainville-chocolate-festival-2025', '/services/video-production',
  '/services/live-streaming', '/services/event-production',
]);

const escapeHtml = (text: string) => text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const bounded = (value: unknown, size: number) => typeof value === 'string' ? value.trim().slice(0,size) : '';
const unavailable = () => new Response(null,{status:404,headers:{'cache-control':'no-store'}});

export default async function cmsMetadata(request: Request, context: Context) {
  if (request.method !== 'GET') return context.next();
  const url = new URL(request.url);
  const imageRequest = url.pathname === '/_cms/sharing-image';
  const path = imageRequest ? url.searchParams.get('page') ?? '' : url.pathname.replace(/\/+$/, '') || '/';
  if (!supported.has(path)) return imageRequest ? unavailable() : context.next();
  const base = Netlify.env.get('SUPABASE_URL') || Netlify.env.get('VITE_SUPABASE_URL');
  const key = Netlify.env.get('SUPABASE_ANON_KEY') || Netlify.env.get('VITE_SUPABASE_ANON_KEY');
  if (!base || !key) return imageRequest ? unavailable() : context.next();

  let fallback: Response | undefined;
  try {
    const headers = key.startsWith('eyJ') ? {apikey:key, authorization:'Bearer ' + key} : {apikey:key};
    const result = await fetch(base + '/rest/v1/site_content?stage=eq.live&select=content', {headers,signal:AbortSignal.timeout(2500)});
    if (!result.ok) return imageRequest ? unavailable() : context.next();
    const content = (await result.json())[0]?.content;
    const image = content?.images?.['share:' + path];
    const validImage = typeof image === 'string' && /^photos\/[0-9a-f-]{36}$/.test(image);
    if (imageRequest) {
      if (!validImage) return unavailable();
      const response = await fetch(base + '/storage/v1/object/sign/site-images/' + image, {
        method:'POST',headers:{...headers,'content-type':'application/json'},
        body:JSON.stringify({expiresIn:300}),signal:AbortSignal.timeout(2500),
      });
      if (!response.ok) return unavailable();
      const {signedURL} = await response.json();
      if (typeof signedURL !== 'string' || !signedURL.startsWith('/object/sign/site-images/')) return unavailable();
      return new Response(null,{status:302,headers:{location:base + '/storage/v1' + signedURL,'cache-control':'no-store'}});
    }

    const title = bounded(content?.metadata?.[path]?.title,120);
    const description = bounded(content?.metadata?.[path]?.description,300);
    if (!title && !description && !validImage) return context.next();
    fallback = await context.next();
    if (!fallback.headers.get('content-type')?.includes('text/html')) return fallback;
    let html = await fallback.text();
    const shareUrl = new URL('/_cms/sharing-image',url.origin);
    shareUrl.searchParams.set('page',path);
    if (title) html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, () => '<title data-rh="true">' + escapeHtml(title) + '</title>');
    const values: Record<string,string> = {
      description, 'og:description':description, 'twitter:description':description,
      'og:title':title, 'twitter:title':title,
      'og:image':validImage ? shareUrl.href : '', 'twitter:image':validImage ? shareUrl.href : '',
    };
    html = html.replace(/<meta\s+[^>]*>/gi, tag => {
      const name = tag.match(/\b(?:name|property)="([^"]+)"/i)?.[1] ?? '';
      const value = values[name];
      return value ? tag.replace(/\bcontent="[^"]*"/i, () => 'content="' + escapeHtml(value) + '"') : tag;
    });
    const nextHeaders = new Headers(fallback.headers);
    nextHeaders.delete('content-length');
    nextHeaders.delete('etag');
    nextHeaders.delete('content-encoding');
    nextHeaders.set('cache-control','no-cache');
    return new Response(html,{status:fallback.status,headers:nextHeaders});
  } catch {
    return imageRequest ? unavailable() : fallback ?? context.next();
  }
}
