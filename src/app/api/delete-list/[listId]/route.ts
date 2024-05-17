import { dbConnect } from "@/lib/db";
import { List } from "@/models/list";
import User from "@/models/user";
import { getServerSession } from "next-auth/next";
//!we sure are handling the cse when delted deleting from list model but questions are not being deleted bug to fix
export async function DELETE(
  req: Request,
  { params }: { params: { listId: string } }
) {
  const listId = params.listId;
  await dbConnect();
  try {
    const session = await getServerSession();
    const userID = session?.user._id;
    const { listName } = await req.json();
    if (!userID || !session) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }
    if (!listName) {
      throw new Error("No listname found");
    }
    // get user
    //get the list id to be deleted
    // delete the list
    const user = await User.findById(userID);
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }
    //const listdId = user.createdLists.filter((list) => listId === list._id);
    const listdId = await User.updateOne(
      { _id: user._id },
      {
        $pull: {
          createdLists: {
            _id: listId,
          },
        },
      }
    );
    if (!listdId) {
      return Response.json(
        {
          success: false,
          message: "List not found or already deleted",
        },
        { status: 400 }
      );
    }
    //after deletng from the users created list, deleting it from the List model too
    const deletingList = await List.findByIdAndDelete(listdId);
    if (!deletingList) {
      return Response.json(
        {
          success: false,
          message: "List not found",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "List deleted",
      },
      { status: 200 }
    );
  } catch (error) {}
}
