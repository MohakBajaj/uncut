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

const FormSchemaStep2 = z.object({
  verificationCode: z.string().length(12, {
    message: "Verification code must be 12 characters long.",
  }),
});
export function FormStep2({ setStep }: { setStep: (step: number) => void }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchemaStep2>>({
    resolver: zodResolver(FormSchemaStep2),
    defaultValues: {
      verificationCode: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchemaStep2>) {
    await fetch("/api/verifyGroupAffiliation/verify", {
      method: "POST",
      body: JSON.stringify({
        email: localStorage.getItem("email") as string,
        code: data.verificationCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast({
            title: "Thank you!",
            description:
              "Your email has been verified. You can now proceed to the next step.",
          });
          setStep(3);
        }
      });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the Verification Code"
                  {...field}
                  maxLength={12}
                />
              </FormControl>
              <FormDescription>
                Check your Inbox/Spam for the Verification Code
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
