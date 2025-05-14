import {
  JobPositionContractTypeEnum,
  JobPositionRiskLevelEnum,
} from "@/enums/job-position.enum";
import { z } from "zod";

const salaryRegex = /^\d{1,8}(\.\d{0,2})?$/;

export const jobPositionCreateFormSchema = z.object({
  name: z
    .string()
    .refine((value) => value.trim().length > 0, "Name is required"),
  description: z
    .string()
    .refine((value) => value.trim().length > 0, "Description is required"),
  minimum_salary: z
    .string()
    .regex(salaryRegex, {
      message:
        "Minimum salary must have at most 10 digits in total and 2 decimal places (optional)",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Minimum salary must be greater than 0",
    }),
  maximum_salary: z
    .string()
    .regex(salaryRegex, {
      message:
        "Maximum salary must have at most 10 digits in total and 2 decimal places (optional)",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Maximum salary must be greater than 0",
    }),
  risk_level: z.enum(
    Object.values(JobPositionRiskLevelEnum) as [string, ...string[]],
    {
      required_error: "Risk level is required",
    }
  ),
  contract_type: z.enum(
    Object.values(JobPositionContractTypeEnum) as [string, ...string[]],
    {
      required_error: "Contract type is required",
    }
  ),
  countryUUID: z.string().uuid("Country must be a valid UUID"),
  languageUUID: z.string().uuid("Language must be a valid UUID"),
  recruiterUUID: z.string().uuid("Recruiter must be a valid UUID"),
});

export const jobPositionUpdateFormSchema = jobPositionCreateFormSchema.partial();