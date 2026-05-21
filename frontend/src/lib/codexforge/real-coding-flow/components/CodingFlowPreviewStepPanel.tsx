"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodingFlowPreviewStep } from "../real-coding-flow-types";

export function CodingFlowPreviewStepPanel({ step }: { step: CodingFlowPreviewStep }) {
  return (
    <section style={panel} data-codexforge-coding-flow-preview-step-panel="CodingFlowPreviewStepPanel renders Preview the patch first Review the diff before applying Nothing is written during preview Preview patch">
      <h2 style={title}>Preview patch</h2>
      <p style={copy}>Preview the patch first. Review the diff before applying. Nothing is written during preview.</p>
      <div style={status}>{step.previewReadiness}: {step.blockedReasons.join(" ") || "Ready for Real Patch Preview"}</div>
      <Link href="/files" style={link}>Open Real Patch Preview</Link>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const status: CSSProperties = { color: "#dbeafe", fontSize: 12 };
const link: CSSProperties = { color: "#7dd3fc", fontSize: 12, fontWeight: 900, textDecoration: "none", width: "fit-content" };
