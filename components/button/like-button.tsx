"use client";

import { cn } from "@/lib/utils";
import { Like } from "@prisma/client";
import { Heart } from "lucide-react";
import { useOptimistic } from "react";

import { PostListWithData } from "@/types/posts";
import ActionIcon from "../posts/action-icons";
import { likePost } from "@/actions/like-post/main";

function LikeButton({
  post,
  userId,
}: {
  post: PostListWithData;
  userId?: string;
}) {
  const predicate = (like: Like) =>
    like.userId === userId && like.postId === post.id;
  const [optimisticLikes, addOptimisticLike] = useOptimistic<Like[]>(
    post.likes,
    // @ts-ignore
    (state: Like[], newLike: Like) =>
      state.some(predicate)
        ? state.filter((like) => like.userId !== userId)
        : [...state, newLike]
  );

  return (
    <>
      <div>
        <form
          action={async (formData: FormData) => {
            const postId = formData.get("postId");
            addOptimisticLike({ postId, userId });

            await likePost(postId);
          }}
        >
          <input type="hidden" name="postId" value={post.id} />

          <ActionIcon>
            <Heart
              className={cn("h-6 w-6", {
                "text-red-500 fill-red-500": optimisticLikes.some(predicate),
              })}
            />
          </ActionIcon>
        </form>

        {optimisticLikes.length > 0 ? (
          <p className="text-sm font-bold dark:text-white">
            {optimisticLikes.length}{" "}
            {optimisticLikes.length === 1 ? "like" : "likes"}
          </p>
        ) : (
          <p className="text-sm font-bold dark:text-white">
            0 {optimisticLikes.length === 0 ? "like" : "likes"}
          </p>
        )}
      </div>
    </>
  );
}

export default LikeButton;
