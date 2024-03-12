"use client";
import AuthLeftHalf from "@/components/auth-left-half";
import LoginForm from "@/components/login-form";
import useIsMobile from "@/lib/hooks/isMobile";
import { cn } from "@/lib/utils";

export default function Login() {
  const isMobile = useIsMobile();
  return (
    <div
      className={cn(
        !isMobile ? "grid grid-flow-col grid-cols-7" : "",
        "h-screen w-screen"
      )}
    >
      <AuthLeftHalf />
      <LoginForm />
    </div>
  );
}
