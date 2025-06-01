import { z } from "zod";

export const createRequestFormSchema = z.object({
  file: z.instanceof(File, { message: "Curriculum is required" }),
});

export const updateRequestFormSchema = createRequestFormSchema
  .partial()
  .extend({
    nextStep: z.string(),
    interviewDate: z.date(),
    link: z.string(),
  }).partial();
