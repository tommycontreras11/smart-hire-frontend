import { z } from "zod";

export const authSignInFormSchema = z.object({
  identification: z
    .string()
    .refine((value) => value.trim().length > 0, "Identification is required"),
  password: z
    .string()
    .refine((value) => value.trim().length > 0, "Password is required"),
});
