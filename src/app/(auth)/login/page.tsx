"use client";
import { Icons } from "@/components/Icons";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Syne_Mono } from "next/font/google";
import Link from "next/link";

const sm = Syne_Mono({
  subsets: ["latin"],
  weight: "400",
});

export default function Login() {
  return (
    <div
      id="login"
      className="grid grid-flow-col grid-cols-2 h-screen w-screen"
    >
      <div id="login-header" className="bg-foreground hidden md:block lg:block">
        <div className="flex flex-col p-4 justify-center items-start h-screen">
          <Link href={"/"}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "anticipate" }}
              className="flex items-end"
            >
              <Icons.logo className="fill-none stroke-primary w-24 h-20 select-none" />
              <h1 className={cn("text-5xl text-primary", sm.className)}>
                Uncut
              </h1>
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
              textClassName="text-6xl"
              cursorClassName="h-14"
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
    </div>
  );
}
