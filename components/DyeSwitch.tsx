"use client";

import { useSyncExternalStore } from "react";
import { DYES, applyDye, currentDye, type DyeId } from "@/lib/dye";
import { cn } from "@/lib/utils";

/* The active lot lives on <html data-dye>; read it as an external store. */
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-dye"] });
  return () => mo.disconnect();
}
const getServer = (): DyeId => "jamun";

/** Three swatches. Clicking one dyes the whole page, bleeding from the click. */
export function DyeSwitch({ className }: { className?: string }) {
  const active = useSyncExternalStore(subscribe, currentDye, getServer);

  return (
    <div role="group" aria-label="Dye lot" className={cn("flex items-center gap-2.5", className)}>
      {DYES.map((d) => (
        <button
          key={d.id}
          type="button"
          title={`${d.name} — ${d.note}`}
          aria-label={`${d.name} (${d.note})`}
          aria-pressed={active === d.id}
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            applyDye(d.id, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
          }}
          className={cn(
            "grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-line-strong bg-raised transition-[scale,border-color] duration-200 hover:scale-110 sm:size-7",
            active === d.id && "border-chalk ring-2 ring-chalk ring-offset-2 ring-offset-bg"
          )}
        >
          <span
            aria-hidden="true"
            className="size-5 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${d.swatch[0]} 0 50%, ${d.swatch[2]} 50% 100%)`,
            }}
          />
        </button>
      ))}
    </div>
  );
}
