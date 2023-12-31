"use client";
import { buttonVariants } from "@/components/ui/button";
import links from "@/constant/links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ListNavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        const LinkIcon = link.icon;
        return (
          <Link
            href={link.href}
            key={link.name}
            className={buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              className: cn("navLink", {
                "hidden md:flex": link.hideOnMobile,
              }),
              size: "lg",
            })}
          >
            <LinkIcon />
            <p
              className={`${cn("hidden lg:block", {
                "font-extrabold": isActive,
              })}`}
            >
              {" "}
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
};

export default ListNavLinks;
