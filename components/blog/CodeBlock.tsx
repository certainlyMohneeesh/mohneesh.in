"use client";

import { useRef, useState, type ReactNode } from "react";

/** Wraps a shiki <pre> with a copy button that appears on hover/focus. */
export function CodeBlock({ children, rawCode }: { children: ReactNode; rawCode: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="group relative">
      {children}
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        className="code-copy absolute top-2 right-2 cursor-pointer rounded border border-dashed border-white/25 bg-black/50 px-2 py-0.5 font-hand text-base text-white/80 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 hover:text-white"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
