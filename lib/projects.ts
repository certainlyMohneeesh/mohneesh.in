import projectsData from "@/data/projects.json";
import type { Project, ProjectCategory } from "@/lib/types";

const projects = projectsData.projects as Project[];

export type ProjectFilter = "all" | ProjectCategory;

export const PROJECT_FILTERS: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "all" },
  { id: "systems", label: "systems" },
  { id: "ai-ml", label: "ai-ml" },
  { id: "web", label: "web" },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/** "Nesternity - The Calmest CRM" → { title: "Nesternity", tagline: "The Calmest CRM" } */
export function splitProjectName(name: string) {
  const [title, ...rest] = name.split(" - ");
  return { title, tagline: rest.join(" - ") };
}

export function projectInitials(name: string) {
  return splitProjectName(name)
    .title.split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
