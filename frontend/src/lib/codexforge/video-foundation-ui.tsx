"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

export type CodexForgePreviewLink = {
  href: string;
  label: string;
  primary?: boolean;
};

export function buildPreviewFoundationStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}

export function PreviewFoundationHero({
  phase,
  title,
  subtitle,
  primary,
  links,
  headingLevel = "h1",
}: {
  phase: string;
  title: string;
  subtitle: string;
  primary: CodexForgePreviewLink;
  links: CodexForgePreviewLink[];
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;

  return (
    <section style={previewStyles.hero}>
      <div>
        <span style={previewStyles.eyebrow}>{phase}</span>
        <Heading style={previewStyles.headline}>{title}</Heading>
        <p style={previewStyles.lede}>{subtitle}</p>
      </div>
      <div style={previewStyles.linkRow}>
        <PreviewFoundationLink link={{ ...primary, primary: true }} />
        {links.map((link, index) => (
          <PreviewFoundationLink key={buildPreviewFoundationStableKey("hero-link", index, link.href, link.label)} link={link} />
        ))}
      </div>
    </section>
  );
}

function PreviewFoundationLink({ link }: { link: CodexForgePreviewLink }) {
  const style = link.primary ? previewStyles.primaryLink : previewStyles.link;
  if (link.href.startsWith("#")) {
    return (
      <a href={link.href} style={style}>
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} style={style}>
      {link.label}
    </Link>
  );
}

export function PreviewFoundationCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article style={previewStyles.card}>
      <h2 style={previewStyles.title}>{title}</h2>
      {children}
    </article>
  );
}

export function PreviewFoundationSafetyStrip({ items }: { items: string[] }) {
  return (
    <section style={previewStyles.safetyStrip}>
      {items.map((item, index) => (
        <span key={buildPreviewFoundationStableKey("safety", index, item)} style={previewStyles.safetyPill}>
          {item}
        </span>
      ))}
    </section>
  );
}

export function PreviewFoundationEmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <section style={previewStyles.empty}>
      <h2 style={previewStyles.title}>{title}</h2>
      <p style={previewStyles.copy}>{message}</p>
    </section>
  );
}

export function PreviewFoundationPillList({ items }: { items: string[] }) {
  return (
    <div style={previewStyles.pillList}>
      {items.map((item, index) => (
        <span key={buildPreviewFoundationStableKey("pill", index, item)} style={previewStyles.pill}>
          {item}
        </span>
      ))}
    </div>
  );
}

export function PreviewFoundationCopy({ children }: { children: ReactNode }) {
  return <p style={previewStyles.copy}>{children}</p>;
}

export function PreviewFoundationDetail({
  summary,
  children,
}: {
  summary: string;
  children: ReactNode;
}) {
  return (
    <details style={previewStyles.advanced}>
      <summary>{summary}</summary>
      <div style={previewStyles.detailBody}>{children}</div>
    </details>
  );
}

export const previewStyles: Record<string, CSSProperties> = {
  shell: {
    color: "#f8fafc",
    display: "grid",
    gap: 16,
    minWidth: 0,
    width: "100%",
  },
  hero: {
    background:
      "radial-gradient(circle at 16% 0%, rgba(34,211,238,0.12), transparent 34%)," +
      "linear-gradient(145deg, rgba(7,16,30,0.94), rgba(9,18,34,0.9) 58%, rgba(15,23,42,0.84))",
    border: "1px solid rgba(45,212,191,0.2)",
    borderRadius: 18,
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
    padding: 22,
  },
  eyebrow: {
    color: "#5eead4",
    fontSize: 11,
    fontWeight: 900,
  },
  headline: {
    fontSize: "clamp(28px, 4vw, 48px)",
    letterSpacing: 0,
    lineHeight: 1.02,
    margin: "8px 0",
    overflowWrap: "normal",
    whiteSpace: "normal",
  },
  lede: {
    color: "rgba(226,232,240,0.78)",
    fontSize: 14,
    lineHeight: 1.55,
    margin: 0,
    maxWidth: 760,
  },
  linkRow: {
    alignContent: "flex-start",
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  link: {
    border: "1px solid rgba(125,211,252,0.18)",
    borderRadius: 12,
    color: "#dbeafe",
    fontSize: 12,
    fontWeight: 900,
    padding: "9px 11px",
    textDecoration: "none",
  },
  primaryLink: {
    background: "#5eead4",
    border: "1px solid rgba(45,212,191,0.4)",
    borderRadius: 12,
    color: "#042f2e",
    fontSize: 12,
    fontWeight: 900,
    padding: "9px 11px",
    textDecoration: "none",
  },
  grid: {
    display: "grid",
    gap: 12,
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
  },
  card: {
    background: "rgba(2,6,23,0.68)",
    border: "1px solid rgba(148,163,184,0.16)",
    borderRadius: 16,
    display: "grid",
    gap: 10,
    padding: 14,
  },
  title: {
    fontSize: 18,
    letterSpacing: 0,
    margin: 0,
  },
  copy: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 1.5,
    margin: 0,
  },
  safetyStrip: {
    background: "rgba(20,83,45,0.24)",
    border: "1px solid rgba(74,222,128,0.22)",
    borderRadius: 16,
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
  },
  safetyPill: {
    background: "rgba(22,101,52,0.34)",
    border: "1px solid rgba(134,239,172,0.24)",
    borderRadius: 999,
    color: "#dcfce7",
    fontSize: 12,
    fontWeight: 900,
    padding: "7px 9px",
  },
  empty: {
    background: "rgba(15,23,42,0.5)",
    border: "1px dashed rgba(148,163,184,0.28)",
    borderRadius: 16,
    display: "grid",
    gap: 8,
    padding: 14,
  },
  pillList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    background: "rgba(14,165,233,0.14)",
    border: "1px solid rgba(125,211,252,0.22)",
    borderRadius: 999,
    color: "#e0f2fe",
    fontSize: 12,
    fontWeight: 800,
    padding: "7px 9px",
  },
  advanced: {
    border: "1px solid rgba(125,211,252,0.16)",
    borderRadius: 16,
    color: "#cbd5e1",
    padding: 12,
  },
  detailBody: {
    display: "grid",
    gap: 8,
    marginTop: 10,
  },
};
