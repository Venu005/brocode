"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useToast } from "@/components/ui/use-toast";
import { List } from "@/models/list";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";

const Lists = ({ username }: { username: any }) => {
  const [isfetchingLists, setFetchingLists] = useState(false);
  const [isfetchingMessage, setFetchMessage] = useState("");
  const [lists, setLists] = useState<List[]>([]);

  const { toast } = useToast();
  const getAllLists = async (refresh: boolean = false) => {
    setFetchingLists(true);
    setFetchMessage("");
    try {
      const response = await axios.post<ApiResponse>("/api/get-all-lists", {
        username,
      });
      const data = await response.data;
      setFetchMessage(response.data.message);
      setLists(data.lists || []);
      if (refresh) {
        toast({
          title: "Your latest lists",
          description: "Lists have been refreshed",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      setFetchMessage(
        axiosError.response?.data.message ??
          "An error occurred while fetching lists"
      );
    } finally {
      setFetchingLists(false);
    }
  };
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
      <div className="text-center sm:grid sm:grid-cols-1">
        <Button onClick={() => getAllLists()} className="max-w-[80px] ">
          Get All lists
        </Button>
      </div>
      {lists.length > 0 ? (
        lists.map((list, index) => (
          <Card key={list.listName}>
            <CardHeader>
              <CardTitle>{list.listName}</CardTitle>
              <CardDescription>{list.listType}</CardDescription>
              <CardFooter className="flex items-center justify-between">
                {/* <p>{list.createdAt.toLocaleDateString()}</p> */}
                Created by {username}
              </CardFooter>
            </CardHeader>
          </Card>
        ))
      ) : (
        <p>Create your first list</p>
      )}
    </div>
  );
};

export default Lists;
