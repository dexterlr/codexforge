"use client";
import type { CSSProperties } from "react";
import type { LiveRunApplyRequest } from "../coding-flow-live-run-types";
export function LiveRunApplyRequestPanel({ request }: { request: LiveRunApplyRequest }) { return <section style={panel} data-codexforge-live-run-apply="LiveRunApplyRequestPanel renders Review apply request guarded apply request is visible and approval-first approval required"><div style={eyebrow}>Apply</div><h2 style={title}>Review apply request</h2><p style={copy}>{request.requestReadyOnly ? "Request-ready only; no auto-apply." : "Blocked"}</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
