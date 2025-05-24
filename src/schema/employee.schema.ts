import { z } from "zod";
import { salaryRegex } from "./job-position.schema";

export const updateEmployeeFormSchema = z.object({
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
  monthly_salary: z
    .string()
    .regex(salaryRegex, {
      message:
        "Monthly salary must have at most 10 digits in total and 2 decimal places (optional)",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Monthly salary must be greater than 0",
    }),
  entry_date: z.date().refine((value) => value, "Entry date is required"),
  departmentUUID: z.string().uuid("Department must be a valid UUID"),
  positionTypeUUID: z.string().uuid("Position type must be a valid UUID"),
});
