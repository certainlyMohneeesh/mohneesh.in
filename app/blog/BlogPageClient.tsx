"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mark } from "@/components/Mark";
import { PostList } from "@/components/blog/PostRow";
import { cn } from "@/lib/utils";
import type { BlogPostPreview } from "@/lib/types";

const hasTag = (post: BlogPostPreview, tag: string) =>
  post.frontmatter.tags.some((t) => t.toLowerCase() === tag);

export default function BlogPageClient({
  initialPosts,
  initialTags,
}: {
  initialPosts: BlogPostPreview[];
  initialTags: string[];
}) {
  // The URL is the single source of truth for the active tag.
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag")?.toLowerCase() ?? null;

  const posts = useMemo(
    () => (selectedTag ? initialPosts.filter((p) => hasTag(p, selectedTag)) : initialPosts),
    [initialPosts, selectedTag]
  );

  return (
    <div className="pt-14 sm:pt-24">
      <header className="shell mb-12">
        <h1 className="text-[clamp(2.2rem,6vw,3.4rem)] leading-[1.05] [font-stretch:88%]">Writing</h1>
        <p className="mt-3 max-w-md text-muted">
          Notes on engineering, full-stack work and creative coding.
        </p>

        <nav aria-label="Filter by tag" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
          {[null, ...initialTags].map((tag) => {
            const active = tag === selectedTag;
            const label = tag ?? "all";
            return (
              <Link
                key={label}
                href={tag ? `/blog?tag=${encodeURIComponent(tag)}` : "/blog"}
                scroll={false}
                aria-current={active ? "true" : undefined}
                className={cn("py-0.5 transition-colors", active ? "text-fg" : "text-muted hover:text-fg")}
              >
                {active ? (
                  <Mark key={label} type="underline" on="mount" iterations={2} padding={3} duration={500}>
                    {label}
                  </Mark>
                ) : (
                  label
                )}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="shell">
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <p className="py-12 text-center text-subtle">Nothing under that tag yet.</p>
        )}
      </div>
    </div>
  );
}
