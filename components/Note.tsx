import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Handwritten margin note with a hand-drawn arrow. Pure CSS write-on (see
 * `.note` in globals.css). At ≥1100px it hangs in the right margin
 * (`margin`), below that it flows inline under the text it belongs to.
 */
export function Note({
  children,
  margin = false,
  delay = 2.4,
  top,
  className,
}: {
  children: ReactNode;
  margin?: boolean;
  /** seconds before the note writes itself on */
  delay?: number;
  /** vertical offset inside the positioned parent (margin mode) */
  top?: string;
  className?: string;
}) {
  return (
    <span
      className={cn("note", margin && "note-margin", className)}
      style={{ "--note-delay": `${delay}s`, "--note-top": top } as CSSProperties}
    >
      <svg viewBox="0 0 36 28" fill="none" aria-hidden="true">
        <path
          pathLength={1}
          d="M33 24C22 22 9 15 6 5M6 5L3 12M6 5L13 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="note-text">{children}</span>
    </span>
  );
}
