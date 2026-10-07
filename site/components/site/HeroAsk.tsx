"use client";

import { useState } from "react";
import { openAsk } from "./Nav";

export default function HeroAsk({
  placeholder,
  chips,
}: {
  placeholder: string;
  chips: readonly string[];
}) {
  const [q, setQ] = useState("");
  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    openAsk(q.trim() || undefined);
    setQ("");
  };
  return (
    <div>
      <form className="askbox" onSubmit={submit}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
        />
        <button type="submit">Ask ✳</button>
      </form>
      <div className="askchips">
        {chips.map((c) => (
          <button key={c} className="chip" onClick={() => openAsk(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
