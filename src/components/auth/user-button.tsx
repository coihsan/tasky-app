"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { FluentPerson24Regular } from "../icons/person";
import { FluentSettings24Regular } from "../icons/settings";
import { FluentSignOut24Regular } from "../icons/sign-out";
import { useUserDetails } from "@/lib/queries/use-swr";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const UserButtonCustom = () => {
  const { user } = useUserDetails()

  return (
    <div className="flex items-center rounded-full">
      <DropdownMenu>  
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <Avatar>
              <AvatarImage src={`${user?.imageUrl}`} alt="@taskyapp" />
              <AvatarFallback>{user?.full_name}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="CardStyle min-w-[200px] w-full"
          align="end"
        >
          <DropdownMenuLabel className="grid gap-1">
            <span>{user?.full_name}</span>
            <span className="text-xs text-muted-foreground">
              {user?.username}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link className="flex items-center gap-2" href="/account/profile">
              <FluentPerson24Regular />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="flex items-center gap-2" href="/account/settings">
              <FluentSettings24Regular />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <FluentSignOut24Regular />
            <SignOutButton redirectUrl="/sign-in"/>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButtonCustom;
