"use client";
import { createTheme } from "@mui/material";

// Create MUI Theme
const muiTheme = createTheme({
  typography: {
    fontFamily: "var(--font-helveticaNow), sans-serif",
    allVariants: {
      fontFamily: "var(--font-helveticaNow), sans-serif",
    },
    button: {
      textTransform: "none", // Prevents uppercase text in buttons
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#000000", // Black background
      contrastText: "#ffffff", // White text
    },
    secondary: {
      main: "#ffffff", // White background
      contrastText: "#000000", // Black text
    },
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          border: "none",
          borderRadius: "0px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          padding: "4px 8px",
          "&:hover": {
            borderRadius: "12px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none", // Removes shadow
          transition: "0.1s", // Instant transitions
          border: "1px solid transparent",
          borderRadius: "24px",
        },
        containedPrimary: {
          backgroundColor: "#000000", // Black background for primary
          color: "#ffffff", // White text for primary
          "&:hover": {
            backgroundColor: "#ffffff", // Hover - turns white
            color: "#000000", // Text turns black
            border: "1px solid #000000",
            boxShadow: "none", // Remove hover shadow
          },
        },
        containedSecondary: {
          backgroundColor: "#ffffff", // White background for secondary
          color: "#000000", // Black text for secondary
          border: "1px solid #000000",
          "&:hover": {
            backgroundColor: "#000000", // Hover - turns black
            color: "#ffffff", // Text turns white
            border: "1px solid #000000",
            boxShadow: "none", // Remove hover shadow
          },
        },
      },
    },
  },
});

export default muiTheme;
