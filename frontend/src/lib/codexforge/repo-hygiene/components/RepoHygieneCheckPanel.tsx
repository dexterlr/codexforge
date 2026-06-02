"use client";

import type { CSSProperties } from "react";
import type { RepoHygieneCheck } from "../repo-hygiene-types";

export function RepoHygieneCheckPanel({ checks }: { checks: readonly RepoHygieneCheck[] }) {
  return (
    <article style={card}>
      <span style={tag}>Checklist</span>
      <h2 style={title}>Cleanup posture</h2>
      <div style={list}>
        {checks.map((check) => (
          <div key={check.id} style={item}>
            <div style={itemHeader}>
              <strong style={itemTitle}>{check.label}</strong>
              <span style={badge(check.status)}>{check.status}</span>
            </div>
            <p style={copy}>{check.evidence}</p>
            <p style={next}>{check.nextStep}</p>
          </div>
        ))}
      </div>
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
  display: "grid",
  gap: 10,
};

const item: CSSProperties = {
  background: "rgba(15,23,42,0.72)",
  border: "1px solid rgba(148,163,184,0.12)",
  borderRadius: 8,
  display: "grid",
  gap: 6,
  padding: 10,
};

const itemHeader: CSSProperties = {
  alignItems: "center",
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
};

const itemTitle: CSSProperties = {
  fontSize: 13,
  overflowWrap: "anywhere",
};

const copy: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
};

const next: CSSProperties = {
  color: "#a7f3d0",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
};

function badge(status: RepoHygieneCheck["status"]): CSSProperties {
  const colors: Record<RepoHygieneCheck["status"], string> = {
    pass: "#86efac",
    review: "#fde68a",
    manual: "#fca5a5",
  };

  return {
    border: "1px solid rgba(148,163,184,0.18)",
    borderRadius: 6,
    color: colors[status],
    fontSize: 10,
    fontWeight: 900,
    padding: "4px 6px",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  };
}
