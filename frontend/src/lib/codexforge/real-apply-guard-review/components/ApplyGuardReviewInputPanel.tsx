"use client";

import type { CSSProperties } from "react";
import type { ApplyGuardReviewInput } from "../real-apply-guard-review-types";

export function ApplyGuardReviewInputPanel({ input }: { input: ApplyGuardReviewInput }) {
  return (
    <section style={panel} data-codexforge-apply-guard-review-input-panel="ApplyGuardReviewInputPanel renders deterministic review id no time-based ids no random ids no execution no file writes latest-message authority">
      <h2 style={title}>Review input</h2>
      <p style={copy}>{input.operatorIntent}</p>
      <div style={meta}>Review id: {input.reviewId}</div>
      <div style={meta}>Target readiness: {input.targetReadinessLevel}</div>
      <div style={meta}>Touched files: {input.touchedFiles.length || "not supplied"}</div>
      <details style={details}>
        <summary style={summary}>Advanced input details</summary>
        <ul style={list}>{input.summary.map((line) => <li key={`review-input-${line}`} style={item}>{line}</li>)}</ul>
      </details>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const meta: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.35 };
const details: CSSProperties = { color: "#cbd5e1", fontSize: 12 };
const summary: CSSProperties = { cursor: "pointer", fontWeight: 900 };
const list: CSSProperties = { display: "grid", gap: 6, margin: "8px 0 0", paddingLeft: 18 };
const item: CSSProperties = { lineHeight: 1.35 };
