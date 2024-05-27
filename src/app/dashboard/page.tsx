"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Lists from "./_components/Lists";

const DashboardPage = () => {
  const session = useSession();
  const data = session.data;
  const user = data?.user;
  return (
    <section className="mt-16 mx-20">
      <div className="mb-10 sm:mb-4">
        <h1
          className="bg-clip-text dark:text-transparent mt-2 dark:bg-gradient-to-r
            dark:from-primary dark:to-secondary-foreground md:text-3xl text-4xl font-bold text-black"
        >
          Hey,{user?.username}
        </h1>
      </div>
      <div className="flex items-center justify-between gap-x-10  ">
        <h1 className="text-lg font-semibold">Ready to challenge?</h1>
        <Link href={`/create-lists/${user?.username}`}>
          <Button>Create a list</Button>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="mt-10">
          <h1
            className="bg-clip-text dark:text-transparent mt-2 dark:bg-gradient-to-r
            dark:from-primary dark:to-secondary-foreground md:text-3xl text-4xl font-bold text-black"
          >
            Your lists
          </h1>
          <Lists userId={user?._id} />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
