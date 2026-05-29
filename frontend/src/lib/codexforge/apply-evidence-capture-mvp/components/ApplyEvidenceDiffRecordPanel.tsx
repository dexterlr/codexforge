"use client";
import type { CSSProperties } from "react";
import type { ApplyEvidenceDiffRecord } from "../apply-evidence-capture-types";
export function ApplyEvidenceDiffRecordPanel({ diff }: { diff: ApplyEvidenceDiffRecord }) { return <section style={panel} data-codexforge-apply-evidence-diff="ApplyEvidenceDiffRecordPanel renders no raw huge diff by default capped excerpts"><div style={eyebrow}>Diff</div><h2 style={title}>{diff.label}</h2><p style={copy}>{diff.summary}</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
