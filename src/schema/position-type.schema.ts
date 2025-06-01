import { z } from "zod";

export const createPositionTypeFormSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
})

export const updatePositionTypeFormSchema = createPositionTypeFormSchema.partial();