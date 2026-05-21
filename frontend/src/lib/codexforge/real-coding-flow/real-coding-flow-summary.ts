import { buildCodingFlowApplyStep } from "./coding-flow-apply-step";
import { buildCodingFlowChangeRequest } from "./coding-flow-change-request";
import { buildCodingFlowNextActionPlan } from "./coding-flow-next-action";
import { buildCodingFlowPreviewStep } from "./coding-flow-preview-step";
import { buildCodingFlowValidationStep } from "./coding-flow-validation-step";
import type { CodingFlowInput, RealCodingFlowSummary } from "./real-coding-flow-types";

export function buildRealCodingFlowSummary(input: CodingFlowInput): RealCodingFlowSummary {
  const change = buildCodingFlowChangeRequest(input);
  const preview = buildCodingFlowPreviewStep(input);
  const apply = buildCodingFlowApplyStep(input);
  const validation = buildCodingFlowValidationStep(input);
  const nextAction = buildCodingFlowNextActionPlan(input);
  const blockerCount = change.blockedReasons.length + preview.blockedReasons.length + apply.blockedReasons.length + validation.blockedReasons.length;
  return {
    currentStep: input.currentStep,
    selectedFile: input.selectedFilePath ?? "Not selected",
    changeRequestReady: change.readyForPreview,
    previewReady: preview.previewReadiness === "ready",
    applyReady: apply.applyRequestReadiness !== "blocked" && Boolean(input.previewId),
    validationReady: validation.validationReadiness === "ready",
    resultStatus: input.resultStatus,
    blockerCount,
    nextSafeAction: nextAction.selected.label,
  };
}

export function summarizeRealCodingFlowSession(summary: RealCodingFlowSummary): string {
  return `${summary.currentStep}: file ${summary.selectedFile}, blockers ${summary.blockerCount}, next ${summary.nextSafeAction}.`;
}
