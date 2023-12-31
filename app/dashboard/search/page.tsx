"use client";
import SearchModal from "@/components/modal/modal-search";

import { usePathname } from "next/navigation";
import React from "react";

const SearchPage = () => {
  const pathname = usePathname();
  const isCreate = pathname === `/dashboard/search`;
  return <SearchModal open={isCreate} />;
};

export default SearchPage;
