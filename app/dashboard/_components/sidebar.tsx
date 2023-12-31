import React from "react";
import Logo from "./logo";
import ListNavLinks from "./list-navlink";
import MoredropDown from "./more-dropdown";
import { auth } from "@/auth/options";
import Profile from "./profile";

const Sidebar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <div
          className="boder-t flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex
         flex-row md:justify-between space-x-2 md:flex-col
          md:space-x-0 -ml-3 justify-evenly fixed
           z-50 md:ml-0 bg-white dark:bg-neutral-950"
        >
          <Logo />
          <ListNavLinks />

          {user && <Profile user={user} />}

          <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
            <MoredropDown />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
