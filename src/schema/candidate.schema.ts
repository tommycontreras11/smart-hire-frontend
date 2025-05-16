import { z } from "zod";
import { salaryRegex } from "./job-position.schema";

export const candidateCreateFormSchema = z.object({
  identification: z
    .string()
    .refine((value) => value.trim().length > 0, "Identification is required"),
  name: z
    .string()
    .refine((value) => value.trim().length > 0, "Name is required"),
  password: z
    .string()
    .refine((value) => value.trim().length > 0, "Password is required"),
  desired_salary: z
    .string()
    .regex(salaryRegex, {
      message:
        "Desired salary must have at most 10 digits in total and 2 decimal places (optional)",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Desired salary must be greater than 0",
    }),
  positionUUID: z.string().uuid("Desired position must be a valid UUID"),
  departmentUUID: z.string().uuid("Department must be a valid UUID"),
});

export const candidateUpdateFormSchema = candidateCreateFormSchema.partial();
