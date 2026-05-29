"use client";
import type { CSSProperties } from "react";
import type { ValidationFailureRouting } from "../validation-result-capture-types";
export function ValidationFailureRoutingPanel({ routing }: { routing: ValidationFailureRouting }) { return <section style={panel} data-codexforge-validation-failure-routing="ValidationFailureRoutingPanel renders failure routes to /closed-loop passing routes to /workflow-results and /run-history git diff check failure routes to /apply-validation or /files"><div style={eyebrow}>Routing</div><h2 style={title}>{routing.recommendedRoute}</h2><p style={copy}>{routing.reason}</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
