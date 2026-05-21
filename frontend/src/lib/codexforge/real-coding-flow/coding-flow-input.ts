import type { CodingFlowInput, CodingFlowInputSource, CodingFlowValidation } from "./real-coding-flow-types";

export function buildCodingFlowStableKey(...parts: Array<string | null | undefined>): string {
  const raw = parts.filter(Boolean).join(":").toLowerCase();
  const clean = raw.replace(/[^a-z0-9/_:.-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return clean.slice(0, 96) || "new-code-flow";
}

export function buildCodingFlowInput(source: CodingFlowInputSource = {}): CodingFlowInput {
  const selectedFilePath = source.selectedFilePath?.trim() || null;
  const requestedChangeText = source.requestedChangeText?.trim() || null;
  return {
    flowId: source.flowId?.trim() || `coding-flow:${buildCodingFlowStableKey(selectedFilePath, requestedChangeText)}`,
    selectedWorkflowIntent: source.selectedWorkflowIntent?.trim() || "fix-code",
    selectedFilePath,
    selectedFileSummary: source.selectedFileSummary?.trim() || null,
    requestedChangeText,
    previewId: source.previewId?.trim() || null,
    applyRequestId: source.applyRequestId?.trim() || null,
    validationRequestId: source.validationRequestId?.trim() || null,
    resultSummary: source.resultSummary?.trim() || null,
    resultStatus: source.resultStatus ?? "unknown",
    currentStep: source.currentStep ?? "start",
    noAutoApplyGuarantee: true,
    noAutoRunGuarantee: true,
    latestMessageAuthorityReminder: "Preserve latest-message authority before preparing or applying any next step.",
  };
}

export function validateCodingFlowInput(input: CodingFlowInput): CodingFlowValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  if (!input.noAutoApplyGuarantee) blockedReasons.push("Coding flow requires no-auto-apply guarantee.");
  if (!input.noAutoRunGuarantee) blockedReasons.push("Coding flow requires no-auto-run guarantee.");
  if (!input.selectedFilePath) warnings.push("No file selected yet.");
  if (!input.requestedChangeText) warnings.push("No requested change text yet.");
  return { ok: blockedReasons.length === 0, blockedReasons, warnings };
}

export function summarizeCodingFlowInput(input: CodingFlowInput): string {
  return `${input.flowId}: ${input.currentStep}, file ${input.selectedFilePath ?? "not selected"}, change ${input.requestedChangeText ? "described" : "missing"}, no auto-apply, no auto-run.`;
}
