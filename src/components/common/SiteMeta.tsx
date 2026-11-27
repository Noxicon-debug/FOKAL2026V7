import { useSiteContent } from '../layout/SiteContentProvider';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import publicPages from '../../lib/public-pages.json';

const pages: Record<string, { title: string; description: string; image?: string }> = publicPages;
const origin = 'https://fokalltd.com';
const business = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Fokal Solutions Limited',
  url: origin,
  email: 'info@fokalltd.com',
  telephone: '+67572955054',
  address: { '@type': 'PostalAddress', addressLocality: 'Port Moresby', addressCountry: 'PG' },
};

export default function SiteMeta() {
  const site = useSiteContent();
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path.startsWith('/work/')) return null;

  const page = pages[path];
  if (!page) return <Helmet><title>Page Not Found | Fokal Solutions</title><meta name="robots" content="noindex" /></Helmet>;

  const canonical = origin + path;
  const metadata = site.content.metadata?.[path];
  const title = metadata?.title?.trim() || page.title;
  const description = metadata?.description?.trim() || page.description;
  const image = site.image('share:' + path) ?? new URL(page.image ?? '/media/home-1280.webp', origin).href;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:image" content={image} />
      <script type="application/ld+json">{JSON.stringify(business)}</script>
    </Helmet>
  );
}
