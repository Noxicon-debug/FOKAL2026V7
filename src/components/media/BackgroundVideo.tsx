import { useEffect, useRef, useState } from 'react';
import type { ResponsiveVideoAsset } from '../../lib/media-assets';
import ResponsiveImage from './ResponsiveImage';
type Props = { asset: ResponsiveVideoAsset; className?: string; priority?: boolean; ariaLabel?: string };
export default function BackgroundVideo({ asset, className = '', priority = false, ariaLabel }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [posterReady, setPosterReady] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [src, setSrc] = useState<string>();
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(true);
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean; effectiveType?: string } }).connection;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setBlocked(motion.matches || !!connection?.saveData || ['slow-2g', '2g', '3g'].includes(connection?.effectiveType ?? ''));
    update();
    motion.addEventListener('change', update);
    connection?.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); motion.removeEventListener('change', update); connection?.removeEventListener('change', update); };
  }, []);
  useEffect(() => {
    if (blocked) { setSrc(undefined); setPlaying(false); return; }
    if (!posterReady || !visible || src || !asset.desktop) return;
    const start = () => setSrc(matchMedia('(max-width: 600px)').matches ? asset.mobile ?? asset.desktop : asset.desktop);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(start, 250);
    return () => clearTimeout(timer);
  }, [posterReady, visible, blocked, src, asset.mobile, asset.desktop]);
  useEffect(() => {
    if (!visible || blocked) video.current?.pause();
    else if (src) video.current?.play().catch(() => setPlaying(false));
  }, [visible, blocked, src]);
  return <div ref={ref} className={`background-media ${className}`}>
    <ResponsiveImage asset={posterFailed ? {fallback:'/media/home-1280.webp'} : asset.poster} priority={priority} sizes="100vw" alt={ariaLabel ?? ''} onLoad={() => setPosterReady(true)} onError={() => { if (posterFailed) setPosterReady(true); else setPosterFailed(true); }}/>
    {src && <video ref={video} src={src} autoPlay muted loop playsInline preload="none" aria-hidden="true" className={playing ? 'is-playing' : ''} onPlaying={() => setPlaying(true)} onError={() => setPlaying(false)}/>}
  </div>;
}
