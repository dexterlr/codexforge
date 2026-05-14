"use client";

import type { CSSProperties } from "react";
import type { CreativeBrief } from "../creative-types";
import { buildCreativeReactKey } from "../creative-types";

export function CreativeBriefPanel({ brief }: { brief: CreativeBrief }) {
  return (
    <section data-codexforge-creative-brief-panel style={panel}>
      <div style={sectionHeader}>
        <span style={eyebrow}>Creative brief</span>
        <strong style={title}>{brief.title}</strong>
      </div>
      <p style={body}>{brief.prompt}</p>
      <div style={metaGrid}>
        <span style={metric}><b>Intent</b>{brief.intent}</span>
        <span style={metric}><b>Medium</b>{brief.medium}</span>
        <span style={metric}><b>Audience</b>{brief.audience}</span>
        <span style={metric}><b>Style</b>{brief.style}</span>
      </div>
      <div style={listGrid}>
        {brief.constraints.map((item, index) => (
          <span key={buildCreativeReactKey("brief-constraint", [brief.id, item], index)} style={chip}>{item}</span>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.22)", background: "rgba(7,12,24,0.78)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const sectionHeader: CSSProperties = { display: "grid", gap: 5 };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 20, lineHeight: 1.2 };
const body: CSSProperties = { margin: 0, color: "#dbeafe", fontSize: 13, lineHeight: 1.55, overflowWrap: "anywhere" };
const metaGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.15)", borderRadius: 8, padding: 10, display: "grid", gap: 4, color: "#cbd5e1", fontSize: 12, minWidth: 0, overflowWrap: "anywhere" };
const listGrid: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7 };
const chip: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(20,184,166,0.08)", borderRadius: 7, padding: "6px 8px", color: "#ccfbf1", fontSize: 12 };
