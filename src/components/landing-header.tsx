import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { Quicksand } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Icons } from "@/components/Icons";
import useIsMobile from "@/lib/hooks/isMobile";

const qs = Quicksand({
  subsets: ["latin"],
});

export default function Header() {
  const isMobile = useIsMobile();
  return (
    <LampContainer>
      <motion.div
        initial={{
          opacity: 0,
          y: isMobile ? -140 : -100,
          scale: isMobile ? 1.2 : 1.5,
        }}
        animate={{
          opacity: 1,
          y: isMobile ? -140 : -100,
          scale: isMobile ? 1.2 : 1.5,
        }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="absolute"
      >
        <Icons.logo className="stroke-white/[0.15] fill-none select-none" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: isMobile ? -35 : 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-t from-primary to-background py-4 bg-clip-text text-center font-medium tracking-tight text-transparent select-none"
      >
        <span className="text-xl md:text-5xl">Welcome to</span>
        <br />
        <span
          className={cn(
            "font-bold font-mono text-7xl md:text-9xl",
            qs.className
          )}
        >
          UNCUT
        </span>
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: isMobile ? -35 : 0 }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <TypewriterEffect
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
          className="text-xl md:text-5xl font-bold text-center select-none"
        ></TypewriterEffect>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: isMobile ? -35 : 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex justify-center select-none"
      >
        <Button variant={"secondary"} className="w-48 mt-8">
          Get Started
        </Button>
      </motion.div>
    </LampContainer>
  );
}
