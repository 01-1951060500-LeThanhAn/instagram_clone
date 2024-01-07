import { cn } from "@/lib/utils";
import { PostListWithData } from "@/types/posts";
import { NextPage } from "next";
import React from "react";
import LikeButton from "../button/like-button";
import Link from "next/link";
import ActionIcon from "./action-icons";
import { MessageCircle } from "lucide-react";
import ShareButton from "../button/share-button";
import BookmarkButton from "../button/bookmark-button";
interface PostActionsProps {
  post: PostListWithData;
  userId?: string;
  className?: string;
}
const PostActions: NextPage<PostActionsProps> = ({
  post,
  userId,
  className,
}) => {
  return (
    <>
      <div className={cn(`relative flex items-center w-full `, className)}>
        <div className="-mb-4">
          {" "}
          <LikeButton post={post} userId={userId as string} />
        </div>
        <Link href={`/dashboard/cmt/${post.id}`}>
          <ActionIcon>
            <MessageCircle className="w-6 h-6" />
          </ActionIcon>
        </Link>

        <ShareButton postId={post.id} />
        <BookmarkButton post={post} userId={userId} />
      </div>
    </>
  );
};

export default PostActions;
