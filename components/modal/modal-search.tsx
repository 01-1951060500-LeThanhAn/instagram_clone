"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

function SearchModal({ open }: { open: boolean }) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && router.back()}>
      <DialogContent className="dialogContent">
        <DialogHeader className="border-b border-zinc-300 dark:border-neutral-700 py-2 w-full">
          <DialogTitle className="mx-auto font-bold text-base">
            Search post and user
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SearchModal;
