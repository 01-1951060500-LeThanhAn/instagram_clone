"use client";

import { cn } from "@/lib/utils";
import { PostListWithData } from "@/types/posts";
import { SavedPost } from "@prisma/client";
import { Bookmark } from "lucide-react";
import { useOptimistic } from "react";
import ActionIcon from "../posts/action-icons";
import { bookmarkPost } from "@/actions/bookmark-post/main";
import { toast } from "react-toastify";

type Props = {
  post: PostListWithData;
  userId?: string;
};

function BookmarkButton({ post, userId }: Props) {
  const predicate = (bookmark: SavedPost) =>
    bookmark.userId === userId && bookmark.postId === post.id;
  const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic<
    SavedPost[]
  >(
    post.saveBy || [],
    // @ts-ignore
    (state: SavedPost[], newBookmark: SavedPost) => {
      if (!userId || !post.id) {
        return state || [];
      }

      const existingBookmark = state.find(predicate);
      if (existingBookmark) {
        return state.filter((bookmark) => bookmark.userId !== userId);
      } else {
        return [...state, newBookmark];
      }
    }
  );

  const handleSavePost = async (formData: FormData) => {
    try {
      const postId = formData.get("postId");

      addOptimisticBookmark({ postId, userId });
      await bookmarkPost(postId);

      return toast.success("Save post successfully");
    } catch (error) {
      console.log(error);
      toast.error("Save post failed");
    }
  };

  return (
    <form action={handleSavePost} className="ml-auto">
      <input type="hidden" name="postId" value={post.id} />
      <ActionIcon>
        <Bookmark
          className={cn("h-6 w-6 ", {
            "dark:fill-white  fill-black":
              optimisticBookmarks && optimisticBookmarks?.some(predicate),
          })}
        />
      </ActionIcon>
    </form>
  );
}

export default BookmarkButton;
