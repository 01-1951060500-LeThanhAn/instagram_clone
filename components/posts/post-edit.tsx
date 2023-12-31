"use client";
import { UpdatePost } from "@/actions/schema";
import useMount from "@/hooks/useMount";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import { NextPage } from "next";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify";
import Error from "../error/error";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { updatePost } from "@/actions/edit-post/main";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface EditPostProps {
  id: string;
  post: Post;
}
const EditPost: NextPage<EditPostProps> = ({ id, post }) => {
  const mount = useMount();
  const pathname = usePathname();
  const isEditPage = pathname === `/dashboard/cmt/${id}/edit`;
  const router = useRouter();
  const form = useForm<z.infer<typeof UpdatePost>>({
    resolver: zodResolver(UpdatePost),
    defaultValues: {
      id: post.id,
      caption: post.caption || "",
      fileUrl: post.fileUrl,
    },
  });
  const fileUrl = form.watch("fileUrl");

  if (!mount) return null;

  return (
    <>
      <Dialog open={isEditPage} onOpenChange={(open) => !open && router.back()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit info</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(async (values) => {
                const res = await updatePost(values);

                if (res) {
                  return toast.error(<Error res={res} />);
                }

                return toast.success("Edit post successfully");
              })}
            >
              <div className="h-96 md:h-[450px] overflow-hidden rounded-md">
                <AspectRatio ratio={1 / 1} className="relative h-full">
                  <Image
                    src={fileUrl}
                    alt="Post preview"
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>

              <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="caption">Caption</FormLabel>
                    <FormControl>
                      <Input
                        type="caption"
                        id="caption"
                        placeholder="Write a caption..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={form.formState.isSubmitting}>
                Done
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditPost;
