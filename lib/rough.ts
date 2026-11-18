import type {
  RoughAnnotation,
  RoughAnnotationConfig,
} from "rough-notation/lib/model";

/**
 * Lazy rough-notation runtime.
 *
 *  - The library (~4 kB gz + roughjs) is dynamically imported the first time
 *    an annotated element is about to be needed — never in the initial bundle.
 *  - One shared IntersectionObserver serves every mark on the page.
 *  - A mark is drawn once, when ≥ half of it scrolls into view, then the
 *    observer lets go of it. Resizes are handled by the library itself.
 */
export type MarkType = RoughAnnotationConfig["type"];

type Lib = typeof import("rough-notation");
let libPromise: Promise<Lib> | undefined;
const loadLib = () => (libPromise ??= import("rough-notation"));

let observer: IntersectionObserver | undefined;
const waiting = new WeakMap<Element, () => void>();

function getObserver() {
  return (observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer?.unobserve(entry.target);
        waiting.get(entry.target)?.();
        waiting.delete(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.5 }
  ));
}

/** Webfonts change text metrics; wait (briefly) so marks fit the final glyphs. */
const fontsSettled = () =>
  Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((resolve) => setTimeout(resolve, 700)),
  ]);

export function draw(
  el: HTMLElement,
  config: RoughAnnotationConfig,
  { delay = 0, on = "view" }: { delay?: number; on?: "view" | "mount" } = {}
) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let annotation: RoughAnnotation | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let dead = false;

  const run = async () => {
    const [{ annotate }] = await Promise.all([loadLib(), fontsSettled()]);
    if (dead) return;
    annotation = annotate(el, { ...config, animate: !reduce });
    const show = () => {
      if (dead) return;
      annotation?.show();
      el.parentElement
        ?.querySelectorAll(":scope > svg.rough-annotation")
        .forEach((svg) => svg.setAttribute("aria-hidden", "true"));
    };
    if (delay && !reduce) timer = setTimeout(show, delay);
    else show();
  };

  if (on === "mount") {
    void run();
  } else {
    waiting.set(el, () => void run());
    getObserver().observe(el);
  }

  return () => {
    dead = true;
    clearTimeout(timer);
    observer?.unobserve(el);
    waiting.delete(el);
    annotation?.remove();
  };
}
