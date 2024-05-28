import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  await dbConnect();
  //todo: converted to GET after logged in will work
  const { username } = await req.json();
  if (!username) {
    throw new Error("No username found");
  }
  try {
    const user = await User.findOne({ username });
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
    const createdLists = lists[0].createdLists;
    return Response.json(
      {
        success: true,
        message: "Lists created by user",
        lists: createdLists,
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
