"use client";

import { useSyncExternalStore } from "react";

const fmt = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
  timeZone: "Asia/Kolkata",
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

/** Live IST clock. Fixed-width tabular figures, so it never jitters. */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => fmt.format(new Date()),
    () => "--:--:--"
  );
  return (
    <time suppressHydrationWarning className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {time} IST
    </time>
  );
}
