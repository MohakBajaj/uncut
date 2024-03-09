import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { createHash } from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateEmail(email: string): boolean {
  const emailSchema = z.string().email();
  return emailSchema.safeParse(email).success;
}

export function validatePassword(password: string): boolean {
  const passwordSchema = z
    .string()
    .min(8)
    .max(50)
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+[\]{}|;:'",.<>?]).{8,50}$/
    );
  return passwordSchema.safeParse(password).success;
}

export function validateUsername(username: string): boolean {
  const usernameSchema = z
    .string()
    .min(5)
    .max(50)
    .regex(/^[a-zA-Z0-9._]+$/);
  return usernameSchema.safeParse(username).success;
}

export function generateCode(email: string): string {
  const randomCode = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  const hash = createHash("sha256");
  hash.update(email + randomCode);
  for (let i = 0; i < 10; i++) {
    hash.update(email);
  }
  return hash.digest("hex").slice(0, 9) + randomCode;
}

export function verifyCode(email: string, code: string): boolean {
  const hash = createHash("sha256");
  hash.update(email + code.slice(9));
  for (let i = 0; i < 10; i++) {
    hash.update(email);
  }
  return hash.digest("hex").slice(0, 9) === code.slice(0, 9);
}
