import type { Metadata } from "next";
import { ProjectsShowcase } from "@/components/projects/ProjectsShowcase";
import { getAllProjects } from "@/lib/projects";

const description =
  "Selected work by Mohneesh Naidu — systems, AI/ML, and web projects, from a stateless MCP platform to real-time WebSocket tooling.";

export const metadata: Metadata = {
  title: "Work — Mohneesh",
  description,
  openGraph: {
    title: "Work — Mohneesh",
    description,
    url: "https://cyth.dev/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-14 sm:pt-24">
      <header className="shell-wide mb-14">
        <h1 className="text-[clamp(2.2rem,6vw,3.4rem)] leading-[1.05] [font-stretch:88%]">Work</h1>
        <p className="mt-3 max-w-md text-muted">
          Things I&apos;ve built, cut like swatches. Open one to see how it&apos;s put together.
        </p>
      </header>

      <div className="shell-wide">
        <ProjectsShowcase projects={getAllProjects()} />
      </div>
    </div>
  );
}
