import { buildValidationCommandCatalog } from "./validation-command-catalog";
import {
  buildValidationRunnerStableId,
  uniqueValidationRunnerStrings,
  type ValidationCommandCatalogItem,
  type ValidationRunRequest,
} from "./validation-runner-types";

export function validateValidationRunRequest(request: ValidationRunRequest): ValidationRunRequest["validation"] {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  if (request.selectedCommands.length === 0) blockedReasons.push("Validation request requires at least one selected command.");
  if (request.selectedCommands.some((command) => !command.allowlisted)) blockedReasons.push("Validation request includes unknown commands blocked by default.");
  if (!request.sourceSurface.trim()) warnings.push("Source route unknown; choose a known surface before running.");
  if (!request.operatorIntent.trim()) warnings.push("Operator intent is recommended for audit context.");
  return { valid: blockedReasons.length === 0, blockedReasons, warnings };
}

export function buildValidationRunRequest(args: {
  selectedCommandIds?: readonly string[] | null;
  selectedCommands?: readonly ValidationCommandCatalogItem[] | null;
  sourceSurface?: string | null;
  sourcePatchApplyId?: string | null;
  operatorIntent?: string | null;
  expectedOutputRouting?: string | null;
} = {}): ValidationRunRequest {
  const catalog = buildValidationCommandCatalog();
  const selectedIds = uniqueValidationRunnerStrings(args.selectedCommandIds ?? []);
  const selectedCommands = args.selectedCommands?.length
    ? [...args.selectedCommands]
    : catalog.items.filter((item) => selectedIds.includes(item.id));
  const sourceSurface = args.sourceSurface?.trim() || "/validation";
  const requestId = buildValidationRunnerStableId(
    "validation-request",
    sourceSurface,
    selectedCommands.map((command) => command.id).join("|")
  );
  const request: ValidationRunRequest = {
    id: requestId,
    requestId,
    selectedCommandIds: selectedCommands.map((command) => command.id),
    selectedCommands,
    sourceSurface,
    sourcePatchApplyId: args.sourcePatchApplyId?.trim() || null,
    operatorIntent: args.operatorIntent?.trim() || "Validate current CodexForge changes without mutation.",
    expectedOutputRouting: args.expectedOutputRouting?.trim() || "Verification Ingestion or Regression Triage recommendation only.",
    noMutationExpectation: "No file writes, no Brain graph mutation, no apply-diff, no write-file, no broker execution.",
    approvalRequired: true,
    latestMessageAuthorityReminder: "Preserve latest-message authority before any validation request.",
    validation: { valid: false, blockedReasons: [], warnings: [] },
    summary: [],
  };
  const validation = validateValidationRunRequest(request);
  return { ...request, validation, summary: summarizeValidationRunRequest({ ...request, validation }) };
}

export function summarizeValidationRunRequest(request: ValidationRunRequest): string[] {
  return [
    `Validation request ${request.requestId} has ${request.selectedCommands.length} selected command(s).`,
    request.validation.valid ? "Request shape is valid." : `${request.validation.blockedReasons.length} request blocker(s).`,
    "Approval required; latest-message authority reminder included.",
  ];
}
