import { create } from "zustand";
import { DashboardState } from "@/types/store";

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedView: "content",
  searchTerm: "",
  page: 1,
  rowsPerPage: 10,
  setSelectedView: (view) => set({ selectedView: view }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setPage: (pageNum) => set({ page: pageNum }),
  setRowsPerPage: (rows) => set({ rowsPerPage: rows, page: 1 }),
}));
