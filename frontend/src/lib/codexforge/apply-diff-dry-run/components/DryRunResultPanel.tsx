"use client";

import type { CSSProperties } from "react";
import { summarizeApplyDryRunResult, type ApplyDryRunResult } from "../index";

type Props = {
  result: ApplyDryRunResult;
};

export function DryRunResultPanel({ result }: Props) {
  return (
    <section
      style={card}
      data-codexforge-apply-diff-dry-run-result="DryRunResultPanel renders result supports blocked result supports dry-run-complete"
    >
      <div style={row}>
        <span style={eyebrow}>Dry Run Result</span>
        <span style={result.ok ? badgeOk : badgeWarn}>{result.status}</span>
      </div>
      <h3 style={title}>Simulation result ledger handoff</h3>
      <ul style={list}>{summarizeApplyDryRunResult(result).map((item) => <li key={item}>{item}</li>)}</ul>
      {result.blockedReasons.length > 0 ? (
        <ul style={warnList}>{result.blockedReasons.map((item) => <li key={item}>{item}</li>)}</ul>
      ) : null}
      <ol style={list}>{result.requiredNextSteps.map((item) => <li key={item}>{item}</li>)}</ol>
      <p style={boundary}>{result.futureExecutorBoundary}</p>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(74,222,128,0.18)", background: "rgba(22,101,52,0.12)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#86efac", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badgeOk: CSSProperties = { border: "1px solid rgba(74,222,128,0.28)", background: "rgba(34,197,94,0.12)", borderRadius: 8, padding: "4px 7px", color: "#bbf7d0", fontSize: 11, fontWeight: 900, overflowWrap: "anywhere" };
const badgeWarn: CSSProperties = { border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.12)", borderRadius: 8, padding: "4px 7px", color: "#fde68a", fontSize: 11, fontWeight: 900, overflowWrap: "anywhere" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#dcfce7", fontSize: 12, lineHeight: 1.45 };
const warnList: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fde68a", fontSize: 12, lineHeight: 1.45 };
const boundary: CSSProperties = { margin: 0, color: "#bbf7d0", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
