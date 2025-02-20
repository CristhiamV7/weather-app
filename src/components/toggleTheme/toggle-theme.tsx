"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { Button } from "@/components/common/button";
import { useEffect, useState } from "react";
import ToggleOff from "../../../public/img/toggle-off.png";
import ToggleOn from "../../../public/img/toggle-on.png";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button onClick={toggleTheme} className="flex">
      {theme === "dark" ? (
        <div className="flex items-center space-x-4">
          <Image src={ToggleOn} alt="on" />
          <span>Dark</span>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Image src={ToggleOff} alt="off" />
          <span>Light</span>
        </div>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
