"use client";

import { useEffect, useRef, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context / denied) — the mailto link still works.
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <a href={`mailto:${email}`} className="ln text-lg font-semibold">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="cursor-pointer font-hand text-lg text-chalk transition-opacity hover:opacity-80"
      >
        {copied ? "copied!" : "copy"}
      </button>
      <span className="sr-only" role="status">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}
