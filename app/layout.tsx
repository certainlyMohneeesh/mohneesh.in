import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Patrick_Hand } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EasterEgg from "@/components/EasterEgg";
import { Stitch } from "@/components/Stitch";
import { getPublishedBlogPosts } from "@/lib/blog";
import { DYE_BOOT_SCRIPT } from "@/lib/dye";
import { cn } from "@/lib/utils";

/* Sans — everything. Variable, with the optical-size + width axes so display
 * sizes can go slightly condensed without a second family. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

/* Mono — clock, dates and code only */
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

/* Hand — margin notes and tiny marks. One weight, loaded once. */
const hand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hand",
  display: "swap",
});

const description =
  "Full-stack and systems engineer. Tech lead at MachaCo.store, founder of Cythical Labs. Real-time services, Model Context Protocol, and Postgres-backed products.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mohneesh.in"),
  title: "Mohneesh — Full Stack Developer",
  description,
  keywords: ["Mohneesh", "Cythical Labs", "Full Stack Developer", "Next.js", "mohneesh.in"],
  authors: [{ name: "Mohneesh Naidu", url: "https://mohneesh.in" }],
  openGraph: {
    title: "Mohneesh — Full Stack Developer",
    description: "Full Stack Developer & Founder @ Cythical Labs",
    url: "https://mohneesh.in",
    siteName: "mohneesh.in",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohneesh — Full Stack Developer",
    description: "Full Stack Developer & Founder @ Cythical Labs",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1022",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Read at build time; only slug + title cross into the client palette.
  const posts = getPublishedBlogPosts().map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
  }));

  return (
    <html
      lang="en"
      data-dye="jamun"
      suppressHydrationWarning
      className={cn(bricolage.variable, jetbrains.variable, hand.variable)}
    >
      <head>
        {/* Pick the saved (or OS-preferred) dye lot before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: DYE_BOOT_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <Stitch />
        <Nav posts={posts} />
        <main id="top" className="flex-1">
          {children}
        </main>
        <Footer />
        <EasterEgg />
      </body>
    </html>
  );
}
