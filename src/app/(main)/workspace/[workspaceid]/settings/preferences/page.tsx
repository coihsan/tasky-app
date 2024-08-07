import { ModeToggle } from "@/components/global/mode-toggle";
import React from "react";

const PreferencesAccount = () => {
  return (
    <main className="p-4">
      <h1>Theme preferences</h1>
      <ModeToggle />
      <p>
        Choose how TaskyApp looks to you. Select a single theme, or sync with
        your system and automatically switch between day and night themes.
        Selections are applied immediately and saved automatically.
      </p>
    </main>
  );
};

export default PreferencesAccount;
