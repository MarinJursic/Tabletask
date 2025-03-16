import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";
import { UserState } from "@/types/store";

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userEmail: null,
      login: (email) => set({ isAuthenticated: true, userEmail: email }),
      logout: () => set({ isAuthenticated: false, userEmail: null }),
    }),
    {
      name: "auth-storage", // unique name
      storage: createJSONStorage(() => localStorage),
    }
  )
);
