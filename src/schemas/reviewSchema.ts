import { z } from "zod";

// Same two limits as aiRequestSchema in the backend, with the same
// messages, so the browser catches a bad description before a request is spent.
// The API checks again anyway, since anyone can call it without this page.
export const reviewFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Describe your shoot in at least 20 characters.")
    .max(2000, "Keep the description under 2000 characters."),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;