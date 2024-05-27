"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { List } from "@/models/list";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";

const Lists = ({ userId }: { userId: any }) => {
  const [isfetchingLists, setFetchingLists] = useState(false);
  const [isfetchingMessage, setFetchMessage] = useState("");
  const [lists, setLists] = useState<List[]>([]);

  const { toast } = useToast();
  useEffect(() => {
    const getAllLists = async (refresh: boolean = false) => {
      setFetchingLists(true);
      setFetchMessage("");
      try {
        const response = await axios.get<ApiResponse>("/api/get-all-lists");
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
    getAllLists();
  }, [setFetchingLists, toast, setLists]);
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {lists.length > 0 ? (
        lists.map((list, index) => (
          <Card key={list.listName}>
            <CardHeader>
              <CardTitle>{list.listName}</CardTitle>
              <CardDescription>{list.listType}</CardDescription>
              <CardFooter className="flex items-center justify-between">
                <p>{list.createdAt.toLocaleDateString()}</p>
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
