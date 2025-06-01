import { z } from "zod";

export const createCategoryFormSchema = z.object({
    name: z.string().refine((value) => value.trim().toString().length > 0, "Name is required"),
})

export const updateCategoryFormSchema = createCategoryFormSchema.partial();