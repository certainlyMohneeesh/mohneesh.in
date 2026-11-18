import { DyeSwitch } from "@/components/DyeSwitch";

const socials = [
  { href: "https://github.com/certainlyMohneeesh", label: "github" },
  { href: "https://linkedin.com/in/mohneesh-naidu", label: "linkedin" },
  { href: "mailto:mohneesh@cyth.dev", label: "email" },
];

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-dashed border-line-strong py-10">
      <div className="shell flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <DyeSwitch />
          <p className="text-sm text-subtle">
            © {new Date().getFullYear()} Mohneesh Naidu
            <span
              title="↑ ↑ ↓ ↓ ← → ← → B A"
              className="ml-3 cursor-default font-hand text-base text-chalk"
            >
              psst, there&apos;s a code.
            </span>
          </p>
        </div>

        <nav aria-label="Social" className="flex gap-5 text-sm">
          {socials.map((s) => {
            const external = s.href.startsWith("http");
            return (
              <a
                key={s.href}
                href={s.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="ln text-muted hover:text-fg"
              >
                {s.label}
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
