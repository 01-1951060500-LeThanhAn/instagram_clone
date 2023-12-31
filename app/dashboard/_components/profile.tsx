"use client";
import { buttonVariants } from "@/components/ui/button";
import type { User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Avatar from "./avatar";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Profile = ({ user }: { user: User }) => {
  const pathname = usePathname();
  const href = `/dashboard/${user.id}`;
  const isActive = href === pathname;
  return (
    <>
      <Link
        href={href}
        className={buttonVariants({
          variant: isActive ? "secondary" : "ghost",
          className: "navLink",
          size: "lg",
        })}
      >
        <div className="flex justify-between items-center mr-auto">
          <Image
            className="w-10 h-10 object-cover rounded-full"
            width={30}
            height={30}
            src={user.image!}
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
      </Link>
    </>
  );
};

export default Profile;
