import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchData, FetchDataParams } from "@/services/apiService";
import { toast } from "react-hot-toast";
import { ContentItem, TableType, PaginationMeta } from "../utils/validation";
import { useMemo } from "react";

export const useData = ({
  type,
  searchTerm,
  page,
  perPage,
}: FetchDataParams) => {
  const queryClient = useQueryClient(); // ✅ Use React Query's global client

  // ✅ Correct Query Key to Prevent Stale Cache Issues
  const queryKey = useMemo(
    () => ["data", type, searchTerm, page, perPage],
    [type, searchTerm, page, perPage]
  );

  // 🔹 Fetch Data
  const { data, isLoading, error, isFetching } = useQuery<{
    items: TableType[];
    meta: PaginationMeta;
  }>({
    queryKey,
    queryFn: () => fetchData({ type, searchTerm, page, perPage }),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });

  // ✅ Fix: Move `setQueryData()` Inside `useMutation.onSuccess`
  const createContentMutation = useMutation({
    mutationFn: async () => {
      return {
        id: Math.floor(Math.random() * 100000).toString(),
        name: `Random Content ${Math.floor(Math.random() * 100)}`,
        avatarUrl: "", // Placeholder avatar
      } as ContentItem;
    },
    onSuccess: (newRow) => {
      // ✅ Update cache immediately to reflect new content
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData)
          return {
            items: [newRow],
            meta: {
              currentPage: page,
              itemCount: 1,
              totalPages: 1,
              totalItems: 1,
              itemsPerPage: perPage,
            },
          };

        const oldItems = oldData.items || [];
        const oldMeta = oldData.meta || {};

        // ✅ Ensure correct pagination update
        const newItemCount = oldMeta.totalItems + 1;
        const newTotalPages = Math.ceil(newItemCount / perPage);

        let updatedItems = [newRow, ...oldItems];

        // ✅ Adjust for new `perPage`
        if (updatedItems.length > perPage) {
          updatedItems = updatedItems.slice(0, perPage);
        }

        return {
          items: updatedItems,
          meta: {
            ...oldMeta,
            itemCount: newItemCount,
            totalPages: newTotalPages,
            totalItems: newItemCount,
            itemsPerPage: perPage,
          },
        };
      });

      toast.success("Content Created Successfully");
    },
  });

  return {
    data: data?.items || [],
    meta: data?.meta || {
      currentPage: page,
      itemCount: 0,
      itemsPerPage: perPage,
      totalItems: 0,
      totalPages: 0,
    },
    isLoading,
    isFetching,
    error,
    createContent: createContentMutation.mutate,
  };
};
