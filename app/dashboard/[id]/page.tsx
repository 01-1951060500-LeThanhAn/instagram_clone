import PostsGrid from "@/components/posts/post-grid";
import { fetchPostById, fetchPostByUsername } from "@/lib/data";
import { NextPage } from "next";
import React from "react";
interface Props {
  params: {
    id: string;
  };
}
const ProfilePage: NextPage<Props> = async ({ params }) => {
  const posts = await fetchPostByUsername(params.id);

  return (
    <>
      <PostsGrid posts={posts as any} />
    </>
  );
};

export default ProfilePage;
