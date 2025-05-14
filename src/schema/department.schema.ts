import { z } from "zod";

export const departmentCreateFormSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
})

export const departmentUpdateFormSchema = departmentCreateFormSchema.partial();