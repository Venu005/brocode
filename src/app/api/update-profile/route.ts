// this route by name goes to update profile but all it does is uploading profile photo
//! major fixes

import { fileUpload } from "@/helpers/cloudinary";
import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const { username, profileImage } = body;
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
    user.profileImage = profileImage;
    user.hasCompletedProfileSetup = true;
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Profile updated successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error", error);
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
