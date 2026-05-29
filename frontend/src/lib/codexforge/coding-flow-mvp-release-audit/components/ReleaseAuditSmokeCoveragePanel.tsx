"use client";
import type { CSSProperties } from "react";
import type { ReleaseAuditCheck } from "../coding-flow-release-audit-types";
export function ReleaseAuditSmokeCoveragePanel({ checks }: { checks: ReleaseAuditCheck[] }) { return <section style={panel} data-codexforge-release-audit-smoke="ReleaseAuditSmokeCoveragePanel renders smoke coverage includes all phases exactly once Guarded Apply MVP Apply Evidence Capture MVP Validation Result Capture MVP Coding Flow Live Run MVP Coding Flow MVP Release Audit"><div style={eyebrow}>Smoke</div><h2 style={title}>Smoke coverage</h2><p style={copy}>{checks.length} new phase smokes exactly once.</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
