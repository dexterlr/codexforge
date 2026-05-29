"use client";
import type { CSSProperties } from "react";
import type { ApplyEvidencePolicyDecision } from "../apply-evidence-capture-types";
export function ApplyEvidencePolicyDecisionPanel({ decision }: { decision: ApplyEvidencePolicyDecision }) { return <section style={panel} data-codexforge-apply-evidence-policy="ApplyEvidencePolicyDecisionPanel renders policy decision allowed/blocked reasons"><div style={eyebrow}>Policy decision</div><h2 style={title}>{decision.decision}</h2><p style={copy}>{decision.blockedReasons[0] ?? decision.allowedReasons[0]}</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
