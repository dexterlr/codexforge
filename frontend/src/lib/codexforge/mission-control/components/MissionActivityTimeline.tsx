"use client";

import type { CSSProperties } from "react";
import { buildMissionControlReactKey, type MissionActivityTimeline as Timeline } from "../mission-control-types";

export function MissionActivityTimeline({ timeline }: { timeline: Timeline }) {
  return (
    <section style={section} data-mission-component="MissionActivityTimeline renders">
      <h2 style={heading}>Activity Timeline</h2>
      <div style={stack}>
        {timeline.items.map((item) => (
          <article key={buildMissionControlReactKey("activity", item.id)} style={entry}>
            <div style={marker} />
            <div style={body}>
              <div style={row}><span style={label}>{item.label}</span><span style={phase}>{item.phase}</span></div>
              <p style={detail}>{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const section: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.42)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const heading: CSSProperties = { margin: 0, fontSize: 20 };
const stack: CSSProperties = { display: "grid", gap: 8 };
const entry: CSSProperties = { display: "grid", gridTemplateColumns: "18px minmax(0, 1fr)", gap: 10, alignItems: "start", minWidth: 0 };
const marker: CSSProperties = { width: 10, height: 10, borderRadius: 999, background: "#5eead4", marginTop: 5, boxShadow: "0 0 0 5px rgba(45,212,191,0.1)" };
const body: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 10, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" };
const label: CSSProperties = { fontWeight: 900, overflowWrap: "anywhere" };
const phase: CSSProperties = { color: "#c7d2fe", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const detail: CSSProperties = { margin: "6px 0 0", color: "#cbd5e1", fontSize: 13, lineHeight: 1.5 };
