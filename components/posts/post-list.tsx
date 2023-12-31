import { fetchPosts } from "@/lib/data";
import React from "react";
import PostItem from "./post-item";

const PostList = async () => {
  const posts = await fetchPosts();

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post as any} />
      ))}
    </>
  );
};

export default PostList;
