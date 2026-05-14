"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { buildMissionControlReactKey, type MissionSurfaceRegistry } from "../mission-control-types";

export function MissionSurfaceGrid({ registry }: { registry: MissionSurfaceRegistry }) {
  return (
    <section style={section} data-mission-component="MissionSurfaceGrid renders">
      <h2 style={heading}>Surface Grid</h2>
      <div style={grid}>
        {registry.surfaces.map((surface) => (
          <Link key={buildMissionControlReactKey("surface", surface.id)} href={surface.href} style={card}>
            <div style={topRow}>
              <span style={label}>{surface.label}</span>
              <span style={status}>{surface.status}</span>
            </div>
            <div style={role}>{surface.role}</div>
            <div style={metaGrid}>
              <span>{surface.riskPosture}</span>
              <span>{surface.readiness}</span>
            </div>
            <div style={action}>{surface.nextAction}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const section: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.42)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const heading: CSSProperties = { margin: 0, fontSize: 20 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 10 };
const card: CSSProperties = { color: "#f8fafc", textDecoration: "none", border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.52)", borderRadius: 8, padding: 12, display: "grid", gap: 10, minWidth: 0 };
const topRow: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start" };
const label: CSSProperties = { fontWeight: 900, overflowWrap: "anywhere" };
const status: CSSProperties = { color: "#5eead4", fontSize: 10, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const role: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5 };
const metaGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8, color: "#c7d2fe", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const action: CSSProperties = { borderTop: "1px solid rgba(148,163,184,0.12)", paddingTop: 9, color: "#e2e8f0", fontSize: 13, fontWeight: 800, overflowWrap: "anywhere" };
