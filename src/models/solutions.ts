import mongoose, { Schema } from "mongoose";
import User from "./user";

export interface Solution extends Document {
  owner: User;
  content: string; // might change later
  likes: number;
  dislikes: number;
  createdAt: Date;
}
export const solutionSchema: Schema<Solution> = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
    likes: {
      type: Number,
    },
    dislikes: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Solution =
  (mongoose.models.Solution as mongoose.Model<Solution>) ||
  mongoose.model("Solution", solutionSchema);
