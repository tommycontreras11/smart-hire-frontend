import { z } from "zod";

export const createEvaluationMethodFormSchema = z.object({
  name: z
    .string()
    .refine((value) => value.trim().length > 0, "Name is required"),
});

export const updateEvaluationMethodFormSchema =
  createEvaluationMethodFormSchema.partial();