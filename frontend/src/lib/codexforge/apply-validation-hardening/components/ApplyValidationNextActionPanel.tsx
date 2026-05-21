"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { ApplyValidationNextActionPlan } from "../index";

export function ApplyValidationNextActionPanel({ plan }: { plan: ApplyValidationNextActionPlan }) {
  return (
    <aside style={panel} data-codexforge-apply-validation-next-action-panel="ApplyValidationNextActionPanel renders next action routes missing preview to Real Patch Preview routes failing output to Closed Loop blocked high risk stop and review">
      <span style={eyebrow}>Next safe action</span>
      <h2 style={title}>{plan.selected.label}</h2>
      <p style={copy}>{plan.selected.detail}</p>
      <Link href={plan.selected.href} style={primaryLink}>{plan.selected.label}</Link>
      <details style={details}>
        <summary>Other reviewed routes</summary>
        <ul style={list}>{plan.candidates.map((candidate) => <li key={`next-action-${candidate.id}`}>{candidate.label}: {candidate.detail}</li>)}</ul>
      </details>
    </aside>
  );
}

const panel: CSSProperties = { background: "rgba(2,6,23,0.5)", border: "1px solid rgba(45,212,191,0.24)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const primaryLink: CSSProperties = { background: "#14b8a6", borderRadius: 8, color: "#042f2e", display: "inline-flex", fontSize: 12, fontWeight: 950, justifyContent: "center", padding: "9px 11px", textDecoration: "none", width: "fit-content" };
const details: CSSProperties = { color: "#cbd5e1", fontSize: 12 };
const list: CSSProperties = { margin: "8px 0 0", paddingLeft: 18 };
