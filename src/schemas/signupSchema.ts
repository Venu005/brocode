import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, { message: "Username should be atleast 3 characters long" })
  .max(10, { message: "Username can be atmost 10 characters long" })
  .regex(/^[a-zA-Z0-9_]*$/, {
    message: "Username can only contain letters, numbers, and underscores",
  });

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
