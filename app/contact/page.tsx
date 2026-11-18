import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { Mark } from "@/components/Mark";

const description =
  "Get in touch with Mohneesh Naidu — projects, collaborations, or just a hello.";

export const metadata: Metadata = {
  title: "Contact — Mohneesh",
  description,
  openGraph: {
    title: "Contact — Mohneesh",
    description,
    url: "https://cyth.dev/contact",
    type: "website",
  },
};

const EMAIL = "mohneesh@cyth.dev";

const socials = [
  { label: "LinkedIn", handle: "mohneesh-naidu", href: "https://linkedin.com/in/mohneesh-naidu" },
  { label: "GitHub", handle: "certainlyMohneeesh", href: "https://github.com/certainlyMohneeesh" },
  { label: "Blog", handle: "blog.cyth.dev", href: "https://blog.cyth.dev" },
];

export default function ContactPage() {
  return (
    <div className="pt-14 sm:pt-24">
      <header className="shell mb-14">
        <h1 className="text-[clamp(2.2rem,6vw,3.4rem)] leading-[1.05] [font-stretch:88%]">
          Let&apos;s make{" "}
          <Mark type="highlight" tone="sun" on="mount" delay={400} iterations={1} padding={2}>
            something
          </Mark>{" "}
          together.
        </h1>
        <p className="mt-4 max-w-md text-muted">
          A project, a collaboration, or just a hello — I usually reply within a day or two.
        </p>
        <div className="mt-6">
          <CopyEmail email={EMAIL} />
        </div>
      </header>

      <div className="shell grid grid-cols-1 gap-14">
        <ContactForm email={EMAIL} />

        <div>
          <h2 className="mb-4 text-xl">Elsewhere</h2>
          <ul className="border-b border-dashed border-line-strong">
            {socials.map((s) => (
              <li key={s.label} className="border-t border-dashed border-line-strong">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline justify-between gap-4 py-4 text-muted transition-colors hover:text-fg"
                >
                  <span className="font-medium text-fg">{s.label}</span>
                  <span>{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
