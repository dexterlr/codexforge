"use client";

import type { CSSProperties } from "react";
import type { GuardedApplyMvpDiffContract } from "../guarded-apply-mvp-types";

export function GuardedApplyMvpDiffContractPanel({ contract }: { contract: GuardedApplyMvpDiffContract }) {
  return (
    <section style={panel} data-codexforge-guarded-apply-mvp-diff="GuardedApplyMvpDiffContractPanel renders preview diff required no multi-file diff no binary patch">
      <div style={eyebrow}>Diff contract</div>
      <h2 style={title}>One preview diff</h2>
      <p style={copy}>{contract.contractSummary}</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
