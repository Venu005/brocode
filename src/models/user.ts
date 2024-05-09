import mongoose, { Schema } from "mongoose";
import Question from "./questions";

//creeating User as interface for exporrtingl later

interface User extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpires: Date;
  forgotPasswordCode: string;
  forgotPasswordCodeExpires: Date;
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
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCode: String,
  verifyCodeExpires: Date,
  forgotPasswordCode: String,
  forgotPasswordCodeExpires: Date,
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
