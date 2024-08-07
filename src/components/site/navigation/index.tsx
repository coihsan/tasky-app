"use server";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { sitelink } from "@/lib/const";
import { currentUser } from "@clerk/nextjs/server";
import Logo from "@/components/global/logo";
import { Button } from "@/components/ui/button";
import ChevronRight from "@/components/icons/chevron-right";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


const Navigation = async () => {
  const user = await currentUser();
  return (
    <NavigationMenu orientation="horizontal" className="w-full rounded-full max-w-screen-md mx-auto dark:bg-white/5 backdrop-blur-xl fixed top-2 z-50">
      <NavigationMenuList className="flex items-center justify-between mx-auto px-4 py-2 bg-white-30">
        <div className="flex">
          <Link className="flex items-center gap-2" href={"/"}>
            <Logo />
            <span className="borderStyle bg-white/5 px-1 py-px text-onyx-500 rounded-full text-[10px] font-semibold">
              Beta
            </span>
          </Link>
          <div className="hidden lg:flex ml-0 lg:ml-4 flex items-center gap-3">
            <Separator orientation="vertical" />
            <NavigationMenuItem className="hidden lg:flex items-center gap-8">
            {sitelink.map((link) => (
              <NavigationMenuLink asChild key={link.id}>
                <Link href={link.url}>{link.title}</Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
          </div>
        </div>
        <div className="flex items-center h-7 space-x-2">
          <Button variant={"ghost"}>
            <Link
              className="uppercase flex items-center gap-2"
              href={user ? "/workspace" : "/workspace/sign-in"}
            >
              {user ? "Dashboard" : "Sign In"}
              <ChevronRight />
            </Link>
          </Button>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
