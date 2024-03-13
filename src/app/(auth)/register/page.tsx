"use client";
import AuthLeftHalf from "@/components/auth-left-half";
import RegisterForm from "@/components/register-form";
import useIsMobile from "@/lib/hooks/isMobile";
import { cn } from "@/lib/utils";

export default function Register() {
  const isMobile = useIsMobile();
  return (
    <div
      className={cn(
        !isMobile ? "grid grid-flow-col grid-cols-7" : "",
        "h-screen w-screen"
      )}
    >
      <AuthLeftHalf />
      <RegisterForm />
    </div>
  );
}
