"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function CaseLink({
  href,
  label,
  className = "",
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <Link
        ref={ref}
        href={href}
        className={`cardlink ${className}`}
        onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setPos(null)}
      >
        {children}
      </Link>
      <span
        className={`pill ${pos ? "on" : ""}`}
        style={pos ? { left: pos.x, top: pos.y } : undefined}
        aria-hidden
      >
        {label}
      </span>
    </>
  );
}
