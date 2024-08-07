"use client";
import { SidebarContent } from "@/components/global/sidebar-content";
import Logo from "@/components/global/logo";
import { sidebaraccountuser } from "@/lib/const";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
// TODO : this component will be delete
const SidebarMenuAccount = () => {
  const pathname = usePathname();
  return (
    <div className="w-full max-w-64 relative h-full overflow-y-scroll h-screen">
      <SidebarContent>
        <Logo />
      </SidebarContent>
      <SidebarContent>
        <div className="flex flex-col gap-1">
          {sidebaraccountuser.map((item) => (
            <Link
              className={clsx(
                "flex items-center text-sm h-9 gap-3 pl-2 text-black dark:text-foreground hover:bg-onyx-100 dark:hover:bg-onyx-800 hover:ring-2 hover:ring-onyx-100 dark:hover:ring-onyx-800 rounded-md transitionAll",
                {
                  "borderStyle ButtonStyle font-bold": pathname === item.url,
                },
              )}
              href={item.url}
              key={item.id}
            >
              <div
                className={clsx("text-black dark:text-foreground", {
                  "": pathname === item.url,
                })}
              >
                <item.icon />
              </div>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </SidebarContent>
    </div>
  );
};

export default SidebarMenuAccount;
