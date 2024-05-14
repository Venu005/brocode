import { z } from "zod";
import { questionSchema } from "./questionSchema";

export const lisSchema = z.object({
  listType: z.string(),
  questions: z.array(questionSchema || z.string()),
  owner: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
