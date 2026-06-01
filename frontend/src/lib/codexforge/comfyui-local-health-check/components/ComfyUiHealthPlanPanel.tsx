"use client";

import type { CSSProperties } from "react";
import type { ComfyUiHealthPlan } from "../comfyui-health-types";

export function ComfyUiHealthPlanPanel({ plan }: { plan: ComfyUiHealthPlan }) {
  return <article style={card}><h2 style={title}>What the check would verify</h2><ul style={list}>{plan.checks.map((check) => <li key={`comfyui-check-${check}`}>{check}</li>)}</ul><p style={copy}>Live checking: {plan.liveChecking}. Workflow run allowed: no.</p></article>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const list: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0, paddingLeft: 18 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
