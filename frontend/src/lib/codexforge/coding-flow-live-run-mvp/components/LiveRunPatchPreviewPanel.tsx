"use client";
import type { CSSProperties } from "react";
import type { LiveRunPatchPreview } from "../coding-flow-live-run-types";
export function LiveRunPatchPreviewPanel({ preview }: { preview: LiveRunPatchPreview }) { return <section style={panel} data-codexforge-live-run-preview="LiveRunPatchPreviewPanel renders Preview patch patch preview handoff works"><div style={eyebrow}>Preview</div><h2 style={title}>Preview patch</h2><p style={copy}>{preview.summary}</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
