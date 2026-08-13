"use client";

import type { ProductRouteReadinessAudit } from "../product-readiness-types";
import { grid, item, muted, panel, pill, small, title, toneColor } from "./ProductReadinessStyles";

export function RouteReadinessPanel({ audit }: { audit: ProductRouteReadinessAudit }) {
  return (
    <section style={panel} data-codexforge-route-readiness-panel="RouteReadinessPanel renders route audit includes /jarvis /brain /files /stabilization /handoff stable keys no raw JSON in main UI">
      <h2 style={title}>Route Readiness</h2>
      <p style={muted}>{audit.summary.join(" ")}</p>
      <div style={grid}>
        {audit.items.map((route) => (
          <a key={route.id} href={route.route} style={{ ...item, color: "inherit", textDecoration: "none" }}>
            <span style={pill}>{route.surfaceGroup}</span>
            <strong>{route.label}</strong>
            <span style={small}>{route.route}</span>
            <span style={{ ...small, color: toneColor(route.readiness) }}>readiness: {route.readiness}</span>
            <span style={small}>smoke: {route.smokeCovered ? "covered" : "missing"} | shell: {route.shellNavigationCovered ? "covered" : "missing"} | palette: {route.commandPaletteCovered ? "covered" : "missing"}</span>
            <span style={small}>mutation risk: {route.mutationRisk} | UX risk: {route.uxRisk}</span>
            <span style={small}>{route.recommendedAction}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
