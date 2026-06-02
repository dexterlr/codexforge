"use client";

import type { CSSProperties } from "react";
import type { RepoHygieneSummary } from "../repo-hygiene-types";
import { summarizeRepoHygiene } from "../repo-hygiene-summary";

export function RepoHygieneSummaryPanel({ summary }: { summary: RepoHygieneSummary }) {
  const passCount = summary.checks.filter((check) => check.status === "pass").length;
  const reviewCount = summary.checks.filter((check) => check.status === "review").length;
  const manualCount = summary.checks.filter((check) => check.status === "manual").length;

  return (
    <section style={panel} aria-label="Repo hygiene summary">
      <div style={stat}>
        <span style={statValue}>{passCount}</span>
        <span style={statLabel}>pass</span>
      </div>
      <div style={stat}>
        <span style={statValue}>{reviewCount}</span>
        <span style={statLabel}>review</span>
      </div>
      <div style={stat}>
        <span style={statValue}>{manualCount}</span>
        <span style={statLabel}>manual</span>
      </div>
      <p style={summaryText}>{summarizeRepoHygiene(summary)}</p>
    </section>
  );
}

const panel: CSSProperties = {
  alignItems: "center",
  background: "rgba(15,23,42,0.72)",
  border: "1px solid rgba(45,212,191,0.18)",
  borderRadius: 8,
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))",
  padding: 14,
};

const stat: CSSProperties = {
  background: "rgba(2,6,23,0.62)",
  border: "1px solid rgba(148,163,184,0.12)",
  borderRadius: 8,
  display: "grid",
  gap: 4,
  padding: 10,
};

const statValue: CSSProperties = {
  color: "#5eead4",
  fontSize: 24,
  fontWeight: 900,
};

const statLabel: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const summaryText: CSSProperties = {
  color: "#dbeafe",
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0,
};
