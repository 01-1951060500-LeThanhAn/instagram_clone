import EditPost from "@/components/posts/post-edit";
import { fetchPostById } from "@/lib/data";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import React from "react";
interface Props {
  params: {
    id: string;
  };
}
const EditPostPage: NextPage<Props> = async ({ params }) => {
  const post = await fetchPostById(params.id);
  if (!post) {
    return notFound();
  }
  return (
    <>
      <EditPost id={params.id} post={post} />
    </>
  );
};

export default EditPostPage;
