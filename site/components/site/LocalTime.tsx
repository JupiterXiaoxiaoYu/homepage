"use client";

import { useEffect, useState } from "react";

export default function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const f = () =>
      setNow(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Hong_Kong",
        }).format(new Date()),
      );
    f();
    const id = setInterval(f, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{now ? `${now} HKT` : "HKT"}</span>;
}
