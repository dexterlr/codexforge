"use client";

import type { CSSProperties } from "react";
import type { OperatorRun } from "../run-types";
import { buildOperatorRunReactKey } from "../run-types";

const labels = [
  ["policy", "Policy"],
  ["context", "Context"],
  ["artifact", "Artifacts"],
  ["adapter", "Adapter"],
  ["approval", "Approval"],
  ["rollbackReplay", "Replay"],
] as const;

export function RunReadinessBoard({ runs }: { runs: OperatorRun[] }) {
  return (
    <section style={panel} data-codexforge-run-readiness-board="RunReadinessBoard renders">
      <p style={eyebrow}>Readiness</p>
      <h2 style={title}>Run Readiness Board</h2>
      <div style={grid}>
        {runs.map((run) => (
          <article key={buildOperatorRunReactKey("readiness", run.id)} style={card}>
            <div style={cardHead}>
              <strong>{run.readiness.score}/100</strong>
              <span>{run.title}</span>
            </div>
            <div style={dims}>
              {labels.map(([key, label]) => (
                <div key={buildOperatorRunReactKey(run.id, key)} style={dim}>
                  <span>{label}</span>
                  <strong>{run.readiness.dimensions[key]}</strong>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(8,13,28,0.68)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { margin: 0, color: "#fbbf24", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(255,255,255,0.10)", borderRadius: 8, background: "rgba(2,6,23,0.55)", padding: 12, display: "grid", gap: 10 };
const cardHead: CSSProperties = { display: "grid", gap: 3 };
const dims: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 6 };
const dim: CSSProperties = { border: "1px solid rgba(255,255,255,0.08)", borderRadius: 7, padding: 8, display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12, color: "#cbd5e1" };
