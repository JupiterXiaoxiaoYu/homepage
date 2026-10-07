"use client";

import { useState } from "react";

export default function EmailCopy({
  email,
  label,
}: {
  email: string;
  label: string;
}) {
  const [, setN] = useState(0);
  return (
    <button
      className="foot-mail"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
        } catch {
          const ta = document.createElement("textarea");
          ta.value = email;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
        }
        const toast = document.getElementById("toast");
        if (toast) {
          toast.textContent = `${email} — ${label}`;
          toast.classList.add("on");
          setN((n) => n + 1);
          setTimeout(() => toast.classList.remove("on"), 2200);
        }
      }}
    >
      {email}
    </button>
  );
}
