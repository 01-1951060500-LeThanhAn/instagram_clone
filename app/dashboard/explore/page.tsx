import PostsGrid from "@/components/posts/post-grid";
import { fetchPosts } from "@/lib/data";
import React from "react";

const ExplorePage = async () => {
  const posts = await fetchPosts();
  return (
    <>
      <div className="px-4 2xl:px-12 md:px-4 lg:px-4 ">
        <PostsGrid posts={posts} />
      </div>
    </>
  );
};

export default ExplorePage;
