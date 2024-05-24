"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/schemas/signinSchema";
import { useToast } from "@/components/ui/use-toast";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LottieAnimation from "@/components/lottieAnimation";
import { useTheme } from "next-themes";
const SignInPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { data: session } = useSession();
  const isProfileUpdateComplete = session?.user.hasCompletedProfileSetup;
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    }
    const session = await getSession();
    if (result?.url && session?.user.hasCompletedProfileSetup) {
      router.replace("/dashboard");
    } else if (result?.url && !session?.user.hasCompletedProfileSetup) {
      router.replace(`/update-profile/${session?.user.username}`);
    }
  };

  return (
    <>
      <MaxWidthWrapper className="mt-10 flex flex-col md:flex-row">
        <div className="w-full max-w-md p-8 space-y-8 bg-stone-200 dark:bg-white rounded-lg shadow-md md:w-1/2 ml-3">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 ">
              Welcome back Bro
            </h1>
            <p className="mb-4">Sign In to continue</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Email/Username</FormLabel>
                    <Input {...field} placeholder="yourname@emaildomain" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Password</FormLabel>
                    <Input {...field} type="password" placeholder="******" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Login
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p className="">
              Not a member yet?{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="sm:px-24 -ml-6 hidden sm:block">
          <LottieAnimation url={"/sign_in.lottie"} />
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default SignInPage;
