import Link from "next/link";
import { cn, formatPostDate } from "@/lib/utils";
import type { BlogPostPreview } from "@/lib/types";

/**
 * Journal list. On hover-capable devices the other rows dim (`.dim-siblings`);
 * title and date are tied by a dotted leader. Rows stay static — no entrance
 * animation — so hover opacity is never fought by a fill-mode.
 */
export function PostList({
  posts,
  className,
}: {
  posts: BlogPostPreview[];
  className?: string;
}) {
  return (
    <ul className={cn("dim-siblings border-b border-dashed border-line-strong", className)}>
      {posts.map((post) => (
        <PostRow key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export function PostRow({ post }: { post: BlogPostPreview }) {
  const { title, date, readTime } = post.frontmatter;

  return (
    <li className="border-t border-dashed border-line-strong transition-opacity duration-200">
      <Link href={`/blog/${post.slug}`} className="group flex items-baseline gap-3 py-4">
        <span className="min-w-0 text-[1.0625rem] font-medium text-fg">{title}</span>
        <span
          aria-hidden="true"
          className="min-w-6 flex-1 -translate-y-[0.2em] border-b border-dotted border-line-strong"
        />
        <span className="flex shrink-0 gap-3 text-sm text-subtle tabular-nums">
          {readTime && <span className="max-sm:hidden">{readTime}</span>}
          <time dateTime={date}>{formatPostDate(date)}</time>
        </span>
      </Link>
    </li>
  );
}
