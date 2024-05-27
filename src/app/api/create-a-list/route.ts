import { dbConnect } from "@/lib/db";
import { List } from "@/models/list";
import Question from "@/models/questions";
import User from "@/models/user";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, listType, listName, questions = [] } = await req.json();
    if (!listName) {
      throw new Error("list name can't be empty");
    }
    if (!listType) {
      throw new Error("List should have a type");
    }

    const user = await User.findOne({ username });
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
    const questionIds = [];
    const links = [];
    if (listType === "question-based") {
      for (const questionData of questions) {
        const question = await Question.create(questionData);
        questionIds.push(question._id);
      }
    } else if (listType === "link-based") {
      //questionIdsOrLinks = questions; // * error due to strings in place of object ids so adding new field in schema
      links.push(...questions);
    } else {
      throw new Error("Invalid list type");
    }

    const list = await List.create({
      listName,
      listType,
      owner: user._id,
      questions: questionIds,
      links,
    });
    user.createdLists.push(list);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Successfully created a list of questions",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "An error occurred while creating a list ",
      },
      {
        status: 500,
      }
    );
  }
}
