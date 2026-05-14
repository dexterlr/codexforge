"use client";

import type { CSSProperties } from "react";
import { buildMissionControlReactKey, type MissionHealthReport } from "../mission-control-types";

export function MissionHealthBoard({ report }: { report: MissionHealthReport }) {
  return (
    <section style={section} data-mission-component="MissionHealthBoard renders">
      <h2 style={heading}>Health Board</h2>
      <div style={grid}>
        {report.dimensions.map((dimension) => (
          <article key={buildMissionControlReactKey("health", dimension.id)} style={card}>
            <div style={topRow}>
              <span style={label}>{dimension.label}</span>
              <span style={pill}>{dimension.readiness}</span>
            </div>
            <div style={signal}>{dimension.signal}</div>
            <p style={detail}>{dimension.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const section: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.42)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const heading: CSSProperties = { margin: 0, fontSize: 20 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.5)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const topRow: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start" };
const label: CSSProperties = { fontWeight: 900, fontSize: 13, overflowWrap: "anywhere" };
const pill: CSSProperties = { border: "1px solid rgba(99,102,241,0.26)", borderRadius: 999, padding: "4px 7px", color: "#c7d2fe", fontSize: 10, fontWeight: 900, textTransform: "uppercase", whiteSpace: "nowrap" };
const signal: CSSProperties = { color: "#5eead4", fontSize: 18, fontWeight: 900, overflowWrap: "anywhere" };
const detail: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5 };
