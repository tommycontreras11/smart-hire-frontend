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

export const updateCandidateProfileFormSchema = z.object({
  personal: z
    .object({
      identification: z.string().optional(),
      email: z.string().email("Invalid email").optional(),
      name: z.string().optional(),
      password: z.string().optional(),
      phone: z.string().optional(),
      location: z.string().optional(),
      bio: z.string().optional(),
      desired_salary: z
        .string()
        .regex(salaryRegex, {
          message:
            "Desired salary must have at most 10 digits in total and 2 decimal places (optional)",
        })
        .optional(),
      social_links: z
        .array(
          z.object({
            key: z.nativeEnum(PlatformTypeEnum),
            value: z.string().url(),
          })
        )
        .optional(),
    })
    .optional(), 

  professional: z
    .object({
      
      education: z
        .object({
          uuid: z.string().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
          grade: z
            .string()
            .optional()
            .refine((val) => val === undefined || !isNaN(Number(val)), {
              message: "Grade must be a valid number",
            })
            .refine(
              (val) => {
                if (val === undefined) return true;
                const num = Number(val);
                return num >= 0;
              },
              { message: "Grade must be at least 0" }
            )
            .refine(
              (val) => {
                if (val === undefined) return true;
                const num = Number(val);
                return num <= 100;
              },
              { message: "Grade must be at most 100" }
            )
            .refine(
              (val) => {
                if (val === undefined) return true;
                const num = Number(val);
                return Number.isInteger(num * 100);
              },
              { message: "Grade must have at most 2 decimal places" }
            ),
          start_date: z.date().optional(),
          end_date: z.date().optional(),
          institutionUUID: z.string().uuid("Institution must be a valid UUID"),
          academicDisciplineUUID: z
            .string()
            .uuid("Academic discipline must be a valid UUID")
            .optional(),
        })
        .optional(),

      certification: z
        .object({
          uuid: z.string().optional(),
          name: z
            .string()
            .refine((val) => val.trim().length > 0, "Name is required"),
          description: z.string().optional(),
          expedition_date: z.date().optional(),
          expiration_date: z.date().optional(),
          credential_id: z.string().optional(),
          credential_link: z.string().optional(),
          institutionUUID: z.string().uuid("Institution must be a valid UUID"),
          competencyUUIDs: z
            .array(z.string().uuid("Competency must be a valid UUID"))
            .optional(),
        })
        .optional(),

      competencyUUIDs: z.array(z.string().uuid()).optional(),
    })
    .optional(), 
});

