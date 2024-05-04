import mongoose, { Schema } from "mongoose";
interface Question extends Document {
  question: string;
  hint: string;
  testCases: [string]; // may be changing this a bit
  image: string;
  solutions: [string];
  difficulty: string;
  tags: [string];
  accepted: number;
  submissions: number;
  acceptenceRate: number;
}
const questionSchema: Schema<Question> = new Schema({});

const Question =
  (mongoose.models.Question as mongoose.Model<Question>) ||
  mongoose.model<Question>("Question", questionSchema);
export default Question;
