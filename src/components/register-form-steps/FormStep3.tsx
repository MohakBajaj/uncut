"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const FormSchemaStep3 = z.object({
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters.",
    })
    .max(50, {
      message: "Username must be at most 50 characters.",
    })
    .regex(/^[a-zA-Z0-9._]+$/),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(50, {
      message: "Password must be at most 50 characters.",
    }),
});
export function FormStep3() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchemaStep3>>({
    resolver: zodResolver(FormSchemaStep3),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchemaStep3>) {
    await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: localStorage.getItem("email") as string,
        username: data.username,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast({
            title: "Success!",
            description: "Your account has been created. Redirecting...",
          });
          router.push("/app");
        }
      });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter a cool username" {...field} />
              </FormControl>
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
                  placeholder="Enter the Strong Password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Register</Button>
        </div>
      </form>
    </Form>
  );
}
