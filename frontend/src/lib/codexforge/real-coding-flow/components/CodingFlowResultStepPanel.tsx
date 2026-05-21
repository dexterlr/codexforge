"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodingFlowResultStep } from "../real-coding-flow-types";

export function CodingFlowResultStepPanel({ step }: { step: CodingFlowResultStep }) {
  return (
    <section style={panel} data-codexforge-coding-flow-result-step-panel="CodingFlowResultStepPanel renders Review result passing commit tag push handoff failing /closed-loop unknown /validation patch issue /files apply issue /closed-loop">
      <h2 style={title}>Review result</h2>
      <p style={copy}>{step.nextSafeAction}</p>
      <Link href={step.recommendedRoute} style={link}>Open recommended route</Link>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const link: CSSProperties = { color: "#7dd3fc", fontSize: 12, fontWeight: 900, textDecoration: "none", width: "fit-content" };
