"use client";

import type { CSSProperties } from "react";
import type { GeneratedFilePolicy } from "../repo-hygiene-types";

export function GeneratedFilePolicyPanel({ policy }: { policy: GeneratedFilePolicy }) {
  return (
    <article style={card}>
      <span style={tag}>Generated files</span>
      <h2 style={title}>Ignore policy</h2>
      <p style={copy}>{policy.policySummary}</p>
      <div style={columns}>
        <ListBlock title="Ignored patterns" items={policy.ignoredPatterns} />
        <ListBlock title="Reviewable work" items={policy.reviewableWork} />
        <ListBlock title="Never commit" items={policy.neverCommit} />
      </div>
    </article>
  );
}

function ListBlock({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div style={block}>
      <strong style={blockTitle}>{title}</strong>
      <ul style={list}>
        {items.map((item) => (
          <li key={item} style={listItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const card: CSSProperties = {
  background: "rgba(2,6,23,0.68)",
  border: "1px solid rgba(148,163,184,0.16)",
  borderRadius: 8,
  display: "grid",
  gap: 12,
  padding: 14,
};

const tag: CSSProperties = {
  color: "#93c5fd",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const title: CSSProperties = {
  fontSize: 18,
  letterSpacing: 0,
  margin: 0,
};

const copy: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0,
};

const columns: CSSProperties = {
  display: "grid",
  gap: 10,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
};

const block: CSSProperties = {
  background: "rgba(15,23,42,0.72)",
  border: "1px solid rgba(148,163,184,0.12)",
  borderRadius: 8,
  padding: 10,
};

const blockTitle: CSSProperties = {
  color: "#f8fafc",
  fontSize: 12,
};

const list: CSSProperties = {
  color: "#cbd5e1",
  display: "grid",
  fontSize: 12,
  gap: 4,
  lineHeight: 1.45,
  margin: "8px 0 0",
  paddingLeft: 16,
};

const listItem: CSSProperties = {
  overflowWrap: "anywhere",
};
