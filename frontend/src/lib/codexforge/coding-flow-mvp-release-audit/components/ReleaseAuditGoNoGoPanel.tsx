"use client";
import type { CSSProperties } from "react";
import type { ReleaseAuditGoNoGo } from "../coding-flow-release-audit-types";
export function ReleaseAuditGoNoGoPanel({ goNoGo }: { goNoGo: ReleaseAuditGoNoGo }) { return <section style={panel} data-codexforge-release-audit-go-no-go="ReleaseAuditGoNoGoPanel renders go go-with-fixes no-go blocked status card and top blockers first"><div style={eyebrow}>Go/no-go</div><h2 style={title}>{goNoGo.status}</h2><p style={copy}>{goNoGo.reason}</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", borderRadius: 8, padding: 14, background: "rgba(8,47,73,0.32)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 24, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
