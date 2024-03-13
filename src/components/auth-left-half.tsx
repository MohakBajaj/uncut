"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Icons } from "./Icons";
import { cn } from "@/lib/utils";
import { Syne_Mono } from "next/font/google";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

const sm = Syne_Mono({
  subsets: ["latin"],
  weight: "400",
});

export default function AuthLeftHalf() {
  return (
    <div
      id="login-header"
      className="bg-foreground hidden md:block lg:block col-span-4"
    >
      <div className="flex flex-col p-4 justify-center items-start h-screen">
        <Link href={"/"}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "anticipate" }}
            className="flex items-end select-none"
          >
            <Icons.logo className="fill-none stroke-primary w-24 h-20 select-none" />
            <h1 className={cn("text-5xl text-primary", sm.className)}>Uncut</h1>
          </motion.div>
        </Link>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "anticipate" }}
          className="flex flex-grow mt-52"
        >
          <TypewriterEffectSmooth
            words={[
              {
                text: "Get",
                className: "text-accent",
              },
              {
                text: "Real.",
                className: "text-primary",
              },
              {
                text: "Stay",
                className: "text-accent",
              },
              {
                text: "Anonymous.",
                className: "text-primary",
              },
            ]}
            className="font-bold text-center"
            textClassName="text-[calc(4vw)]"
            cursorClassName="h-[calc(5vw)]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "anticipate" }}
          className="flex justify-center items-center"
        >
          <p className="text-white text-sm">
            © 2024 Uncut. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
