import { z } from "zod";
import { questionSchema } from "./questionSchema";

export const lisSchema = z.object({
  listType: z.string(),
  listName: z.string(),
  links: z.string().optional(),
  questions: z.array(questionSchema).optional(),
  owner: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
