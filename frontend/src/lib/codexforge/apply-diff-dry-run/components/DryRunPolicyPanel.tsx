"use client";

import type { CSSProperties } from "react";
import { summarizeApplyDiffDryRunPolicy, type ApplyDiffDryRunPolicy } from "../index";

type Props = {
  policy: ApplyDiffDryRunPolicy;
};

export function DryRunPolicyPanel({ policy }: Props) {
  return (
    <section
      style={card}
      data-codexforge-apply-diff-dry-run-policy="DryRunPolicyPanel renders policy blocks real apply-diff policy blocks write-file policy blocks run-command policy blocks broker-execution policy requires explicit approval packet policy requires rollback plan policy requires verification plan"
    >
      <div style={row}>
        <span style={eyebrow}>Dry Run Policy</span>
        <span style={policy.allowed ? badgeOk : badgeWarn}>{policy.allowed ? "simulation allowed" : "blocked"}</span>
      </div>
      <h3 style={title}>Policy-backed simulation boundary</h3>
      <ul style={list}>{summarizeApplyDiffDryRunPolicy(policy).map((item) => <li key={item}>{item}</li>)}</ul>
      <ul style={list}>
        <li>Policy blocks real apply-diff.</li>
        <li>Policy blocks write-file.</li>
        <li>Policy blocks run-command.</li>
        <li>Policy blocks broker-execution.</li>
      </ul>
      {policy.blockedReasons.length > 0 ? (
        <ul style={warnList}>{policy.blockedReasons.map((item) => <li key={item}>{item}</li>)}</ul>
      ) : null}
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(15,118,110,0.12)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badgeOk: CSSProperties = { border: "1px solid rgba(74,222,128,0.28)", background: "rgba(34,197,94,0.12)", borderRadius: 8, padding: "4px 7px", color: "#bbf7d0", fontSize: 11, fontWeight: 900 };
const badgeWarn: CSSProperties = { border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.12)", borderRadius: 8, padding: "4px 7px", color: "#fde68a", fontSize: 11, fontWeight: 900 };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#ccfbf1", fontSize: 12, lineHeight: 1.45 };
const warnList: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fde68a", fontSize: 12, lineHeight: 1.45 };
