import { UserRoleEnum } from "@/enums/common.enum";
import { z } from "zod";
import { createCandidateFormSchema } from "./candidate.schema";
import { createRecruiterFormSchema } from "./recruiter.schema";

export const authSignInFormSchema = z.object({
  email: z
    .string()
    .refine((value) => value.trim().length > 0, "Email is required"),
  password: z
    .string()
    .refine((value) => value.trim().length > 0, "Password is required"),
});

export const signUpSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(UserRoleEnum.CANDIDATE),
    user: createCandidateFormSchema,
  }),
  z.object({
    type: z.literal(UserRoleEnum.RECRUITER),
    user: createRecruiterFormSchema,
  }),
]);

export type ISignUp = z.infer<typeof signUpSchema>;
