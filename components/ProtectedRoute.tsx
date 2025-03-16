"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useUserStore();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated && isHydrated) {
      router.replace("/login"); // Use `replace` instead of `push` for instant redirect
    }
  }, [isAuthenticated, router, isHydrated]);

  if (!isAuthenticated) {
    return null; // Prevent rendering if not authenticated
  }

  return <>{children}</>;
}
