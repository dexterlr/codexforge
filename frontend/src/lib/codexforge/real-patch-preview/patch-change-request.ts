import {
  buildRealPatchPreviewStableId,
  uniqueRealPatchPreviewStrings,
  type PatchChangeRequest,
  type PatchChangeRequestSource,
  type PatchChangeRequestValidation,
} from "./real-patch-preview-types";

function normalizeText(value: string | null | undefined): string {
  return String(value ?? "").trim();
}

function normalizePath(value: string | null | undefined): string {
  return normalizeText(value).replace(/\\/g, "/").replace(/^\.\/+/, "");
}

function normalizeConstraints(values: readonly string[] | null | undefined): string[] {
  return uniqueRealPatchPreviewStrings(values ?? []).slice(0, 8);
}

export function validatePatchChangeRequest(
  input: PatchChangeRequestSource | PatchChangeRequest
): PatchChangeRequestValidation {
  const selectedFilePath = normalizePath(input.selectedFilePath);
  const requestedChangeText = normalizeText(input.requestedChangeText);
  const blockedReasons: string[] = [];
  const warnings: string[] = [];

  if (!selectedFilePath) blockedReasons.push("Selected file path is required before preparing a patch preview.");
  if (!requestedChangeText) blockedReasons.push("Requested change text is required before preparing a patch preview.");
  if (requestedChangeText.length > 0 && requestedChangeText.length < 12) {
    warnings.push("Requested change text is very short; preview will be more conservative.");
  }
  if (/\b(apply|write|execute|run command|run-command)\b/i.test(requestedChangeText)) {
    warnings.push("Request mentions mutation or execution; preview remains no-write and no-command.");
  }

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
    summary:
      blockedReasons.length > 0
        ? blockedReasons
        : ["Patch change request is ready for deterministic preview-only planning."],
  };
}

export function buildPatchChangeRequest(input: PatchChangeRequestSource): PatchChangeRequest {
  const selectedFilePath = normalizePath(input.selectedFilePath);
  const requestedChangeText = normalizeText(input.requestedChangeText);
  const operatorIntent = normalizeText(input.operatorIntent) || "Prepare a preview-only patch plan from selected file context.";
  const constraints = normalizeConstraints(input.constraints);
  const selectedFileCategory = input.selectedFileCategory ?? "unknown";
  const validation = validatePatchChangeRequest({
    selectedFilePath,
    selectedFileCategory,
    requestedChangeText,
    operatorIntent,
    constraints,
  });

  return {
    id: buildRealPatchPreviewStableId("real-patch-change", selectedFilePath, requestedChangeText),
    selectedFilePath,
    selectedFileCategory,
    requestedChangeText,
    operatorIntent,
    constraints,
    noWriteGuarantee: "Preview-only request: no file writes, no apply, and no source mutation.",
    noCommandGuarantee: "Preview-only request: no command execution and no validation launch from UI.",
    latestMessageAuthorityReminder:
      "Preserve latest-message authority: the newest operator instruction controls the handoff.",
    validation,
  };
}

export function summarizePatchChangeRequest(request: PatchChangeRequest): string {
  if (!request.validation.valid) {
    return `Patch change request blocked: ${request.validation.blockedReasons.join(" ")}`;
  }
  return `Patch change request ${request.id} targets ${request.selectedFilePath} as ${request.selectedFileCategory}; preview-only, no writes, no commands, latest-message authority preserved.`;
}
