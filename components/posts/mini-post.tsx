"use client";

import { PostListWithData } from "@/types/posts";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import PostOption from "./post-option";

function MiniPost({ post }: { post: PostListWithData }) {
  const username = post.user.username;
  const href = `/dashboard/${username}`;
  const { data: session, status } = useSession();
  const user = session?.user;

  if (!user) return null;

  return (
    <div className="group p-3 px-3.5  flex items-start space-x-2.5">
      <Link href={href}>
        <Image
          src={post.user.image!}
          alt=""
          className="rounded-full w-12 h-12 object-cover"
          width={40}
          height={40}
        />
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 leading-none text-sm">
          <Link href={href} className="font-semibold">
            {username}
          </Link>
          <p className="font-medium">{post.caption}</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <span>{moment(post.createdAt).fromNow()}</span>
          <PostOption
            post={post}
            userId={user.id}
            className="hidden group-hover:inline"
          />
        </div>
      </div>
    </div>
  );
}

export default MiniPost;
