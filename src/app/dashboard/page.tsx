"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const DashboardPage = () => {
  const session = useSession();
  const data = session.data;
  const user = data?.user;
  console.log(user?.profileImage);

  return (
    <div>
      Welcome
      <Image
        src={user?.profileImage ?? "./placeholder.svg"}
        width={100}
        height={100}
        alt="profile Image"
      />
    </div>
  );
};

export default DashboardPage;
