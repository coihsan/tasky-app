"use client";
import React, {
  useState,
  useEffect,
  useSyncExternalStore,
  useRef,
} from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { FluentWifiWarning24Regular } from "../icons/wifi-error";
import { Badge } from "../ui/badge";

type Props = {
  message: string;
  title: string;
};
const UseDisplayMessage = ({ message, title }: Props) => {
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex">
          <FluentWifiWarning24Regular className="size-11" />
          <div className="ml-3">
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{message}</AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Dismiss</AlertDialogCancel>
          <AlertDialogAction>Connect</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return isOnline;
}

function getSnapshot() {
  return navigator.onLine;
}
type Callback = () => void;
function subscribe(callback: Callback) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

interface bgColorProps {
  bgColor: string;
}
const PulseIndicator = ({ bgColor }: bgColorProps) => {
  return (
    <span className="relative flex size-2">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${bgColor} opacity-75`}
      ></span>
      <span
        className={`relative inline-flex rounded-full size-2 ${bgColor}`}
      ></span>
    </span>
  );
};
const UseNetworkStatus = () => {
  const isOnline = useOnlineStatus();

  return (
    <div className="relative">
      <div className="flex text-xs items-center gap-2">
        System :
        <PulseIndicator bgColor={isOnline ? "bg-green-500" : "bg-red-500"} />
        <span className="text-muted-foreground">
          {isOnline ? "Online" : "Disconnected"}
        </span>
      </div>
      <div className="absolute right-0 top-0">
        {isOnline ? null : (
          <UseDisplayMessage
            title="You are currently offline"
            message="Please check your internet connection and try again."
          />
        )}
      </div>
    </div>
  );
};
export default UseNetworkStatus;
