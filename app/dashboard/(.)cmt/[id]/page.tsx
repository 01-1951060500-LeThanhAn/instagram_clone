import PostDetail from "@/components/posts/post-detail";
import { fetchPostById } from "@/lib/data";
import { PostListWithData } from "@/types/posts";

import { NextPage } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id?: string | undefined;
  };
}
const ModalPost: NextPage<Props> = async ({ params }) => {
  const postDetail = await fetchPostById(params?.id);

  if (!postDetail) {
    notFound();
  }
  return <PostDetail id={params.id} post={postDetail as any} />;
};

export default ModalPost;
