import { supabase } from './supabase';

export const galleryBucket = 'our-work';
const referencePrefix = galleryBucket + ':';
export const galleryUrlLifetime = 300;

export async function resolveGalleryImages(references: string[]) {
  const paths = [...new Set(references.filter(ref => ref.startsWith(referencePrefix)))]
    .map(ref => ref.slice(referencePrefix.length));
  const urls = new Map<string, string>();
  for (let offset = 0; offset < paths.length; offset += 100) {
    const { data, error } = await supabase.storage.from(galleryBucket)
      .createSignedUrls(paths.slice(offset, offset + 100), galleryUrlLifetime);
    if (error) throw error;
    for (const entry of data) {
      if (entry.path && entry.signedUrl) urls.set(referencePrefix + entry.path, entry.signedUrl);
    }
  }
  return (reference: string) => {
    if (reference.startsWith(referencePrefix)) return urls.get(reference) ?? '';
    if (!reference || /^(\/[^/]|https?:\/\/)/i.test(reference)) return reference;
    return supabase.storage.from('images').getPublicUrl(reference).data.publicUrl;
  };
}

export async function uploadGalleryImage(file: File) {
  const path = 'photos/' + crypto.randomUUID();
  const { error } = await supabase.storage.from(galleryBucket)
    .upload(path, file, { contentType: file.type, cacheControl: '60' });
  if (error) throw error;
  return referencePrefix + path;
}

export function galleryVideo(value: string): { youtubeId: string } | { facebookUrl: string } | undefined {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return;
    const host = url.hostname.replace(/^(www|m)\./, '');
    const [, route, id] = url.pathname.split('/');
    if (host === 'facebook.com' && route) return { facebookUrl: url.href };
    if (host === 'fb.watch' && route) return { facebookUrl: url.href };
    if (host !== 'youtube.com' && host !== 'youtu.be') return;
    const videoId = host === 'youtu.be' ? route
      : route === 'watch' ? url.searchParams.get('v')
      : ['embed', 'shorts', 'live'].includes(route) ? id : null;
    if (videoId && /^[\w-]{11}$/.test(videoId)) return { youtubeId: videoId };
  } catch {
    return;
  }
}
