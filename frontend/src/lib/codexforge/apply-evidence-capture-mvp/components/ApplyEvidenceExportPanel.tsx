"use client";
import type { CSSProperties } from "react";
import type { ApplyEvidenceExport } from "../apply-evidence-capture-types";
export function ApplyEvidenceExportPanel({ exportPack }: { exportPack: ApplyEvidenceExport }) { return <section style={panel} data-codexforge-apply-evidence-export="ApplyEvidenceExportPanel renders Copy evidence pack raw detailed evidence lower or collapsed"><div style={eyebrow}>Export</div><h2 style={title}>Copy evidence pack</h2><p style={copy}>{exportPack.title} is redacted markdown.</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", borderRadius: 8, padding: 14, background: "rgba(8,47,73,0.32)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
