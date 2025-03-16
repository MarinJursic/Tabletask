import { TableHead, TableRow, TableCell } from "@mui/material";

interface TableHeaderProps {
  columns: { id: string; label: string }[];
}

const TableHeader = ({ columns }: TableHeaderProps) => (
  <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
    <TableRow>
      {columns.map((col) => (
        <TableCell
          key={col.id}
          sx={{ px: 12, py: 1, color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}
        >
          {col.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default TableHeader;
