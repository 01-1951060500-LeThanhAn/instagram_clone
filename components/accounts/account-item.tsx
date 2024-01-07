"use client";
import { UserWithExtras } from "@/types/posts";
import { NextPage } from "next";
import React from "react";
import MainAccount from "./main-account";
import { useSession } from "next-auth/react";
interface AccountItemProps {
  user: UserWithExtras;
}

const AccountItem: NextPage<AccountItemProps> = ({ user }) => {
  const { data: session } = useSession();
  return (
    <>
      {session?.user.id !== user.id && (
        <div>
          <MainAccount
            title="Follow"
            image={user.image!}
            id={user.id}
            username={user.username!}
            name={user.name!}
            className="mt-4"
          />
        </div>
      )}
    </>
  );
};

export default AccountItem;
