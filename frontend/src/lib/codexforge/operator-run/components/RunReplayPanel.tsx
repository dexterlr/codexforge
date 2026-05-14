"use client";

import type { CSSProperties } from "react";
import type { OperatorRun } from "../run-types";
import { buildOperatorRunReactKey } from "../run-types";

export function RunReplayPanel({ run }: { run: OperatorRun }) {
  return (
    <section style={panel} data-codexforge-run-replay-panel="RunReplayPanel renders">
      <p style={eyebrow}>Replay</p>
      <h2 style={title}>Run Replay Packet</h2>
      <p style={copy}>{run.replaySummary.planSummary}</p>
      <div style={listGrid}>
        {run.replaySummary.validationChecklist.map((item) => (
          <span key={buildOperatorRunReactKey(run.id, "check", item)} style={check}>{item}</span>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(8,13,28,0.68)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { margin: 0, color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "#ddd6fe", fontSize: 13, lineHeight: 1.5 };
const listGrid: CSSProperties = { display: "grid", gap: 8 };
const check: CSSProperties = { border: "1px solid rgba(196,181,253,0.18)", background: "rgba(76,29,149,0.22)", borderRadius: 8, padding: 9, color: "#ede9fe", fontSize: 12 };
