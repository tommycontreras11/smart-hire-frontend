import { z } from "zod";

export const createDepartmentFormSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
})

export const updateDepartmentFormSchema = createDepartmentFormSchema.partial();