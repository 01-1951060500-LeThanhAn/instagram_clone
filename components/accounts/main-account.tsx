"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { NextPage } from "next";
import Link from "next/link";

interface AccountProps {
  title?: string;
  onClick?: () => void;
  image?: string;
  username?: string;
  name?: string;
  className?: string;
  id?: string;
}

const MainAccount: NextPage<AccountProps> = ({
  title,
  onClick,
  image,
  username,
  name,
  id,
  className,
}) => {
  const { data: session } = useSession();

  return (
    <>
      <div className={`flex justify-between items-center ${className}`}>
        <div className="flex items-center">
          <Link
            href={
              session?.user.id === id
                ? `/dashboard/${session?.user.id}`
                : `/dashboard/${id}`
            }
          >
            <Image
              src={
                session?.user.image === image
                  ? (session?.user.image as string)
                  : (image as string)
              }
              className="w-12 h-12 rounded-full object-cover"
              alt=""
              width={40}
              height={40}
            />
          </Link>
          <div className="flex flex-col ml-3">
            <span className="text-neutral-500 text-sm">
              {session?.user.username === username
                ? session?.user.username
                : username}
            </span>
            <p className="font-semibold text-base">
              {session?.user.name === name ? session?.user.name : name}
            </p>
          </div>
        </div>

        <Button variant={"ghost"} className="bg-neutral-800">
          {title}
        </Button>
      </div>
    </>
  );
};

export default MainAccount;
