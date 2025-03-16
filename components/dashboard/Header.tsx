import { AppBar, Box } from "@mui/material";
import Image from "next/image";
import UserMenu from "../auth/UserMenu";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "none",
        display: "flex",
        flexDirection: "row",
        height: 100,
        width: "100%",
      }}
    >
      {/* Sidebar-aligned Logo */}
      <Box className="bg-gray-100 w-64 h-full p-6">
        <Image src="/logo.svg" alt="Logo" width={120} height={40} />
      </Box>

      {/* Header Right Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          paddingRight: "24px",
        }}
      >
        <UserMenu />
      </Box>
    </AppBar>
  );
};

export default Header;
