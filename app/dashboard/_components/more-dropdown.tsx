"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Activity,
  Bookmark,
  ChevronLeft,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
const MoredropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      if (!e.target) return;
      if (e.target && !ref.current?.contains(e.target as Node)) {
        setIsOpen(false);
        setShowToggle(false);
      }
    };

    document.addEventListener("mousedown", handleOutSideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);
  return (
    <>
      <DropdownMenu open={isOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size={"lg"}
            variant={"ghost"}
            className="md:w-full !justify-start !ml-2  space-x-2 !px-3"
          >
            <Menu />
            <div className="hidden lg:block">More</div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          ref={ref}
          className={cn(
            "dark:bg-neutral-800 w-64 !rounded-xl !p-0 transition-opacity"
          )}
          align="end"
          alignOffset={-40}
        >
          {!showToggle ? (
            <>
              <DropdownMenuItem className="menuItem">
                <Settings />
                <p className="ml-2">Settings</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="menuItem">
                <Activity />
                <p className="ml-2">Your Activity</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="menuItem">
                <Bookmark />
                <p className="ml-2">Saved</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowToggle(true)}
                className="menuItem"
              >
                <Moon />
                <p className="ml-2">Switch apperance</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  signOut({ redirect: false }).then(() => {
                    router.push("/signin");
                  })
                }
                className="menuItem"
              >
                <LogOut />
                <p className="ml-2">LogOut</p>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <div className="flex items-center border-b border-gray-200 dark:border-neutral-700 py-3.5 px-2.5">
                <ChevronLeft size={18} onClick={() => setShowToggle(false)} />
                <p className="font-bold ml-1">Switch appearance</p>
                {theme === "dark" ? (
                  <Moon size={20} className="ml-auto" />
                ) : (
                  <Sun size={20} className="ml-auto" />
                )}
              </div>

              <Label htmlFor="dark-mode" className="menuItem">
                <p className="mx-4 my-4">Dark Mode</p>
                <DropdownMenuItem className="ml-auto !p-0">
                  <Switch
                    id="dark-mode"
                    className="ml-auto mr-3"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => {
                      setTheme(checked ? "dark" : "light");
                    }}
                  />
                </DropdownMenuItem>
              </Label>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MoredropDown;
