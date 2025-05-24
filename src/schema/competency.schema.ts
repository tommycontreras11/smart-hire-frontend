import { LevelCompetencyEnum } from "@/enums/competency.enum";
import { z } from "zod";

export const createCompetencyFormSchema = z.object({
  name: z
    .string()
    .refine((value) => value.trim().length > 0, "Name is required"),
  categoryUUID: z.string().uuid("Category must be a valid UUID"),
  level: z.enum(Object.values(LevelCompetencyEnum) as [string, ...string[]], {
    required_error: "Level is required",
  }),
  evaluationMethodUUIDs: z
    .array(z.string().uuid("Evaluation method must be a valid UUID"))
    .min(1, "At least one evaluation method is required"),
  positionTypeUUIDs: z
    .array(z.string().uuid("Position type must be a valid UUID"))
    .min(1, "At least one position type is required"),
});

export const updateCompetencyFormSchema = createCompetencyFormSchema.partial();
