"use client";

import type { CSSProperties } from "react";
import { buildMissionControlReactKey, type MissionReadinessReport } from "../mission-control-types";

export function MissionReadinessBoard({ readiness }: { readiness: MissionReadinessReport }) {
  return (
    <section style={section} data-mission-component="MissionReadinessBoard renders">
      <div style={top}>
        <div>
          <h2 style={heading}>Readiness Board</h2>
          <p style={subcopy}>Levels: ready, needs-review, preview-only, blocked, future-gated.</p>
        </div>
        <div style={score}>{readiness.score}</div>
      </div>
      <div style={grid}>
        {readiness.checks.map((check) => (
          <div key={buildMissionControlReactKey("ready", check.id)} style={card}>
            <div style={row}><span style={label}>{check.label}</span><span style={pill}>{check.level}</span></div>
            <p style={detail}>{check.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const section: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.42)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 14, alignItems: "start", flexWrap: "wrap" };
const heading: CSSProperties = { margin: 0, fontSize: 20 };
const subcopy: CSSProperties = { margin: "5px 0 0", color: "#94a3b8", fontSize: 13 };
const score: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "rgba(20,184,166,0.09)", borderRadius: 8, padding: "10px 14px", fontSize: 28, fontWeight: 900 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 12, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start" };
const label: CSSProperties = { fontWeight: 900, overflowWrap: "anywhere" };
const pill: CSSProperties = { color: "#c7d2fe", fontSize: 10, fontWeight: 900, textTransform: "uppercase", whiteSpace: "nowrap" };
const detail: CSSProperties = { margin: "8px 0 0", color: "#cbd5e1", fontSize: 13, lineHeight: 1.5 };
