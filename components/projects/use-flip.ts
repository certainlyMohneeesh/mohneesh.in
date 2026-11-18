import { useLayoutEffect, useRef } from "react";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Minimal FLIP for a keyed list.
 *
 * Tag each item with `data-flip="<stable key>"`, attach the returned ref to
 * the list, and pass anything that triggers a re-layout (e.g. the active
 * filter) as `trigger`. Survivors glide from their old slot to the new one;
 * newly-mounted items fade/scale in. Positions are measured relative to the
 * list, so scrolling between renders can't cause phantom moves.
 */
export function useFlip<T extends HTMLElement>(trigger: unknown) {
  const ref = useRef<T>(null);
  const previous = useRef(new Map<string, { x: number; y: number }>());

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const origin = root.getBoundingClientRect();
    const next = new Map<string, { x: number; y: number }>();
    const hadItems = previous.current.size > 0;

    root.querySelectorAll<HTMLElement>("[data-flip]").forEach((el) => {
      const key = el.dataset.flip!;
      const rect = el.getBoundingClientRect();
      const pos = { x: rect.left - origin.left, y: rect.top - origin.top };
      next.set(key, pos);
      if (reduce) return;

      const before = previous.current.get(key);
      if (before) {
        const dx = before.x - pos.x;
        const dy = before.y - pos.y;
        if (dx || dy) {
          el.animate(
            { translate: [`${dx}px ${dy}px`, "0 0"] },
            { duration: 420, easing: EASE }
          );
        }
      } else if (hadItems) {
        el.animate(
          { opacity: [0, 1], scale: [0.96, 1] },
          { duration: 360, easing: EASE }
        );
      }
    });

    previous.current = next;
  }, [trigger]);

  return ref;
}
