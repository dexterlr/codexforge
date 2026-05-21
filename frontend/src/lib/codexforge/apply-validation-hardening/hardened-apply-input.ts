import {
  buildApplyValidationStableId,
  normalizeApplyValidationPath,
  normalizeApplyValidationSummary,
  type HardenedApplyInput,
  type HardenedApplyInputSource,
  type HardenedApplyInputValidation,
} from "./apply-validation-hardening-types";

export function buildHardenedApplyInput(source: HardenedApplyInputSource = {}): HardenedApplyInput {
  const selectedFilePath = normalizeApplyValidationPath(source.selectedFilePath ?? "src/app/code-flow/page-client.tsx");
  const previewDiffId = String(source.previewDiffId ?? "preview-diff-missing").trim();
  const applyRequestId = String(source.applyRequestId ?? "apply-request-missing").trim();
  const input: Omit<HardenedApplyInput, "validation" | "summary"> = {
    id: buildApplyValidationStableId("hardened-apply-input", selectedFilePath, previewDiffId, applyRequestId),
    hardeningId: buildApplyValidationStableId("apply-validation-hardening", selectedFilePath, previewDiffId, applyRequestId),
    selectedFilePath,
    previewDiffId,
    previewDiffText: String(source.previewDiffText ?? "").trim(),
    previewDiffSummary: normalizeApplyValidationSummary(source.previewDiffSummary),
    applyRequestId,
    approvalPacketId: String(source.approvalPacketId ?? "approval-packet-missing").trim(),
    validationRequestId: String(source.validationRequestId ?? "validation-request-missing").trim(),
    rollbackSummary: normalizeApplyValidationSummary(source.rollbackSummary),
    currentCodingFlowId: String(source.currentCodingFlowId ?? "code-flow-current").trim(),
    operatorIntent: String(source.operatorIntent ?? "Review the diff, request guarded apply only after approval, then validate manually.").trim(),
    noAutoApplyGuarantee: true,
    noAutoRunGuarantee: true,
    latestMessageAuthorityReminder: "Preserve latest-message authority: newest operator instruction controls the current apply/validation decision.",
  };
  const validation = validateHardenedApplyInput(input);
  return { ...input, validation, summary: summarizeHardenedApplyInput({ ...input, validation, summary: [] }) };
}

export function validateHardenedApplyInput(input: Omit<HardenedApplyInput, "validation" | "summary"> | HardenedApplyInput): HardenedApplyInputValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  if (!input.selectedFilePath) blockedReasons.push("Selected file path is required.");
  if (!input.previewDiffId || input.previewDiffId.includes("missing")) blockedReasons.push("Preview diff id is required.");
  if (!input.previewDiffText) blockedReasons.push("Preview diff text is required.");
  if (!input.applyRequestId || input.applyRequestId.includes("missing")) blockedReasons.push("Apply request id is required.");
  if (!input.approvalPacketId || input.approvalPacketId.includes("missing")) warnings.push("Approval packet is not attached yet.");
  if (!input.validationRequestId || input.validationRequestId.includes("missing")) warnings.push("Validation request is not attached yet.");
  if (input.rollbackSummary.length < 1) warnings.push("Rollback summary should be visible before apply.");
  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
    summary: [`Hardened input valid=${blockedReasons.length === 0}.`, "No auto-apply, no auto-run, no execution, and no file writes are performed by this builder."],
  };
}

export function summarizeHardenedApplyInput(input: HardenedApplyInput): string[] {
  return [
    `Hardening ${input.hardeningId} tracks ${input.selectedFilePath}.`,
    `Preview ${input.previewDiffId}; apply request ${input.applyRequestId}; validation request ${input.validationRequestId}.`,
    "No auto-apply and no auto-run guarantees are active.",
    input.latestMessageAuthorityReminder,
  ];
}
