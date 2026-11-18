export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  isPublished: boolean;
  readTime?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

export interface BlogPostPreview {
  slug: string;
  frontmatter: BlogFrontmatter;
}

/* ─── Projects ──────────────────────────────────────────── */

export type ProjectCategory = "systems" | "ai-ml" | "web";

export interface ProjectLink {
  name: string;
  href: string;
  icon: "globe" | "github";
}

export interface Project {
  name: string;
  description: string;
  category: ProjectCategory;
  featured: boolean;
  year: string;
  /** One crisp line on how it's built — shown on the card face. */
  architectureHighlight: string;
  tags: string[];
  links: ProjectLink[];
  href?: string;
  image?: string;
}

/* ─── Experience ────────────────────────────────────────── */

export interface WorkEntry {
  id: string;
  company: string;
  duration: string;
  role: string;
  bullets: string[];
  link?: { url: string; label: string };
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  description: string;
}
