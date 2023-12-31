"use client";
import React from "react";
import type { User } from "next-auth";
import { NextPage } from "next";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface UserProps {
  user: User;
  isActive: boolean;
}
const Avatar: NextPage<UserProps> = ({ user, isActive }) => {
  return (
    <>
      <div className="flex justify-between items-center mr-auto">
        <Image
          className="rounded-full mr-2"
          width={40}
          height={40}
          src={user?.image!}
          alt=""
        />
        <p
          className={`${cn("hidden lg:block ml-2", {
            "font-extrabold": isActive,
          })}`}
        >
          {user?.name}
        </p>
      </div>
    </>
  );
};

export default Avatar;
