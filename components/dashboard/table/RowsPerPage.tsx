import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface RowsPerPageProps {
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
  setPage: (page: number) => void;
}

const RowsPerPage = ({
  rowsPerPage,
  setRowsPerPage,
  setPage,
}: RowsPerPageProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  return (
    <Select
      value={rowsPerPage.toString()}
      onChange={handleChange}
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
  );
};

export default RowsPerPage;
