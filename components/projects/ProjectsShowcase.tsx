"use client";

import { useMemo, useState } from "react";
import { Mark } from "@/components/Mark";
import { PROJECT_FILTERS, type ProjectFilter } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";
import { ProjectDrawer } from "./ProjectDrawer";
import { useFlip } from "./use-flip";

/** Swatch grid + category filter (counts, FLIP reflow) + architecture drawer. */
export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const gridRef = useFlip<HTMLUListElement>(filter);

  const counts = useMemo(() => {
    const c: Record<ProjectFilter, number> = { all: projects.length, systems: 0, "ai-ml": 0, web: 0 };
    for (const p of projects) c[p.category] += 1;
    return c;
  }, [projects]);

  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const open = (project: Project) => {
    setSelected(project);
    setDrawerOpen(true);
  };

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap gap-x-6 gap-y-2">
        {PROJECT_FILTERS.map(({ id, label }) => {
          const active = filter === id;
          const text = (
            <>
              {label} <span className="text-subtle tabular-nums">{counts[id]}</span>
            </>
          );
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              disabled={counts[id] === 0}
              onClick={() => setFilter(id)}
              className={cn(
                "cursor-pointer py-1 text-[0.9375rem] transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                active ? "text-fg" : "text-muted hover:text-fg"
              )}
            >
              {active ? (
                <Mark key={id} type="underline" on="mount" iterations={2} padding={3} duration={500}>
                  {text}
                </Mark>
              ) : (
                text
              )}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <ul
        ref={gridRef}
        className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((project) => (
          <li key={project.name} data-flip={project.name}>
            <ProjectCard project={project} onOpen={open} />
          </li>
        ))}
      </ul>

      <ProjectDrawer project={selected} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
