import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export function useEntityList(entityName, { sort } = {}) {
  const queryKey = ['admin', entityName, sort];
  const { data = [], isLoading } = useQuery({
    queryKey,
    queryFn: () => base44.entities[entityName].list(sort),
    staleTime: 30000,
  });
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', entityName] });
  return { items: data, loading: isLoading, invalidate };
}