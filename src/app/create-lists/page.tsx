"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { lisSchema } from "@/schemas/listSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const CreateListPage = () => {
  const { data: session } = useSession();
  const username = session?.user.username;
  const [creatingList, setIscreatingList] = useState(false);
  const { toast } = useToast();
  //form based
  const form = useForm<z.infer<typeof lisSchema>>({
    resolver: zodResolver(lisSchema),
    defaultValues: {
      listType: "link-based",
      questions: [],
    },
  });
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof lisSchema>) => {
    setIscreatingList(true);
    try {
      const result = await axios.post<ApiResponse>("/api/create-a-list", {
        ...data,
        username,
      });
      toast({
        title: "List created successfully",
        description: result.data.message,
      });
      router.replace("/dashboard");
      setIscreatingList(false);
    } catch (error) {
      setIscreatingList(false);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "Error occured while creating list",
      });
    } finally {
      setIscreatingList(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="listType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select List type</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select the list type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="link-based">Link Based</SelectItem>
                  <SelectItem value="question-based">Question Based</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="listName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>List Name</FormLabel>
              <Input
                {...field}
                type="text"
                placeholder="Enter the name of the list"
                className="input"
              />
            </FormItem>
          )}
        />
        {form.watch("listType") === "link-based" && (
          <div>
            <FormField
              control={form.control}
              name="links"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Links</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter the links"
                    className="input"
                  />
                </FormItem>
              )}
            />
          </div>
        )}

        <Button type="submit">Create list</Button>
      </form>
    </Form>
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
    //     <FormField
    //       control={form.control}
    //       name="listType"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Email</FormLabel>
    //           <Select onValueChange={field.onChange} defaultValue={field.value}>
    //             <FormControl>
    //               <SelectTrigger>
    //                 <SelectValue placeholder="Select a verified email to display" />
    //               </SelectTrigger>
    //             </FormControl>
    //             <SelectContent>
    //               <SelectItem value="m@example.com">m@example.com</SelectItem>
    //               <SelectItem value="m@google.com">m@google.com</SelectItem>
    //               <SelectItem value="m@support.com">m@support.com</SelectItem>
    //             </SelectContent>
    //           </Select>
    //         </FormItem>
    //       )}
    //     />
    //     <Button type="submit">Submit</Button>
    //   </form>
    // </Form>
  );
};

export default CreateListPage;
