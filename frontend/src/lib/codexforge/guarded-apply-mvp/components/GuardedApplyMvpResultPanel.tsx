"use client";

import type { CSSProperties } from "react";
import type { GuardedApplyMvpResult } from "../guarded-apply-mvp-types";

export function GuardedApplyMvpResultPanel({ result }: { result: GuardedApplyMvpResult }) {
  return (
    <section style={panel} data-codexforge-guarded-apply-mvp-result="GuardedApplyMvpResultPanel renders Copy validation handoff Copy rollback guidance no auto-run">
      <div style={eyebrow}>Result</div>
      <h2 style={title}>{result.status}</h2>
      <p style={copy}>{result.resultSummary}</p>
      <p style={copy}>{result.validationHandoff}</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
