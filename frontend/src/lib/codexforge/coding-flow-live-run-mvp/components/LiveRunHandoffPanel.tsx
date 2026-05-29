"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { LiveRunHandoff } from "../coding-flow-live-run-types";
export function LiveRunHandoffPanel({ handoff }: { handoff: LiveRunHandoff }) { return <section style={panel} data-codexforge-live-run-handoff="LiveRunHandoffPanel renders all unsafe actions are handoff/request-ready only"><div style={eyebrow}>Handoff</div><Link href={handoff.href} style={button}>{handoff.label}</Link><p style={copy}>{handoff.copyPayload}</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", borderRadius: 8, padding: 14, background: "rgba(8,47,73,0.32)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const button: CSSProperties = { background: "#5eead4", borderRadius: 8, color: "#042f2e", display: "inline-flex", fontSize: 13, fontWeight: 900, justifyContent: "center", padding: "9px 12px", textDecoration: "none" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
