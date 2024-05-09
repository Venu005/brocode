import { z } from "zod";

/**
   owner: User;
  questionDescription: string;
  hint: string;
  testCases: string[]; // may be changing this a bit
  image: string;
  //solutions: string[]; //? creating seperate model for solutions posted by the users
  solutions: Solution[];
  difficulty: string;
  tags: string[];
  accepted: number;
  submissions: number;
  acceptenceRate: number;
  createdAt: Date;
 */
export const questionSchema = z.object({
  owner: z.string(),
  questionDescription: z.string(),
  hint: z.string().optional(),
  testCases: z.array(z.string()),
  image: z.string().optional(),
  //solutions: z.array(solutionsSchema).optional(), //! while giving a question, I wont be giving the solution naah users should do that
  difficulty: z.string(),
  tags: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
});
