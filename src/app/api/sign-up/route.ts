import { sendVerificationMail } from "@/helpers/sendVerificationMail";
import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await req.json();
    //username exists in the db
    const exisitingUsernameVerified = await User.findOne({
      username,
      isVerified: true,
    });
    if (exisitingUsernameVerified) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        { status: 400 }
      );
    }
    const existingUserByEmail = await User.findOne({ email });
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "Email already exists",
          },
          {
            status: 400,
          }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpires = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      //no user with existing email
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpires: expiryDate,
        solvedQuestions: [],
        attemptedQuestions: [],
        favouriteQuestions: [],
        addQuestions: [],
        shareQuestions: [],
      });
      await newUser.save();
    }
    //sending verification mails
    const emailResponse = await sendVerificationMail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: "Failed to send verification mail",
        },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Successfully regisatered please check  verification mail",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in sign up route", error);
    return Response.json(
      {
        success: false,
        message: "Failed to sign up",
      },
      {
        status: 500,
      }
    );
  }
}
