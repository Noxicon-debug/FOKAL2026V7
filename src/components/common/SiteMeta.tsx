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
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path.startsWith('/work/')) return null;

  const page = pages[path];
  if (!page) return <Helmet><title>Page Not Found | Fokal Solutions</title><meta name="robots" content="noindex" /></Helmet>;

  const canonical = origin + path;
  const image = new URL(page.image ?? '/media/home-1280.webp', origin).href;

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:image" content={image} />
      <script type="application/ld+json">{JSON.stringify(business)}</script>
    </Helmet>
  );
}
