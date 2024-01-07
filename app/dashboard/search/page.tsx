import SearchModal from "@/components/modal/modal-search";
import { fetchAllUser } from "@/lib/data";

import React from "react";

const SearchPage = async () => {
  const users = await fetchAllUser();

  return <SearchModal users={users} />;
};

export default SearchPage;
