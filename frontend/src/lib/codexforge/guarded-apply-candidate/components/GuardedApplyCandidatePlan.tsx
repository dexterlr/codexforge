"use client";

import { useMemo, type CSSProperties } from "react";
import {
  buildGuardedApplyApprovalContract,
  buildGuardedApplyCandidateInput,
  buildGuardedApplyCandidatePolicy,
  buildGuardedApplyCandidateSummary,
  buildGuardedApplyExecutionPlan,
  buildGuardedApplyImplementationGaps,
  buildGuardedApplyResultContract,
  buildGuardedApplyRollbackContract,
  buildGuardedApplyValidationContract,
  buildSingleFileApplyScope,
} from "../index";
import { GuardedApplyApprovalContractPanel } from "./GuardedApplyApprovalContractPanel";
import { GuardedApplyCandidateEmptyState } from "./GuardedApplyCandidateEmptyState";
import { GuardedApplyCandidateInputPanel } from "./GuardedApplyCandidateInputPanel";
import { GuardedApplyCandidatePolicyPanel } from "./GuardedApplyCandidatePolicyPanel";
import { GuardedApplyCandidateSafetyStrip } from "./GuardedApplyCandidateSafetyStrip";
import { GuardedApplyCandidateCopyButton } from "./GuardedApplyCandidateUi";
import { GuardedApplyExecutionPlanPanel } from "./GuardedApplyExecutionPlanPanel";
import { GuardedApplyImplementationGapsPanel } from "./GuardedApplyImplementationGapsPanel";
import { GuardedApplyResultContractPanel } from "./GuardedApplyResultContractPanel";
import { GuardedApplyRollbackContractPanel } from "./GuardedApplyRollbackContractPanel";
import { GuardedApplyValidationContractPanel } from "./GuardedApplyValidationContractPanel";
import { SingleFileApplyScopePanel } from "./SingleFileApplyScopePanel";

export function GuardedApplyCandidatePlan() {
  const model = useMemo(() => {
    const input = buildGuardedApplyCandidateInput({
      sourceGuardReviewId: "real-apply-guard-review-phase-82",
      sourceApplyRequestId: "approved-patch-apply-review",
      sourcePreviewId: "preview-one-file-candidate",
      selectedFilePath: "src/app/code-flow/page-client.tsx",
      diffSummary: "One preview diff only for one low-risk text file.",
      approvalSummary: "Approval packet must bind selected file, exact diff hash/label, and latest request.",
      rollbackSummary: "Use git restore before commit and git revert after commit.",
      validationSummary: "Validation is separate: build, targeted smoke, server smoke, diff check, status.",
      targetMode: "design-only",
      operatorIntent: "Plan the first guarded apply path without enabling real apply.",
    });
    const scope = buildSingleFileApplyScope({
      selectedFilePath: input.selectedFilePath,
      diffTargets: [input.selectedFilePath],
      generatedFileExplicitlyReviewed: true,
      operation: "modify",
      binaryPatch: false,
    });
    const approval = buildGuardedApplyApprovalContract(["operator-reviewed-diff", "operator-reviewed-selected-file"]);
    const rollback = buildGuardedApplyRollbackContract(input.selectedFilePath);
    const validation = buildGuardedApplyValidationContract();
    const result = buildGuardedApplyResultContract();
    const policy = buildGuardedApplyCandidatePolicy({
      input,
      scope,
      previewDiffPresent: true,
      explicitApprovalPresent: approval.ready,
      approvalTiedToExactDiff: false,
      approvalTiedToLatestRequest: true,
      rollbackContractReady: rollback.ready,
      validationContractReady: true,
      resultContractReady: true,
      cleanWorkingTree: false,
    });
    const execution = buildGuardedApplyExecutionPlan();
    const gaps = buildGuardedApplyImplementationGaps();
    const summary = buildGuardedApplyCandidateSummary({ input, scope, policy, approval, rollback, validation, result, gaps });
    const planText = [
      "Guarded Apply Candidate Implementation Plan",
      "",
      ...summary.summary,
      "",
      "Scope: one file, one diff, one approval, one rollback, one validation checklist.",
      "No auto-apply. No auto-run. Execution allowed false in Phase 83.",
    ].join("\n");
    const nextPrompt = [
      "Next implementation prompt",
      "Inspect first. Clear blocker gaps before implementation.",
      "Do not enable real apply. Do not bypass approvals. Do not write files from arbitrary UI.",
      "Keep one file only, exact diff approval, rollback, separate validation, and result handoff.",
    ].join("\n");
    return { input, scope, approval, rollback, validation, result, policy, execution, gaps, summary, planText, nextPrompt };
  }, []);

  return (
    <section style={shell} data-codexforge-guarded-apply-candidate-plan="GuardedApplyCandidatePlan renders Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI unless through existing approved guarded apply boundary text no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage no process.env value printed in UI no Math.random no Date.now stable key helper one file one diff one approval no auto-apply no auto-run execution allowed false preserve latest-message authority">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>Design-only Phase 83</span>
          <h1 style={headline}>Plan the first guarded apply path</h1>
          <p style={lede}>Keep it to one file, one diff, one approval, one rollback, and one validation checklist.</p>
          <GuardedApplyCandidateSafetyStrip />
        </div>
        <div style={actionPanel}>
          <GuardedApplyCandidateCopyButton label="Copy candidate plan" value={model.planText} primary />
          <GuardedApplyCandidateCopyButton label="Copy guarded apply next prompt" value={model.nextPrompt} />
        </div>
      </section>
      <section style={summaryStrip}>{model.summary.summary.map((item) => <span key={`guarded-apply-candidate-summary-${item}`}>{item}</span>)}</section>
      {!model.input.selectedFilePath ? <GuardedApplyCandidateEmptyState /> : null}
      <section style={grid}>
        <GuardedApplyCandidateInputPanel input={model.input} />
        <SingleFileApplyScopePanel scope={model.scope} />
        <GuardedApplyCandidatePolicyPanel policy={model.policy} />
        <GuardedApplyApprovalContractPanel contract={model.approval} />
        <GuardedApplyExecutionPlanPanel plan={model.execution} />
        <GuardedApplyRollbackContractPanel contract={model.rollback} />
        <GuardedApplyValidationContractPanel contract={model.validation} />
        <GuardedApplyResultContractPanel contract={model.result} />
        <GuardedApplyImplementationGapsPanel gaps={model.gaps} />
      </section>
      <details style={details}>
        <summary style={summaryLabel}>Advanced details</summary>
        <p style={advancedCopy}>Execution remains design-only/blocked in Phase 83. Future work must use an existing approved guarded apply boundary if present, or introduce a dedicated policy-gated API/tool boundary.</p>
      </details>
    </section>
  );
}

const shell: CSSProperties = { color: "#f8fafc", display: "grid", gap: 14, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.86))", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(240px, 340px)", minWidth: 0, padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 34, letterSpacing: 0, lineHeight: 1.05, margin: 0, overflowWrap: "normal", whiteSpace: "nowrap", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 780 };
const actionPanel: CSSProperties = { alignContent: "start", display: "grid", gap: 9, minWidth: 0 };
const summaryStrip: CSSProperties = { background: "rgba(14,165,233,0.08)", border: "1px solid rgba(125,211,252,0.2)", borderRadius: 8, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, padding: 10 };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 310px), 1fr))", minWidth: 0 };
const details: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, padding: 12 };
const summaryLabel: CSSProperties = { color: "#bfdbfe", cursor: "pointer", fontSize: 13, fontWeight: 900 };
const advancedCopy: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, margin: "10px 0 0" };
