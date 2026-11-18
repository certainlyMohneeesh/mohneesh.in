import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPostSlugs, getRelatedPosts } from "@/lib/blog";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { PostList } from "@/components/blog/PostRow";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

/* ─── Pre-render local post routes; unknown slugs return 404 ──────── */
export async function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({ slug }));
}

/* ─── Generate metadata for each blog post ──────────── */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    return { title: "Post Not Found" };
  }

  const { title, description } = post.frontmatter;

  return {
    title: `${title} — Mohneesh`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://cyth.dev/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ─── Blog Post Page ────────────────────────────────── */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <>
      <section className="pt-12 sm:pt-20">
        <div className="shell">
          <BlogArticle frontmatter={post.frontmatter} content={post.content} />

          {relatedPosts.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-5 text-xl">Keep reading</h2>
              <PostList posts={relatedPosts} />
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/blog" className="btn">
              All writing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
