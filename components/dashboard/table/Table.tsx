"use client";

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Box,
  Button,
  Paper,
} from "@mui/material";
import { useDashboardStore } from "@/store/dashboardStore";
import { useDebounce } from "@/hooks/useDebounce";
import useTableConfig from "@/hooks/useTableConfig";
import { CircularProgress } from "@mui/material";
import Empty from "../Empty";
import { TableType } from "@/utils/validation";
import { useMemo } from "react";
import { useData } from "@/hooks/useD";
import SearchBar from "../SearchBar";
import { useQueryClient } from "@tanstack/react-query";
import { SelectChangeEvent } from "@mui/material";
import { useCallback } from "react";

const TableComponent = () => {
  const {
    selectedView,
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    searchTerm,
  } = useDashboardStore();

  const queryClient = useQueryClient();

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Fetch data with pagination metadata
  const { data, meta, isLoading, isFetching, createContent } = useData({
    type: selectedView,
    searchTerm: selectedView === "content" ? debouncedSearch : "",
    page,
    perPage: rowsPerPage,
  });

  console.log(isFetching);

  const columns = useTableConfig(selectedView);

  // 🔹 Dynamically Calculate Pagination Numbers
  const paginationNumbers = useMemo(() => {
    const maxButtons = 5; // Show 5 page buttons at a time
    const startPage = Math.max(
      1,
      meta.currentPage - Math.floor(maxButtons / 2)
    );
    const endPage = Math.min(meta.totalPages, startPage + maxButtons - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [meta.currentPage, meta.totalPages]);

  const handleChangeRowsPerPage = useCallback(
    (event: SelectChangeEvent<number>) => {
      const newRowsPerPage = Number(event.target.value);

      if (newRowsPerPage !== rowsPerPage) {
        setRowsPerPage(newRowsPerPage);
        setPage(1); // ✅ Reset to first page on rows per page change

        // ✅ Invalidate & refetch data after rowsPerPage update
        queryClient.invalidateQueries({ queryKey: ["data", selectedView] });
      }
    },
    [rowsPerPage, setRowsPerPage, setPage, queryClient, selectedView]
  );

  return (
    <>
      {selectedView == "content" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 12,
            pt: 3,
          }}
        >
          <SearchBar />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => createContent()}
            sx={{ borderRadius: "8px", px: 6, fontSize: "14px" }}
          >
            Create Content
          </Button>
        </Box>
      )}

      <Box sx={{ px: 12, py: 3 }}>
        {data?.length === 0 && !isLoading ? (
          <Empty
            title={
              selectedView === "content"
                ? "No content found"
                : "No trends found"
            }
            description={
              selectedView === "content"
                ? "You currently have no content to display"
                : "Nothing is currently trending"
            }
          />
        ) : (
          <>
            <TableContainer
              component={Paper}
              sx={{
                overflow: "hidden",
                boxShadow: "none",
                borderRadius: "12px 12px 0 0",
                border: "1px solid #e0e0e0",
                borderBottom: "none",
              }}
            >
              <Table stickyHeader>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    {columns.map((col) => (
                      <TableCell
                        key={col.id}
                        sx={{
                          px: 12,
                          py: 1,
                          color: "rgba(0,0,0,0.4)",
                          backgroundColor: "#f5f5f5",
                          borderBottom: "none",
                        }}
                      >
                        {col.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    opacity: isLoading ? 0.5 : 1,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                >
                  {isLoading && data?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.map((item: unknown) => (
                      <TableRow key={item.id}>
                        {columns.map((col) => (
                          <TableCell key={col.id} sx={{ px: 12 }}>
                            {col.render
                              ? col.render(item as unknown)
                              : item[col.id as keyof TableType]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 24px",
                borderRadius: "0 0 12px 12px",
                border: "1px solid #e0e0e0",
                borderTop: "none",
              }}
            >
              {/* Rows Per Page Selector */}
              <Select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                size="small"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  fontSize: "12px",
                  border: "none",
                }}
              >
                <MenuItem value={10}>Show 10</MenuItem>
                <MenuItem value={20}>Show 20</MenuItem>
                <MenuItem value={50}>Show 50</MenuItem>
              </Select>

              {/* Pagination Controls */}
              <Box display="flex" alignItems="center" gap={1}>
                <Button
                  disabled={meta.currentPage === 1}
                  onClick={() => setPage(meta.currentPage - 1)}
                  size="small"
                  sx={{
                    fontSize: "12px",
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  Back
                </Button>

                {paginationNumbers.map((num) => (
                  <Button
                    key={num}
                    variant={num === meta.currentPage ? "contained" : "text"}
                    onClick={() => setPage(num)}
                    size="small"
                    sx={
                      num === meta.currentPage
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
                            opacity: 0.5,
                          }
                    }
                  >
                    {num}
                  </Button>
                ))}

                <Button
                  disabled={meta.currentPage >= meta.totalPages}
                  onClick={() => setPage(meta.currentPage + 1)}
                  size="small"
                  sx={{
                    fontSize: "12px",
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default TableComponent;
