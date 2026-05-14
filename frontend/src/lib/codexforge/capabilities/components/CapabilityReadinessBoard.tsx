"use client";

import type { CSSProperties } from "react";
import type { CodexForgeCapabilityReadiness } from "../capability-types";
import { buildCodexForgeCapabilityReactKey } from "../capability-types";

export function CapabilityReadinessBoard({ readiness }: { readiness: CodexForgeCapabilityReadiness[] }) {
  return (
    <section data-codexforge-capability-readiness-board style={panel}>
      <div style={eyebrow}>Readiness board</div>
      <div style={rows}>
        {readiness.map((item, index) => (
          <article
            key={buildCodexForgeCapabilityReactKey("readiness", [item.id], index)}
            style={row}
            data-codexforge-capability-readiness-row={item.id}
          >
            <div style={score(item.executionBlocked)}>
              <strong>{item.score}</strong>
              <span>score</span>
            </div>
            <div style={main}>
              <div style={topLine}>
                <strong>{item.label}</strong>
                <span style={pill(item.status)}>{item.status}</span>
                <span style={pill(item.riskLevel)}>{item.riskLevel}</span>
              </div>
              <p style={text}>{item.summary}</p>
              <p style={muted}>{item.smokeCoverageHint}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function pill(value: string): CSSProperties {
  const color = value === "blocked" || value === "critical" ? "#fecdd3" : value === "high" || value === "planned" ? "#fde68a" : "#bbf7d0";
  return { border: "1px solid rgba(255,255,255,0.13)", background: "rgba(255,255,255,0.06)", color, borderRadius: 7, padding: "4px 7px", fontSize: 11, fontWeight: 800, textTransform: "uppercase" };
}

function score(blocked: boolean): CSSProperties {
  return { minWidth: 62, border: blocked ? "1px solid rgba(251,113,133,0.35)" : "1px solid rgba(34,211,238,0.25)", background: blocked ? "rgba(251,113,133,0.10)" : "rgba(34,211,238,0.10)", borderRadius: 8, padding: 8, display: "grid", placeItems: "center", gap: 2 };
}

const panel: CSSProperties = { border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 14, display: "grid", gap: 10 };
const eyebrow: CSSProperties = { fontSize: 11, fontWeight: 900, textTransform: "uppercase", opacity: 0.62 };
const rows: CSSProperties = { display: "grid", gap: 8 };
const row: CSSProperties = { display: "flex", gap: 10, minWidth: 0, border: "1px solid rgba(255,255,255,0.09)", borderRadius: 8, padding: 10, background: "rgba(0,0,0,0.16)" };
const main: CSSProperties = { minWidth: 0, display: "grid", gap: 5 };
const topLine: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center", fontSize: 13 };
const text: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.45, opacity: 0.82, overflowWrap: "anywhere" };
const muted: CSSProperties = { margin: 0, fontSize: 11, lineHeight: 1.4, opacity: 0.58, overflowWrap: "anywhere" };
