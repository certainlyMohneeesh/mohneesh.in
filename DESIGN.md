# cyth.dev — design notes

**Concept: marked cloth.** The site is a bolt of cloth being marked up by a pattern-maker
(the author is a textile technologist turned systems engineer).

| Idea | Where |
| --- | --- |
| Hand-drawn marks (rough-notation) | `components/Mark.tsx`, `lib/rough.ts` |
| Running-stitch scroll progress (CSS only) | `.stitch` in `app/globals.css`, `components/Stitch.tsx` |
| Pinked-edge swatches (CSS mask) | `.pinked` |
| Dye lots (3 palettes, no-flash, bleed transition) | `:root[data-dye]`, `lib/dye.ts`, `components/DyeSwitch.tsx` |
| Route transition ("unroll") | `app/template.tsx`, `.fold` / `.unfold` |
| Blog article loading ("unrolling") | `app/blog/[slug]/loading.tsx` |
| Touch navigation and always-visible code actions | `components/Nav.tsx`, `components/blog/CodeBlock.tsx` |
| ⌘K palette (lazy) | `components/CommandPalette.tsx` |

## Performance rules
- Server Components by default. Client islands: Nav, CommandPalette (lazy), DyeSwitch, LocalTime,
  Avatar, WorkIndex, ProjectsShowcase, ContactForm, CopyEmail, Mark.
- Pre-render local blog post routes at build time; unknown or unpublished slugs return 404.
- rough-notation is `import()`-ed on first use and drawn once per mark; one shared IntersectionObserver.
- No animation library, no canvas, no infinite animations, no blend modes. Motion is CSS
  (scroll-driven animations, View Transitions, `::details-content`) or one rAF loop that only
  runs while the pointer is over the work list.
- All motion respects `prefers-reduced-motion`.

## Adding a dye lot
Add a `:root[data-dye="name"]` block in `globals.css` (keep text ≥ 4.5:1), add it to `DYES` and to
the regex in `DYE_BOOT_SCRIPT` in `lib/dye.ts`.
