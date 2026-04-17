import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().optional(),
  email: z.email({ message: "Valid email is required" }),
  gender: z.string({ message: "Gender is required" }),
  password: z.string().min(6, {
    error: "Password must be at least 6 characters long",
  }),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
