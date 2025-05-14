import { z } from "zod";

export const positionTypeCreateFormSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
})

export const positionTypeUpdateFormSchema = positionTypeCreateFormSchema.partial();