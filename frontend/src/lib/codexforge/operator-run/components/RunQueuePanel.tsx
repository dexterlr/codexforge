"use client";

import type { CSSProperties } from "react";
import type { OperatorRunQueue } from "../run-types";
import { buildOperatorRunReactKey } from "../run-types";

export function RunQueuePanel({ queue }: { queue: OperatorRunQueue }) {
  return (
    <section style={panel} data-codexforge-run-queue-panel="RunQueuePanel renders">
      <div style={header}>
        <div>
          <p style={eyebrow}>Queue</p>
          <h2 style={title}>Run Queue</h2>
        </div>
        <span style={pill}>{queue.summary}</span>
      </div>
      <div style={rows}>
        {queue.runs.map((run) => (
          <article key={buildOperatorRunReactKey("queue", run.id)} style={row}>
            <div style={rowMain}>
              <strong>{run.title}</strong>
              <span>{run.sourceSurface} / {run.toolName}</span>
            </div>
            <div style={rowMeta}>
              <span>{run.status}</span>
              <span>{run.riskLevel}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(8,13,28,0.74)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", alignItems: "start" };
const eyebrow: CSSProperties = { margin: 0, color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: "2px 0 0", fontSize: 20, letterSpacing: 0 };
const pill: CSSProperties = { border: "1px solid rgba(94,234,212,0.24)", background: "rgba(20,184,166,0.10)", borderRadius: 8, padding: "7px 9px", color: "#ccfbf1", fontSize: 12, fontWeight: 800 };
const rows: CSSProperties = { display: "grid", gap: 8 };
const row: CSSProperties = { border: "1px solid rgba(255,255,255,0.1)", background: "rgba(15,23,42,0.74)", borderRadius: 8, padding: 12, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10 };
const rowMain: CSSProperties = { display: "grid", gap: 4, minWidth: 0 };
const rowMeta: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, color: "#cbd5e1", fontSize: 12, textTransform: "uppercase", fontWeight: 800 };
