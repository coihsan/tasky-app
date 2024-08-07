import React from "react";
import { FluentAlertBadge24Filled } from "../icons/alert-notif";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
type Props = {};

const NotificationUser = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button
            size={"icon"}
            className="aspect-[1/1] rounded-full"
            variant={"ghost"}
          >
            <FluentAlertBadge24Filled />
          </Button>
        </SheetTrigger>
        <SheetContent className="CardStyle">
          <SheetHeader>
            <SheetTitle>Notifikasi</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NotificationUser;
