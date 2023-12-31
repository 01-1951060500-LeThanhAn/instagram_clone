"use client";

import { UpdateUser } from "@/actions/schema";
import { updateProfile } from "@/actions/update-profile/main";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useMount from "@/hooks/useMount";

import { UploadButton } from "@/lib/uploadthing";
import { UserWithExtras } from "@/types/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import SubmitButton from "../posts/button-submit";

function ProfileAvatar({
  user,
  children,
}: {
  user: UserWithExtras;
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const isCurrentUser = session?.user.id === user.id;
  const form = useForm<z.infer<typeof UpdateUser>>({
    resolver: zodResolver(UpdateUser),
    defaultValues: {
      id: user.id,
      image: user.image || "",
      name: user.name || "",
      username: user.username || "",
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const mount = useMount();

  if (!mount || !session) return null;

  if (!isCurrentUser)
    return (
      <Image
        src={user.image!}
        alt=""
        width={40}
        height={40}
        className="w-24 h-24 md:w-36 md:h-36 ml-6 md:mt-0 mr-6 mt-4 object-cover rounded-full"
      />
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="dialogContent">
        <DialogHeader>
          <DialogTitle className="mx-auto font-medium text-xl py-5">
            Change Profile Photo
          </DialogTitle>
        </DialogHeader>

        {isCurrentUser && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (values) => {
                const { message } = await updateProfile(values);
                toast.success(message);

                setOpen(false);
              })}
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UploadButton
                        className="text-sm h-11 ut-button:bg-transparent border-y border-zinc-300 dark:border-neutral-700 ut-button:text-blue-500 ut-button:font-bold ut-allowed-content:hidden ut-button:ring-0 ut-button:focus-visible:ring-0 ut-button:ring-offset-0 ut-button:w-full"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          form.setValue("image", res[0].url);

                          if (inputRef.current) {
                            inputRef.current.click();
                          }
                        }}
                        onUploadError={(error: Error) => {
                          console.error(error);
                          toast.error("Upload failed");
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {user?.image && (
                <SubmitButton
                  className="text-red-500 border-b border-zinc-300 dark:border-neutral-700 font-bold disabled:cursor-not-allowed w-full text-sm p-3"
                  onClick={() => {
                    form.setValue("image", "");
                    if (inputRef.current) {
                      inputRef.current.click();
                    }
                  }}
                  disabled={form.formState.isSubmitting}
                >
                  Remove Current Photo
                </SubmitButton>
              )}

              <input type="submit" hidden ref={inputRef} />
            </form>
          </Form>
        )}

        <DialogClose className="postOption border-0 w-full p-3">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileAvatar;
