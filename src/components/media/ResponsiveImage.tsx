import type { ImgHTMLAttributes } from 'react';
import type { ResponsiveImageAsset } from '../../lib/media-assets';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> & {
  asset: ResponsiveImageAsset;
  priority?: boolean;
  sizes: string;
};

export default function ResponsiveImage({ asset, priority = false, sizes, alt, ...props }: Props) {
  const srcSet = (sources?: Record<number, string>) => sources && Object.entries(sources).map(([width, src]) => `${src} ${width}w`).join(', ');
  return (
    <picture>
      {asset.avif && <source srcSet={srcSet(asset.avif)} type="image/avif" sizes={sizes} />}
      {asset.webp && <source srcSet={srcSet(asset.webp)} type="image/webp" sizes={sizes} />}
      <img
        {...props}
        src={asset.fallback}
        alt={alt ?? ''}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  );
}
