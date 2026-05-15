import { buildStepRunnerApprovalPacket, validateStepRunnerApprovalPacket } from "./step-runner-approval-packet";
import { buildStepRunnerDryRunPlan } from "./step-runner-dry-run";
import { validateStepRunnerInput } from "./step-runner-input";
import { buildStepRunnerLedger } from "./step-runner-ledger";
import {
  buildStepRunnerPolicy,
  isStepRunBlocked,
  isStepRunnerPreviewAllowed,
} from "./step-runner-policy";
import { buildStepRunnerResultPreview } from "./step-runner-result-preview";
import { buildStepRunnerToolPlan } from "./step-runner-tool-plan";
import type {
  StepRunnerInput,
  StepRunnerPreviewSummary,
} from "./step-runner-preview-types";

export function buildStepRunnerPreviewSummary(
  input: StepRunnerInput
): StepRunnerPreviewSummary {
  const validation = validateStepRunnerInput(input);
  const policy = buildStepRunnerPolicy(input);
  const toolPlan = buildStepRunnerToolPlan(input);
  const approvalPacket = buildStepRunnerApprovalPacket({
    input,
    policy,
    toolPlan,
  });
  const approvalPacketValidation = validateStepRunnerApprovalPacket(approvalPacket);
  const dryRunPlan = buildStepRunnerDryRunPlan({
    input,
    policy,
    toolPlan,
  });
  const resultPreview = buildStepRunnerResultPreview({
    input,
    toolPlan,
  });
  const ledger = buildStepRunnerLedger({
    input,
    policy,
    toolPlan,
    approvalPacket,
    dryRunPlan,
  });
  const draft: StepRunnerPreviewSummary = {
    id: "step-runner-preview-summary",
    input,
    validation,
    policy,
    toolPlan,
    approvalPacket,
    approvalPacketValidation,
    dryRunPlan,
    resultPreview,
    ledger,
    previewAllowed: isStepRunnerPreviewAllowed(policy),
    stepRunBlocked: true,
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeStepRunnerPreviewSummary(draft),
  };
}

export function summarizeStepRunnerPreviewSummary(
  summary: StepRunnerPreviewSummary
): string[] {
  return [
    summary.previewAllowed
      ? "Approved Step Runner Preview can prepare a reviewed packet."
      : "Approved Step Runner Preview is blocked until input validates.",
    isStepRunBlocked(summary.policy)
      ? "No step execution in Phase 25; Future run requires approval."
      : "Future run still requires explicit approval before execution.",
    `${summary.toolPlan.tools.length} tool postures, ${summary.approvalPacket.requiredApprovals.length} required approvals, ${summary.dryRunPlan.stopConditions.length} stop conditions, and ${summary.ledger.items.length} ledger entries are visible.`,
    "Step Runner Preview is deterministic, typed, local-first, policy checked, approval gated, and preview-only.",
  ];
}
