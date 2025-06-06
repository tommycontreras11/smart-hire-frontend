import { z } from "zod";

export const createPositionTypeFormSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
    departmentUUID: z.string().uuid("Department must be a valid UUID"),
})

export const updatePositionTypeFormSchema = createPositionTypeFormSchema.partial();