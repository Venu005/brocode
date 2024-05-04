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
  shareQuestions: [string];
}

const userSchema: Schema<User> = new Schema({});

const User =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default User;
