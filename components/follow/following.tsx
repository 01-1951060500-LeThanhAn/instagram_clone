import { FollowingWithList } from "@/types/posts";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "./button-follow";

function Following({ following }: { following: FollowingWithList }) {
  const { data: session } = useSession();
  const isFollowing = following.following.followedBy.some(
    (user) => user.followerId === session?.user.id
  );
  const isCurrentUser = session?.user.id === following.followingId;

  if (!session) return null;

  return (
    <div className="p-4 flex items-center justify-between gap-x-3">
      <Link
        href={`/dashboard/${following.following.id}`}
        className="flex items-center gap-x-3"
      >
        <Image
          src={following.following.image!}
          width={30}
          height={30}
          alt=""
          className="h-10 w-10 object-cover rounded-full"
        />
        <p className="font-bold text-sm">{following.following.username}</p>
      </Link>
      {!isCurrentUser && (
        <FollowButton
          profileId={following.followingId}
          isFollowing={isFollowing}
          buttonClassName={
            isFollowing ? "bg-neutral-700 dark:hover:bg-neutral-700/40" : ""
          }
        />
      )}
    </div>
  );
}

export default Following;
