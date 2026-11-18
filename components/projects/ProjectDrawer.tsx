"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import { Mark } from "@/components/Mark";
import { splitProjectName } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

/**
 * Architecture drawer on a native modal <dialog>: focus trap, Esc, inert
 * background and top-layer stacking for free. `open` is driven by the parent;
 * the last project stays mounted while the exit transition plays.
 */
export function ProjectDrawer({
  project,
  open,
  onClose,
}: {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  const { title, tagline } = project
    ? splitProjectName(project.name)
    : { title: "", tagline: "" };

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        // Clicks on ::backdrop target the <dialog> itself
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project && (
        <div key={project.name} className="flex min-h-full flex-col gap-7 p-7">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm text-subtle">
              <span className="text-chalk">{project.category}</span>
              <span className="tabular-nums">, {project.year}</span>
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="cursor-pointer font-hand text-xl leading-none text-muted transition-colors hover:text-chalk"
            >
              close
            </button>
          </div>

          {project.image && (
            <div className="pinked relative aspect-video overflow-hidden bg-raised">
              <Image src={project.image} alt="" fill sizes="30rem" className="object-cover" />
            </div>
          )}

          <header>
            <h2 id={titleId} className="text-3xl leading-tight">
              {title}
            </h2>
            {tagline && <p className="mt-1 text-muted">{tagline}</p>}
          </header>

          <p className="leading-[1.75] text-muted">{project.description}</p>

          <section>
            <h3 className="mb-3 text-base">How it&apos;s built</h3>
            <Mark block type="bracket" brackets={["left"]} padding={6} iterations={1} className="block pl-5">
              <p className="text-[0.95rem] leading-relaxed text-fg">{project.architectureHighlight}</p>
            </Mark>
          </section>

          <section>
            <h3 className="mb-3 text-base">Stack</h3>
            <ul className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </section>

          {project.links.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2.5 pt-2">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("btn", link.icon === "globe" && "btn-primary")}
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
