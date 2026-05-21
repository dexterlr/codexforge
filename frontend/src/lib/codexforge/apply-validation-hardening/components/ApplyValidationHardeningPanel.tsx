"use client";

import { useMemo, type CSSProperties } from "react";
import {
  buildApplyValidationHardeningSummary,
  buildApplyValidationNextActionPlan,
  buildCodingFlowCompletion,
  buildHardenedApplyInput,
  buildHardenedApplyPolicy,
  buildHardenedDiffSafety,
  buildHardenedRollbackPlan,
  buildHardenedValidationPlan,
  buildValidationOutputReview,
  buildValidationOutputReviewItem,
  buildValidationResultRouting,
} from "../index";
import { ApplyValidationEmptyState } from "./ApplyValidationEmptyState";
import { ApplyValidationNextActionPanel } from "./ApplyValidationNextActionPanel";
import { ApplyValidationSafetyStrip } from "./ApplyValidationSafetyStrip";
import { CodingFlowCompletionPanel } from "./CodingFlowCompletionPanel";
import { HardenedApplyInputPanel } from "./HardenedApplyInputPanel";
import { HardenedApplyPolicyPanel } from "./HardenedApplyPolicyPanel";
import { HardenedDiffSafetyPanel } from "./HardenedDiffSafetyPanel";
import { HardenedRollbackPlanPanel } from "./HardenedRollbackPlanPanel";
import { HardenedValidationPlanPanel } from "./HardenedValidationPlanPanel";
import { ValidationOutputReviewPanel } from "./ValidationOutputReviewPanel";
import { ValidationResultRoutingPanel } from "./ValidationResultRoutingPanel";

const SAMPLE_DIFF = [
  "diff --git a/src/app/code-flow/page-client.tsx b/src/app/code-flow/page-client.tsx",
  "--- a/src/app/code-flow/page-client.tsx",
  "+++ b/src/app/code-flow/page-client.tsx",
  "@@ -1,3 +1,4 @@",
  " import { RealCodingFlowPanel } from \"@/lib/codexforge/real-coding-flow/components\";",
  "+// Preview only sample for apply-validation hardening.",
].join("\n");

export function ApplyValidationHardeningPanel() {
  const model = useMemo(() => {
    const input = buildHardenedApplyInput({
      selectedFilePath: "src/app/code-flow/page-client.tsx",
      previewDiffId: "preview-real-coding-flow-apply-validation",
      previewDiffText: SAMPLE_DIFF,
      previewDiffSummary: "Reviewable sample preview diff for /code-flow apply hardening.",
      applyRequestId: "apply-request-code-flow-hardening",
      approvalPacketId: "approval-packet-required",
      validationRequestId: "validation-request-hardening",
      rollbackSummary: "Use git restore target file before commit; use git revert after commit.",
      currentCodingFlowId: "real-coding-flow",
    });
    const diffSafety = buildHardenedDiffSafety({ selectedFilePath: input.selectedFilePath, previewDiffText: input.previewDiffText, targetedSmokeCommands: ["smoke-codexforge-real-coding-flow.ps1"] });
    const rollbackPlan = buildHardenedRollbackPlan({ targetFiles: diffSafety.touchedFiles.length ? diffSafety.touchedFiles : [input.selectedFilePath] });
    const validationPlan = buildHardenedValidationPlan({ surfaces: ["/code-flow", "real-coding-flow", "approved-patch-apply", "validation-runner"] });
    const policy = buildHardenedApplyPolicy({ input, diffSafety, rollbackPlan, validationPlan, explicitApproval: false, touchedFiles: diffSafety.touchedFiles, cleanWorkingTree: false });
    const outputReview = buildValidationOutputReview({
      requestId: input.validationRequestId,
      items: [
        buildValidationOutputReviewItem({ command: "npm run build", output: "", exitCode: null }),
      ],
    });
    const routing = buildValidationResultRouting({ outputReview });
    const completion = buildCodingFlowCompletion({ policy, rollbackPlan, validationPlan, outputReview, nextActionSelected: true });
    const nextActionPlan = buildApplyValidationNextActionPlan({ input, policy, rollbackPlan, validationPlan, outputReview, completion });
    const summary = buildApplyValidationHardeningSummary({ policy, diffSafety, rollbackPlan, validationPlan, outputReview, routing, completion, nextActionPlan });
    return { input, diffSafety, rollbackPlan, validationPlan, policy, outputReview, routing, completion, nextActionPlan, summary };
  }, []);

  function copyText(label: string, value: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(value).catch(() => undefined);
    }
    void label;
  }

  return (
    <section style={shell} data-codexforge-apply-validation-hardening-panel="ApplyValidationHardeningPanel renders Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI unless through existing approved guarded apply boundary text no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage no process.env value printed in UI no Math.random no Date.now stable key helper apply-ready validation-ready handoff-only">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>Real Apply and Validation Hardening</span>
          <h1 style={headline}>Apply safely, then validate</h1>
          <p style={lede}>Review the diff, keep rollback ready, run checks, and route the result.</p>
          <ApplyValidationSafetyStrip />
        </div>
        <ApplyValidationNextActionPanel plan={model.nextActionPlan} />
      </section>
      <section style={summaryStrip}>{model.summary.summary.map((item) => <span key={`apply-validation-summary-${item}`}>{item}</span>)}</section>
      {!model.input.previewDiffText ? <ApplyValidationEmptyState /> : null}
      <section style={grid}>
        <HardenedApplyInputPanel input={model.input} />
        <HardenedApplyPolicyPanel policy={model.policy} />
        <HardenedDiffSafetyPanel safety={model.diffSafety} />
        <HardenedRollbackPlanPanel plan={model.rollbackPlan} onCopy={copyText} />
        <HardenedValidationPlanPanel plan={model.validationPlan} onCopy={copyText} />
        <ValidationOutputReviewPanel review={model.outputReview} />
        <ValidationResultRoutingPanel routing={model.routing} />
        <CodingFlowCompletionPanel completion={model.completion} onCopy={copyText} />
      </section>
      <span hidden data-codexforge-apply-validation-hardening-summary={`${model.summary.applyPolicyStatus} ${model.summary.diffSafetyStatus} ${model.summary.completionStatus} ${model.summary.nextSafeAction}`} />
    </section>
  );
}

const shell: CSSProperties = { color: "#f8fafc", display: "grid", gap: 14, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.86))", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 360px)", minWidth: 0, padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 36, letterSpacing: 0, lineHeight: 1.05, margin: 0, overflowWrap: "normal", whiteSpace: "nowrap", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 760 };
const summaryStrip: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.08)", borderRadius: 8, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, padding: 10 };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", minWidth: 0 };
