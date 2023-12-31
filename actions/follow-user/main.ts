"use server";
import { getUserId } from "@/lib/utils";
import { FollowUser } from "../schema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export async function followUser(formData: FormData) {
  const userId = await getUserId();

  const { id } = FollowUser.parse({
    id: formData.get("id"),
  });

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const follows = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: userId,

        followingId: id,
      },
    },
  });

  if (follows) {
    try {
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: id,
          },
        },
      });
      revalidatePath("/dashboard");
      return { message: "Unfollowed User." };
    } catch (error) {
      return {
        message: "Database Error: Failed to Unfollow User.",
      };
    }
  }

  try {
    await prisma.follows.create({
      data: {
        followerId: userId,
        followingId: id,
      },
    });
    revalidatePath("/dashboard");
    return { message: "Followed User." };
  } catch (error) {
    return {
      message: "Database Error: Failed to Follow User.",
    };
  }
}
