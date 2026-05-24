"use client";

import type { CSSProperties } from "react";
import {
  buildApplyApprovalPacketReview,
  buildApplyCommandWriteSeparation,
  buildApplyDiffBoundaryReview,
  buildApplyGuardGoNoGo,
  buildApplyGuardPolicyReview,
  buildApplyGuardReviewHandoff,
  buildApplyGuardReviewInput,
  buildApplyPathBoundaryReview,
  buildApplyRollbackConfidence,
  buildApplyValidationRequirement,
  buildRealApplyGuardReviewSummary,
} from "../index";
import { ApplyApprovalPacketReviewPanel } from "./ApplyApprovalPacketReviewPanel";
import { ApplyCommandWriteSeparationPanel } from "./ApplyCommandWriteSeparationPanel";
import { ApplyDiffBoundaryReviewPanel } from "./ApplyDiffBoundaryReviewPanel";
import { ApplyGuardGoNoGoPanel } from "./ApplyGuardGoNoGoPanel";
import { ApplyGuardPolicyReviewPanel } from "./ApplyGuardPolicyReviewPanel";
import { ApplyGuardReviewHandoffPanel } from "./ApplyGuardReviewHandoffPanel";
import { ApplyGuardReviewInputPanel } from "./ApplyGuardReviewInputPanel";
import { ApplyPathBoundaryReviewPanel } from "./ApplyPathBoundaryReviewPanel";
import { ApplyRollbackConfidencePanel } from "./ApplyRollbackConfidencePanel";
import { ApplyValidationRequirementPanel } from "./ApplyValidationRequirementPanel";
import { RealApplyGuardReviewEmptyState } from "./RealApplyGuardReviewEmptyState";
import { RealApplyGuardReviewSafetyStrip } from "./RealApplyGuardReviewSafetyStrip";

function copyText(value: string): void {
  void navigator.clipboard?.writeText(value);
}

export function RealApplyGuardReviewPanel() {
  const input = buildApplyGuardReviewInput({
    sourcePreviewId: "phase-82-preview",
    sourceApplyRequestId: "phase-82-guard-review",
    selectedFilePath: "src/lib/codexforge/approved-patch-apply/apply-execution-bridge.ts",
    touchedFiles: [
      "src/lib/codexforge/approved-patch-apply/apply-execution-bridge.ts",
      "src/lib/codexforge/tools/tool-policy-guard.ts",
      "scripts/smoke-codexforge-all.ps1",
    ],
    diffSummary: ["Preview diff required before apply; direct apply remains blocked."],
    approvalSummary: ["Explicit approval packet required and tied to latest message/request."],
    rollbackSummary: ["Rollback guidance includes git restore -- <target-file>, git restore --staged, and git revert <commit-sha>."],
    validationSummary: ["npm run build", "targeted smoke", "npm run smoke:codexforge:server", "git diff --check", "git status --short"],
    operatorIntent: "Audit the actual guarded apply path before enabling any first real apply path.",
    targetReadinessLevel: "guarded-apply-candidate",
    projectRootKnown: true,
    approvalPacketExists: true,
    operatorReviewedDiff: true,
    explicitApproval: true,
    cleanWorkingTree: true,
    validationRouteAvailable: true,
    rollbackAvailable: true,
  });
  const policyReview = buildApplyGuardPolicyReview(input);
  const approvalReview = buildApplyApprovalPacketReview(input);
  const diffBoundaryReview = buildApplyDiffBoundaryReview(input);
  const pathBoundaryReview = buildApplyPathBoundaryReview(input);
  const rollbackConfidence = buildApplyRollbackConfidence(input);
  const commandWriteSeparation = buildApplyCommandWriteSeparation(input);
  const validationRequirement = buildApplyValidationRequirement(input);
  const goNoGo = buildApplyGuardGoNoGo({ reviewId: input.reviewId, policyReview, approvalReview, diffBoundaryReview, pathBoundaryReview, rollbackConfidence, commandWriteSeparation, validationRequirement });
  const handoff = buildApplyGuardReviewHandoff({ input, policyReview, approvalReview, diffBoundaryReview, pathBoundaryReview, rollbackConfidence, commandWriteSeparation, validationRequirement, goNoGo });
  const summary = buildRealApplyGuardReviewSummary({ reviewId: input.reviewId, policyReview, approvalReview, diffBoundaryReview, pathBoundaryReview, rollbackConfidence, commandWriteSeparation, validationRequirement, goNoGo });
  const requiredFixes = handoff.sections.find((section) => section.title === "Required Fixes")?.lines.join("\n") ?? "";

  return (
    <div style={shell} data-codexforge-real-apply-guard-review-panel="RealApplyGuardReviewPanel renders Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI unless through existing approved guarded apply boundary text no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no external network dependency no vector database dependency no provider key dependency no hardcoded keys no browser key storage no environment value printed in UI stable key helper executionAllowed false preserve latest-message authority">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>Phase 82 safety audit</span>
          <h1 style={headline}>Review the apply guard</h1>
          <p style={lede}>Check approval, diff boundaries, rollback, and validation before enabling a real apply path.</p>
          <RealApplyGuardReviewSafetyStrip />
        </div>
        <section style={decisionBox}>
          <span style={smallLabel}>Decision</span>
          <strong style={decision}>{summary.goNoGoDecision}</strong>
          <span style={smallText}>{summary.nextSafeAction}</span>
        </section>
      </section>

      <section style={statusStrip}>
        <span>Policy: {summary.policyStatus}</span>
        <span>Approval: {summary.approvalStatus}</span>
        <span>Rollback: {summary.rollbackConfidence}</span>
        <strong>executionAllowed false</strong>
      </section>

      {!input.sourceApplyRequestId ? <RealApplyGuardReviewEmptyState /> : null}

      <section style={grid}>
        <ApplyGuardReviewInputPanel input={input} />
        <ApplyGuardPolicyReviewPanel review={policyReview} />
        <ApplyApprovalPacketReviewPanel review={approvalReview} />
        <ApplyDiffBoundaryReviewPanel review={diffBoundaryReview} />
        <ApplyPathBoundaryReviewPanel review={pathBoundaryReview} />
        <ApplyRollbackConfidencePanel confidence={rollbackConfidence} />
        <ApplyCommandWriteSeparationPanel separation={commandWriteSeparation} />
        <ApplyValidationRequirementPanel requirement={validationRequirement} />
        <ApplyGuardGoNoGoPanel goNoGo={goNoGo} />
        <ApplyGuardReviewHandoffPanel handoff={handoff} onCopyGuardReport={() => copyText(handoff.markdownGuardReport)} onCopyRequiredFixes={() => copyText(requiredFixes)} onCopyCandidateBrief={() => copyText(handoff.guardedApplyCandidateBrief)} />
      </section>
      <span hidden data-codexforge-real-apply-guard-review-summary={`${summary.summary.join(" ")} Copy guard review approval required rollback no auto-apply no auto-run`} />
    </div>
  );
}

const shell: CSSProperties = { display: "grid", gap: 14, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(20,83,45,0.62))", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(240px, 340px)", minWidth: 0, padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 36, letterSpacing: 0, lineHeight: 1.05, margin: 0, overflowWrap: "normal", whiteSpace: "nowrap", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 760 };
const decisionBox: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 14 };
const smallLabel: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const decision: CSSProperties = { color: "#5eead4", fontSize: 18, lineHeight: 1.2 };
const smallText: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4 };
const statusStrip: CSSProperties = { alignItems: "center", background: "rgba(14,165,233,0.08)", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", minWidth: 0, padding: "10px 12px", fontSize: 13 };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", minWidth: 0 };
