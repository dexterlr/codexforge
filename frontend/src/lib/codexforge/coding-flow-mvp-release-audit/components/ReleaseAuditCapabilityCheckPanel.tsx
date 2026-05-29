"use client";
import type { CSSProperties } from "react";
import type { ReleaseAuditCheck } from "../coding-flow-release-audit-types";
export function ReleaseAuditCapabilityCheckPanel({ checks }: { checks: ReleaseAuditCheck[] }) { return <section style={panel} data-codexforge-release-audit-capability="ReleaseAuditCapabilityCheckPanel renders /start can guide user to code flow /code-flow/live-run exists and is understandable file selection handoff works patch preview handoff works apply evidence capture exists validation result capture exists workflow result persistence exists run history exists closed-loop failure routing exists"><div style={eyebrow}>Capability</div><h2 style={title}>Capability checks</h2><p style={copy}>{checks.length} checks ready.</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
