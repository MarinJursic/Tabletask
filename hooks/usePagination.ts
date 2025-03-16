import { useMemo } from "react";

const usePagination = (
  totalItems: number,
  rowsPerPage: number,
  currentPage: number
) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const paginationNumbers = useMemo(() => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage < 2) {
      endPage = Math.min(5, totalPages);
    } else if (currentPage > totalPages - 3) {
      startPage = Math.max(1, totalPages - 4);
    }

    if (endPage - startPage < 4) {
      endPage = Math.min(startPage + 4, totalPages);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [totalPages, currentPage]);

  return { paginationNumbers, totalPages };
};

export default usePagination;
