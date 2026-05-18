"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { buildStabilizationStableKey, type StabilizationQueueRollup } from "../index";

export function StabilizationQueueRollupPanel({ rollup }: { rollup: StabilizationQueueRollup }) {
  return (
    <section style={panel} data-codexforge-stabilization-queue-rollup-panel="StabilizationQueueRollupPanel renders Regression Fix Queue Patch Preview Queue Apply-Diff Execution Gate">
      <div style={top}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Queue rollup</span>
          <h2 style={heading}>Repair pipeline posture</h2>
        </div>
        <span style={badge}>{rollup.readyCount} ready</span>
      </div>
      <div style={grid}>
        {rollup.items.map((item) => (
          <article key={buildStabilizationStableKey("queue", item.id)} style={row}>
            <div style={{ minWidth: 0 }}>
              <strong style={label}>{item.label}</strong>
              <p style={detail}>{item.nextAction}</p>
            </div>
            <div style={stats}>
              <span>{item.count} total</span>
              <span>{item.readyCount} ready</span>
              <span>{item.blockedCount} blocked</span>
            </div>
            <div style={footer}>
              <span style={risk}>{item.riskPosture}</span>
              {item.targetRoute.startsWith("/") ? (
                <Link href={item.targetRoute} style={link}>Open</Link>
              ) : (
                <span style={link}>{item.targetRoute}</span>
              )}
            </div>
            <span style={priority}>{item.highestPriority}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(20,184,166,0.1)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: "4px 0 0", fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const badge: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 8, color: "#ccfbf1", fontSize: 11, fontWeight: 900, padding: "6px 8px", textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 10, minWidth: 0 };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.38)", borderRadius: 8, padding: 12, display: "grid", gap: 9, minWidth: 0 };
const label: CSSProperties = { overflowWrap: "anywhere" };
const detail: CSSProperties = { margin: "5px 0 0", color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const stats: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7, color: "#ccfbf1", fontSize: 11, fontWeight: 800 };
const footer: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", flexWrap: "wrap" };
const risk: CSSProperties = { color: "#99f6e4", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const link: CSSProperties = { color: "#e0f2fe", textDecoration: "none", fontSize: 12, fontWeight: 850, overflowWrap: "anywhere" };
const priority: CSSProperties = { color: "#e2e8f0", fontSize: 11, overflowWrap: "anywhere" };
