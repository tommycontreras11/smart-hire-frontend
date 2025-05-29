import { z } from "zod";

export const createRequestFormSchema = z.object({
  file: z.instanceof(File, { message: "Curriculum is required" }),
});

export const updateRequestFormSchema = createRequestFormSchema
  .partial()
  .extend({
    next_step: z.string(),
    interview_date: z.date(),
  });
