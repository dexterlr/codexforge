import {
  READ_ONLY_EXECUTION_ELIGIBLE_TOOLS,
  buildReadOnlyExecutionStableKey,
  fingerprintReadOnlyInput,
  normalizeReadOnlyJsonRecord,
  stableReadOnlyJsonStringify,
  uniqueReadOnlyExecutionStrings,
  type ReadOnlyExecutionApproval,
  type ReadOnlyExecutionApprovalState,
  type ReadOnlyExecutionRequest,
  type ReadOnlyExecutionRequestDraft,
  type ReadOnlyExecutionRequestSource,
  type ReadOnlyExecutionRequestValidation,
  type ReadOnlyExecutionSafetyPosture,
  type ReadOnlyToolInputPreview,
} from "./read-only-execution-types";

function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeToolName(value: unknown): string {
  return normalizeString(value)?.toLowerCase() ?? "read-file";
}

function normalizeApprovalState(
  value: unknown,
  approved: boolean | null | undefined
): ReadOnlyExecutionApprovalState {
  if (value === "approved" || approved === true) return "approved";
  if (value === "pending") return "pending";
  if (value === "rejected" || approved === false) return "rejected";
  return "not-requested";
}

function normalizeSource(
  source: unknown,
  fromApprovedStepRunnerPreview: boolean
): ReadOnlyExecutionRequestSource {
  if (fromApprovedStepRunnerPreview) return "approved-step-runner-preview";
  return source === "manual-preview" || source === "approved-step-runner-preview"
    ? source
    : "unknown";
}

function expectedEvidenceForTool(toolName: string, explicit: string[] | null | undefined): string[] {
  const defaults =
    toolName === "read-file"
      ? ["file path", "file content summary", "warning or error if blocked"]
      : toolName === "list-files"
        ? ["listed paths", "result count", "warning or error if blocked"]
        : toolName === "search-project"
          ? ["matched files", "matched lines", "warning or error if blocked"]
          : toolName === "snapshot-project"
            ? ["snapshot id", "file records", "warning or error if blocked"]
            : ["blocked reason", "safe fallback"];

  return uniqueReadOnlyExecutionStrings([...(explicit ?? []), ...defaults]);
}

function buildToolInputPreview(toolInput: unknown): ReadOnlyToolInputPreview {
  const input = normalizeReadOnlyJsonRecord(toolInput);
  const serialized = stableReadOnlyJsonStringify(input);
  const previewLines = Object.entries(input)
    .slice(0, 8)
    .map(([key, value]) => `${key}: ${stableReadOnlyJsonStringify(value)}`);

  return {
    fingerprint: fingerprintReadOnlyInput(input),
    input,
    hasInput: Object.keys(input).length > 0,
    previewLines,
    summary:
      previewLines.length > 0
        ? `Tool input fingerprint ${fingerprintReadOnlyInput(input)} from ${previewLines.length} visible field(s).`
        : "Tool input is missing; read-only execution must stay blocked.",
  };
}

function buildApproval(args: {
  draft: ReadOnlyExecutionRequestDraft;
  taskId: string;
  stepId: string;
  toolName: string;
  inputFingerprint: string;
}): ReadOnlyExecutionApproval {
  const state = normalizeApprovalState(args.draft.approvalState, args.draft.approved);
  const explicit =
    args.draft.approvalState !== undefined ||
    args.draft.approved !== undefined ||
    args.draft.approvalId !== undefined ||
    args.draft.approvalReason !== undefined;
  const approvalId =
    normalizeString(args.draft.approvalId) ??
    (state === "approved"
      ? buildReadOnlyExecutionStableKey(
          "read-only-approval",
          args.taskId,
          args.stepId,
          args.toolName,
          args.inputFingerprint
        )
      : null);

  return {
    state,
    approved: state === "approved",
    explicit,
    approvalId,
    approvedBy: normalizeString(args.draft.approvedBy),
    reason:
      normalizeString(args.draft.approvalReason) ??
      normalizeString(args.draft.reason) ??
      "Explicit approval required before read-only execution.",
  };
}

function inferSafetyPosture(toolName: string): ReadOnlyExecutionSafetyPosture {
  return READ_ONLY_EXECUTION_ELIGIBLE_TOOLS.includes(toolName as never)
    ? "read-only-local"
    : "blocked-unknown";
}

export function buildReadOnlyExecutionRequest(
  draft: ReadOnlyExecutionRequestDraft = {}
): ReadOnlyExecutionRequest {
  const taskId = normalizeString(draft.taskId) ?? "phase-26-approved-task";
  const stepId = normalizeString(draft.stepId) ?? "read-only-step";
  const stepLabel = normalizeString(draft.stepLabel) ?? "Inspect project context";
  const selectedReadOnlyTool = normalizeToolName(
    draft.selectedReadOnlyTool ?? draft.toolName
  );
  const toolInputPreview = buildToolInputPreview(draft.toolInput);
  const requestId = buildReadOnlyExecutionStableKey(
    "read-only-execution-request",
    taskId,
    stepId,
    selectedReadOnlyTool,
    toolInputPreview.fingerprint
  );
  const approval = buildApproval({
    draft,
    taskId,
    stepId,
    toolName: selectedReadOnlyTool,
    inputFingerprint: toolInputPreview.fingerprint,
  });
  const fromApprovedStepRunnerPreview = draft.fromApprovedStepRunnerPreview === true;
  const source = normalizeSource(draft.source, fromApprovedStepRunnerPreview);
  const request: ReadOnlyExecutionRequest = {
    id: requestId,
    requestId,
    taskId,
    stepId,
    stepLabel,
    selectedReadOnlyTool,
    toolInputPreview,
    approval,
    approvalState: approval.state,
    reason:
      normalizeString(draft.reason) ??
      "Execute an approved task step with a read-only local project inspection tool.",
    expectedEvidence: expectedEvidenceForTool(selectedReadOnlyTool, draft.expectedEvidence),
    safetyPosture: inferSafetyPosture(selectedReadOnlyTool),
    noMutationGuarantee:
      "Read-only execution only: no file mutation, no Brain graph mutation, no command execution, no broker execution, no creative tool execution, and no external API call.",
    noFileMutation: true,
    noGraphMutation: true,
    source,
    fromApprovedStepRunnerPreview,
    summary: [],
  };

  return {
    ...request,
    summary: summarizeReadOnlyExecutionRequest(request),
  };
}

export function validateReadOnlyExecutionRequest(
  request: ReadOnlyExecutionRequest
): ReadOnlyExecutionRequestValidation {
  const reasons = [
    request.taskId.trim() ? "" : "Task id is required.",
    request.stepId.trim() ? "" : "Step id is required.",
    request.stepLabel.trim() ? "" : "Step label is required.",
    request.selectedReadOnlyTool.trim() ? "" : "Selected read-only tool is required.",
    request.toolInputPreview.hasInput ? "" : "Tool input preview is required.",
    request.fromApprovedStepRunnerPreview
      ? ""
      : "Request must come from approved step runner preview.",
    request.approval.explicit ? "" : "Approval state must be explicit in request data.",
  ].filter(Boolean);
  const valid = reasons.length === 0;

  return {
    id: buildReadOnlyExecutionStableKey("read-only-request-validation", request.requestId),
    requestId: request.requestId,
    valid,
    state: valid ? "valid" : "blocked",
    reasons,
    summary: valid
      ? ["Read-only execution request is structurally valid."]
      : reasons,
  };
}

export function summarizeReadOnlyExecutionRequest(
  request: ReadOnlyExecutionRequest
): string[] {
  return [
    `Request ${request.requestId} maps task ${request.taskId} step ${request.stepId} to ${request.selectedReadOnlyTool}.`,
    `Approval state is ${request.approvalState}; explicit approval recorded: ${request.approval.explicit ? "yes" : "no"}.`,
    `Input fingerprint ${request.toolInputPreview.fingerprint}; expected evidence: ${request.expectedEvidence.join(", ")}.`,
    "Deterministic request id uses task id, step id, tool name, and input fingerprint; no runtime clock, random id, AI call, network call, file mutation, or graph mutation is used by request building.",
  ];
}
