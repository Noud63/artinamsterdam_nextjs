"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full items-center max-w-[400px] flex flex-col mt-16 min-h-screen text-white px-4">
      <h1 className="w-full text-xl font-bold mb-4 border-b-2 border-dotted pb-2">
        {" "}
        {session?.user?.role?.charAt(0)?.toUpperCase() +
          session?.user?.role?.slice(1)}{" "}
        Profile
      </h1>
      <div className="w-full flex flex-col gap-2 border-b-2 border-dotted pb-5">
        <div className="flex">
          <span className="font-bold w-[100px] flex">Name:</span>{" "}
          {session?.user?.name}
        </div>
        <div className="flex">
          <span className="font-bold w-[100px] flex">Username:</span>{" "}
          {session?.user?.username}
        </div>
        <div className="flex">
          <span className="font-bold w-[100px] flex">Email:</span>{" "}
          {session?.user?.email}
        </div>
        <div className="flex">
          <span className="font-bold w-[100px] flex">Avatar:</span>{" "}
          {session?.user?.avatar ? session?.user?.avatar : "No avatar"}
        </div>
      </div>

     <div className="backButton mt-8">
        <Link href="/">Back</Link>
      </div>
    </div>
  );
};

export default Profile;
