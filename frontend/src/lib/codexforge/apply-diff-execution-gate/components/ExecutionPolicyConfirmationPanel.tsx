"use client";

import type { CSSProperties } from "react";
import { summarizeApplyExecutionPolicyConfirmation, type ApplyExecutionPolicyConfirmation } from "../index";

type Props = {
  policy: ApplyExecutionPolicyConfirmation;
};

export function ExecutionPolicyConfirmationPanel({ policy }: Props) {
  return (
    <section
      style={card}
      data-codexforge-apply-diff-execution-policy="ExecutionPolicyConfirmationPanel renders apply-diff is approval-required policy blocks missing approval policy blocks pseudo-only patch policy blocks missing real patch policy blocks broker-execution policy blocks direct write-file policy blocks direct run-command execute route is the guarded boundary"
    >
      <div style={row}>
        <span style={eyebrow}>Policy Confirmation</span>
        <span style={policy.ready ? badgeOk : badgeWarn}>{policy.ready ? "ready" : "blocked"}</span>
      </div>
      <h3 style={title}>Guarded execution policy</h3>
      <ul style={list}>{summarizeApplyExecutionPolicyConfirmation(policy).map((item) => <li key={item}>{item}</li>)}</ul>
      {policy.blockedReasons.length > 0 ? (
        <ul style={warnList}>{policy.blockedReasons.map((item) => <li key={item}>{item}</li>)}</ul>
      ) : null}
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(248,113,113,0.2)", background: "rgba(127,29,29,0.14)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fee2e2", fontSize: 12, lineHeight: 1.45 };
const warnList: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fecaca", fontSize: 12, lineHeight: 1.45 };
const badgeOk: CSSProperties = { border: "1px solid rgba(74,222,128,0.28)", background: "rgba(34,197,94,0.12)", borderRadius: 8, padding: "4px 7px", color: "#bbf7d0", fontSize: 11, fontWeight: 900 };
const badgeWarn: CSSProperties = { border: "1px solid rgba(248,113,113,0.28)", background: "rgba(248,113,113,0.12)", borderRadius: 8, padding: "4px 7px", color: "#fecaca", fontSize: 11, fontWeight: 900 };
