export type UserState = {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
};

export type DashboardState = {
  selectedView: string;
  searchTerm: string;
  page: number;
  rowsPerPage: number;
  setSelectedView: (view: string) => void;
  setSearchTerm: (term: string) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
};
