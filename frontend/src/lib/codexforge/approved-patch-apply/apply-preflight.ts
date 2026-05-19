import {
  buildApprovedPatchApplyStableId,
  hasApprovedPatchApplyPathTraversal,
  isApprovedPatchApplyHighRisk,
  normalizeApprovedPatchApplyPath,
  type ApprovedPatchApplyPreflight,
  type ApprovedPatchApplyPreflightCheck,
  type ApprovedPatchApplyPreflightStatus,
  type ApprovedPatchApplyRequest,
} from "./approved-patch-apply-types";

const BINARY_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".pdf",
  ".zip",
  ".gz",
  ".exe",
  ".dll",
]);

function extensionOf(filePath: string): string {
  const normalized = normalizeApprovedPatchApplyPath(filePath).toLowerCase();
  const dot = normalized.lastIndexOf(".");
  return dot >= 0 ? normalized.slice(dot) : "";
}

function hasBinaryFile(paths: readonly string[]): boolean {
  return paths.some((filePath) => BINARY_EXTENSIONS.has(extensionOf(filePath)));
}

function overallStatus(checks: readonly ApprovedPatchApplyPreflightCheck[]): ApprovedPatchApplyPreflightStatus {
  if (checks.some((check) => check.status === "blocker")) return "blocker";
  if (checks.some((check) => check.status === "risk")) return "risk";
  if (checks.some((check) => check.status === "warning")) return "warning";
  if (checks.some((check) => check.status === "unknown")) return "unknown";
  return "pass";
}

export function buildApprovedPatchApplyPreflightCheck(args: {
  requestId: string;
  label: string;
  status: ApprovedPatchApplyPreflightStatus;
  detail: string;
  blocksApply?: boolean | null;
}): ApprovedPatchApplyPreflightCheck {
  return {
    id: buildApprovedPatchApplyStableId("approved-patch-apply-preflight-check", args.requestId, args.label),
    label: args.label,
    status: args.status,
    detail: args.detail,
    blocksApply: args.blocksApply ?? args.status === "blocker",
  };
}

export function buildApprovedPatchApplyPreflight(args: {
  request: ApprovedPatchApplyRequest;
  rollbackAvailable?: boolean | null;
  validationCommandsVisible?: boolean | null;
  directCommandExecution?: boolean | null;
  directGraphMutation?: boolean | null;
  brokerExecution?: boolean | null;
  latestMessageAuthorityPreserved?: boolean | null;
}): ApprovedPatchApplyPreflight {
  const request = args.request;
  const touchedFiles = request.expectedTouchedFiles.length > 0 ? request.expectedTouchedFiles : [request.selectedFilePath].filter(Boolean);
  const traversalDetected = touchedFiles.some((filePath) => hasApprovedPatchApplyPathTraversal(filePath));
  const binaryDetected = hasBinaryFile(touchedFiles);
  const boundedTouchedFiles = touchedFiles.length > 0 && touchedFiles.length <= 8;
  const riskAccepted = request.riskLevel !== "blocked";
  const checks: ApprovedPatchApplyPreflightCheck[] = [
    buildApprovedPatchApplyPreflightCheck({
      requestId: request.requestId,
      label: "selected file present",
      status: request.selectedFilePath ? "pass" : "blocker",
      detail: request.selectedFilePath ? `Selected file ${request.selectedFilePath}.` : "Selected file path is missing.",
    }),
    buildApprovedPatchApplyPreflightCheck({
      requestId: request.requestId,
      label: "preview diff present",
      status: request.previewDiff ? "pass" : "blocker",
      detail: request.previewDiff ? "Preview diff is visible." : "Preview diff is missing.",
    }),
    buildApprovedPatchApplyPreflightCheck({
      requestId: request.requestId,
      label: "touched files bounded",
      status: boundedTouchedFiles ? "pass" : "blocker",
      detail: boundedTouchedFiles ? `${touchedFiles.length} touched file(s) within cap.` : "Touched files are missing or exceed the cap.",
    }),
    buildApprovedPatchApplyPreflightCheck({
      requestId: request.requestId,
      label: "path traversal absent",
      status: traversalDetected ? "blocker" : "pass",
      detail: traversalDetected ? "Path traversal detected in selected or touched files." : "Path traversal absent.",
    }),
    buildApprovedPatchApplyPreflightCheck({
      requestId: request.requestId,
      label: "binary file absent",
      status: binaryDetected ? "blocker" : "pass",
      detail: binaryDetected ? "Binary file path detected; text patch apply blocked." : "Binary file absent from touched file list.",
    }),
    buildApprovedPatchApplyPreflightCheck({
      requestId: request.requestId,
      label: "risk accepted",
      status: riskAccepted ? (isApprovedPatchApplyHighRisk(request.riskLevel) ? "risk" : "pass") : "blocker",
      detail: riskAccepted ? `Risk level ${request.riskLevel} requires matching acknowledgement.` : "Blocked risk cannot proceed.",
      blocksApply: !riskAccepted,
    }),
    buildApprovedPatchApplyPreflightCheck({
      requestId: request.requestId,
      label: "rollback available",
      status: args.rollbackAvailable === true ? "pass" : "blocker",
      detail: args.rollbackAvailable === true ? "Rollback guidance is visible." : "Rollback guidance is required.",
    }),
    buildApprovedPatchApplyPreflightCheck({
      requestId: request.requestId,
      label: "validation commands visible",
      status: args.validationCommandsVisible === true ? "pass" : "blocker",
      detail: args.validationCommandsVisible === true ? "Validation commands are copy-only and visible." : "Validation plan is required.",
    }),
    buildApprovedPatchApplyPreflightCheck({
      requestId: request.requestId,
      label: "no direct command execution",
      status: args.directCommandExecution === true ? "blocker" : "pass",
      detail: args.directCommandExecution === true ? "Direct command execution from UI detected." : "No direct command execution from UI.",
    }),
    buildApprovedPatchApplyPreflightCheck({
      requestId: request.requestId,
      label: "no direct graph mutation",
      status: args.directGraphMutation === true ? "blocker" : "pass",
      detail: args.directGraphMutation === true ? "Direct graph mutation from apply UI detected." : "No direct graph mutation from apply UI.",
    }),
    buildApprovedPatchApplyPreflightCheck({
      requestId: request.requestId,
      label: "no broker execution",
      status: args.brokerExecution === true ? "blocker" : "pass",
      detail: args.brokerExecution === true ? "broker-execution is blocked." : "broker-execution blocked by policy.",
    }),
    buildApprovedPatchApplyPreflightCheck({
      requestId: request.requestId,
      label: "latest-message authority preserved",
      status: args.latestMessageAuthorityPreserved === false ? "blocker" : "pass",
      detail: args.latestMessageAuthorityPreserved === false ? "Latest-message authority is not acknowledged." : "Preserve latest-message authority.",
    }),
  ];
  const status = overallStatus(checks);
  const blockerCount = checks.filter((check) => check.status === "blocker").length;
  const warningCount = checks.filter((check) => check.status === "warning").length;
  const riskCount = checks.filter((check) => check.status === "risk").length;

  return {
    id: buildApprovedPatchApplyStableId("approved-patch-apply-preflight", request.requestId, status),
    requestId: request.requestId,
    checks,
    overallStatus: status,
    blockerCount,
    warningCount,
    riskCount,
    summary: summarizeApprovedPatchApplyPreflight({ checks, overallStatus: status, blockerCount, warningCount, riskCount }),
  };
}

export function summarizeApprovedPatchApplyPreflight(
  preflight: Pick<ApprovedPatchApplyPreflight, "checks" | "overallStatus" | "blockerCount" | "warningCount" | "riskCount">
): string[] {
  return [
    `Preflight status ${preflight.overallStatus}.`,
    `${preflight.checks.length} checks; ${preflight.blockerCount} blocker(s), ${preflight.warningCount} warning(s), ${preflight.riskCount} risk flag(s).`,
    "Preflight checks selected file, preview diff, bounded touched files, path traversal, binary file absence, rollback, validation, no direct command execution, no graph mutation, no broker execution, and latest-message authority.",
  ];
}
