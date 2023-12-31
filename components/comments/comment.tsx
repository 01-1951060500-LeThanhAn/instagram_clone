"use client";

import { CommentWithData } from "@/types/posts";
import moment from "moment";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import CommentOptions from "./option-comment";

type Props = {
  comment: CommentWithData;
  inputRef?: React.RefObject<HTMLInputElement>;
};

function Comment({ comment, inputRef }: Props) {
  const { data: session } = useSession();
  const username = comment.user.username;
  const href = `/dashboard/${username}`;

  return (
    <div className="group p-3 px-3.5  flex items-start space-x-2.5">
      <Link href={href}>
        <Image
          className="rounded-full"
          width={40}
          height={40}
          src={comment.user.image!}
          alt=""
        />
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 leading-none text-sm">
          <Link href={href} className="font-semibold">
            {username}
          </Link>
          <p className="font-medium">{comment.body}</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <span className="text-[13px] text-neutral-400">
            {moment(comment.createdAt).fromNow()}
          </span>
          <button
            className="text-xs font-semibold text-neutral-500"
            onClick={() => inputRef?.current?.focus()}
          >
            Reply
          </button>
          {comment.userId === session?.user.id && (
            <CommentOptions comment={comment} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
