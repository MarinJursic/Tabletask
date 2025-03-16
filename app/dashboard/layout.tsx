import { Box } from "@mui/material";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { ReactNode } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchData } from "@/services/apiService";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const queryClient = new QueryClient();

  // Fetch data server-side and store in QueryClient
  await queryClient.prefetchQuery({
    queryKey: ["data", "content", "", 1, 10],
    queryFn: () =>
      fetchData({ type: "content", searchTerm: "", page: 1, perPage: 10 }),
  });

  // Fetch data server-side and store in QueryClient
  await queryClient.prefetchQuery({
    queryKey: ["data", "trends", "", 1, 10],
    queryFn: () =>
      fetchData({ type: "trends", searchTerm: "", page: 1, perPage: 10 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProtectedRoute>
        <Box className="flex h-screen flex-col">
          <Header />
          <Box className="flex flex-1">
            <Sidebar />
            <Box className="flex-1 overflow-auto">{children}</Box>
          </Box>
        </Box>
      </ProtectedRoute>
    </HydrationBoundary>
  );
};

export default DashboardLayout;
