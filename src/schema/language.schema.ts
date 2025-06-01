import { z } from "zod";

export const createLanguageFormSchema = z.object({
  name: z
    .string()
    .refine((value) => value.trim().length > 0, "Name is required"),
});

export const updateLanguageFormSchema = createLanguageFormSchema.partial();