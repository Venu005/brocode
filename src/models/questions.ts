import mongoose, { Schema } from "mongoose";
import User from "./user";
import { Solution } from "./solutions";
import { List } from "postcss/lib/list";
interface Question extends Document {
  owner: User;
  listName: List;
  questionDescription: string;
  hint: string;
  testCases: string[]; // may be changing this a bit
  image: string;
  //solutions: string[]; //? creating seperate model for solutions posted by the users
  solutions: Solution[];
  difficulty: string;
  tags: string[];
  accepted: number;
  submissions: number;
  acceptenceRate: number;
  createdAt: Date;
}
const questionSchema: Schema<Question> = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
    questionDescription: {
      type: String,
      required: true,
    },
    hint: {
      type: String,
    },
    testCases: [
      {
        type: String,
        required: true,
      },
    ],
    image: [
      {
        type: String, //cloudinary url
      },
    ],
    solutions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Solution",
      },
    ],
    difficulty: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    accepted: {
      type: Number,
    },
    submissions: {
      type: Number,
    },
    acceptenceRate: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Question =
  (mongoose.models.Question as mongoose.Model<Question>) ||
  mongoose.model<Question>("Question", questionSchema);
export default Question;
