import { z } from "zod";
import { salaryRegex } from "./job-position.schema";
import { PlatformTypeEnum } from "@/enums/social-link.enum";

export const createCandidateFormSchema = z.object({
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

export const updateCandidateFormSchema = createCandidateFormSchema.partial();

export const updateCandidateProfileFormSchema = createCandidateFormSchema
  .partial()
  .omit({ positionUUID: true, departmentUUID: true })
  .extend({
    phone: z.string().optional(),
    location: z.string().optional(),
    bio: z.string().optional(),
    social_links: z
      .array(
        z.object({
          key: z.nativeEnum(PlatformTypeEnum),
          value: z.string().url(),
        })
      )
      .optional(),
    competencyUUIDs: z
      .array(z.string().uuid("Competency must be a valid UUID"))
      .optional(),
  });
