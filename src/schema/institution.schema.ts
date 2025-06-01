import { z } from "zod";

export const createInstitutionFormSchema = z.object({
  name: z
    .string()
    .refine((value) => value.trim().toString().length > 0, "Name is required"),
});

export const updateInstitutionFormSchema =
  createInstitutionFormSchema.partial();