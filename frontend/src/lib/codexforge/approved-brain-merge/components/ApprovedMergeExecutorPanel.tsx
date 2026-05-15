"use client";

import type { CSSProperties } from "react";
import type {
  ApprovedBrainMergePolicy,
  ApprovedBrainMergeResult,
  ApprovedBrainMergeValidation,
} from "../approved-brain-merge-types";

export function ApprovedMergeExecutorPanel({
  policy,
  validation,
  result,
  applyState,
  applyMessage,
  onApply,
}: {
  policy: ApprovedBrainMergePolicy;
  validation: ApprovedBrainMergeValidation;
  result: ApprovedBrainMergeResult | null;
  applyState: "idle" | "blocked" | "applied" | "failed";
  applyMessage: string;
  onApply: () => void;
}) {
  const disabled = !policy.allowed || validation.state === "blocked";

  return (
    <section style={panel} data-codexforge-approved-merge-executor="executor does not persist directly preserves existing graph nodes dedupes nodes/edges">
      <h3 style={title}>Approved Merge Executor</h3>
      <p style={copy}>
        The executor is pure and does not persist directly. It preserves existing graph nodes,
        dedupes nodes/edges, and returns the next graph for the approved browser-local apply path.
      </p>
      <button type="button" disabled={disabled} onClick={onApply} style={disabled ? disabledButton : button}>
        Apply approved Brain merge
      </button>
      <span style={status}>{applyState}: {applyMessage || "Awaiting explicit merge approval."}</span>
      {result ? (
        <ul style={list}>
          {result.summary.map((line) => <li key={line}>{line}</li>)}
        </ul>
      ) : null}
    </section>
  );
}

const safe: CSSProperties = { overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.36)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 16, ...safe };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, ...safe };
const button: CSSProperties = { border: "1px solid rgba(45,212,191,0.34)", background: "rgba(20,184,166,0.18)", color: "#ccfbf1", borderRadius: 8, padding: "10px 12px", fontWeight: 850, cursor: "pointer", ...safe };
const disabledButton: CSSProperties = { ...button, opacity: 0.45, cursor: "not-allowed" };
const status: CSSProperties = { color: "#cbd5e1", fontSize: 12, ...safe };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", fontSize: 12, lineHeight: 1.55, ...safe };
