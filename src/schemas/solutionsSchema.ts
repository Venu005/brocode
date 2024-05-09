import { z } from "zod";
export const solutionsSchema = z.object({
  owner: z.string(),
  content: z.string(),
  createdAt: z.string().date().optional(),
});
