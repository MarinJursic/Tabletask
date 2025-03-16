import { Box, Button } from "@mui/material";
import { useCallback } from "react";

interface PaginationProps {
  meta: { currentPage: number; totalPages: number };
  setPage: (page: number) => void;
}

const Pagination = ({ meta, setPage }: PaginationProps) => {
  const { currentPage, totalPages } = meta;
  const maxButtons = 5; // Number of page buttons to show at a time

  if (totalPages <= 1) return null; // ✅ Hide pagination if there's only one page

  // Calculate the start and end page numbers dynamically
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  // Adjust the range if near the start or end
  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const paginationNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  // ✅ Memoized event handlers using `useCallback`
  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== currentPage) setPage(page);
    },
    [currentPage, setPage]
  );

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) setPage(currentPage - 1);
  }, [currentPage, setPage]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  }, [currentPage, totalPages, setPage]);

  return (
    <Box display="flex" alignItems="center" gap={1} justifyContent="center">
      <Button
        disabled={currentPage === 1}
        onClick={handlePrevious}
        sx={{
          fontSize: "12px",
          backgroundColor: "white",
          minWidth: "40px",
          "&:hover": { backgroundColor: "#e0e0e0" },
        }}
      >
        {"<"}
      </Button>

      {startPage > 1 && (
        <>
          <Button
            onClick={() => handlePageChange(1)}
            size="small"
            sx={{
              minWidth: "30px",
              p: 0,
              borderRadius: "4px",
              opacity: 0.8,
            }}
          >
            1
          </Button>
          {startPage > 2 && <Box>...</Box>}
        </>
      )}

      {paginationNumbers.map((num) => (
        <Button
          key={num}
          onClick={() => handlePageChange(num)}
          variant={num === currentPage ? "contained" : "text"}
          size="small"
          sx={
            num === currentPage
              ? {
                  backgroundColor: "#e0e0e0",
                  color: "black",
                  minWidth: "30px",
                  p: 0,
                  borderRadius: "4px",
                  fontWeight: "bold",
                }
              : {
                  minWidth: "30px",
                  p: 0,
                  borderRadius: "4px",
                  opacity: 0.6,
                }
          }
        >
          {num}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <Box>...</Box>}
          <Button
            onClick={() => handlePageChange(totalPages)}
            size="small"
            sx={{
              minWidth: "30px",
              p: 0,
              borderRadius: "4px",
              opacity: 0.8,
            }}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        disabled={currentPage >= totalPages}
        onClick={handleNext}
        sx={{
          fontSize: "12px",
          backgroundColor: "white",
          minWidth: "40px",
          "&:hover": { backgroundColor: "#e0e0e0" },
        }}
      >
        {">"}
      </Button>
    </Box>
  );
};

export default Pagination;
