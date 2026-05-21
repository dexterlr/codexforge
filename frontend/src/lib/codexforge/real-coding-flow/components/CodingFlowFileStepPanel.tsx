"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodingFlowFileStep } from "../real-coding-flow-types";

export function CodingFlowFileStepPanel({ step }: { step: CodingFlowFileStep }) {
  return (
    <section style={panel} data-codexforge-coding-flow-file-step-panel="CodingFlowFileStepPanel renders Pick the file you want to change Inspect it before preparing a patch Use Files when you need to read project context route handoff includes /files">
      <h2 style={title}>Pick a file</h2>
      <p style={copy}>{step.userInstruction}</p>
      <div style={meta}>Selected: {step.selectedFilePath ?? "Not selected"} | Risk: {step.fileRisk}</div>
      <Link href="/files" style={button}>Open Files</Link>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const meta: CSSProperties = { color: "#94a3b8", fontSize: 12, overflowWrap: "break-word" };
const button: CSSProperties = { background: "#5eead4", borderRadius: 8, color: "#042f2e", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none", width: "fit-content" };
