"use client";
import React from "react";
import { useState, useCallback, useMemo } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { Avatar } from "@mui/material";
import DropdownMenu from "../DropdownMenu";

function UserMenu() {
  const { userEmail, logout } = useUserStore();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    handleClose();
    router.push("/login");
  }, [logout, handleClose, router]);

  // 🔹 Extracted function to define menu options
  const getMenuOptions = useMemo(
    () => [
      ...(userEmail ? [{ label: userEmail, onClick: () => {} }] : []),
      { label: "Logout", onClick: handleLogout },
    ],
    [userEmail, handleLogout]
  );

  return (
    <>
      <Avatar
        alt="User"
        src="/user-avatar.png"
        sx={{
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        onClick={handleAvatarClick}
      />

      <DropdownMenu
        anchorEl={anchorEl}
        onClose={handleClose}
        options={getMenuOptions}
      />
    </>
  );
}

export default UserMenu;
