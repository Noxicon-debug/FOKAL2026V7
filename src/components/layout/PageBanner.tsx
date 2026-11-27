import { useLocation } from 'react-router-dom';
import { useSiteContent } from './SiteContentProvider';
import type { ReactNode } from 'react';
import { optimizedImage } from '../../lib/media-assets';
import BackgroundVideo from '../media/BackgroundVideo';

interface PageBannerProps {
  eyebrow: string;
  slot?: string;
  title: ReactNode;
  copy?: string;
  image?: string;
  videoSrc?: string;
  animatedBackground?: boolean;
}

export default function PageBanner({
  eyebrow, title, copy, slot, image = '/media/image-9-1920.webp', videoSrc, animatedBackground,
}: PageBannerProps) {
  const {pathname} = useLocation();
  const site = useSiteContent();
  const path = slot ?? (pathname.startsWith('/work/') ? '/gallery' : pathname.replace(/\/$/, ''));
  const override = site.image('hero:' + path);
  return <section className="landing-hero landing-hero-about public-banner">
    <BackgroundVideo
      key={override ?? image}
      asset={{poster: override ? {fallback: override} : optimizedImage(image), desktop: override ? '' : videoSrc ?? ''}}
      className={`landing-hero-photo${animatedBackground && !override ? ' page-hero--animated' : ''}`}
      priority
    />
    <div className="landing-shell">
      <div className="landing-hero-copy">
        <div className="landing-label">{eyebrow}</div>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  </section>;
}
