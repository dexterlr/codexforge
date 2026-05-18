"use client";

import type { CSSProperties } from "react";
import type { RegressionFixQueuePolicy } from "../regression-fix-queue-types";

export function RegressionFixQueuePolicyPanel({ policy }: { policy: RegressionFixQueuePolicy }) {
  return (
    <section
      style={panel}
      data-codexforge-regression-fix-queue-policy-panel="RegressionFixQueuePolicyPanel renders policy blocks apply-diff policy blocks write-file policy blocks run-command policy blocks broker-execution policy requires Safe Patch Preview before edits policy requires Preview Diff Composer before patch package"
    >
      <h3 style={title}>Queue policy</h3>
      <div style={grid}>
        <PolicyFlag label="Safe Patch Preview" value={policy.safePatchPreviewRequiredBeforeEdits ? "required" : "blocked"} />
        <PolicyFlag label="Preview Diff Composer" value={policy.previewDiffComposerRequiredBeforePatchPackage ? "required" : "blocked"} />
        <PolicyFlag label="apply-diff" value={policy.applyDiffBlocked ? "blocked" : "open"} />
        <PolicyFlag label="write-file" value={policy.writeFileBlocked ? "blocked" : "open"} />
        <PolicyFlag label="run-command" value={policy.runCommandBlocked ? "blocked" : "open"} />
        <PolicyFlag label="broker-execution" value={policy.brokerExecutionBlocked ? "blocked" : "open"} />
      </div>
      <ul style={list}>
        {policy.summary.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function PolicyFlag({ label, value }: { label: string; value: string }) {
  return (
    <span style={flag}>
      <strong>{label}</strong>
      {value}
    </span>
  );
}

const panel: CSSProperties = { background: "rgba(20,184,166,0.08)", border: "1px solid rgba(45,212,191,0.16)", borderRadius: 8, display: "grid", gap: 9, minWidth: 0, padding: 12 };
const title: CSSProperties = { fontSize: 15, letterSpacing: 0, margin: 0, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(116px, 1fr))" };
const flag: CSSProperties = { border: "1px solid rgba(45,212,191,0.14)", borderRadius: 8, color: "#ccfbf1", display: "grid", fontSize: 11, gap: 3, overflowWrap: "anywhere", padding: 8 };
const list: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, margin: 0, overflowWrap: "anywhere", paddingLeft: 18 };
