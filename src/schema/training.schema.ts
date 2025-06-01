import { TrainingLevelEnum } from "@/enums/training.enum";
import { z } from "zod";

export const createTrainingFormSchema = z.object({
  name: z
    .string()
    .refine((value) => value.trim().length > 0, "Name is required"),
  description: z
    .string()
    .refine((value) => value.trim().length > 0, "Description is required"),
  level: z.enum(Object.values(TrainingLevelEnum) as [string, ...string[]], {
    required_error: "Level is required",
  }),
  date_from: z
    .date()
    .refine(
      (value) => value >= new Date(),
      "Date must be equal or greater than today"
    ),
  date_to: z
    .date()
    .refine(
      (value) => value >= new Date(),
      "Date must be equal or greater than today"
    ),
  institutionUUID: z.string().uuid("Institution must be a valid UUID"),
});

export const updateTrainingFormSchema = createTrainingFormSchema.partial();