"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

// The palette is only fetched the first time it is asked for.
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), {
  ssr: false,
});

const links = [
  { href: "/", label: "index" },
  { href: "/projects", label: "work" },
  { href: "/blog", label: "writing" },
  { href: "/contact", label: "contact" },
];

export interface PaletteLink {
  slug: string;
  title: string;
}

export default function Nav({ posts }: { posts: PaletteLink[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setArmed(true);
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openPalette = () => {
    setArmed(true);
    setOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-dashed border-line bg-bg/92">
      <div className="shell flex min-h-14 flex-col gap-2 py-2 sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0">
        <Link href="/" className="shrink-0 text-lg font-semibold tracking-tight">
          mohneesh<span className="text-chalk">.</span>in
        </Link>

        <div className="flex items-center justify-between gap-3 border-t border-dashed border-line pt-1 sm:justify-end sm:border-0 sm:pt-0">
          <nav
            aria-label="Primary"
            className="flex min-w-0 flex-1 items-center justify-between gap-2 text-sm sm:flex-none sm:gap-6 sm:text-[0.9375rem]"
          >
            {links.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`ln py-2.5 sm:py-0 ${active ? "" : "text-muted hover:text-fg"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            aria-haspopup="dialog"
            title="Command palette (Ctrl/⌘ + K)"
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-md border border-dashed border-line-strong font-mono text-xs text-muted transition-colors hover:border-chalk hover:text-fg lg:size-7"
          >
            <Search aria-hidden="true" className="size-4 lg:hidden" />
            <span className="max-lg:hidden">K</span>
          </button>
        </div>
      </div>

      {armed && <CommandPalette open={open} onClose={() => setOpen(false)} posts={posts} />}
    </header>
  );
}
