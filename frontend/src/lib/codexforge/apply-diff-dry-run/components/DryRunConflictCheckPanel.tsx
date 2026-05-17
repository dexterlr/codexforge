"use client";

import type { CSSProperties } from "react";
import { summarizeApplyDryRunConflictCheck, type ApplyDryRunConflictCheck } from "../index";

type Props = {
  check: ApplyDryRunConflictCheck;
};

export function DryRunConflictCheckPanel({ check }: Props) {
  return (
    <section
      style={card}
      data-codexforge-apply-diff-dry-run-conflict-check="DryRunConflictCheckPanel renders conflict check includes missing real patch conflict check includes stale evidence"
    >
      <div style={row}>
        <span style={eyebrow}>Dry Run Conflict Check</span>
        <span style={badge}>{check.blockerCount} blockers</span>
      </div>
      <h3 style={title}>Conflict and stale evidence gates</h3>
      <ul style={list}>{summarizeApplyDryRunConflictCheck(check).map((item) => <li key={item}>{item}</li>)}</ul>
      <div style={stack}>
        {check.items.map((item) => (
          <article key={item.id} style={item.severity === "blocker" ? blocker : warning}>
            <strong>{item.label}</strong>
            <span>{item.detail}</span>
            <span>Severity: {item.severity}; blocks future apply: {String(item.blocksFutureApply)}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(251,146,60,0.2)", background: "rgba(154,52,18,0.14)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fdba74", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(251,146,60,0.28)", background: "rgba(249,115,22,0.14)", borderRadius: 8, padding: "4px 7px", color: "#ffedd5", fontSize: 11, fontWeight: 900 };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#ffedd5", fontSize: 12, lineHeight: 1.45 };
const stack: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const warning: CSSProperties = { border: "1px solid rgba(251,191,36,0.18)", background: "rgba(251,191,36,0.1)", borderRadius: 8, display: "grid", gap: 4, padding: 9, color: "#fef3c7", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const blocker: CSSProperties = { border: "1px solid rgba(248,113,113,0.22)", background: "rgba(127,29,29,0.22)", borderRadius: 8, display: "grid", gap: 4, padding: 9, color: "#fee2e2", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
