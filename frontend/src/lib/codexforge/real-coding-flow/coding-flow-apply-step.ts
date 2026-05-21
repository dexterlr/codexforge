import type { CodingFlowApplyStep, CodingFlowInput } from "./real-coding-flow-types";

export function buildCodingFlowApplyStep(input: CodingFlowInput): CodingFlowApplyStep {
  const blockedReasons = input.previewId ? [] : ["Preview patch before preparing an apply request."];
  return {
    previewId: input.previewId,
    applyRequestReadiness: input.previewId ? "request-ready" : "manual-handoff",
    approvalStatus: input.applyRequestId ? "approved" : "required",
    policyStatus: "approval required; guarded apply only; no direct apply button; no auto-apply",
    rollbackReadiness: input.previewId ? "required" : "missing",
    blockedReasons,
    applyRoute: "/files",
    nextAction: input.previewId ? "Review before apply. Approval is required. Keep rollback ready." : "Create or copy a reviewed preview handoff first.",
  };
}

export function summarizeCodingFlowApplyStep(step: CodingFlowApplyStep): string {
  return `${step.applyRequestReadiness}: ${step.nextAction}`;
}
