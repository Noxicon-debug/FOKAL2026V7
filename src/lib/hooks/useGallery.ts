import { useQuery } from '@tanstack/react-query';
import { isSupabaseConfigured, supabase } from '../supabase';
import { galleryUrlLifetime, resolveGalleryImages } from '../gallery-media';
import { GalleryCategory, GalleryProject } from '../../types/gallery';

export function useGalleryCategories() {
  return useQuery({
    queryKey: ['gallery-categories'],
    enabled: isSupabaseConfigured,
    queryFn: async () => {
      const { data, error } = await supabase.from('gallery_categories')
        .select('id, name').order('display_order').order('name');
      if (error) throw error;
      return data as GalleryCategory[];
    },
  });
}

export function useGalleryProjects(audience: 'public' | 'editor', editorId?: string) {
  const query = useQuery({
    queryKey: ['gallery-projects', audience, editorId],
    enabled: isSupabaseConfigured && (audience === 'public' || Boolean(editorId)),
    queryFn: async () => {
      const projects: GalleryProject[] = [];
      const pageSize = 100;
      for (let offset = 0; ; offset += pageSize) {
        let request = supabase.from('gallery_projects').select('*, media:gallery_project_media(*)')
        if (audience === 'public') {
          request = request.eq('publication_state', 'published')
            .order('created_at', { ascending: false, nullsFirst: false });
        }
        request = request.order('order_index').order('id').order('order_index', { referencedTable: 'media' })
          .order('id', { referencedTable: 'media' }).range(offset, offset + pageSize - 1);
        const { data, error } = await request;
        if (error) throw error;
        projects.push(...data as GalleryProject[]);
        if (data.length < pageSize) break;
      }
      return projects;
    },
  });

  const images = useQuery({
    queryKey: ['gallery-projects', 'images', audience, editorId, query.dataUpdatedAt],
    enabled: Boolean(query.data),
    staleTime: (galleryUrlLifetime - 60) * 1000,
    refetchInterval: (galleryUrlLifetime - 60) * 1000,
    queryFn: () => resolveGalleryImages((query.data ?? []).flatMap(project => [
      project.image_url,
      ...project.media.map(asset => asset.url),
    ])),
  });

  return {
    ...query,
    imageUrl: images.data ?? (() => ''),
    isLoading: query.isLoading || images.isLoading,
    isError: query.isError || images.isError,
    retry: () => {
      if (query.isError) void query.refetch();
      else void images.refetch();
    },
  };
}
