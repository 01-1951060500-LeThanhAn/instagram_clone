import { auth } from "@/auth/options";
import { fetchPostById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Card } from "../ui/card";
import Image from "next/image";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";
import Link from "next/link";
import PostOption from "./post-option";
import CommentForm from "../comments/form-comment";
import PostItem from "./post-item";
import { ScrollArea } from "../ui/scroll-area";
import MiniPost from "./mini-post";
import Comment from "../comments/comment";
import PostActions from "./post-actions";

async function SinglePost({ id }: { id: string }) {
  const post = await fetchPostById(id);
  const session = await auth();
  const postUsername = post?.user.username;
  const userId = session?.user.id;

  if (!post) {
    notFound();
  }

  return (
    <>
      <Card className="max-w-3xl lg:max-w-4xl hidden md:flex mx-auto">
        <div className="relative overflow-hidden h-[450px] max-w-sm lg:max-w-lg w-full">
          <Image
            src={post.fileUrl}
            alt="Post preview"
            fill
            className="md:rounded-l-md object-cover"
          />
        </div>

        <div className="flex max-w-sm flex-col flex-1">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link
                  className="font-semibold text-sm"
                  href={`/dashboard/${postUsername}`}
                >
                  {postUsername}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex items-center space-x-2">
                  <Image
                    width={40}
                    height={40}
                    src={post.user.image!}
                    alt=""
                    className="h-14 w-14"
                  />
                  <div>
                    <p className="font-bold">{postUsername}</p>
                    <p className="text-sm font-medium dark:text-neutral-400">
                      {post.user.name}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <PostOption post={post as any} userId={userId} />
          </div>

          {post.comments.length === 0 && (
            <div className="flex flex-col items-center gap-1.5 flex-1 justify-center">
              <p className="text-xl lg:text-2xl font-extrabold">
                No comments yet.
              </p>
              <p className="text-sm font-medium">Start the conversation.</p>
            </div>
          )}

          {post.comments.length > 0 && (
            <ScrollArea className="hidden md:inline py-1.5 flex-1">
              <MiniPost post={post as any} />
              {post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </ScrollArea>
          )}

          <div className="px-2  hidden md:block mt-auto border-y p-2.5">
            <PostActions className="mb-4" post={post as any} userId={userId} />
            <time className="text-[11px] leading-4 uppercase text-zinc-500 font-medium">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <CommentForm postId={id} className="hidden md:inline-flex" />
        </div>
      </Card>
      <div className="md:hidden">
        <PostItem post={post as any} />
      </div>
    </>
  );
}

export default SinglePost;
