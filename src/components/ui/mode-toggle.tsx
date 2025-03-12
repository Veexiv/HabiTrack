"use client";

import * as React from 'react';

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ModeToggle() {
  const [isThemeProviderAvailable, setIsThemeProviderAvailable] = React.useState(true);

  let setTheme: React.Dispatch<React.SetStateAction<string>>;
  try {
    ({ setTheme } = useTheme());
  } catch (error) {
    setIsThemeProviderAvailable(false);
  }

  React.useEffect(() => {
    if (!isThemeProviderAvailable) {
      console.warn("ThemeProvider is not available. ModeToggle will not function correctly.");
    }
  }, [isThemeProviderAvailable]);

  if (!isThemeProviderAvailable) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all duration-1000 dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all duration-1000 dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
