"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  function handleClick() {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("light");
        break;
      default:
        break;
    }
  }

  return (
    <Button onClick={handleClick}>
      <SunIcon className="block dark:hidden" />
      <MoonIcon className="hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
