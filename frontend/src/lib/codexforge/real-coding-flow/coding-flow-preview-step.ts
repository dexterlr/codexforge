import type { CodingFlowInput, CodingFlowPreviewStep } from "./real-coding-flow-types";

export function buildCodingFlowPreviewStep(input: CodingFlowInput): CodingFlowPreviewStep {
  const blockedReasons = [!input.selectedFilePath ? "Select a file first." : "", !input.requestedChangeText ? "Describe the change first." : ""].filter(Boolean);
  return {
    selectedFile: input.selectedFilePath,
    requestedChange: input.requestedChangeText,
    previewReadiness: blockedReasons.length ? "blocked" : "ready",
    previewRoute: "/files",
    expectedPreviewOutputs: ["patch request", "context summary", "diff preview", "risk notes", "rollback notes"],
    riskLevel: blockedReasons.length ? "blocked" : "medium",
    nextAction: blockedReasons.length ? "Complete the smallest missing step." : "Preview the patch first. Review the diff before applying. Nothing is written during preview.",
    blockedReasons,
  };
}

export function summarizeCodingFlowPreviewStep(step: CodingFlowPreviewStep): string {
  return `${step.previewReadiness}: ${step.nextAction}`;
}
