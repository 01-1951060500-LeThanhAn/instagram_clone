import ListAccount from "@/components/accounts/list-account";
import MainAccount from "@/components/accounts/main-account";
import PostList from "@/components/posts/post-list";
import { PostSkeleton } from "@/components/skeleton/Skeleton";
import React, { Suspense } from "react";

const DashBoardPage = () => {
  return (
    <>
      <main className="flex w-full flex-1 flex-grow">
        <div className="flex ml-[10%] px-3 flex-col gap-y-8 flex-1 max-w-lg mx-auto pb-20">
          <Suspense fallback={<PostSkeleton />}>
            <PostList />
          </Suspense>
        </div>
        <div className=" hidden xl:block fixed top-12  right-8 2xl:right-28 w-1/4">
          <div className=" ">
            <MainAccount title="Logout" />
          </div>

          <div className="mt-6 text-xl font-semibold">
            <p>Suggestions for you</p>

            <ListAccount />
          </div>
        </div>
      </main>
    </>
  );
};

export default DashBoardPage;
