"use client";

import { useEffect, useRef, useState } from "react";
import PxIcon from "./PxIcon";
import { KING_A, KING_B } from "@/lib/sprites";

// The monarch walks the road at the bottom of the viewport.
// Position = scroll progress; direction follows scroll delta;
// alternates walk frames while the page is moving.

export default function Rider() {
  const [prog, setProg] = useState(0);
  const [frame, setFrame] = useState(0);
  const [dir, setDir] = useState(1);
  const lastY = useRef(0);
  const moving = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProg(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
      if (Math.abs(y - lastY.current) > 2) {
        setDir(y >= lastY.current ? 1 : -1);
        moving.current = true;
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => (moving.current = false), 180);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (moving.current) setFrame((f) => 1 - f);
      else setFrame(0);
    }, 170);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="rider"
      style={{ left: `calc(${6 + prog * 84}% ${dir < 0 ? "- 30px" : ""})` }}
      aria-hidden
    >
      <div className={dir < 0 ? "rider-flip" : undefined}>
        <PxIcon map={frame ? KING_B : KING_A} scale={4} />
      </div>
    </div>
  );
}
