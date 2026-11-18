import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeShiki from "@shikijs/rehype";
import { BlogMDXComponents } from "./BlogMDXComponents";
import { formatPostDate } from "@/lib/utils";
import type { BlogFrontmatter } from "@/lib/types";

export function BlogArticle({
  frontmatter,
  content,
}: {
  frontmatter: BlogFrontmatter;
  content: string;
}) {
  const { title, description, tags, date, readTime } = frontmatter;

  return (
    <>
      <article>
        <header className="mb-12">
          <Link href="/blog" transitionTypes={["nav-back"]} className="ln mb-8 text-sm text-muted hover:text-fg">
            Writing
          </Link>

          <h1 className="text-[clamp(1.9rem,5vw,2.7rem)] leading-[1.1] [font-stretch:92%]">{title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>

          <p className="mt-6 text-sm text-subtle tabular-nums">
            <time dateTime={date}>{formatPostDate(date)}</time>
            {readTime && <span>, {readTime} read</span>}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
                className="tag tag-link"
              >
                {tag}
              </Link>
            ))}
          </div>
        </header>

        <div className="prose-blog">
          <MDXRemote
            source={content}
            components={BlogMDXComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypeShiki, { theme: "github-dark" }]],
              },
            }}
          />
        </div>
      </article>

      {/* CSS-only: fades in via a scroll-driven animation, no listeners */}
      <a href="#top" className="to-top" aria-label="Back to top">
        up
      </a>
    </>
  );
}
