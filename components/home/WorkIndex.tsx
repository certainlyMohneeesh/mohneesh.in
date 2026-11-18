"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ProjectDrawer } from "@/components/projects/ProjectDrawer";
import { projectInitials, splitProjectName } from "@/lib/projects";
import type { Project } from "@/lib/types";

/**
 * Featured work as a plain index. On hover-capable pointers one swatch
 * preview trails the cursor (a single element, moved with transform, and its
 * rAF loop only runs while the pointer is over the list). Touch devices just
 * get the rows. Rows open the architecture drawer.
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [peek, setPeek] = useState<Project | null>(null);

  const peekEl = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const hovering = useRef(false);

  // The frame loop lives in a ref so it can re-schedule itself.
  const frame = useRef<() => void>(() => {});
  useEffect(() => {
    frame.current = () => {
      const el = peekEl.current;
      if (!el) {
        raf.current = 0;
        return;
      }
      const p = pos.current;
      const t = target.current;
      p.x += (t.x - p.x) * 0.18;
      p.y += (t.y - p.y) * 0.18;
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${((t.x - p.x) * 0.03).toFixed(2)}deg)`;
      const settled = Math.abs(t.x - p.x) < 0.4 && Math.abs(t.y - p.y) < 0.4;
      raf.current =
        hovering.current || !settled ? requestAnimationFrame(() => frame.current()) : 0;
    };
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const onEnter = (project: Project, e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    target.current = { x: e.clientX, y: e.clientY };
    if (!hovering.current) pos.current = { ...target.current };
    hovering.current = true;
    setPeek(project);
    if (!raf.current) raf.current = requestAnimationFrame(() => frame.current());
  };
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") target.current = { x: e.clientX, y: e.clientY };
  };
  const onLeave = () => {
    hovering.current = false;
    setPeek(null);
  };

  const open = (project: Project) => {
    setSelected(project);
    setDrawerOpen(true);
  };

  // Keep the last project mounted while the card fades out.
  const shown = peek ?? selected ?? projects[0];

  return (
    <>
      <ul className="dim-siblings border-b border-dashed border-line-strong" onPointerMove={onMove}>
        {projects.map((project) => {
          const { title, tagline } = splitProjectName(project.name);
          return (
            <li
              key={project.name}
              className="border-t border-dashed border-line-strong transition-opacity duration-200"
            >
              <button
                type="button"
                onClick={() => open(project)}
                onPointerEnter={(e) => onEnter(project, e)}
                onPointerLeave={onLeave}
                aria-haspopup="dialog"
                className="group grid w-full cursor-pointer grid-cols-[1fr_auto] gap-x-4 py-4 text-left"
              >
                <span className="min-w-0">
                  <span className="block text-[1.0625rem] font-semibold text-fg">{title}</span>
                  {tagline && <span className="block text-sm text-muted">{tagline}</span>}
                </span>
                <span className="pt-0.5 text-sm text-subtle tabular-nums">{project.year}</span>
                <span className="col-span-2 mt-1 line-clamp-2 text-sm text-subtle">
                  {project.architectureHighlight}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div ref={peekEl} aria-hidden="true" className="peek" data-show={peek !== null}>
        <div className="peek-card">
          <div className="pinked aspect-[4/3] overflow-hidden bg-raised">
            {shown.image ? (
              <Image
                src={shown.image}
                alt=""
                width={256}
                height={192}
                sizes="256px"
                className="size-full object-cover"
              />
            ) : (
              <div className="tile text-3xl font-semibold">{projectInitials(shown.name)}</div>
            )}
          </div>
        </div>
      </div>

      <ProjectDrawer project={selected} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
