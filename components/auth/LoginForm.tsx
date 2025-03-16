"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@mui/material";
import TextInput from "../Input";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { loginSchema } from "@/utils/validation";

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const { login } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    login(data.email);
    router.replace("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full"
    >
      <TextInput
        type="email"
        placeholder="Email"
        {...register("email")}
        error={errors.email?.message}
      />
      <TextInput
        type="password"
        placeholder="Password"
        {...register("password")}
        error={errors.password?.message}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ fontSize: "16px" }}
      >
        Continue
      </Button>
    </form>
  );
};

export default LoginForm;
