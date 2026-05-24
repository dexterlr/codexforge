"use client";

import type { CSSProperties } from "react";
import type { ApplyGuardGoNoGo } from "../real-apply-guard-review-types";

export function ApplyGuardGoNoGoPanel({ goNoGo }: { goNoGo: ApplyGuardGoNoGo }) {
  return (
    <section style={panel} data-codexforge-apply-guard-go-no-go-panel="ApplyGuardGoNoGoPanel renders go-for-guarded-apply-candidate executionAllowed false in Phase 82 no-go if direct UI write apply run bypass exists">
      <h2 style={heading}>Go/no-go</h2>
      <strong style={decision}>{goNoGo.decision}</strong>
      <p style={copy}>{goNoGo.nextSafeAction}</p>
      <span style={badge}>executionAllowed false</span>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const heading: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const decision: CSSProperties = { color: "#5eead4", fontSize: 20, lineHeight: 1.2 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const badge: CSSProperties = { color: "#fca5a5", fontSize: 12, fontWeight: 900 };
