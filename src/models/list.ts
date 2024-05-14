import mongoose, { Schema } from "mongoose";
import Question from "./questions";
import User from "./user";
interface List {
  listType: "question-based" | "link-based";
  owner: User;
  questions: Question[]; //array of questions
  links: string[];
  createdAt: Date;
  updatedAt: Date;
}
const listSchema: Schema<List> = new Schema(
  {
    listType: {
      type: String,
      enum: ["question-based", "link-based"],
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
    ],
    links: [
      {
        type: String,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const List =
  (mongoose.models.List as mongoose.Model<List>) ||
  mongoose.model("List", listSchema);
