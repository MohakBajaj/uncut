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
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import { FormSchema } from "../register-form";
import { useEffect, useState } from "react";
import { validateEmail } from "@/lib/utils";

const FormSchemaStep1 = z.object({
  email: z.string().email({
    message: "Enter a valid email address.",
  }),
});
export function FormStep1({ setStep }: { setStep: (step: number) => void }) {
  const { toast } = useToast();

  const [validateGroupAffiliation, setValidateGroupAffiliation] =
    useState(false);
  const [groupAffiliationStatus, setGroupAffiliationStatus] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchemaStep1),
    defaultValues: {
      email: "",
    },
  });

  const email = form.watch("email");

  useEffect(() => {
    if (email && validateEmail(email)) {
      setGroupAffiliationStatus("Validating...");
      fetch(`/api/validateGroupAffiliation?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setValidateGroupAffiliation(true);
            setGroupAffiliationStatus("Valid.");
          }
        });
    }
  }, [email]);

  async function onSubmit(data: z.infer<typeof FormSchemaStep1>) {
    if (validateGroupAffiliation) {
      localStorage.setItem("email", data.email);
      await fetch("/api/verifyGroupAffiliation/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      }).then(() => {
        toast({
          title: "Verification Code Sent!",
          description:
            "We have sent a verification code to your email. Please enter the code to continue.",
        });
        setStep(2);
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Ex. 5000xxxxx@stu.upes.ac.in" {...field} />
              </FormControl>
              <FormDescription>
                {!groupAffiliationStatus
                  ? "Enter your College Email Address"
                  : groupAffiliationStatus}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <FormItem>
            <FormLabel>Already Awesome?</FormLabel>
            <FormControl>
              <Link href="/login">
                <Button variant={"link"} className="text-primary px-1">
                  Login
                </Button>
              </Link>
            </FormControl>
          </FormItem>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
