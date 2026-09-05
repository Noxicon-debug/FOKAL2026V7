import { useEffect, useRef, useState } from 'react';
import type { ResponsiveVideoAsset } from '../../lib/media-assets';

type Props = {
  asset: ResponsiveVideoAsset;
  className?: string;
  priority?: boolean;
  ariaLabel?: string;
};

function videoSource(asset: ResponsiveVideoAsset) {
  if (typeof window === 'undefined') return asset.desktop;
  if (window.matchMedia('(max-width: 600px)').matches) return asset.mobile ?? asset.tablet ?? asset.desktop;
  if (window.matchMedia('(max-width: 1024px)').matches) return asset.tablet ?? asset.desktop;
  return asset.desktop;
}

export default function BackgroundVideo({ asset, className, priority = false, ariaLabel }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [src, setSrc] = useState<string | null>(priority ? asset.desktop : null);

  useEffect(() => {
    if (priority) {
      setSrc(videoSource(asset));
      return;
    }
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSrc(videoSource(asset));
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '300px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, [asset, priority]);

  return <video ref={ref} className={className} autoPlay muted loop playsInline preload={priority ? 'metadata' : 'none'} poster={asset.poster.fallback} aria-label={ariaLabel} aria-hidden={!ariaLabel}>{shouldLoad && src && <source src={src} type="video/mp4" />}</video>;
}
