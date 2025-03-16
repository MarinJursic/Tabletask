"use client";

import { JSX, useMemo } from "react";
import Content from "@/components/dashboard/content/page";
import Trends from "@/components/dashboard/trends/page";
import Loader from "@/components/Loader";

interface DashboardViewConfig {
  title: string;
  description: string;
  component: () => JSX.Element;
  noDataMessage?: string;
}

// 🔹 Centralized Config Data
const dashboardConfig: Record<string, DashboardViewConfig> = {
  content: {
    title: "My content",
    description: "Any content you have created will appear here.",
    component: Content,
  },
  trends: {
    title: "Trends",
    description: "Discover what is trending",
    component: Trends,
  },
};

// 🔹 Custom Hook to Get Dashboard Config
export const useDashboardConfig = () => {
  return useMemo(() => dashboardConfig, []);
};

// 🔹 Custom Hook to Get a Specific View Config
export const useDashboardViewConfig = (view: string) => {
  // 🔹 Memoized View Config
  return useMemo(() => {
    return (
      dashboardConfig[view] || {
        title: "Unknown View",
        description: "",
        component: () => Loader,
      }
    );
  }, [view]);
};
