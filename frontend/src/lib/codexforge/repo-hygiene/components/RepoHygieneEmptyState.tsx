"use client";

import type { CSSProperties } from "react";

export function RepoHygieneEmptyState({ actions }: { actions: readonly string[] }) {
  return (
    <article style={card}>
      <span style={tag}>Manual follow-up</span>
      <h2 style={title}>Nothing is deleted here</h2>
      <ul style={list}>
        {actions.map((action) => (
          <li key={action} style={listItem}>
            {action}
          </li>
        ))}
      </ul>
    </article>
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

const list: CSSProperties = {
  color: "#cbd5e1",
  display: "grid",
  fontSize: 13,
  gap: 6,
  lineHeight: 1.5,
  margin: 0,
  paddingLeft: 18,
};

const listItem: CSSProperties = {
  overflowWrap: "anywhere",
};
