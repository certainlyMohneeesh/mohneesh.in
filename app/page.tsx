import Link from "next/link";
import { Avatar } from "@/components/home/Avatar";
import { Ledger } from "@/components/home/Ledger";
import { WorkIndex } from "@/components/home/WorkIndex";
import { LocalTime } from "@/components/LocalTime";
import { Mark } from "@/components/Mark";
import { Note } from "@/components/Note";
import { PostList } from "@/components/blog/PostRow";
import { getPublishedBlogPosts } from "@/lib/blog";
import { getFeaturedProjects } from "@/lib/projects";
import experienceData from "@/data/experience.json";

function SectionHead({ title, href, cta }: { title: string; href?: string; cta?: string }) {
  return (
    <div className="mb-5 flex items-baseline justify-between gap-4">
      <h2 className="text-xl">{title}</h2>
      {href && (
        <Link href={href} className="ln text-sm text-muted hover:text-fg">
          {cta}
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const featured = getFeaturedProjects();
  const recentPosts = getPublishedBlogPosts().slice(0, 3);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────
          The one orchestrated moment: after load, three hand-drawn marks are
          laid in sequence (strike → circle → underline), then the margin note
          writes itself on. Everything else on the page stays still. */}
      <section className="shell pt-14 sm:pt-24">
        <div className="flex items-center gap-4">
          <Avatar />
          <div>
            <h1 className="text-[clamp(1.9rem,6vw,2.6rem)] leading-none [font-stretch:88%]">
              Mohneesh Naidu
            </h1>
            <p className="mt-2 text-sm text-subtle">
              Mumbai, <LocalTime />
            </p>
          </div>
        </div>

        <div className="relative mt-10">
          <p className="max-w-[34rem] text-[1.0625rem] leading-[1.9] text-muted sm:text-lg sm:leading-[1.9]">
            23-year-old{" "}
            <span title="okay maybe a little bit">
              <Mark type="strike-through" on="mount" delay={500} iterations={1} padding={0}>
                wannabe cook
              </Mark>
            </span>{" "}
            software engineer. Textile technologist on paper,{" "}
            <Mark type="circle" tone="chalk" on="mount" delay={1150} padding={[2, 6]} iterations={2}>
              <span className="text-fg">systems engineer</span>
            </Mark>{" "}
            in practice — I build full-stack products and the real-time, protocol-level plumbing
            underneath them:{" "}
            <Mark type="underline" tone="sun" on="mount" delay={1900} multiline iterations={1} padding={2}>
              <span className="text-fg">WebSockets, Model Context Protocol, Postgres</span>
            </Mark>
            . Tech lead at MachaCo.store; founder of Cythical Labs.
          </p>

          <div className="mt-3">
            <Note margin top="3.4rem" delay={2.6}>
              (the textile degree is real)
            </Note>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="/Mohneesh_resume.pdf" className="btn btn-primary">
            Resume
          </a>
          <a href="https://github.com/certainlyMohneeesh" target="_blank" rel="noopener noreferrer" className="ln text-muted hover:text-fg">
            github
          </a>
          <a href="https://linkedin.com/in/mohneesh-naidu" target="_blank" rel="noopener noreferrer" className="ln text-muted hover:text-fg">
            linkedin
          </a>
          <a href="mailto:hi@mohneesh.in" className="ln text-muted hover:text-fg">
            email
          </a>
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────── */}
      <section className="shell mt-24">
        <SectionHead title="Experience" />
        <Ledger work={experienceData.work} education={experienceData.education} />
      </section>

      {/* ── Selected work ────────────────────────────────── */}
      <section className="shell mt-24">
        <SectionHead title="Selected work" href="/projects" cta="All work" />
        <WorkIndex projects={featured} />
      </section>

      {/* ── Writing ──────────────────────────────────────── */}
      <section className="shell mt-24">
        <SectionHead title="Writing" href="/blog" cta="All writing" />
        <PostList posts={recentPosts} />
      </section>

      {/* ── Close ────────────────────────────────────────── */}
      <section className="shell mt-28 text-center">
        <p className="mx-auto max-w-md text-muted">
          Building something with real-time, MCP or Postgres at its centre?
        </p>
        <p className="mt-6 text-[clamp(1.3rem,4.5vw,1.9rem)] font-semibold">
          <Mark type="circle" tone="chalk" padding={[8, 18]} iterations={2}>
            <a href="mailto:hi@mohneesh.in" className="px-1">
              hi@mohneesh.in
            </a>
          </Mark>
        </p>
      </section>
    </>
  );
}
