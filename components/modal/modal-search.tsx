"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { UserWithExtras } from "@/types/posts";
import { useEffect, useState } from "react";
import AccountItem from "../accounts/account-item";

function SearchModal({ users }: { users: UserWithExtras[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const isCreate = pathname === `/dashboard/search`;
  const [query, setQuery] = useState("");
  const [listUsers, setListUsers] = useState<UserWithExtras[]>(users);
  const [filterdUsers, setFilteredUsers] = useState<UserWithExtras[]>([]);

  useEffect(() => {
    const filtered = listUsers.filter(
      (user: UserWithExtras) =>
        user?.name?.toLowerCase().includes(query.toLowerCase()) &&
        user?.username?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [query, users]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Dialog open={isCreate} onOpenChange={(isOpen) => !isOpen && router.back()}>
      <DialogContent className="dialogContent">
        <DialogHeader className="border-b border-zinc-300 dark:border-neutral-700 py-2 w-full">
          <DialogTitle className="mx-auto font-bold text-base">
            Search post and user
          </DialogTitle>

          <form className="mx-3">
            <Input
              id="search"
              value={query}
              onChange={handleSearchChange}
              type="text"
              placeholder="Search user..."
              className="outline-none border my-3 w-full mx-auto"
            />
          </form>

          <div className="mx-3">
            {query.length === 0
              ? listUsers.map((item) => (
                  <AccountItem user={item} key={item.id} />
                ))
              : filterdUsers.map((item) => (
                  <AccountItem user={item} key={item.id} />
                ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SearchModal;
