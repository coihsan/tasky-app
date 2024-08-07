"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FluentBuildingCloud24Regular } from "@/components/icons/building-cloud-24-regular";
import { Separator } from "@/components/ui/separator";
import { FluentEmojiHand24Regular } from "@/components/icons/emoji-hand-24-regular";
import { Input } from "@/components/ui/input";

const SettingsPage = () => {
  const [progress, setProgress] = React.useState(13);
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section className="p-4">
      <h1>Settings</h1>
      <div>
        <h3>Workspace Name</h3>
        <Input type="text" value="TaskyApp" />
      </div>
      <h1 className="py-6">Data Usage</h1>
      <main className="grid gap-3">
        <Card>
          <CardHeader className="flex flex-row items-center w-full">
            <div>
              <FluentBuildingCloud24Regular className="size-11" />
            </div>
            <div className="ml-3">
              <CardTitle>Storage for Actions and Packages</CardTitle>
              <CardDescription className="pt-3">
                Shared storage consists of Actions artifacts and Packages usage.
                This graph shows the account's storage usage in GB-months.
                Removing stored artifacts will not reduce this number, but it
                will lower its rate of growth. To see your account's current
                storage, download a usage report.
              </CardDescription>
            </div>
          </CardHeader>
          <Separator orientation="horizontal" />
          <CardContent className="pt-5">
            <div className="flex items-center justify-between pb-3">
              <span className="text-sm text-muted-foreground">Storage</span>
              <span className="text-sm text-muted-foreground">
                0.0 of 4GB included
              </span>
            </div>
            <Progress value={progress} />
          </CardContent>
        </Card>
        <Card className="flex items-center justify-between">
          <CardHeader className="flex flex-row items-center w-full">
            <div>
              <FluentEmojiHand24Regular className="size-11" />
            </div>
            <div className="ml-3">
              <CardTitle>TaskyApp Sponsors</CardTitle>
              <CardDescription className="pt-3">
                Connect with the community that builds the tools you use
              </CardDescription>
            </div>
          </CardHeader>
          <Button variant={"default"}>Start sponsoring</Button>
        </Card>
      </main>
    </section>
  );
};

export default SettingsPage;
