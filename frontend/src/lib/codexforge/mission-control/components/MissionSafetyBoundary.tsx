"use client";

import type { CSSProperties } from "react";
import { buildMissionControlReactKey, type MissionSafetyBoundary as Safety } from "../mission-control-types";

export function MissionSafetyBoundary({ boundary }: { boundary: Safety }) {
  return (
    <section style={section} data-mission-component="MissionSafetyBoundary renders">
      <h2 style={heading}>Safety Boundary</h2>
      <p style={lede}>Mission Control is readonly. It exposes posture, links, and summaries only.</p>
      <div style={grid}>
        {boundary.rules.map((rule) => (
          <div key={buildMissionControlReactKey("safety", rule)} style={ruleCard}>
            {rule}
          </div>
        ))}
      </div>
    </section>
  );
}

const section: CSSProperties = { border: "1px solid rgba(248,113,113,0.22)", background: "rgba(127,29,29,0.14)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const heading: CSSProperties = { margin: 0, fontSize: 20 };
const lede: CSSProperties = { margin: 0, color: "#fecaca", fontSize: 13, lineHeight: 1.5 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 };
const ruleCard: CSSProperties = { border: "1px solid rgba(248,113,113,0.2)", background: "rgba(2,6,23,0.4)", borderRadius: 8, padding: 12, color: "#fee2e2", fontSize: 13, fontWeight: 800, lineHeight: 1.45, overflowWrap: "anywhere" };
