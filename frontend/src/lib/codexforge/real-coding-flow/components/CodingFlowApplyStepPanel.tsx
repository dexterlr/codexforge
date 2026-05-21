"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodingFlowApplyStep } from "../real-coding-flow-types";

export function CodingFlowApplyStepPanel({ step }: { step: CodingFlowApplyStep }) {
  return (
    <section style={panel} data-codexforge-coding-flow-apply-step-panel="CodingFlowApplyStepPanel renders Review before apply Approval is required Keep rollback ready no auto-apply no unsafe execution buttons no direct apply-diff call from UI">
      <h2 style={title}>Review apply</h2>
      <p style={copy}>Review before apply. Approval is required. Keep rollback ready.</p>
      <div style={status}>{step.policyStatus}</div>
      <Link href="/files" style={link}>Open Approved Patch Apply</Link>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const status: CSSProperties = { color: "#dbeafe", fontSize: 12 };
const link: CSSProperties = { color: "#7dd3fc", fontSize: 12, fontWeight: 900, textDecoration: "none", width: "fit-content" };
