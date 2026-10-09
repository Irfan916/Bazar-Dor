"use client";

import { startTransition, useEffect, useState } from "react";

export default function NavbarDate() {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    startTransition(() => {
      setToday(
        new Date().toLocaleDateString("bn-BD", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    });
  }, []);

  return (
    <span
      className="text-[10px] sm:text-xs text-muted leading-tight hidden xs:block"
      suppressHydrationWarning
    >
      {today ?? ""}
    </span>
  );
}