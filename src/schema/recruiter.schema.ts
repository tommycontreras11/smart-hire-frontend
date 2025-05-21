import { z } from "zod";

export const recruiterCreateFormSchema = z.object({
  identification: z
    .string()
    .refine((value) => value.trim().length > 0, "Identification is required"),
  email: z
    .string()
    .email("Invalid email")
    .refine((value) => value.trim().length > 0, "Email is required"),
  name: z
    .string()
    .refine((value) => value.trim().length > 0, "Name is required"),
  password: z
    .string()
    .refine((value) => value.trim().length > 0, "Password is required"),
  institution: z
    .string()
    .refine((value) => value.trim().length > 0, "Institution is required"),
});

export const recruiterUpdateFormSchema = recruiterCreateFormSchema.partial();
