"use server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { CreatePost } from "../schema";
import { getUserId } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(values: z.infer<typeof CreatePost>) {
  const userId = await getUserId();

  const valueFields = CreatePost.safeParse(values);

  if (!valueFields.success) {
    return {
      errors: valueFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create post",
    };
  }

  const { fileUrl, caption } = valueFields.data;

  try {
    await prisma?.post.create({
      data: {
        fileUrl: fileUrl,
        caption: caption,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "DB Error. Failed to create post!",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
