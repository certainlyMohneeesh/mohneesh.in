"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { draw, type MarkType } from "@/lib/rough";
import { cn } from "@/lib/utils";

export interface MarkProps {
  type: MarkType;
  /** chalk (default) · sun (highlighter) · ink */
  tone?: "chalk" | "sun" | "ink";
  /** Draw when scrolled into view (default) or straight away. */
  on?: "view" | "mount";
  /** ms to wait before drawing — used to sequence the hero. */
  delay?: number;
  padding?: number | [number, number];
  strokeWidth?: number;
  iterations?: number;
  duration?: number;
  brackets?: ("left" | "right" | "top" | "bottom")[];
  /** Annotate each wrapped line separately (inline text only). */
  multiline?: boolean;
  /** Wrap block content (blockquotes, paragraphs) instead of inline text. */
  block?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Hand-drawn annotation around its children (rough-notation).
 * Renders plain text on the server, so there is no layout shift and nothing
 * is lost without JS; the SVG stroke is drawn lazily on the client.
 */
export function Mark({
  type,
  tone = "chalk",
  on = "view",
  delay = 0,
  padding,
  strokeWidth = 1.6,
  iterations,
  duration = 700,
  brackets,
  multiline,
  block,
  className,
  children,
}: MarkProps) {
  const ref = useRef<HTMLElement>(null);

  // Stable identity for object/array props so the effect only re-runs on change.
  const configKey = JSON.stringify({ type, padding, strokeWidth, iterations, duration, brackets, multiline });
  const config = useMemo(
    () => ({
      type,
      padding,
      strokeWidth,
      iterations,
      animationDuration: duration,
      brackets,
      multiline,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [configKey]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return draw(el, config, { delay, on });
  }, [config, delay, on]);

  const Target = block ? "div" : "span";
  const Wrap = block ? "div" : "span";

  return (
    <Wrap className={cn("mark", className)} data-tone={tone} data-type={type}>
      <Target ref={ref as never}>{children}</Target>
    </Wrap>
  );
}
