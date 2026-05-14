"use client";

import type { CSSProperties } from "react";
import type { OperatorRun } from "../run-types";
import { buildOperatorRunReactKey } from "../run-types";

export function RunArtifactLedger({ run }: { run: OperatorRun }) {
  return (
    <section style={panel} data-codexforge-run-artifact-ledger="RunArtifactLedger renders">
      <p style={eyebrow}>Ledger</p>
      <h2 style={title}>Artifact Execution Ledger</h2>
      <div style={grid}>
        {run.expectedArtifacts.map((artifact) => (
          <article key={buildOperatorRunReactKey("artifact", artifact.id)} style={card}>
            <span style={type}>{artifact.type}</span>
            <strong>{artifact.label}</strong>
            <p>{artifact.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(8,13,28,0.68)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { margin: 0, color: "#a7f3d0", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(255,255,255,0.10)", borderRadius: 8, background: "rgba(6,78,59,0.18)", padding: 12, display: "grid", gap: 7, color: "#ecfdf5" };
const type: CSSProperties = { color: "#6ee7b7", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
