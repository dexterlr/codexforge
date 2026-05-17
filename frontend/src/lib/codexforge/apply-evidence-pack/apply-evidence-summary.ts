import { buildApplyEvidenceApproval } from "./apply-evidence-approval";
import { verifyApplyEvidenceCurrentFile } from "./apply-evidence-current-file";
import { buildApplyEvidenceFirewall } from "./apply-evidence-firewall";
import { buildApplyEvidenceInput } from "./apply-evidence-input";
import {
  buildApplyEvidencePackStableKey,
  type ApplyEvidencePack,
  type ApplyEvidencePackState,
  type ApplyEvidenceInputSource,
  type ApplyEvidenceSummary,
  type ApplyEvidenceValidation,
} from "./apply-evidence-pack-types";
import { buildApplyEvidenceRisk } from "./apply-evidence-risk";
import { buildApplyEvidenceRollbackPlan } from "./apply-evidence-rollback";
import { buildApplyEvidenceTestPlan } from "./apply-evidence-tests";

function decideState(args: {
  inputGoal: string;
  blockedReasons: string[];
  missingItems: string[];
  approvalState: string;
  approvedForFutureGuardedApply: boolean;
}): ApplyEvidencePackState {
  if (args.inputGoal.length === 0) return "draft";
  if (args.approvalState === "rejected") return "rejected";
  if (args.blockedReasons.length > 0) return "blocked";
  if (args.missingItems.length > 0) return "incomplete";
  if (args.approvedForFutureGuardedApply) return "approved-for-future-guarded-apply";
  return "ready-for-human-review";
}

export function buildApplyEvidenceSummary(args: Omit<ApplyEvidencePack, "id" | "state" | "summary" | "evidenceReport" | "previewReviewArtifact">): ApplyEvidenceSummary {
  const missingItems = [
    ...args.currentFileVerification.missingItems,
    ...args.testPlan.missingItems,
    ...args.rollbackPlan.missingItems,
    ...args.approval.missingItems,
  ];
  const blockedReasons = [...args.risk.blockers];
  const state = decideState({
    inputGoal: args.input.goal,
    blockedReasons,
    missingItems,
    approvalState: args.approval.approvalState,
    approvedForFutureGuardedApply: args.approval.approvedForFutureGuardedApply,
  });

  return {
    id: buildApplyEvidencePackStableKey("apply-evidence-summary", args.input.id, state),
    inputId: args.input.id,
    state,
    targetFileCount: args.input.targetFiles.length,
    evidenceRefCount: args.input.evidenceRefs.length,
    checkCount: args.testPlan.checks.length,
    blockerCount: blockedReasons.length,
    missingItemCount: missingItems.length,
    finalReadinessDecision: state,
    nextSafeAction:
      state === "approved-for-future-guarded-apply"
        ? "Keep evidence pack with the future guarded executor review; do not apply changes here."
        : "Complete current file verification, rollback plan, test plan, operator note, and human review.",
    summary: [
      `Evidence pack state ${state}.`,
      `${args.input.targetFiles.length} target file(s), ${args.input.evidenceRefs.length} evidence ref(s), ${args.testPlan.checks.length} check placeholder(s).`,
      "Evidence pack does not apply changes and is future guarded apply only.",
      "Mutation firewall active.",
    ],
  };
}

export function buildApplyEvidenceReport(pack: Omit<ApplyEvidencePack, "evidenceReport">): string {
  return [
    "Apply Evidence Pack",
    "",
    "This evidence pack does not apply changes.",
    "Future guarded apply only.",
    "Current file verification required.",
    "Rollback plan required.",
    "Test plan required.",
    "Operator approval note required.",
    "Mutation firewall active.",
    "",
    `State: ${pack.state}`,
    `Goal: ${pack.input.goal}`,
    `Preview diff package: ${pack.input.previewDiffPackageId}`,
    `Apply gate: ${pack.input.applyGateId}`,
    `Targets: ${pack.input.targetFiles.join(", ")}`,
    `Risk: ${pack.risk.level}`,
    `Approval: ${pack.approval.approvalState}`,
    `Final readiness decision: ${pack.summary.finalReadinessDecision}`,
    `Next safe action: ${pack.summary.nextSafeAction}`,
  ].join("\n");
}

export function buildApplyEvidencePack(source: ApplyEvidenceInputSource): ApplyEvidencePack {
  const input = buildApplyEvidenceInput(source);
  const currentFileVerification = verifyApplyEvidenceCurrentFile(input);
  const risk = buildApplyEvidenceRisk(input, currentFileVerification);
  const testPlan = buildApplyEvidenceTestPlan(input);
  const rollbackPlan = buildApplyEvidenceRollbackPlan(input);
  const approval = buildApplyEvidenceApproval({ input, risk, testPlan, rollbackPlan });
  const firewall = buildApplyEvidenceFirewall({ input, approval });
  const partial = {
    input,
    currentFileVerification,
    risk,
    testPlan,
    rollbackPlan,
    approval,
    firewall,
  };
  const summary = buildApplyEvidenceSummary(partial);
  const state = summary.state;
  const packWithoutReport = {
    id: buildApplyEvidencePackStableKey("apply-evidence-pack", input.id, state),
    state,
    ...partial,
    summary,
    previewReviewArtifact: true,
  } satisfies Omit<ApplyEvidencePack, "evidenceReport">;

  return {
    ...packWithoutReport,
    evidenceReport: buildApplyEvidenceReport(packWithoutReport),
  };
}

export function validateApplyEvidencePack(pack: ApplyEvidencePack): ApplyEvidenceValidation {
  const missingItems = [
    ...pack.currentFileVerification.missingItems,
    ...pack.testPlan.missingItems,
    ...pack.rollbackPlan.missingItems,
    ...pack.approval.missingItems,
  ];
  const blockedReasons = [...pack.risk.blockers];
  const warnings = [
    ...pack.risk.warnings,
    pack.firewall.active ? null : "Mutation firewall must be active.",
  ].filter((item): item is string => item !== null);

  return {
    valid:
      blockedReasons.length === 0 &&
      missingItems.length === 0 &&
      pack.firewall.active &&
      pack.state !== "draft" &&
      pack.state !== "rejected",
    state: pack.state,
    blockedReasons,
    missingItems,
    warnings,
    summary: [
      `Validation state ${pack.state}.`,
      `${missingItems.length} missing item(s).`,
      `${blockedReasons.length} blocker(s).`,
      "Validation does not execute apply.",
    ],
  };
}

export function summarizeApplyEvidencePack(pack: ApplyEvidencePack): string[] {
  return [
    ...pack.summary.summary,
    ...validateApplyEvidencePack(pack).summary,
    "Approved-for-future-guarded-apply is a readiness state only, not execution.",
  ];
}
