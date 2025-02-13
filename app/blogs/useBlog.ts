import { useQuery } from "@tanstack/react-query";

import { Filter } from "@/models/Common";
import { getBlogsFiltered } from "@/services/blogs";

export function useBlog(body: Filter) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["blogsFiltered"],
    queryFn: () => getBlogsFiltered(body),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error, refetch };
}
