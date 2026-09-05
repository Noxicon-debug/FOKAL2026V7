export type ResponsiveImageAsset = {
  fallback: string;
  avif?: Record<number, string>;
  webp?: Record<number, string>;
  width?: number;
  height?: number;
};

export type ResponsiveVideoAsset = {
  poster: ResponsiveImageAsset;
  mobile?: string;
  tablet?: string;
  desktop: string;
};

// Set this only after the public media bucket contains the versioned files.
// Example: https://<project>.supabase.co/storage/v1/object/public/media/v1
const mediaCdn = import.meta.env.VITE_MEDIA_CDN_URL?.replace(/\/$/, '');

export function responsiveImage(path: string, fallback: string, width?: number, height?: number): ResponsiveImageAsset {
  if (!mediaCdn) return { fallback, width, height };
  const widths = [480, 768, 1280, 1920];
  const variants = (format: 'avif' | 'webp') => Object.fromEntries(widths.map((size) => [size, `${mediaCdn}/images/${path}-${size}.${format}`]));

  return {
    fallback,
    avif: variants('avif'),
    webp: variants('webp'),
    width,
    height,
  };
}

export function responsiveVideo(path: string, fallback: string, poster: ResponsiveImageAsset): ResponsiveVideoAsset {
  if (!mediaCdn) return { desktop: fallback, poster };

  return {
    desktop: `${mediaCdn}/videos/${path}-desktop.mp4`,
    tablet: `${mediaCdn}/videos/${path}-tablet.mp4`,
    mobile: `${mediaCdn}/videos/${path}-mobile.mp4`,
    poster,
  };
}
