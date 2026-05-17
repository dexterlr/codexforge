import {
  buildApplyDiffDryRunStableKey,
  type ApplyDiffDryRunInput,
  type ApplyDryRunConflictCheck,
  type ApplyDryRunConflictItem,
  type ApplyDryRunConflictKind,
  type ApplyDryRunConflictSeverity,
} from "./apply-dry-run-types";

const CONFLICT_LABELS: Record<ApplyDryRunConflictKind, string> = {
  "pseudo-diff-only": "Pseudo diff only",
  "missing-real-patch": "Missing real patch",
  "missing-current-file-verification": "Missing current file verification",
  "target-file-outside-approved-packet": "Target file outside approved packet",
  "broad-file-impact": "Broad file impact",
  "high-risk-file": "High risk file",
  "stale-evidence": "Stale evidence",
  "missing-smoke-coverage": "Missing smoke coverage",
  "missing-rollback": "Missing rollback",
  "missing-approval": "Missing approval",
};

export function buildApplyDryRunConflictItem(args: {
  input: ApplyDiffDryRunInput;
  kind: ApplyDryRunConflictKind;
  severity: ApplyDryRunConflictSeverity;
  detail: string;
  filePath?: string | null;
  blocksFutureApply?: boolean;
}): ApplyDryRunConflictItem {
  return {
    id: `apply-diff-dry-run-conflict:${buildApplyDiffDryRunStableKey(args.input.id, args.kind, args.filePath ?? "global")}`,
    dryRunId: args.input.id,
    kind: args.kind,
    severity: args.severity,
    filePath: args.filePath ?? null,
    label: CONFLICT_LABELS[args.kind],
    detail: args.detail,
    blocksFutureApply: args.blocksFutureApply ?? args.severity === "blocker",
  };
}

export function buildApplyDryRunConflictCheck(input: ApplyDiffDryRunInput): ApplyDryRunConflictCheck {
  const items: ApplyDryRunConflictItem[] = [];

  if (input.patchSourceState === "pseudo-diff-only") {
    items.push(buildApplyDryRunConflictItem({
      input,
      kind: "pseudo-diff-only",
      severity: "warning",
      detail: "Pseudo diff only can simulate intent but is not applyable.",
      blocksFutureApply: true,
    }));
  }
  if (input.realPatchAvailabilityState !== "reviewed") {
    items.push(buildApplyDryRunConflictItem({
      input,
      kind: "missing-real-patch",
      severity: "warning",
      detail: "Missing real patch blocks future apply until a reviewed patch is supplied.",
      blocksFutureApply: true,
    }));
  }
  if (input.currentFileVerificationState !== "verified-current" || !input.currentFileVerificationAcknowledged) {
    items.push(buildApplyDryRunConflictItem({
      input,
      kind: "missing-current-file-verification",
      severity: "blocker",
      detail: "Current file verification required before dry-run readiness.",
    }));
  }
  for (const filePath of input.targetFiles) {
    if (!input.approvedTargetFiles.includes(filePath)) {
      items.push(buildApplyDryRunConflictItem({
        input,
        kind: "target-file-outside-approved-packet",
        severity: "blocker",
        filePath,
        detail: "Target file missing from approved packet.",
      }));
    }
  }
  if (input.targetFiles.length > 6) {
    items.push(buildApplyDryRunConflictItem({
      input,
      kind: "broad-file-impact",
      severity: "warning",
      detail: "Broad file impact requires extra review before future apply.",
      blocksFutureApply: true,
    }));
  }
  if (input.riskLevel === "high" || input.riskLevel === "critical") {
    items.push(buildApplyDryRunConflictItem({
      input,
      kind: "high-risk-file",
      severity: input.highRiskExtraReviewAcknowledged ? "warning" : "blocker",
      detail: "High risk file impact requires extra review.",
      blocksFutureApply: true,
    }));
  }
  if (input.staleEvidenceWarnings.length > 0 || input.currentFileVerificationState === "stale-or-unknown") {
    items.push(buildApplyDryRunConflictItem({
      input,
      kind: "stale-evidence",
      severity: "warning",
      detail: "Stale evidence must be refreshed against current files.",
      blocksFutureApply: true,
    }));
  }
  if (input.smokeChecks.length < 1) {
    items.push(buildApplyDryRunConflictItem({
      input,
      kind: "missing-smoke-coverage",
      severity: "warning",
      detail: "Missing smoke coverage should be added before future apply.",
      blocksFutureApply: true,
    }));
  }
  if (input.rollbackPlan.length < 1 || !input.rollbackPlanAcknowledged) {
    items.push(buildApplyDryRunConflictItem({
      input,
      kind: "missing-rollback",
      severity: "blocker",
      detail: "Rollback plan required before dry-run readiness.",
    }));
  }
  if (!input.approvalPacketExplicit || input.approvalPosture === "missing") {
    items.push(buildApplyDryRunConflictItem({
      input,
      kind: "missing-approval",
      severity: "blocker",
      detail: "Missing approval packet blocks dry-run readiness.",
    }));
  }

  const blockerCount = items.filter((item) => item.severity === "blocker").length;
  const warningCount = items.length - blockerCount;

  return {
    id: `apply-diff-dry-run-conflict-check:${buildApplyDiffDryRunStableKey(input.id)}`,
    dryRunId: input.id,
    items,
    blockerCount,
    warningCount,
    summary: summarizeApplyDryRunConflictCheck(items),
  };
}

export function summarizeApplyDryRunConflictCheck(
  checkOrItems: ApplyDryRunConflictCheck | readonly ApplyDryRunConflictItem[]
): string[] {
  const items = "items" in checkOrItems ? checkOrItems.items : checkOrItems;
  const blockers = items.filter((item) => item.severity === "blocker").length;

  return [
    `${items.length} conflict check item(s) prepared without file reads.`,
    `${blockers} blocker(s) affect dry-run readiness or future apply.`,
    "Conflict check includes missing real patch, stale evidence, approval, rollback, and smoke coverage gates when supplied state requires them.",
  ];
}
