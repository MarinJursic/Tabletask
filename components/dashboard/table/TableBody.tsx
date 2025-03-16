import { TableBody, TableRow, TableCell } from "@mui/material";
import { TableType } from "@/utils/validation";
import { JSX } from "react";

interface TableBodyProps {
  columns: {
    id: string;
    label: string;
    render?: (item: TableType) => JSX.Element;
  }[];
  data: TableType[];
  view: string;
}

const TableBodyComponent = ({ columns, data, view }: TableBodyProps) => {
  const handleClick = (item: TableType) => {
    if (view === "trends" && "url" in item) {
      window.open(item.url, "_blank"); // Open in a new tab
    }
  };

  return (
    <TableBody>
      {data.map((item) => (
        <TableRow
          key={item.id}
          onClick={() => handleClick(item)}
          sx={{
            cursor: view === "trends" ? "pointer" : "default", // Make only trends clickable
            "&:hover": view === "trends" ? { backgroundColor: "#f5f5f5" } : {},
          }}
        >
          {columns.map((col) => (
            <TableCell key={col.id} sx={{ px: 12 }}>
              {col.render ? col.render(item) : item[col.id as keyof TableType]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyComponent;
