"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { LiveRunStepState } from "../coding-flow-live-run-types";
export function LiveRunStepStatePanel({ state }: { state: LiveRunStepState }) { return <section style={panel} data-codexforge-live-run-step="LiveRunStepStatePanel renders one primary action at a time Progress visible"><div style={eyebrow}>Current step</div><h2 style={title}>{state.progressLabel}</h2><Link href={state.href} style={button}>{state.primaryAction}</Link></section>; }
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", borderRadius: 8, padding: 14, background: "rgba(8,47,73,0.32)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const button: CSSProperties = { background: "#5eead4", borderRadius: 8, color: "#042f2e", display: "inline-flex", fontSize: 13, fontWeight: 900, justifyContent: "center", padding: "9px 12px", textDecoration: "none" };
