"use client";

import type { CSSProperties } from "react";
import type { MemoryInboxSourceSummary } from "../operator-memory-inbox-types";

export function MemoryInboxSourcePanel({ sources }: { sources: MemoryInboxSourceSummary[] }) {
  return (
    <section style={panel} data-codexforge-memory-inbox-source-panel="MemoryInboxSourcePanel renders">
      <strong>Sources</strong>
      {sources.map((source) => (
        <p key={source.source} style={text}>{source.source}: {source.count} card(s), {source.reviewRequiredCount} review required from {source.topSurface}</p>
      ))}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 14, display: "grid", gap: 8, minWidth: 0 };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
