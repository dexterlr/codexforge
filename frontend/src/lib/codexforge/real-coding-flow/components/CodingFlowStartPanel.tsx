"use client";

import type { CSSProperties } from "react";
import type { CodingFlowInput } from "../real-coding-flow-types";

export function CodingFlowStartPanel({ input }: { input: CodingFlowInput }) {
  return (
    <section style={panel} data-codexforge-coding-flow-start-panel="CodingFlowStartPanel renders Fix code safely Pick a file Preview patch Review before apply Run checks Review result no giant raw JSON above fold advanced details visually secondary">
      <div style={eyebrow}>Code Flow</div>
      <h2 style={title}>Fix code safely</h2>
      <p style={copy}>Pick a file, preview the change, approve it, then run checks.</p>
      <span style={detail}>Flow: {input.flowId}</span>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8, padding: 14, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 22, lineHeight: 1.15, margin: 0, overflowWrap: "normal", wordBreak: "normal" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
const detail: CSSProperties = { color: "#94a3b8", fontSize: 11 };
