import { z } from "zod";

export const createCountryFormSchema = z.object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
})

export const updateCountryFormSchema = createCountryFormSchema.partial();