import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GalleryAsset, GalleryProjectFields } from '../../types/gallery';
import { supabase } from '../supabase';

export function useAdminMutations() {
  const queryClient = useQueryClient();
  const refreshProjects = () => queryClient.invalidateQueries({ queryKey: ['gallery-projects'] });

  const saveProject = useMutation({
    mutationFn: async ({ project, assets }: {
      project: GalleryProjectFields & { id?: number; revision?: number };
      assets: GalleryAsset[];
    }) => {
      const { data, error } = await supabase.rpc('save_gallery_project', { project, assets });
      if (error) throw error;
      return data as number;
    },
    onSuccess: refreshProjects,
  });

  const deleteProject = useMutation({
    mutationFn: async ({ id, revision }: { id: number; revision: number }) => {
      const { error } = await supabase.from('gallery_projects').delete()
        .eq('id', id).eq('revision', revision).select('id').single();
      if (error) throw error;
    },
    onSuccess: refreshProjects,
  });

  return { saveProject, deleteProject };
}
