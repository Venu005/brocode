import mongoose, { Schema } from "mongoose";
import Question from "./questions";
import { List } from "./list";

//creeating User as interface for exporrtingl later

interface User extends Document {
  username: string;
  email: string;
  password: string;
  profileImage: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpires: Date;
  hasCompletedProfileSetup: boolean;
  forgotPasswordCode: string;
  forgotPasswordCodeExpires: Date;
  createdLists: List[];
  solvedQuestions: Question[];
  attemptedQuestions: Question[];
  favouriteQuestions: Question[];
  addQuestions: Question[];
  shareQuestions: string[]; //* share question links
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /[\x00-\x7F]+@[\x00-\x7F]+\.(com|in|org)/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  profileImage: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCode: String,
  verifyCodeExpires: Date,
  hasCompletedProfileSetup: {
    type: Boolean,
    default: false,
  },
  forgotPasswordCode: String,
  forgotPasswordCodeExpires: Date,
  createdLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
  solvedQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  attemptedQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  favouriteQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  addQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  shareQuestions: [String],
});

const User =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default User;
