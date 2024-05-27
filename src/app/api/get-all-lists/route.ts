import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";

export async function GET(req: Request) {
  await dbConnect();
  //todo: converted to GET after logged in will work
  const session = await getServerSession();
  const userId = session?.user?._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }
    const lists = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(user._id),
        },
      },
      {
        $lookup: {
          from: "lists",
          localField: "createdLists",
          foreignField: "_id",
          as: "createdLists",
        },
      },
      {
        $project: {
          createdLists: 1,
        },
      },
    ]);
    return Response.json(
      {
        success: true,
        message: "Lists created by user",
        lists,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Unable to fetch lists created by user",
      },
      { status: 500 }
    );
  }
}
