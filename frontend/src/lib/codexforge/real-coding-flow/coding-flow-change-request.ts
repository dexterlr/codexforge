import { buildCodingFlowStableKey } from "./coding-flow-input";
import type { CodingFlowChangeRequest, CodingFlowInput, CodingFlowValidation } from "./real-coding-flow-types";

function isVague(text: string | null): boolean {
  if (!text) return false;
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length < 4 || /^(fix|update|change|improve|make better)$/i.test(text.trim());
}

export function buildCodingFlowChangeRequest(input: CodingFlowInput): CodingFlowChangeRequest {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  if (!input.selectedFilePath) blockedReasons.push("Select a file before describing a patch request.");
  if (!input.requestedChangeText) blockedReasons.push("Describe what you want changed.");
  if (isVague(input.requestedChangeText)) warnings.push("Change text looks vague. Keep it specific.");
  if (input.selectedFilePath?.includes("/api/") || input.selectedFilePath?.includes("server")) warnings.push("High-risk file: review behavior and validation carefully.");
  return {
    changeRequestId: `change-request:${buildCodingFlowStableKey(input.selectedFilePath, input.requestedChangeText)}`,
    selectedFilePath: input.selectedFilePath,
    requestedChangeText: input.requestedChangeText,
    operatorIntent: "Describe what you want changed. Keep it specific. You can preview before anything is applied.",
    constraints: ["preview before apply", "approval required", "no auto-apply", "no auto-run", "preserve latest-message authority"],
    acceptanceCriteria: ["Selected file is inspected.", "Requested change is specific.", "Preview patch can be reviewed before apply."],
    riskNotes: warnings,
    readyForPreview: blockedReasons.length === 0,
    blockedReasons,
    warnings,
  };
}

export function validateCodingFlowChangeRequest(request: CodingFlowChangeRequest): CodingFlowValidation {
  return { ok: request.blockedReasons.length === 0, blockedReasons: request.blockedReasons, warnings: request.warnings };
}

export function summarizeCodingFlowChangeRequest(request: CodingFlowChangeRequest): string {
  return request.readyForPreview ? `Ready to preview ${request.selectedFilePath}.` : `Blocked: ${request.blockedReasons.join(" ")}`;
}
