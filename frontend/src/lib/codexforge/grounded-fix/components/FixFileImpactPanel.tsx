"use client";

import type { CSSProperties } from "react";
import type { GroundedFixFileImpact } from "../grounded-fix-types";

export function FixFileImpactPanel({ impact }: { impact: GroundedFixFileImpact }) {
  return (
    <section data-codexforge-grounded-fix-file-impact-panel="FixFileImpactPanel renders file impact suggests smoke scripts Safe Patch Preview" style={card}>
      <h3 style={title}>File impact</h3>
      {impact.items.map((item) => (
        <div key={item.filePath} style={row}>
          <strong>{item.filePath}</strong>
          <span>{item.impactLevel} impact - {item.role}</span>
          <small>{item.suggestedSmokeScripts.join(", ")}</small>
        </div>
      ))}
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 14, letterSpacing: 0 };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 9, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
