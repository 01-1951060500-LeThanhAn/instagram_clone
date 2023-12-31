import { auth } from "@/auth/options";
import { PostListWithData } from "@/types/posts";
import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import moment from "moment";
import PostOption from "./post-option";
import { Card } from "../ui/card";
import PostActions from "./post-actions";
import Link from "next/link";
import Comments from "../comments/Comments";
import { User } from "@prisma/client";
interface PostProps {
  post: PostListWithData;
}
const PostItem: NextPage<PostProps> = async ({ post }) => {
  const session = await auth();
  const userId = session?.user.id;
  const username = post.user.username;

  if (!session?.user) return null;
  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-3 sm:px-0">
          <div className="flex space-x-3 items-center">
            <Link href={`/dashboard/${post.userId}`}>
              <Image
                className="w-12 object-cover rounded-full h-12"
                src={post.user.image!}
                alt=""
                width={100}
                height={100}
              />
            </Link>

            <div className="text-sm">
              <p className="space-x-1">
                <span className="font-semibold">{username}</span>
                <span className="font-medium text-neutral-500 dark:text-neutral-400 text-xs">
                  .
                </span>
                <span className="text-xs text-neutral-400">
                  {moment(post.createdAt).fromNow()}
                </span>
              </p>
              <p className="text-sm text-black dark:text-white font-medium">
                Portugal, Cristiano Ronaldo
              </p>
            </div>
          </div>

          <PostOption post={post} userId={userId as string} />
        </div>

        <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-sm">
          <Image
            src={post?.fileUrl!}
            alt="Post image"
            fill
            className="sm:rounded-sm object-cover"
          />
        </Card>

        <PostActions post={post} userId={userId} className="px-3 sm:px-0" />

        {post.caption && (
          <div className="text-sm py-3 leading-none flex items-center space-x-2 font-medium px-3 sm:px-0">
            <Link href={`/dashboard/${userId}`} className="font-bold">
              {username}
            </Link>
            <p>{post.caption}</p>
          </div>
        )}

        <Comments
          post={post}
          postId={post.id}
          comments={post.comments}
          user={session.user as User | null}
        />
      </div>
    </>
  );
};

export default PostItem;
