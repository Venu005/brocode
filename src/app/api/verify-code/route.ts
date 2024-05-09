import { dbConnect } from "@/lib/db";
import User from "@/models/user";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, code } = await req.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await User.findOne({ username: decodedUsername });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    const codeMatch = user.verifyCode === code;
    const codeExpiryDate = new Date(user.verifyCodeExpires) > new Date();
    if (codeMatch && codeExpiryDate) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "User verified successfully",
        },
        {
          status: 200,
        }
      );
    } else if (!codeExpiryDate) {
      return Response.json(
        {
          success: false,
          message: "Code expired",
        },
        {
          status: 400,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Invalid code, please enter correct code to verify user",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "An error occurred while verifying user",
      },
      {
        status: 500,
      }
    );
  }
}
