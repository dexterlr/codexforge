"use client";
import type { CSSProperties } from "react";
import type { ReleaseAuditKnownGap } from "../coding-flow-release-audit-types";
export function ReleaseAuditKnownGapsPanel({ gaps }: { gaps: ReleaseAuditKnownGap[] }) { return <section style={panel} data-codexforge-release-audit-gaps="ReleaseAuditKnownGapsPanel renders known gaps"><div style={eyebrow}>Known gaps</div><h2 style={title}>Known gaps</h2><p style={copy}>{gaps[0]?.label ?? "No blockers."}</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
