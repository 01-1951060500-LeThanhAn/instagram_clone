import PostList from "@/components/posts/post-list";
import { PostSkeleton } from "@/components/skeleton/Skeleton";
import React, { Suspense } from "react";

const DashBoardPage = () => {
  return (
    <>
      <main className="flex w-full flex-grow">
        <div className="flex px-3 flex-col gap-y-8 flex-1 max-w-lg mx-auto pb-20">
          <Suspense fallback={<PostSkeleton />}>
            <PostList />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default DashBoardPage;
