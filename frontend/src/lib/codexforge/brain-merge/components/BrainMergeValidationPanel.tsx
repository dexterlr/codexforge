"use client";

import type { CSSProperties } from "react";
import type { BrainMergeValidation } from "../brain-merge-types";

export function BrainMergeValidationPanel({ validation }: { validation: BrainMergeValidation }) {
  return (
    <section style={panel} data-codexforge-brain-merge-validation-panel>
      <h3 style={title}>Merge Validation</h3>
      <p style={copy}>Validation detects duplicate/conflict risk, empty queues, unknown event type, missing source refs, schema mismatch, legacy graph import risk, and unsafe direct graph mutation wording.</p>
      <strong style={state}>State: {validation.state}</strong>
      {validation.issues.length ? <p style={blocked}>{validation.issues.join(", ")}</p> : <p style={copy}>No blocking validation issues.</p>}
      {validation.warnings.length ? <p style={copy}>{validation.warnings.join(", ")}</p> : null}
    </section>
  );
}

const safe: CSSProperties = { overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.36)", borderRadius: 8, padding: 14, display: "grid", gap: 8, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 16, ...safe };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, ...safe };
const state: CSSProperties = { color: "#ccfbf1", ...safe };
const blocked: CSSProperties = { margin: 0, color: "#fecaca", fontSize: 12, ...safe };
