"use client";
import { z } from "zod";

import { AnimatePresence, motion } from "framer-motion";
import useIsMobile from "@/lib/hooks/isMobile";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "./Icons";
import { Syne_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { FormStep1 } from "./register-form-steps/FormStep1";
import { FormStep2 } from "./register-form-steps/FormStep2";
import { FormStep3 } from "./register-form-steps/FormStep3";
import { useRouter } from "next/navigation";

const sm = Syne_Mono({
  subsets: ["latin"],
  weight: "400",
});

export const FormSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(50, {
      message: "Password must be at most 50 characters.",
    }),
});

export default function LoginForm() {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(1);

  const router = useRouter();

  // useEffect(() => {
  //   fetch("/api/auth/checkSession")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         router.push("/app");
  //       }
  //     });
  // }, [router]);

  return (
    <div className="h-full flex flex-col col-span-3">
      <div className={cn("p-2", isMobile ? "flex justify-center" : "hidden")}>
        <Link href={"/"}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "anticipate" }}
            className="flex items-end"
          >
            <Icons.logo className="fill-none stroke-primary w-16 h-14 select-none" />
            <h1 className={cn("text-3xl text-primary", sm.className)}>Uncut</h1>
          </motion.div>
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
        className=" flex-grow flex flex-col justify-center items-center h-full"
      >
        <span
          className={cn("text-4xl font-bold text-primary mb-4", sm.className)}
        >
          Register
        </span>
        {step === 1 && <FormStep1 setStep={setStep} />}
        {step === 2 && <FormStep2 setStep={setStep} />}
        {step === 3 && <FormStep3 />}
      </motion.div>
    </div>
  );
}
