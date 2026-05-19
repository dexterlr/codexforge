"use client";

import type { CodexForgeSurfaceMap } from "../consolidation-types";
import { grid, item, muted, panel, pill, small, title, toneColor } from "./ConsolidationStyles";

export function SurfaceMapPanel({ surfaceMap }: { surfaceMap: CodexForgeSurfaceMap }) {
  return (
    <section style={panel} data-codexforge-surface-map-panel="SurfaceMapPanel renders surface map includes Command Deck Brain Continuity Engineering Workflow stable keys no raw JSON in main UI">
      <h2 style={title}>Surface Map</h2>
      <p style={muted}>{surfaceMap.summary.join(" ")}</p>
      <div style={grid}>
        {surfaceMap.items.map((surface) => (
          <a key={surface.id} href={surface.route.split("#")[0]} style={{ ...item, color: "inherit", textDecoration: "none" }}>
            <span style={pill}>{surface.group}</span>
            <strong>{surface.label}</strong>
            <span style={small}>{surface.route}</span>
            <span style={{ ...small, color: toneColor(surface.role) }}>{surface.role} | keep visible: {surface.keepVisible ? "yes" : "no"}</span>
            <span style={small}>target: {surface.consolidationTarget ?? "none"}</span>
            <span style={{ ...small, color: toneColor(surface.readiness) }}>readiness: {surface.readiness}</span>
            <span style={small}>{surface.safetyPosture}</span>
            <span style={small}>{surface.recommendedOperatorUse}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
