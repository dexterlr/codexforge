"use client";

import type { CSSProperties } from "react";
import type { RegressionImpactMap } from "../regression-triage-types";

export function RegressionImpactMapPanel({ impactMap }: { impactMap: RegressionImpactMap }) {
  return (
    <section data-codexforge-regression-impact-map-panel="RegressionImpactMapPanel renders" style={card}>
      <h3 style={title}>Impact map</h3>
      {impactMap.items.map((item) => (
        <div key={item.filePath} style={row}>
          <strong>{item.filePath}</strong>
          <span>{item.whyImpacted}</span>
          <small>
            {item.routeOrSurface} - {item.subsystem} - {item.riskLevel}
          </small>
          <small>{item.suggestedSmokeScripts.join(", ")}</small>
        </div>
      ))}
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 14, letterSpacing: 0 };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 9, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
