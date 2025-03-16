"use client";

import { Box, Paper } from "@mui/material";
import { useDashboardStore } from "@/store/dashboardStore";
import { useDebounce } from "@/hooks/useDebounce";
import useTableConfig from "@/hooks/useTableConfig";
import { useData } from "@/hooks/useData";
import TableHeader from "./TableHeader";
import TableBodyComponent from "./TableBody";
import Pagination from "./Pagination";
import SearchBar from "../SearchBar";
import EmptyState from "./EmptyState";
import Loader from "@/components/Loader";
import RowsPerPage from "./RowsPerPage";
import { TableContainer, Table } from "@mui/material";
import { Button } from "@mui/material";

interface TableComponentProps {
  view: string; // Allows different table views (e.g., Content, Trends)
}

const TableComponent = ({ view }: TableComponentProps) => {
  const { page, rowsPerPage, setPage, setRowsPerPage, searchTerm } =
    useDashboardStore();

  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data, meta, isLoading, createContent } = useData({
    type: view,
    searchTerm: view === "content" ? debouncedSearch : "",
    page,
    perPage: rowsPerPage,
  });

  const columns = useTableConfig(view);

  return (
    <Box sx={{ px: 12, py: 3 }}>
      {/* 🔹 Search & Create Content Button (Only for "content" view) */}
      {view === "content" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pb: 3,
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

      {/* 🔹 Loading State */}
      {isLoading ? (
        <Loader />
      ) : data?.length === 0 ? (
        <EmptyState view={view} />
      ) : (
        <>
          {/* 🔹 Table */}
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
              <TableHeader columns={columns} />
              <TableBodyComponent columns={columns} data={data} view={view} />
            </Table>
          </TableContainer>

          {/* 🔹 Pagination & Rows Per Page */}
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
            <RowsPerPage
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              setPage={setPage}
            />
            <Pagination meta={meta} setPage={setPage} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default TableComponent;
