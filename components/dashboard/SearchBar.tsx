import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDashboardStore } from "@/store/dashboardStore";

function SearchBar() {
  const { searchTerm, setSearchTerm } = useDashboardStore();

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  return (
    <TextField
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => handleSearch(e)}
      sx={{ width: "30%", minWidth: "220px" }}
      slotProps={{
        input: {
          inputProps: {
            style: {
              padding: "8px",
            },
          },
          sx: {
            borderRadius: "8px",
            fontSize: "14px",
            py: 0,
          },
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default SearchBar;
