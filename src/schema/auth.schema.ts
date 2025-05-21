import { z } from "zod";

export const authSignInFormSchema = z.object({
  email: z
    .string()
    .refine((value) => value.trim().length > 0, "Email is required"),
  password: z
    .string()
    .refine((value) => value.trim().length > 0, "Password is required"),
});
