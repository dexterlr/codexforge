"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodingFlowNextActionPlan } from "../real-coding-flow-types";

export function CodingFlowNextActionPanel({ plan }: { plan: CodingFlowNextActionPlan }) {
  return (
    <section style={panel} data-codexforge-coding-flow-next-action-panel="CodingFlowNextActionPanel renders one primary action visible next action routes missing file to /files next action routes failed validation to /closed-loop copy patch request copy validation checklist">
      <div>
        <div style={eyebrow}>Next safe action</div>
        <h2 style={title}>{plan.selected.label}</h2>
        <p style={copy}>{plan.selected.reason}</p>
      </div>
      <Link href={plan.selected.route} style={button}>{plan.selected.label}</Link>
      <details style={details}>
        <summary>Advanced details</summary>
        <p>{plan.smallestUnblockStep}</p>
      </details>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(5,13,29,0.78)", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: "3px 0 0", overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: "6px 0 0" };
const button: CSSProperties = { background: "#5eead4", borderRadius: 8, color: "#042f2e", fontSize: 12, fontWeight: 900, padding: "9px 11px", textAlign: "center", textDecoration: "none", width: "fit-content" };
const details: CSSProperties = { color: "#94a3b8", fontSize: 12 };
