"use client";

import type { CSSProperties } from "react";
import { buildCreativeReactKey } from "../creative-types";

type PreviewPlanListPanelProps = {
  marker: "blender" | "comfyui" | "unreal";
  eyebrow: string;
  title: string;
  badge: string;
  summary: string;
  groups: [string, string[]][];
};

export function PreviewPlanListPanel({ marker, eyebrow, title, badge, summary, groups }: PreviewPlanListPanelProps) {
  return (
    <section data-codexforge-preview-plan-panel={marker} style={panel}>
      <div style={header}>
        <div>
          <span style={eyebrowStyle}>{eyebrow}</span>
          <h2 style={titleStyle}>{title}</h2>
        </div>
        <span style={badgeStyle}>{badge}</span>
      </div>
      <p style={body}>{summary}</p>
      <div style={groupGrid}>
        {groups.map(([label, items], index) => (
          <div key={buildCreativeReactKey("preview-plan-group", [marker, label], index)} style={groupBox}>
            <strong>{label}</strong>
            {items.map((item, itemIndex) => (
              <span key={buildCreativeReactKey("preview-plan-item", [marker, label, item], itemIndex)}>{item}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(8,13,28,0.78)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "start", gap: 10, flexWrap: "wrap" };
const eyebrowStyle: CSSProperties = { color: "#99f6e4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const titleStyle: CSSProperties = { margin: "4px 0 0", fontSize: 18, letterSpacing: 0 };
const badgeStyle: CSSProperties = { border: "1px solid rgba(125,211,252,0.24)", borderRadius: 7, padding: "6px 8px", color: "#bae6fd", fontSize: 11, fontWeight: 800 };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.5 };
const groupGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))", gap: 9 };
const groupBox: CSSProperties = { borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 9, display: "grid", gap: 5, color: "#cbd5e1", fontSize: 12, lineHeight: 1.38, overflowWrap: "anywhere" };
