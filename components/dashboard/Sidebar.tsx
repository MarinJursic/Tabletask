"use client";
import { useDashboardConfig } from "@/hooks/useDashboardConfig";
import { useDashboardStore } from "@/store/dashboardStore";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";

const Sidebar = () => {
  const {
    selectedView,
    setSelectedView,
    setSearchTerm,
    setPage,
    setRowsPerPage,
  } = useDashboardStore();

  const dashboardConfig = useDashboardConfig();

  // 🔹 Memoized Sidebar Items
  const sidebarItems = useMemo(() => {
    return Object.entries(dashboardConfig).map(([key, config]) => ({
      key,
      title: config.title,
    }));
  }, [dashboardConfig]);

  const handleSelectedView = (view: string) => {
    setSearchTerm("");
    setPage(1);
    setRowsPerPage(10);
    setSelectedView(view);
  };

  return (
    <Box className="w-64 bg-gray-100 h-full px-4 min-w-64">
      <List disablePadding>
        {sidebarItems.map((item) => (
          <ListItem key={item.key} disablePadding sx={{ mb: 2 }}>
            <ListItemButton
              selected={selectedView === item.key}
              onClick={() => handleSelectedView(item.key)}
              sx={{
                backgroundColor:
                  selectedView === item.key
                    ? "rgba(0,0,0,0.2) !important"
                    : "transparent",
              }}
            >
              <ListItemText primary={item.title} sx={{ fontWeight: 700 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
