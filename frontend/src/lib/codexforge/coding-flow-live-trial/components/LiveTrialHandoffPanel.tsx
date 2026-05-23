"use client";

import type { CSSProperties } from "react";
import type { LiveTrialHandoff } from "../coding-flow-live-trial-types";

export function LiveTrialHandoffPanel({ handoff }: { handoff: LiveTrialHandoff }) {
  return (
    <section style={panel} data-codexforge-live-trial-handoff-panel="LiveTrialHandoffPanel renders markdown trial report issue draft run history handoff workflow result handoff copy trial report allowed">
      <h2 style={title}>{handoff.title}</h2>
      <div style={grid}>
        {handoff.sections.map((section) => <span key={`live-trial-handoff-${section.sectionId}`} style={pill}>{section.title}</span>)}
      </div>
      <details style={details}>
        <summary style={summary}>Markdown trial report</summary>
        <pre style={pre}>{handoff.markdownTrialReport}</pre>
      </details>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 16 };
const title: CSSProperties = { fontSize: 20, letterSpacing: 0, margin: 0 };
const grid: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#dbeafe", fontSize: 12, fontWeight: 800, padding: "7px 9px" };
const details: CSSProperties = { color: "#dbeafe", fontSize: 13 };
const summary: CSSProperties = { cursor: "pointer", fontWeight: 900 };
const pre: CSSProperties = { background: "rgba(2,6,23,0.7)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, lineHeight: 1.45, margin: "10px 0 0", maxHeight: 260, overflow: "auto", padding: 12, whiteSpace: "pre-wrap" };
