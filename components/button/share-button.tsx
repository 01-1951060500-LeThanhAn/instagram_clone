"use client";

import { Link, Send } from "lucide-react";
import ActionIcon from "../posts/action-icons";
import { toast } from "react-toastify";

function ShareButton({ postId }: { postId: string }) {
  return (
    <ActionIcon
      onClick={() => {
        navigator.clipboard.writeText(
          `${window.location.origin}/dashboard/p/${postId}`
        );
        toast.success("Link copied to clipboard", {
          icon: <Link className={"h-5 w-5"} />,
        });
      }}
    >
      <Send className={"h-6 w-6"} />
    </ActionIcon>
  );
}

export default ShareButton;
