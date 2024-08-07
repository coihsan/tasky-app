"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { sidebaraccountuser } from "@/lib/const";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
// TODO : this component will be delete
const MainMenu = () => {
  const pathname = usePathname();
  return (
    <div className="relative border-r-2 border-muted h-[100dvh]">
      <div className="flex flex-col gap-1 pr-2">
        <TooltipProvider>
          {sidebaraccountuser.map((item) => (
            <Tooltip delayDuration={0} key={item.id}>
              <TooltipTrigger>
                <Button size={"icon"} variant={"ghost"}>
                  <Link
                    className={clsx("flex items-center", {
                      "font-bold": pathname === item.url,
                    })}
                    href={item.url}
                  >
                    <span
                      className={clsx("text-black dark:text-foreground", {
                        "bg-muted p-2 rounded-lg": pathname === item.url,
                      })}
                    >
                      <item.icon className="size-6" />
                    </span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MainMenu;
