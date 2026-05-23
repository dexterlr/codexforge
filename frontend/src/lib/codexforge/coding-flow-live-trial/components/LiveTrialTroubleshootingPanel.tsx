"use client";

import type { CSSProperties } from "react";
import type { LiveTrialTroubleshooting } from "../coding-flow-live-trial-types";

export function LiveTrialTroubleshootingPanel({ guide }: { guide: LiveTrialTroubleshooting }) {
  return (
    <section style={panel} data-codexforge-live-trial-troubleshooting-panel="LiveTrialTroubleshootingPanel renders failed validation to /closed-loop apply blocked preview not ready run history missing">
      <h2 style={title}>{guide.title}</h2>
      <div style={grid}>
        {guide.items.slice(0, 6).map((item) => (
          <article key={`live-trial-troubleshooting-${item.issueId}`} style={box}>
            <h3 style={itemTitle}>{item.symptom}</h3>
            <p style={copy}>{item.safeNextStep}</p>
            <span style={meta}>Route: {item.route}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const title: CSSProperties = { fontSize: 20, letterSpacing: 0, margin: 0 };
const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" };
const box: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const itemTitle: CSSProperties = { fontSize: 15, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
const meta: CSSProperties = { color: "#93c5fd", fontSize: 12, fontWeight: 800 };
