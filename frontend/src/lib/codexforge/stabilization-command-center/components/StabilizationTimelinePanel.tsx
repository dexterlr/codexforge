"use client";

import type { CSSProperties } from "react";
import { buildStabilizationStableKey, type StabilizationTimeline } from "../index";

export function StabilizationTimelinePanel({ timeline }: { timeline: StabilizationTimeline }) {
  return (
    <section style={panel} data-codexforge-stabilization-timeline-panel="StabilizationTimelinePanel renders">
      <div style={{ minWidth: 0 }}>
        <span style={eyebrow}>Timeline</span>
        <h2 style={heading}>Deterministic stabilization sequence</h2>
      </div>
      <div style={list}>
        {timeline.items.map((item) => (
          <article key={buildStabilizationStableKey("timeline", item.id)} style={itemStyle}>
            <span style={kind}>{item.label}</span>
            <strong style={title}>{item.detail}</strong>
            <div style={meta}>
              <span>{item.severity}</span>
              <span>{item.source}</span>
              <span>{item.relatedSurface}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: "4px 0 0", fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const itemStyle: CSSProperties = { borderLeft: "3px solid rgba(125,211,252,0.44)", background: "rgba(2,6,23,0.38)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0 };
const kind: CSSProperties = { color: "#bae6fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const title: CSSProperties = { fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
const meta: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, color: "#cbd5e1", fontSize: 11, overflowWrap: "anywhere" };
