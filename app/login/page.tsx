"use client";

import { useRouter } from "next/navigation";
import { Container, Typography, Box } from "@mui/material";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard"); // Redirect if already logged in
    }
  }, [isAuthenticated, router]);

  return (
    <Container
      maxWidth="sm"
      className="h-screen flex items-center justify-center"
    >
      <Box className="p-8 bg-white rounded-lg w-full max-w-md flex flex-col items-center gap-8">
        <Image
          src="/logo.svg"
          alt="Recommend logo"
          width={150}
          height={20}
          priority
        />
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Create your account
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
}
