// src/schemas/shootSchema.ts -- a NEW file
// One schema. The rules live here, and the TypeScript type is DERIVED
// from it -- so a rule and its type can never drift apart.
import { z } from "zod";

export const shootSchema = z.object({
  // .min(1) is what "required" means for a string: not empty.
  type: z.string().min(1, "Shoot type is required."),
  location: z.string().min(1, "Location is required."),

  // Required as a string first (that's what a date <input> gives you),
  // then .refine() adds a rule Zod does not ship: yours, as a function.
  scheduledDate: z
    .string()
    .min(1, "Pick a date.")
    .refine((date) => new Date(date) >= new Date(new Date().toDateString()),
      "Shoot date can't be in the past."),
});

// z.infer reads the schema and hands back the TypeScript type.
// Written by hand, that type would be a second thing to keep in sync.
export type ShootFormValues = z.infer<typeof shootSchema>;