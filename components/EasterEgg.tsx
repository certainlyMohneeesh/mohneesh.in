"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const CONSOLE_ART = `
 ██████╗██╗   ██╗████████╗██╗  ██╗
██╔════╝╚██╗ ██╔╝╚══██╔══╝██║  ██║
██║      ╚████╔╝    ██║   ███████║
██║       ╚██╔╝     ██║   ██╔══██║
╚██████╗   ██║      ██║   ██║  ██║
 ╚═════╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝

 mohneesh@cyth.dev  ·  Cythical Labs
 ↑ ↑ ↓ ↓ ← → ← → B A  for a surprise
`;

export const EGG_EVENT = "cyth:egg";

/** Konami code + console greeting. Other components can fire `cyth:egg`. */
export default function EasterEgg() {
  const seq = useRef<string[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const [line, setLine] = useState("you found the Konami code. have a great day.");

  useEffect(() => {
    console.log(`%c${CONSOLE_ART}`, "color:#ff8fb5;font-family:monospace;font-size:10px;line-height:1.4;");
    console.log("%cHello, fellow developer — view-source is always welcome here.", "color:#8d987f;font-family:monospace;font-size:11px;");
  }, []);

  useEffect(() => {
    const show = (text?: string) => {
      if (text) setLine(text);
      timers.current.forEach(clearTimeout);
      setPhase("in");
      timers.current = [
        setTimeout(() => setPhase("out"), 3500),
        setTimeout(() => setPhase("idle"), 4000),
      ];
    };

    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      seq.current = [...seq.current, key].slice(-KONAMI.length);
      if (seq.current.join() !== KONAMI.join()) return;
      seq.current = [];
      show("you found the Konami code. have a great day.");
    };
    const onEgg = (e: Event) => show((e as CustomEvent<string>).detail);

    window.addEventListener("keydown", onKey);
    window.addEventListener(EGG_EVENT, onEgg);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(EGG_EVENT, onEgg);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-8 z-[60] flex justify-center px-4">
      {phase !== "idle" && (
        <div
          className={cn(
            "rounded-lg border border-dashed border-chalk bg-bg px-5 py-3 text-center",
            phase === "in"
              ? "animate-[toast-in_0.35s_var(--ease-out)_forwards]"
              : "animate-[toast-out_0.3s_var(--ease-out)_forwards]"
          )}
        >
          <div className="font-hand text-xl text-chalk">unlocked</div>
          <div className="text-sm text-muted">{line}</div>
        </div>
      )}
    </div>
  );
}
