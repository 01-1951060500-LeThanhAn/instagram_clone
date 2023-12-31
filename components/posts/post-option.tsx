"use client";
import { PostListWithData } from "@/types/posts";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import SubmitButton from "./button-submit";
import { deletePost } from "@/actions/delete-post/main";
interface PostOptionProps {
  post: PostListWithData;
  userId?: string;
  className?: string;
}
const PostOption: NextPage<PostOptionProps> = ({ post, userId, className }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <MoreHorizontal
            className={cn(
              "h-5 w-5 cursor-pointer dark:text-neutral-400",
              className
            )}
          />
        </DialogTrigger>
        <DialogContent className="dialogContent">
          {post.userId === userId && (
            <form
              action={async (formData) => {
                const { message } = await deletePost(formData);
                toast.success(message);
              }}
              className="postOption"
            >
              <input type="hidden" name="id" value={post.id} />
              <SubmitButton className="text-red-500 font-bold disabled:cursor-not-allowed w-full p-3">
                Delete post
              </SubmitButton>
            </form>
          )}

          {post.userId === userId && (
            <Link
              scroll={false}
              href={`/dashboard/cmt/${post.id}/edit`}
              className="postOption p-3"
            >
              Edit post
            </Link>
          )}

          <form action="" className="postOption border-0">
            <button className="w-full p-3">Hide like count</button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostOption;
