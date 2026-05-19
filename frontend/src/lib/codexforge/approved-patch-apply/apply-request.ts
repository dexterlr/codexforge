import {
  buildApprovedPatchApplyStableHash,
  buildApprovedPatchApplyStableId,
  normalizeApprovedPatchApplyPath,
  uniqueApprovedPatchApplyStrings,
  type ApprovedPatchApplyMode,
  type ApprovedPatchApplyRequest,
  type ApprovedPatchApplyRequestSource,
  type ApprovedPatchApplyRiskLevel,
  type ApprovedPatchApplyValidation,
} from "./approved-patch-apply-types";

function normalizeSummary(value: string | readonly string[] | null | undefined): string[] {
  if (Array.isArray(value)) {
    return uniqueApprovedPatchApplyStrings(value);
  }

  const text = String(value ?? "").trim();
  return text ? [text] : ["Review preview diff and selected file before any approved apply request."];
}

function normalizeRisk(value: ApprovedPatchApplyRiskLevel | null | undefined): ApprovedPatchApplyRiskLevel {
  return value ?? "medium";
}

function normalizeMode(value: ApprovedPatchApplyMode | null | undefined): ApprovedPatchApplyMode {
  return value ?? "preview-only";
}

function extractDiffTouchedFiles(previewDiff: string): string[] {
  const files: string[] = [];
  for (const line of previewDiff.replace(/\r\n/g, "\n").split("\n")) {
    if (line.startsWith("--- ") || line.startsWith("+++ ")) {
      const raw = line.slice(4).trim();
      if (!raw || raw === "/dev/null") continue;
      files.push(raw.replace(/^a\//, "").replace(/^b\//, ""));
    }
  }
  return uniqueApprovedPatchApplyStrings(files.map(normalizeApprovedPatchApplyPath));
}

export function buildApprovedPatchApplyRequest(
  source: ApprovedPatchApplyRequestSource
): ApprovedPatchApplyRequest {
  const selectedFilePath = normalizeApprovedPatchApplyPath(source.selectedFilePath ?? "");
  const previewDiff = String(source.previewDiff ?? "").replace(/\r\n/g, "\n").trim();
  const previewDiffDigest = buildApprovedPatchApplyStableHash(previewDiff);
  const expectedTouchedFiles = uniqueApprovedPatchApplyStrings([
    selectedFilePath,
    ...(source.expectedTouchedFiles ?? []),
    ...extractDiffTouchedFiles(previewDiff),
  ].map((value) => normalizeApprovedPatchApplyPath(value)));
  const sourcePreviewId = String(source.sourcePreviewId ?? "preview-diff-missing").trim();
  const riskLevel = normalizeRisk(source.riskLevel);
  const requestedApplyMode = normalizeMode(source.requestedApplyMode);
  const requestId = buildApprovedPatchApplyStableId(
    "approved-patch-apply-request",
    selectedFilePath || "missing-file",
    previewDiffDigest
  );
  const request: ApprovedPatchApplyRequest = {
    id: requestId,
    requestId,
    sourcePreviewId,
    selectedFilePath,
    previewDiff,
    previewDiffDigest,
    patchPlanSummary: normalizeSummary(source.patchPlanSummary),
    riskLevel,
    expectedTouchedFiles,
    operatorIntent:
      String(source.operatorIntent ?? "").trim() ||
      "Prepare an approval-gated apply request from the preview diff.",
    requestedApplyMode,
    noCommandGuarantee:
      "No command execution is performed by approved patch apply request domain logic.",
    approvalRequired: true,
    validation: {
      valid: false,
      blockedReasons: [],
      warnings: [],
      summary: [],
    },
    summary: [],
  };
  const validation = validateApprovedPatchApplyRequest(request);

  return {
    ...request,
    validation,
    summary: summarizeApprovedPatchApplyRequest({ ...request, validation }),
  };
}

export function validateApprovedPatchApplyRequest(
  request: ApprovedPatchApplyRequest
): ApprovedPatchApplyValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];

  if (!request.selectedFilePath) {
    blockedReasons.push("Selected file path is required before approved apply request readiness.");
  }

  if (!request.previewDiff) {
    blockedReasons.push("Preview diff is required before approved apply request readiness.");
  }

  if (request.expectedTouchedFiles.length < 1) {
    blockedReasons.push("Expected touched files are required before approved apply request readiness.");
  }

  if (request.requestedApplyMode === "guarded-apply") {
    warnings.push("Guarded apply mode is only a request posture until approval, policy, preflight, dry-run, rollback, and validation pass.");
  }

  if (request.riskLevel === "blocked") {
    blockedReasons.push("Blocked risk level cannot proceed to apply readiness.");
  }

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
    summary: [
      blockedReasons.length === 0
        ? "Approved apply request has selected file, preview diff, and touched files."
        : `${blockedReasons.length} apply request blocker(s).`,
      "Request creation is deterministic and performs no file writes or command execution.",
    ],
  };
}

export function summarizeApprovedPatchApplyRequest(request: ApprovedPatchApplyRequest): string[] {
  return [
    `Apply request ${request.requestId} targets ${request.selectedFilePath || "no selected file"}.`,
    `Preview diff digest ${request.previewDiffDigest}; risk ${request.riskLevel}; mode ${request.requestedApplyMode}.`,
    `${request.expectedTouchedFiles.length} expected touched file(s).`,
    request.validation.valid ? "Request is ready for approval packet review." : "Request is blocked until preview diff and selected file are present.",
  ];
}
