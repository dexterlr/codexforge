"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodingFlowValidationStep } from "../real-coding-flow-types";

export function CodingFlowValidationStepPanel({ step }: { step: CodingFlowValidationStep }) {
  return (
    <section style={panel} data-codexforge-coding-flow-validation-step-panel="CodingFlowValidationStepPanel renders Prepare checks Run checks Copy validation checklist no auto-run validation step includes npm run build npm run smoke:codexforge:server git diff --check">
      <h2 style={title}>Prepare checks</h2>
      <p style={copy}>Prepare checks. Run or copy checks safely. Paste output to review failures.</p>
      <ul style={list}>{step.recommendedCommands.map((command) => <li key={`coding-flow-validation-${command}`}>{command}</li>)}</ul>
      <Link href="/validation" style={link}>Open Validation Runner</Link>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const list: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.55, margin: 0, paddingLeft: 18 };
const link: CSSProperties = { color: "#7dd3fc", fontSize: 12, fontWeight: 900, textDecoration: "none", width: "fit-content" };
