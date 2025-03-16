import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

// ✅ Hook to ensure protected pages redirect unauthorized users
export const useAuthRedirect = (redirectPath: string = "/login") => {
  const { isAuthenticated } = useUserStore();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectPath); // 🔹 Redirect if not authenticated
    } else {
      setCheckingAuth(false); // 🔹 Allow rendering if authenticated
    }
  }, [isAuthenticated, router, redirectPath]);

  return { isAuthenticated, checkingAuth };
};
