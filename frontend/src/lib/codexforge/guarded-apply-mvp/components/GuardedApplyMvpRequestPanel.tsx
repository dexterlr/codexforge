"use client";

import type { CSSProperties } from "react";
import type { GuardedApplyMvpRequest } from "../guarded-apply-mvp-types";

export function GuardedApplyMvpRequestPanel({ request }: { request: GuardedApplyMvpRequest }) {
  return (
    <section style={panel} data-codexforge-guarded-apply-mvp-request="GuardedApplyMvpRequestPanel renders Copy apply request one file one diff">
      <div style={eyebrow}>Request</div>
      <h2 style={title}>Review apply request</h2>
      <p style={copy}>{request.diffSummary}</p>
      <code style={code}>{request.selectedFile ?? "No file selected"}</code>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
const code: CSSProperties = { color: "#bae6fd", fontSize: 12, overflowWrap: "anywhere" };
