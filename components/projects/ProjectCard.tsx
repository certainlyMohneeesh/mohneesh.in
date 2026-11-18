"use client";

import Image from "next/image";
import { projectInitials, splitProjectName } from "@/lib/projects";
import type { Project } from "@/lib/types";

const MAX_TAGS = 3;

/**
 * A project as a swatch with its care-label underneath. The whole card is one
 * click target (the title <button> stretches over it); the Live / Source links
 * sit above it at z-10 and stay independently clickable.
 */
export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const { title, tagline } = splitProjectName(project.name);
  const shownTags = project.tags.slice(0, MAX_TAGS);
  const hiddenCount = project.tags.length - shownTags.length;

  return (
    <article className="group relative flex h-full flex-col">
      <div className="pinked relative aspect-[4/3] overflow-hidden bg-raised transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-1 group-hover:-rotate-[0.6deg]">
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 330px"
            className="object-cover transition-[scale] duration-500 ease-[var(--ease-out)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="tile text-5xl font-semibold">{projectInitials(project.name)}</div>
        )}
      </div>

      <div className="mt-4 flex grow flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg leading-tight">
            <button
              type="button"
              onClick={() => onOpen(project)}
              aria-haspopup="dialog"
              className="cursor-pointer text-left outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-dashed focus-visible:after:outline-chalk focus-visible:after:outline-offset-4"
            >
              {title}
            </button>
          </h3>
          <span className="text-sm text-subtle tabular-nums">{project.year}</span>
        </div>

        {tagline && <p className="-mt-1 text-sm text-muted">{tagline}</p>}
        <p className="line-clamp-2 text-sm leading-relaxed text-subtle">
          {project.architectureHighlight}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-2">
          <ul className="flex flex-wrap gap-1.5">
            {shownTags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
            {hiddenCount > 0 && (
              <li className="tag" title={project.tags.slice(MAX_TAGS).join(", ")}>
                +{hiddenCount}
              </li>
            )}
          </ul>

          {project.links.length > 0 && (
            <div className="relative z-10 flex gap-4 text-sm">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} — ${link.name}`}
                  className="ln text-muted hover:text-fg"
                >
                  {link.icon === "github" ? link.name.toLowerCase() : "live"}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
