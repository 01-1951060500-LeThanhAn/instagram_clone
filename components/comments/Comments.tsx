"use client";
import { CreateComment } from "@/actions/schema";
import { CommentWithData, PostListWithData } from "@/types/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { NextPage } from "next";
import React, { useOptimistic, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import Link from "next/link";
import { createComment } from "@/actions/create-comment/main";
import { Trash } from "lucide-react";

interface CommentProps {
  user: User | null;
  post?: PostListWithData;
  comments: CommentWithData;
  postId?: string;
}

const Comments: NextPage<CommentProps> = ({ user, post, comments, postId }) => {
  const form = useForm<z.infer<typeof CreateComment>>({
    resolver: zodResolver(CreateComment),
    defaultValues: {
      body: "",
      postId,
    },
  });
  let [isPending, startTransition] = useTransition();
  const [optimisticComments, addOptimisticComment] = useOptimistic<
    CommentWithData[]
  >(
    comments,
    // @ts-ignore
    (state: Comment[], newComment: string) => [
      { body: newComment, userId: user?.id, postId, user },
      ...state,
    ]
  );
  const body = form.watch("body");
  const commentsCount = optimisticComments.length;

  return (
    <>
      <div className="space-y-0.5 px-3 sm:px-0">
        {commentsCount > 1 && (
          <Link
            scroll={false}
            href={`/dashboard/p/${postId}`}
            className="text-sm font-medium text-neutral-500"
          >
            View all {commentsCount} comments
          </Link>
        )}

        {optimisticComments.slice(0, 3).map((comment) => {
          const username = comment.user?.username;

          return (
            <>
              <div
                key={comment.id}
                className="flex items-center justify-between"
              >
                <div className="text-sm py-1 flex items-center space-x-2 font-medium">
                  <Link
                    href={`/dashboard/${username}`}
                    className="font-semibold"
                  >
                    {username}
                  </Link>
                  <p>{comment.body}</p>
                </div>

                {user?.id === post?.userId && (
                  <div className="trash cursor-pointer text-neutral-900 dark:text-white">
                    <Trash className="w-4 h-4" />
                  </div>
                )}
              </div>
            </>
          );
        })}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              const valuesCopy = { ...values };
              form.reset();
              startTransition(() => {
                addOptimisticComment(valuesCopy.body);
              });

              await createComment(valuesCopy);
            })}
            className="border-b pt-2 border-gray-300 dark:border-neutral-800 pb-3 py-1 flex items-center space-x-2"
          >
            <FormField
              control={form.control}
              name="body"
              render={({ field, fieldState }) => (
                <FormItem className="w-full flex">
                  <FormControl>
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="bg-transparent text-sm border-none focus:outline-none flex-1 placeholder-neutral-500 dark:text-white dark:placeholder-neutral-400 font-medium"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {body.trim().length > 0 && (
              <button
                type="submit"
                className="text-sky-500 text-sm font-semibold hover:text-white disabled:hover:text-sky-500 disabled:cursor-not-allowed"
              >
                Post
              </button>
            )}
          </form>
        </Form>
      </div>
    </>
  );
};

export default Comments;
