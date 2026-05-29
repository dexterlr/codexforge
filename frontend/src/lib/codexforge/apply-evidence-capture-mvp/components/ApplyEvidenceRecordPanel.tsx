"use client";
import type { CSSProperties } from "react";
import type { ApplyEvidenceRecord } from "../apply-evidence-capture-types";
export function ApplyEvidenceRecordPanel({ record }: { record: ApplyEvidenceRecord }) { return <section style={panel} data-codexforge-apply-evidence-record="ApplyEvidenceRecordPanel renders selected file diff label approval status policy decision boundary status"><div style={eyebrow}>Record</div><h2 style={title}>{record.recordId}</h2><p style={copy}>{record.input.selectedFile} - {record.diffRecord.label}</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 17, margin: 0, overflowWrap: "anywhere" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
