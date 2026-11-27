import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';

export type CmsRole = 'contributor' | 'editor' | 'administrator';
export function useCmsRole(userId?: string) {
  return useQuery({
    queryKey: ['cms-role', userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const {data, error} = await supabase.rpc('current_cms_role');
      if (error) throw error;
      return data as CmsRole | null;
    },
    retry: false, refetchInterval: 30_000,
  });
}
