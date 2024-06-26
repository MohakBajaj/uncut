"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import useIsMobile from "@/lib/hooks/isMobile";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "./Icons";
import { Syne_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const sm = Syne_Mono({
  subsets: ["latin"],
  weight: "400",
});

const FormSchema = z.object({
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
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/checkSession")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem(
            "user",
            JSON.stringify(data.res.tokenData.payload.username)
          );
          router.push("/app");
        }
      });
  }, [router]);

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    localStorage.setItem("user", JSON.stringify(response.user.username));

    if (!response.success) {
      toast({
        title: "Incorrect Email or Password.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    toast({
      title: "Login Success 🎉",
      description: (
        <div>
          <p>
            Welcome back,{" "}
            <span className="text-primary font-bold">
              {response.user.username}
            </span>
            !
          </p>
          <p>Redirecting to App...</p>
        </div>
      ),
    });
    setTimeout(() => {
      router.push("/app");
    }, 500);
  }

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
          Login
        </span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex. 5000xxxxx@stu.upes.ac.in"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The e-mail you use at the time of registration.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button type="submit" disabled={loading}>
                Login
              </Button>
              <FormItem>
                <FormLabel>New here?</FormLabel>
                <FormControl>
                  <Link href="/register">
                    <Button variant={"link"} className="text-primary px-1">
                      Sign up
                    </Button>
                  </Link>
                </FormControl>
              </FormItem>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
