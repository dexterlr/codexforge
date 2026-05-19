"use client";

import type { RouteConsolidationPlan } from "../consolidation-types";
import { grid, item, muted, panel, pill, small, title, toneColor } from "./ConsolidationStyles";

export function RouteConsolidationPanel({ routePlan }: { routePlan: RouteConsolidationPlan }) {
  return (
    <section style={panel} data-codexforge-route-consolidation-panel="RouteConsolidationPanel renders route consolidation marks / as primary marks /stabilization as primary marks /runtime-journal as deep governance no route deletion">
      <h2 style={title}>Route Consolidation</h2>
      <p style={muted}>{routePlan.summary.join(" ")}</p>
      <div style={grid}>
        {routePlan.items.map((route) => (
          <a key={route.id} href={route.route} style={{ ...item, color: "inherit", textDecoration: "none" }}>
            <span style={pill}>{route.classification}</span>
            <strong>{route.label}</strong>
            <span style={small}>{route.route}</span>
            <span style={{ ...small, color: toneColor(route.prominence) }}>prominence: {route.prominence}</span>
            <span style={small}>target: {route.targetSurface}</span>
            <span style={small}>keep route: {route.keepRoute ? "yes" : "no"}</span>
            <span style={small}>{route.rationale}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
