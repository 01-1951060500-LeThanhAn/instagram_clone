"use server";
import { getUserId } from "@/lib/utils";
import { UpdateUser } from "../schema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
export async function updateProfile(values: z.infer<typeof UpdateUser>) {
  const userId = await getUserId();

  const validatedFields = UpdateUser.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Profile.",
    };
  }

  const { bio, gender, image, name, username, website } = validatedFields.data;

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        name,
        image,
        bio,
        gender,
        website,
      },
    });
    revalidatePath("/dashboard");
    return { message: "Updated Profile." };
  } catch (error) {
    return { message: "Database Error: Failed to Update Profile." };
  }
}
