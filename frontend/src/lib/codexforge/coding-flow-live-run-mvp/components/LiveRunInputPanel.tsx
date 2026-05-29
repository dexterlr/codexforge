"use client";
import type { CSSProperties } from "react";
import type { LiveRunInput } from "../coding-flow-live-run-types";
export function LiveRunInputPanel({ input }: { input: LiveRunInput }) { return <section style={panel} data-codexforge-live-run-input="LiveRunInputPanel renders Start live run Pick file Describe change"><div style={eyebrow}>Input</div><h2 style={title}>{input.runId}</h2><p style={copy}>{input.selectedFile ?? "No file selected"}</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 17, margin: 0, overflowWrap: "anywhere" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
