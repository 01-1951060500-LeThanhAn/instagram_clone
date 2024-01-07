import { fetchAllUser } from "@/lib/data";
import React from "react";
import AccountItem from "./account-item";

const ListAccount = async () => {
  const users = await fetchAllUser();

  return (
    <>
      <div>
        {users.map((user) => (
          <AccountItem key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};

export default ListAccount;
