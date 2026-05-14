"use client";

import type { CSSProperties } from "react";
import { buildBridgeSessionReactKey, type BridgeReadiness } from "@/lib/codexforge/local-bridge";

export function BridgeReadinessBoard({ readiness }: { readiness: BridgeReadiness }) {
  return (
    <section style={panel} data-codexforge-bridge-readiness-board="BridgeReadinessBoard renders">
      <div style={header}>
        <span style={eyebrow}>Readiness</span>
        <strong style={score}>{readiness.score}</strong>
      </div>
      <h2 style={title}>Local bridge readiness</h2>
      <div style={grid}>
        {readiness.dimensions.map((dimension) => (
          <article key={buildBridgeSessionReactKey("readiness", dimension.id)} style={card}>
            <div style={cardTop}>
              <strong>{dimension.label}</strong>
              <span style={pill}>{dimension.status}</span>
            </div>
            <div style={meter}>
              <span style={{ ...meterFill, width: `${dimension.score}%` }} />
            </div>
            <p style={copy}>{dimension.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(4,17,24,0.82)", borderRadius: 8, padding: 16, display: "grid", gap: 12 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const score: CSSProperties = { color: "#ccfbf1", fontSize: 28 };
const title: CSSProperties = { margin: 0, fontSize: 22, letterSpacing: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.6)", borderRadius: 8, padding: 12, display: "grid", gap: 8 };
const cardTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" };
const pill: CSSProperties = { color: "#fde68a", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const meter: CSSProperties = { height: 7, borderRadius: 999, background: "rgba(148,163,184,0.16)", overflow: "hidden" };
const meterFill: CSSProperties = { display: "block", height: "100%", borderRadius: 999, background: "linear-gradient(90deg, #22d3ee, #34d399)" };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.45 };
