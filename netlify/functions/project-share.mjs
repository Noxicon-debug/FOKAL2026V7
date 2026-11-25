import { createClient } from '@supabase/supabase-js';

const site = 'https://fokalltd.com';
const fallbackCover = '/media/home-768.webp';

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

function coverUrl(reference, supabase) {
  if (!reference) return site + fallbackCover;
  if (/^\/[^/\\]/.test(reference)) return site + reference;
  if (/^https:\/\//i.test(reference)) return reference;
  return supabase.storage.from('images').getPublicUrl(reference).data.publicUrl;
}

export default async function projectShare(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('projectId') ?? '';
  const isCover = url.searchParams.get('cover') === '1';
  const databaseUrl = process.env.VITE_SUPABASE_URL;
  const publicKey = process.env.VITE_SUPABASE_ANON_KEY;
  let project;
  let supabase;
  let status = 404;

  if (/^[1-9]\d{0,9}$/.test(id) && Number(id) <= 2147483647) {
    status = 503;
    if (databaseUrl && publicKey) {
      supabase = createClient(databaseUrl, publicKey, { auth: { persistSession: false } });
      const { data, error } = await supabase.from('gallery_projects')
        .select('title, description, image_url').eq('id', id)
        .eq('publication_state', 'published').maybeSingle();
      if (!error) {
        project = data;
        status = project ? 200 : 404;
      }
    }
  }

  const privateCover = project?.image_url?.startsWith('our-work:');
  const canonical = site + '/work/' + id;
  if (isCover) {
    if (!project) return new Response(null, { status });
    let destination = coverUrl(privateCover ? '' : project.image_url, supabase);
    if (privateCover) {
      const { data } = await supabase.storage.from('our-work').createSignedUrl(project.image_url.slice('our-work:'.length), 300);
      if (data?.signedUrl) destination = data.signedUrl;
    }
    return new Response(null, { status: 302, headers: { Location: destination, 'Cache-Control': 'no-store' } });
  }

  const shell = await fetch(new URL('/index.html', url));
  if (!shell.ok) return new Response('Our Work is temporarily unavailable.', { status: 503 });
  let html = await shell.text();
  if (project) {
    const title = escapeHtml(project.title + ' | Fokal Solutions');
    const description = escapeHtml((project.description || '').trim().slice(0, 200) || 'A Fokal Solutions project.');
    const image = escapeHtml(privateCover ? canonical + '/cover' : coverUrl(project.image_url, supabase));
    html = html.replace(/<title>[^<]*<\/title>|<meta\s+(?:name|property)=["'](?:description|og:(?:title|description|url|image(?::[^"']+)?)|twitter:(?:title|description|url|image))["'][^>]*>|<link\s+rel=["']canonical["'][^>]*>/gi, '');
    const metadata = [
      '<title>' + title + '</title>',
      '<link rel="canonical" href="' + canonical + '">',
      '<meta name="description" content="' + description + '">',
      ...Object.entries({ title, description, url: canonical, image }).flatMap(([name, content]) => [
        '<meta property="og:' + name + '" content="' + content + '">',
        '<meta name="twitter:' + name + '" content="' + content + '">',
      ]),
    ].join('\n');
    html = html.replace('</head>', () => metadata + '\n</head>');
  }
  return new Response(html, {
    status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
