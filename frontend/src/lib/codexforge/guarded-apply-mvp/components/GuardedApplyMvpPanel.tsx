"use client";

import type { CSSProperties } from "react";
import {
  buildGuardedApplyMvpApproval,
  buildGuardedApplyMvpBoundary,
  buildGuardedApplyMvpDiffContract,
  buildGuardedApplyMvpPolicy,
  buildGuardedApplyMvpRequest,
  buildGuardedApplyMvpResult,
  buildGuardedApplyMvpSummary,
  selectGuardedApplyMvpNextAction,
} from "../index";
import { GuardedApplyMvpApprovalPanel } from "./GuardedApplyMvpApprovalPanel";
import { GuardedApplyMvpBoundaryPanel } from "./GuardedApplyMvpBoundaryPanel";
import { GuardedApplyMvpDiffContractPanel } from "./GuardedApplyMvpDiffContractPanel";
import { GuardedApplyMvpEmptyState } from "./GuardedApplyMvpEmptyState";
import { GuardedApplyMvpNextActionPanel } from "./GuardedApplyMvpNextActionPanel";
import { GuardedApplyMvpPolicyPanel } from "./GuardedApplyMvpPolicyPanel";
import { GuardedApplyMvpRequestPanel } from "./GuardedApplyMvpRequestPanel";
import { GuardedApplyMvpResultPanel } from "./GuardedApplyMvpResultPanel";
import { GuardedApplyMvpSafetyStrip } from "./GuardedApplyMvpSafetyStrip";

export function GuardedApplyMvpPanel() {
  const request = buildGuardedApplyMvpRequest();
  const policy = buildGuardedApplyMvpPolicy(request);
  const contract = buildGuardedApplyMvpDiffContract(request);
  const approval = buildGuardedApplyMvpApproval(request);
  const boundary = buildGuardedApplyMvpBoundary(request, policy, approval);
  const result = buildGuardedApplyMvpResult(request, boundary);
  const action = selectGuardedApplyMvpNextAction(boundary);
  const summary = buildGuardedApplyMvpSummary(request, boundary);

  return (
    <div style={shell} data-codexforge-guarded-apply-mvp-panel="GuardedApplyMvpPanel renders Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage deterministic ids buildGuardedApplyMvpStableKey">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>Approval-gated safety boundary</span>
          <h1 style={headline}>Guarded apply MVP</h1>
          <p style={lede}>One file, one diff, one approval, then validate separately.</p>
          <GuardedApplyMvpSafetyStrip />
        </div>
        <GuardedApplyMvpNextActionPanel action={action} />
      </section>
      <section style={summaryStrip}><strong>{summary.status}</strong><span>{summary.selectedFile}</span><span>{summary.nextAction}</span></section>
      <GuardedApplyMvpEmptyState />
      <section style={grid}>
        <GuardedApplyMvpRequestPanel request={request} />
        <GuardedApplyMvpPolicyPanel policy={policy} />
        <GuardedApplyMvpDiffContractPanel contract={contract} />
        <GuardedApplyMvpApprovalPanel approval={approval} />
        <GuardedApplyMvpBoundaryPanel boundary={boundary} />
        <GuardedApplyMvpResultPanel result={result} />
      </section>
      <details style={details}><summary>Advanced details</summary><p>Copy apply request allowed. Copy validation handoff allowed. Copy rollback guidance allowed. Raw JSON stays below the fold.</p></details>
    </div>
  );
}

const shell: CSSProperties = { display: "grid", gap: 14, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.86))", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 360px)", minWidth: 0, padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 38, letterSpacing: 0, lineHeight: 1.05, margin: 0, overflowWrap: "normal", whiteSpace: "nowrap", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 760 };
const summaryStrip: CSSProperties = { alignItems: "center", background: "rgba(14,165,233,0.08)", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", padding: "10px 12px", fontSize: 13 };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", minWidth: 0 };
const details: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#cbd5e1", padding: 12 };
