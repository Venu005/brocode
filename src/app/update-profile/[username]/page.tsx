"use client";
import { useToast } from "@/components/ui/use-toast";
import { updateProfileSchema } from "@/schemas/updateProfile";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
const UpdatePage = () => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      profileImage: user?.profileImage ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    setIsUpdating(true);
    try {
      const result = await axios.post("/api/update-profile", {
        ...data,
        username,
      });
      toast({
        title: "Success",
        description: result.data.message,
      });
      router.replace("/dashboard");
      setIsUpdating(false);
    } catch (error) {
      setIsUpdating(false);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "An error occurred while updating profile",
      });
    }
  };
  const handleUpload = (result: any) => {
    const url = result?.info?.secure_url;
    form.setValue("profileImage", url);
    setImageUrl(url);
    console.log(url);
    console.log("getting called");
  };

  function CameraIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="ftxtvzzh"
          >
            <CameraIcon className="h-6 w-6" />
          </CldUploadButton>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="profileImage"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <div className="relative">
                      <img
                        alt="Avatar"
                        className="rounded-full w-32 h-32 object-cover"
                        height={128}
                        src={user?.profileImage || "/placeholder.svg"}
                        style={{
                          aspectRatio: "128/128",
                          objectFit: "cover",
                        }}
                        width={128}
                      />
                      <label
                        className="absolute bottom-0 right-0 bg-gray-900 text-white rounded-full p-2 cursor-pointer"
                        htmlFor="avatar"
                      >
                        <input
                          accept="image/*"
                          className="hidden"
                          id="avatar"
                          type="file"
                        />
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update</Button>
            </form>
          </Form>
          {/* <div className="relative">
            <img
              alt="Avatar"
              className="rounded-full w-32 h-32 object-cover"
              height={128}
              src="/placeholder.svg"
              style={{
                aspectRatio: "128/128",
                objectFit: "cover",
              }}
              width={128}
            />
            <label
              className="absolute bottom-0 right-0 bg-gray-900 text-white rounded-full p-2 cursor-pointer"
              htmlFor="avatar"
            >
              <CameraIcon className="h-6 w-6" />
              <input
                accept="image/*"
                className="hidden"
                id="avatar"
                type="file"
              />
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
