"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { FluentWeatherSunny24Regular } from "../icons/weather-sunny-24-regular";
import { FluentWeatherMoon24Regular } from "../icons/weather-moon-24-regular";
import { FluentLaptop24Regular } from "../icons/laptop-24-regular";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex w-max space-x-2">
      <Button
      size={'icon'}
        variant={"ghost"}
        onClick={() => setTheme("light")}
        aria-label="toggle light theme"
      >
        <FluentWeatherSunny24Regular />
      </Button>
      <Button
      size={'icon'}
        variant={"ghost"}
        onClick={() => setTheme("dark")}
        aria-label="dark theme"
      >
        <FluentWeatherMoon24Regular />
      </Button>
      <Button
      size={'icon'}
        variant={"ghost"}
        onClick={() => setTheme("system")}
        aria-label="toggle system theme"
      >
        <FluentLaptop24Regular />
      </Button>
    </div>
  );
}
