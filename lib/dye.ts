/**
 * Dye lots — the site's switchable palettes. Colours live in app/globals.css
 * (`:root[data-dye="…"]`); this file only names them and swaps the attribute.
 * `swatch` is [cloth, ink, chalk], for previews in the switcher and palette.
 */
export const DYE_KEY = "cyth-dye";

export const DYES = [
  { id: "jamun", name: "Jamun", note: "black plum", swatch: ["#1a1022", "#e8f1d9", "#ff8fb5"] },
  { id: "neel", name: "Neel", note: "indigo", swatch: ["#e3e8f4", "#121a4d", "#b81d52"] },
  { id: "hara", name: "Hara", note: "bottle green", swatch: ["#0b2622", "#ffe4ec", "#ffc93c"] },
] as const;

export type DyeId = (typeof DYES)[number]["id"];

/**
 * Runs in <head> before first paint so the right lot is on screen from the
 * very first frame (no flash). Falls back to the OS colour scheme.
 */
export const DYE_BOOT_SCRIPT = `(function(){try{var d=localStorage.getItem("${DYE_KEY}");if(!/^(jamun|neel|hara)$/.test(d||"")){d=matchMedia("(prefers-color-scheme: light)").matches?"neel":"jamun"}document.documentElement.dataset.dye=d}catch(e){}})();`;

export function currentDye(): DyeId {
  const d = document.documentElement.dataset.dye;
  return DYES.some((x) => x.id === d) ? (d as DyeId) : "jamun";
}

/**
 * Switch lot. Where the browser supports view transitions the new colour
 * bleeds out from `origin` (the clicked swatch); otherwise it just swaps.
 */
export function applyDye(id: DyeId, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const lot = DYES.find((d) => d.id === id)!;

  const commit = () => {
    root.dataset.dye = id;
    try {
      localStorage.setItem(DYE_KEY, id);
    } catch {
      /* private mode — the choice just won't persist */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", lot.swatch[0]);
  };

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce || id === currentDye()) {
    commit();
    return;
  }

  root.style.setProperty("--bleed-x", `${origin?.x ?? window.innerWidth / 2}px`);
  root.style.setProperty("--bleed-y", `${origin?.y ?? 0}px`);
  root.dataset.vt = "dye";
  const t = document.startViewTransition(commit);
  t.finished.finally(() => {
    delete root.dataset.vt;
  });
}
