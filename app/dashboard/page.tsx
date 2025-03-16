"use client";
import { Box } from "@mui/material";
import SubHeader from "@/components/dashboard/SubHeader";
import { useDashboardStore } from "@/store/dashboardStore";
import { useDashboardViewConfig } from "@/hooks/useDashboardConfig";

const DashboardPage: React.FC = () => {
  const { selectedView } = useDashboardStore();

  const dashboardConfig = useDashboardViewConfig(selectedView);

  return (
    <Box className="w-full">
      {/* Dynamic Header */}
      <SubHeader
        title={dashboardConfig.title}
        description={dashboardConfig.description}
      />

      {dashboardConfig.component()}
    </Box>
  );
};

export default DashboardPage;
