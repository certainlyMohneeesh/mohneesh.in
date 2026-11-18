import Image from "next/image";
import React from "react";

import { CodeBlock } from "./CodeBlock";
import { Mark } from "@/components/Mark";

/* ─── Helper: extract raw text from React nodes ─────── */
function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (
    React.isValidElement(node) &&
    node.props &&
    typeof node.props === "object"
  ) {
    return getTextContent(
      (node.props as { children?: React.ReactNode }).children
    );
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }
  return "";
}

/* ─── Helper: slugify a heading for anchor links ───── */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type PropsWithChildren = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export const BlogMDXComponents = {
  img: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => (
    <Image
      src={src}
      alt={alt}
      width={680}
      height={380}
      style={{ borderRadius: "4px", maxWidth: "100%", height: "auto" }}
      {...props}
    />
  ),

  h1: ({ children, ...props }: PropsWithChildren) => (
    <h1 {...props}>{children}</h1>
  ),

  h2: ({ children, ...props }: PropsWithChildren) => {
    const text = getTextContent(children);
    const id = slugify(text);
    return (
      <h2 id={id} {...props}>
        {children}
        <a href={`#${id}`} className="heading-anchor" aria-hidden="true">
          #
        </a>
      </h2>
    );
  },

  h3: ({ children, ...props }: PropsWithChildren) => {
    const text = getTextContent(children);
    const id = slugify(text);
    return (
      <h3 id={id} {...props}>
        {children}
        <a href={`#${id}`} className="heading-anchor" aria-hidden="true">
          #
        </a>
      </h3>
    );
  },

  p: ({ children, ...props }: PropsWithChildren) => (
    <p {...props}>{children}</p>
  ),

  ul: ({ children, ...props }: PropsWithChildren) => (
    <ul {...props}>{children}</ul>
  ),

  ol: ({ children, ...props }: PropsWithChildren) => (
    <ol {...props}>{children}</ol>
  ),

  li: ({ children, ...props }: PropsWithChildren) => (
    <li {...props}>{children}</li>
  ),

  pre: ({ children, ...props }: PropsWithChildren) => {
    const codeText = getTextContent(children);
    return (
      <CodeBlock rawCode={codeText}>
        <pre {...props}>{children}</pre>
      </CodeBlock>
    );
  },

  code: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => {
    if (className?.includes("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code {...props}>
        {children}
      </code>
    );
  },

  // Editorial emphasis is hand-underlined as you scroll to it …
  em: ({ children }: PropsWithChildren) => (
    <Mark type="underline" iterations={1} padding={2} duration={500}>
      <em>{children}</em>
    </Mark>
  ),

  // … quotes get a hand-drawn bracket …
  blockquote: ({ children, ...props }: PropsWithChildren) => (
    <Mark block type="bracket" brackets={["left"]} padding={6} iterations={1}>
      <blockquote {...props}>{children}</blockquote>
    </Mark>
  ),

  // … and <mark>…</mark> in MDX is a highlighter pass.
  mark: ({ children }: PropsWithChildren) => (
    <Mark type="highlight" tone="sun" iterations={1} padding={2}>
      {children}
    </Mark>
  ),

  a: ({
    href,
    children,
    ...props
  }: {
    href?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
};
