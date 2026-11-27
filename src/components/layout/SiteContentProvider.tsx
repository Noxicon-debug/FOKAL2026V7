import { useCmsRole } from '../../lib/hooks/useCmsRole';
import { createContext, useContext, useEffect, type CSSProperties, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/hooks/useAuth';
import { isSupabaseConfigured } from '../../lib/supabase';
import { emptyContent, fontOptions, getSiteSettings, readSiteStage, siteImageUrls, type SiteContent } from '../../lib/site-content';
import type { ResponsiveImageAsset } from '../../lib/media-assets';

const Store = createContext<{content: SiteContent; urls: Record<string, string>}>({content: emptyContent, urls: {}});
const previewKey = 'fokal-cms-preview';

export function useSiteContent() {
  const {content, urls} = useContext(Store);
  const image = (slot: string) => urls[content.images[slot]];
  return {
    content, image, copy: (key: string, fallback: string) => content.copy?.[key]?.trim() || fallback,
    alt: (key: string, fallback: string) => content.imageAlt?.[key] ?? fallback, settings: getSiteSettings(content.settings),
    photo: (path: string) => urls[path],
    asset: (slot: string, fallback: ResponsiveImageAsset): ResponsiveImageAsset => {
      const override = image(slot);
      return override ? {fallback: override} : fallback;
    },
    background: (slot: string): CSSProperties | undefined => {
      const override = image(slot);
      return override ? {'--site-section-image': `url("${override}")`} as CSSProperties : undefined;
    },
  };
}

function Content({children, draft, editorId}: {children: ReactNode; draft: boolean; editorId?: string}) {
  const query = useQuery({
    queryKey: ['site-content', draft ? 'draft' : 'live', editorId],
    enabled: isSupabaseConfigured,
    queryFn: async () => {
      const {content} = await readSiteStage(draft ? 'draft' : 'live');
      const urls = await siteImageUrls(content);
      return {content, urls};
    },
    retry: false, staleTime: 30_000, refetchInterval: 240_000,
  });

  const theme = query.data?.content.theme;
  const color = (value?: string) => /^#[0-9a-f]{6}$/i.test(value ?? '') ? value : undefined;
  const font = (value?: string) => fontOptions.some(option => option === value)
    ? `"${value}", ${value === 'Georgia' || value === 'Times New Roman' ? 'serif' : 'sans-serif'}` : undefined;
  const styles = {
    '--site-primary': color(theme?.primary), '--site-accent': color(theme?.accent),
    '--site-paper': color(theme?.background), '--site-ink': color(theme?.text),
    '--site-headings': font(theme?.headingFont), '--site-body': font(theme?.bodyFont),
  } as CSSProperties;
  return <Store.Provider value={query.data ?? {content: emptyContent, urls: {}}}>
    <div className="site-content-root" style={styles}>
      {draft && <div className="site-preview-status" role="status">
        {query.isPending ? 'Loading draft…' : query.isError ? 'Draft unavailable. Showing site defaults.' : 'Private CMS draft preview'}
        <Link to="/?cms-preview=off">Exit preview</Link>
      </div>}
      {children}
    </div>
  </Store.Provider>;
}

function EditorPreview({children}: {children: ReactNode}) {
  const {user, loading} = useAuth();
  const role = useCmsRole(user?.id);
  if (loading || (user && role.isPending)) return <p className="route-loading" role="status">Checking preview access…</p>;
  if (!user || !role.data) {
    return <div className="route-loading"><p role="alert">Draft preview requires CMS editor access.</p><Link to="/admin">Open the CMS</Link></div>;
  }
  return <Content draft editorId={user.id}>{children}</Content>;
}

export default function SiteContentProvider({children}: {children: ReactNode}) {
  const {search} = useLocation();
  const mode = new URLSearchParams(search).get('cms-preview');
  useEffect(() => {
    if (mode === '1') sessionStorage.setItem(previewKey, '1');
    if (mode === 'off') sessionStorage.removeItem(previewKey);
  }, [mode]);
  const draft = mode === '1' || (mode !== 'off' && sessionStorage.getItem(previewKey) === '1');
  return draft ? <EditorPreview>{children}</EditorPreview> : <Content draft={false}>{children}</Content>;
}
