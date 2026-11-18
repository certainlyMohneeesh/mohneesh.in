# cyth.dev

Personal portfolio and writing site for Mohneesh Naidu, built around a
textile-inspired visual system: marked cloth, running stitches, and switchable
dye palettes.

## Stack

- Next.js 16 App Router and React 19
- TypeScript and Tailwind CSS 4
- MDX articles rendered on the server with Shiki syntax highlighting
- Local JSON and MDX files for project, experience, and blog content

## Getting started

Use [Bun](https://bun.sh/) to install the dependencies from the lockfile and
start the development server:

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available commands

| Command | Description |
| --- | --- |
| `bun dev` | Start the local development server |
| `bun run lint` | Run ESLint |
| `bun run build` | Create and verify an optimized production build |
| `bun start` | Serve the production build locally |

## Site structure

- `/` — introduction, experience, featured projects, and recent writing
- `/projects` — filterable project showcase with project detail drawers
- `/blog` — published articles with tag filters
- `/blog/[slug]` — statically generated article pages
- `/contact` — contact form and external profiles

Most pages use Server Components. Interactive features such as project filters,
the command palette, contact controls, and dye switcher are kept in focused
client components.

## Updating content

- **Projects:** edit `data/projects.json`. Project images may use Cloudinary
  URLs; the allowed remote image host is configured in `next.config.ts`.
- **Experience and education:** edit `data/experience.json`.
- **Writing:** add an `.mdx` file under `data/blog/` with frontmatter for
  `title`, `description`, `date`, `tags`, and `isPublished`. The filename
  becomes the article slug. Articles are pre-rendered at build time, so rebuild
  and redeploy after adding or changing a post.

## Design and performance

The interface draws on textile details: running stitches, pinked edges, and
three switchable dye palettes. It favors CSS and browser-native transitions,
honors reduced-motion preferences, and keeps client-side JavaScript limited
to interactive features.
