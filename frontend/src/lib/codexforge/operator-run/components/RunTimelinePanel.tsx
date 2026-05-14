"use client";

import type { CSSProperties } from "react";
import type { OperatorRun } from "../run-types";
import { buildOperatorRunReactKey } from "../run-types";

export function RunTimelinePanel({ run }: { run: OperatorRun }) {
  return (
    <section style={panel} data-codexforge-run-timeline-panel="RunTimelinePanel renders">
      <p style={eyebrow}>Timeline</p>
      <h2 style={title}>Run Timeline</h2>
      <div style={rail}>
        {run.timeline.map((item) => (
          <article key={buildOperatorRunReactKey("timeline", item.id)} style={itemStyle}>
            <span style={dot} />
            <div>
              <strong>{item.label}</strong>
              <p>{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(8,13,28,0.68)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { margin: 0, color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const rail: CSSProperties = { display: "grid", gap: 8 };
const itemStyle: CSSProperties = { display: "grid", gridTemplateColumns: "14px minmax(0, 1fr)", gap: 10, alignItems: "start", color: "#e2e8f0" };
const dot: CSSProperties = { width: 9, height: 9, borderRadius: 999, background: "#60a5fa", marginTop: 5 };
