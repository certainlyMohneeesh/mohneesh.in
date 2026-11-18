"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DYES, applyDye } from "@/lib/dye";
import type { PaletteLink } from "@/components/Nav";

interface Command {
  id: string;
  group: string;
  label: string;
  keywords?: string;
  swatch?: readonly string[];
  run: () => void;
}

const EMAIL = "mohneesh@cyth.dev";

/**
 * ⌘K palette on a native <dialog> (focus trap, Esc, inert page — all free).
 * Loaded lazily by <Nav>; nothing here ships in the first-load bundle.
 */
export default function CommandPalette({
  open,
  onClose,
  posts,
}: {
  open: boolean;
  onClose: () => void;
  posts: PaletteLink[];
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  const finish = () => {
    setQuery("");
    setActive(0);
    onClose();
  };

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    const out = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");
    return [
      { id: "n-index", group: "Go to", label: "Index", keywords: "home", run: go("/") },
      { id: "n-work", group: "Go to", label: "Work", keywords: "projects", run: go("/projects") },
      { id: "n-writing", group: "Go to", label: "Writing", keywords: "blog journal", run: go("/blog") },
      { id: "n-contact", group: "Go to", label: "Contact", keywords: "email message hire", run: go("/contact") },
      ...posts.map((p) => ({
        id: `p-${p.slug}`,
        group: "Posts",
        label: p.title,
        run: go(`/blog/${p.slug}`),
      })),
      { id: "l-resume", group: "Links", label: "Resume", keywords: "cv pdf", run: out("/Mohneesh_resume.pdf") },
      { id: "l-gh", group: "Links", label: "GitHub", run: out("https://github.com/certainlyMohneeesh") },
      { id: "l-li", group: "Links", label: "LinkedIn", run: out("https://linkedin.com/in/mohneesh-naidu") },
      {
        id: "a-copy",
        group: "Actions",
        label: "Copy email address",
        keywords: EMAIL,
        run: () => void navigator.clipboard?.writeText(EMAIL).catch(() => {}),
      },
      ...DYES.map((d) => ({
        id: `d-${d.id}`,
        group: "Dye lot",
        label: `${d.name} — ${d.note}`,
        keywords: "theme colour color palette dark light",
        swatch: d.swatch,
        run: () => applyDye(d.id),
      })),
    ];
  }, [posts, router]);

  const results = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return commands;
    return commands.filter((c) => {
      const hay = `${c.label} ${c.keywords ?? ""} ${c.group}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [commands, query]);

  const current = Math.min(active, Math.max(results.length - 1, 0));

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [current, results]);

  const run = (cmd?: Command) => {
    if (!cmd) return;
    finish();
    cmd.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(results.length ? (current + 1) % results.length : 0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(results.length ? (current - 1 + results.length) % results.length : 0);
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[current]);
    }
  };

  let lastGroup = "";

  return (
    <dialog
      ref={dialogRef}
      className="palette"
      aria-label="Command palette"
      onClose={finish}
      onClick={(e) => {
        if (e.target === e.currentTarget) finish();
      }}
    >
      <div className="flex items-center gap-3 border-b border-dashed border-line-strong px-4">
        <span aria-hidden="true" className="font-hand text-lg text-chalk">
          go
        </span>
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[current] ? `cmd-${results[current].id}` : undefined}
          placeholder="Jump to a page, a post, a dye lot…"
          className="h-12 w-full bg-transparent text-[0.95rem] text-fg outline-none placeholder:text-subtle"
        />
      </div>

      <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[50dvh] overflow-y-auto p-2">
        {results.length === 0 && (
          <li className="px-3 py-6 text-center text-sm text-subtle">Nothing matches “{query}”.</li>
        )}
        {results.map((cmd, i) => {
          const heading = cmd.group !== lastGroup ? cmd.group : null;
          lastGroup = cmd.group;
          return (
            <li key={cmd.id} role="presentation">
              {heading && <div className="px-3 pt-3 pb-1 text-xs text-subtle">{heading}</div>}
              <div
                id={`cmd-${cmd.id}`}
                role="option"
                aria-selected={i === current}
                onMouseMove={() => setActive(i)}
                onClick={() => run(cmd)}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-[0.9375rem] text-muted aria-selected:bg-raised aria-selected:text-fg"
              >
                <span className="truncate">{cmd.label}</span>
                {cmd.swatch && (
                  <span
                    aria-hidden="true"
                    className="size-4 shrink-0 rounded-full border border-line-strong"
                    style={{ background: `linear-gradient(135deg, ${cmd.swatch[0]} 0 50%, ${cmd.swatch[2]} 50% 100%)` }}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
}
