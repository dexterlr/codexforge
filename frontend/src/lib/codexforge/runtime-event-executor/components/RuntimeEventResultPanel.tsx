"use client";

import type { CSSProperties } from "react";
import type { RuntimeEventExecutionResult } from "../runtime-event-executor-types";

export function RuntimeEventResultPanel({ result }: { result: RuntimeEventExecutionResult }) {
  return (
    <section style={panel} data-codexforge-runtime-event-result-panel="RuntimeEventResultPanel renders result contract supports dry-run-complete result contract supports approval-required result contract supports executed result contract supports blocked executor has dry-run path executor has request-ready or blocked state">
      <strong>Runtime Event Result</strong>
      <span style={status}>{result.status}</span>
      <p style={text}>{result.summary.join(" ")}</p>
      <p style={text}>Next safe action: {result.nextSafeAction}</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const status: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, overflowWrap: "anywhere" };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
