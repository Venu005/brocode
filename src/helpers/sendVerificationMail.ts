import VerificationEmail from "@/emails/verificationEmail";
import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationMail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Successfully sent verification email" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);

    return { success: false, message: "Failed to send verification mail" };
  }
}
