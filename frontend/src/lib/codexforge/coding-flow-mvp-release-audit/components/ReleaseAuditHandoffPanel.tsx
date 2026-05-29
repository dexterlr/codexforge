"use client";
import type { CSSProperties } from "react";
import type { ReleaseAuditHandoff } from "../coding-flow-release-audit-types";
export function ReleaseAuditHandoffPanel({ handoff }: { handoff: ReleaseAuditHandoff }) { return <section style={panel} data-codexforge-release-audit-handoff="ReleaseAuditHandoffPanel renders Copy release audit Mission Control next action run one real manual coding flow and record result"><div style={eyebrow}>Handoff</div><h2 style={title}>{handoff.title}</h2><p style={copy}>{handoff.body}</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", borderRadius: 8, padding: 14, background: "rgba(8,47,73,0.32)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
