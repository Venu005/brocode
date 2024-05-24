import { z } from "zod";

export const updateProfileSchema = z.object({
  profileImage: z.string().optional(),
});
//* as of now only profileImage later other social links too
