// this route by name goes to update profile but all it does is uploading profile photo

import { fileUpload } from "@/helpers/cloudinary";
import User from "@/models/user";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request) {
  try {
    const server = await getServerSession();
    const userId = server?.user._id;
    const user = await User.findById(userId);
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
    let profileImagePath;
    if (
      req.files &&
      Array.isArray(req.files.profileImage) &&
      req.files.profileImage.length > 0
    ) {
      profileImagePath = await req.files.profileImage[0].path;
    }
    const profileImage = await fileUpload(profileImagePath);
    if (!profileImage) {
      return Response.json(
        {
          success: false,
          message: "An error occurred while uploading profile image",
        },
        {
          status: 500,
        }
      );
    }
    user.profileImage = profileImage.secure_url;
    user.hasCompletedProfileSetup = true; //if not updated will redirect to updating or to dashboard
    await user.save();
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "An error occurred while updating profile",
      },
      {
        status: 500,
      }
    );
  }
}
