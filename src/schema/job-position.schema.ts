import { JobPositionContractTypeEnum } from "@/enums/job-position.enum";
import { z } from "zod";

export const salaryRegex = /^\d{1,10}(\.\d{0,2})?$/;

export const baseJobPositionSchema = z
  .object({
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

    contract_type: z.enum(
      Object.values(JobPositionContractTypeEnum) as [string, ...string[]],
      {
        required_error: "Contract type is required",
      }
    ),
    due_date: z.date().refine((date) => date > new Date(), {
      message: "Due date must be in the future",
    }),
    countryUUID: z.string().uuid("Country must be a valid UUID"),
    languageUUID: z.string().uuid("Language must be a valid UUID"),
    departmentUUID: z.string().uuid("Department must be a valid UUID"),
    positionTypeUUID: z.string().uuid("Position type must be a valid UUID"),
    competencyUUIDs: z
      .array(z.string().uuid("Competency must be a valid UUID"))
      .min(1, "At least one competency is required"),
  });

export const createJobPositionFormSchema = baseJobPositionSchema
  .refine(
    (data) => parseFloat(data.minimum_salary) < parseFloat(data.maximum_salary),
    {
      message: "Minimum salary must be less than maximum salary",
      path: ["minimum_salary"],
    }
  )
  .refine(
    (data) => parseFloat(data.maximum_salary) > parseFloat(data.minimum_salary),
    {
      message: "Maximum salary must be greater than minimum salary",
      path: ["maximum_salary"],
    }
  );

export const updateJobPositionFormSchema = baseJobPositionSchema
  .partial()
  .refine(
    (data) => {
      if (data.minimum_salary && data.maximum_salary) {
        const min = parseFloat(data.minimum_salary);
        const max = parseFloat(data.maximum_salary);
        return !isNaN(min) && !isNaN(max) && min < max;
      }
      return true;
    },
    {
      message: "Minimum salary must be less than maximum salary",
      path: ["minimum_salary"],
    }
  )
  .refine(
    (data) => {
      if (data.minimum_salary && data.maximum_salary) {
        const min = parseFloat(data.minimum_salary);
        const max = parseFloat(data.maximum_salary);
        return !isNaN(min) && !isNaN(max) && max > min;
      }
      return true;
    },
    {
      message: "Maximum salary must be greater than minimum salary",
      path: ["maximum_salary"],
    }
  );
