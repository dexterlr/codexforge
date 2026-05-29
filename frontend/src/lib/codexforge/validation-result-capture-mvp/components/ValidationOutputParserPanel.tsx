"use client";
import type { CSSProperties } from "react";
import type { ValidationOutputParser } from "../validation-result-capture-types";
export function ValidationOutputParserPanel({ parser }: { parser: ValidationOutputParser }) { return <section style={panel} data-codexforge-validation-output-parser="ValidationOutputParserPanel renders detected error lines detected warnings truncated output flag cap output"><div style={eyebrow}>Output parser</div><h2 style={title}>Parsed manually</h2><p style={copy}>{parser.detectedErrorLines.length} errors, {parser.detectedWarnings.length} warnings.</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
