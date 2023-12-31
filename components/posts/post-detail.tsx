"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMount from "@/hooks/useMount";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import PostActions from "./post-actions";
import ViewPost from "./view-post";
import CommentForm from "../comments/form-comment";
import MiniPost from "./mini-post";
import Comment from "../comments/comment";

function PostDetail({ id, post }: { id: string | undefined; post: any }) {
  const pathname = usePathname();
  const isPostModal = pathname === `/dashboard/cmt/${id}`;
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const inputRef = useRef<HTMLInputElement>(null);
  const username = post.user.username;
  const href = `/dashboard/${username}`;
  const mount = useMount();

  if (!mount) return null;

  return (
    <Dialog open={isPostModal} onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl h-full max-h-[500px] lg:max-h-[700px] xl:max-h-[800px]">
        <div className="flex flex-col justify-between md:h-full md:order-2 w-full max-w-md">
          <DialogHeader className="flex border-b space-y-0 space-x-2.5 flex-row items-center py-4 pl-3.5 pr-6">
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center">
                <Link href={href}>
                  <Image
                    className="rounded-full w-12 h-12 object-cover"
                    width={40}
                    height={40}
                    src={post.user.image!}
                    alt=""
                  />
                </Link>
                <Link href={href} className="font-semibold ml-3 text-sm">
                  {username}
                </Link>
              </div>

              <time className="text-[11px] mr-4 uppercase text-zinc-500 font-medium">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </DialogHeader>

          <ScrollArea className="hidden md:inline border-b flex-1 py-1.5">
            <MiniPost post={post} />
            {post.comments && post?.comments?.length > 0 && (
              <>
                {post?.comments &&
                  post?.comments?.map((comment: any) => {
                    return (
                      <Comment
                        key={comment.id}
                        comment={comment}
                        inputRef={inputRef}
                      />
                    );
                  })}
              </>
            )}
          </ScrollArea>

          <ViewPost className="hidden md:flex border-b" />

          <div className="px-2 pb-6 hidden md:block mt-auto border-b p-2.5">
            <PostActions post={post} userId={user?.id} />
          </div>
          <CommentForm
            postId={id}
            className="hidden md:inline-flex"
            inputRef={inputRef}
          />
        </div>

        <div className="relative overflow-hidden h-96 md:h-[500px] lg:h-[700px] xl:h-[700px] 2xl:h-[700px] max-w-3xl w-full">
          <Image
            src={post.fileUrl}
            fill
            objectFit="cover"
            alt="Post Image"
            className="md:rounded-l-md object-cover"
          />
        </div>

        <PostActions
          post={post}
          userId={user?.id}
          className="md:hidden border-b p-2.5"
        />
        <CommentForm postId={id} className="md:hidden" inputRef={inputRef} />
        <ViewPost className="md:hidden" />
      </DialogContent>
    </Dialog>
  );
}

export default PostDetail;
