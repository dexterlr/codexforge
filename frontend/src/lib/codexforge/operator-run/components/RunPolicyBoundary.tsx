"use client";

import type { CSSProperties } from "react";
import type { OperatorRun } from "../run-types";
import { buildOperatorRunReactKey } from "../run-types";

export function RunPolicyBoundary({ run }: { run: OperatorRun }) {
  return (
    <section style={panel} data-codexforge-run-policy-boundary="RunPolicyBoundary renders">
      <p style={eyebrow}>Approval Boundary</p>
      <h2 style={title}>Run Policy Boundary</h2>
      <div style={notice}>approval required before execution</div>
      <ul style={list}>
        {run.policyBoundary.reasons.map((reason) => (
          <li key={buildOperatorRunReactKey(run.id, "policy", reason)}>{reason}</li>
        ))}
      </ul>
      <p style={next}>{run.policyBoundary.nextAction}</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(251,191,36,0.24)", background: "rgba(69,26,3,0.36)", borderRadius: 8, padding: 16, display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { margin: 0, color: "#fde68a", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const notice: CSSProperties = { border: "1px solid rgba(251,191,36,0.25)", background: "rgba(251,191,36,0.12)", borderRadius: 8, padding: 10, color: "#fef3c7", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fde68a", fontSize: 13, lineHeight: 1.55 };
const next: CSSProperties = { margin: 0, color: "#f8fafc", fontSize: 13, lineHeight: 1.5 };
