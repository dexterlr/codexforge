"use client";
import type { CSSProperties } from "react";
import type { DraftRenderResourcePlan } from "../local-draft-render-types";
export function DraftRenderResourcePlanPanel({ plan }: { plan: DraftRenderResourcePlan }) { return <article style={card}><h2 style={title}>Resource planning</h2><p style={copy}>GPU/time posture: {plan.gpuTimePosture}</p><p style={copy}>dual-GPU note: {plan.dualGpuNote}</p><p style={copy}>draft vs final: {plan.draftVsFinal}</p><p style={copy}>local-first savings: {plan.localFirstSavings}</p><p style={copy}>queue readiness: {plan.queueReadiness}</p></article>; }
const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 }; const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 }; const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
