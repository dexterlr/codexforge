"use client";

import type { CSSProperties } from "react";
import {
  summarizeApplyExecutionApprovalState,
  type ApplyExecutionApprovalState,
  type ApplyExecutionGateValidation,
} from "../index";

type Props = {
  approvalState: ApplyExecutionApprovalState;
  validation: ApplyExecutionGateValidation;
};

export function ExecutionApprovalStatePanel({ approvalState, validation }: Props) {
  return (
    <section
      style={card}
      data-codexforge-apply-diff-execution-approval="ExecutionApprovalStatePanel renders explicit operator approval required approval state defaults false no silent execution"
    >
      <div style={row}>
        <span style={eyebrow}>Approval State</span>
        <span style={approvalState.satisfied ? badgeOk : badgeWarn}>
          {approvalState.satisfied ? "satisfied" : "approval required"}
        </span>
      </div>
      <h3 style={title}>Human approval packet</h3>
      <ul style={list}>{summarizeApplyExecutionApprovalState(approvalState).map((item) => <li key={item}>{item}</li>)}</ul>
      <p style={meta}>approved at label/source, not timestamp: {approvalState.approvedAtLabel}</p>
      {validation.blockedReasons.length > 0 ? (
        <ul style={warnList}>{validation.blockedReasons.map((item) => <li key={item}>{item}</li>)}</ul>
      ) : null}
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(251,191,36,0.22)", background: "rgba(113,63,18,0.16)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fde68a", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fef3c7", fontSize: 12, lineHeight: 1.45 };
const warnList: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fecaca", fontSize: 12, lineHeight: 1.45 };
const badgeOk: CSSProperties = { border: "1px solid rgba(74,222,128,0.28)", background: "rgba(34,197,94,0.12)", borderRadius: 8, padding: "4px 7px", color: "#bbf7d0", fontSize: 11, fontWeight: 900 };
const badgeWarn: CSSProperties = { border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.12)", borderRadius: 8, padding: "4px 7px", color: "#fde68a", fontSize: 11, fontWeight: 900 };
const meta: CSSProperties = { margin: 0, color: "#fde68a", fontSize: 12, overflowWrap: "anywhere" };
