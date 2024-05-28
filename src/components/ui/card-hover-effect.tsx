"use client";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { Button } from "./button";
import { ApiResponse } from "@/types/ApiResponse";
import { List } from "@/models/list";
import { useToast } from "./use-toast";
import axios, { AxiosError } from "axios";
export const HoverEffect = ({ username }: { username: any }) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    <>
      <div className="text-center sm:grid sm:grid-cols-1">
        <Button onClick={() => getAllLists()} className="max-w-[80px] mt-10">
          Get All lists
        </Button>
      </div>
      <div
        className={cn("grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10")}
      >
        {lists.map((item, idx) => (
          <Link
            href={"#"}
            key={item?.listName}
            className="relative group  block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <CardTitle>{item.listName}</CardTitle>
              <CardDescription>{item.listType}</CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};
export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 border-slate-400",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-black dark:text-white font-bold tracking-wide mt-4",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-black dark:text-white tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
