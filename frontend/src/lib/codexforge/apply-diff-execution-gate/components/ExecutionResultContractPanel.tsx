"use client";

import type { CSSProperties } from "react";
import { summarizeApplyExecutionResultContract, type ApplyExecutionResultContract } from "../index";

type Props = {
  result: ApplyExecutionResultContract;
};

export function ExecutionResultContractPanel({ result }: Props) {
  return (
    <section
      style={card}
      data-codexforge-apply-diff-execution-result="ExecutionResultContractPanel renders result contract supports blocked result contract supports request-ready result contract supports completed result contract supports failed verification required after dispatch"
    >
      <div style={row}>
        <span style={eyebrow}>Result Contract</span>
        <span style={result.ok ? badgeOk : badgeWarn}>{result.status}</span>
      </div>
      <h3 style={title}>Visible apply result contract</h3>
      <ul style={list}>{summarizeApplyExecutionResultContract(result).map((item) => <li key={item}>{item}</li>)}</ul>
      {result.errors.length > 0 ? (
        <ul style={warnList}>{result.errors.map((item) => <li key={item}>{item}</li>)}</ul>
      ) : null}
      <p style={meta}>Verification next steps: {result.verificationNextSteps.join("; ") || "verification required after dispatch"}</p>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(74,222,128,0.2)", background: "rgba(22,101,52,0.12)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#86efac", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#dcfce7", fontSize: 12, lineHeight: 1.45 };
const warnList: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fecaca", fontSize: 12, lineHeight: 1.45 };
const badgeOk: CSSProperties = { border: "1px solid rgba(74,222,128,0.28)", background: "rgba(34,197,94,0.12)", borderRadius: 8, padding: "4px 7px", color: "#bbf7d0", fontSize: 11, fontWeight: 900 };
const badgeWarn: CSSProperties = { border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.12)", borderRadius: 8, padding: "4px 7px", color: "#fde68a", fontSize: 11, fontWeight: 900 };
const meta: CSSProperties = { margin: 0, color: "#bbf7d0", fontSize: 12, overflowWrap: "anywhere" };
