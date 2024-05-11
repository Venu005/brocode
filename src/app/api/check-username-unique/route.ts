import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import { usernameValidation } from "@/schemas/signupSchema";
import { z } from "zod";

const UsernameQuery = z.object({
  username: usernameValidation,
});

export async function GET(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const queryParam = { username: searchParams.get("username") };
    const result = UsernameQuery.safeParse(queryParam);
    const userEr = result.error?.format().username?._errors || [];
    if (!result.success) {
      return Response.json(
        {
          success: false,
          mesage: userEr,
        },
        {
          status: 400,
        }
      );
    }
    const { username } = result.data;
    const existingUser = await User.findOne({ username, isVerified: true });
    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error checking the username uniqueness", error);

    return Response.json(
      {
        success: false,
        message: "Error in checking the username uniqueness",
      },
      {
        status: 500,
      }
    );
  }
}
