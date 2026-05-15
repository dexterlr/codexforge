export type ReadOnlyExecutionApprovalState =
  | "not-requested"
  | "pending"
  | "approved"
  | "rejected";

export type ReadOnlyExecutionRequestSource =
  | "approved-step-runner-preview"
  | "manual-preview"
  | "unknown";

export type ReadOnlyExecutionSafetyPosture =
  | "read-only-local"
  | "blocked-mutation"
  | "blocked-external"
  | "blocked-unknown";

export type ReadOnlyExecutionToolName =
  | "read-file"
  | "list-files"
  | "search-project"
  | "snapshot-project";

export type ReadOnlyExecutionToolClass =
  | "eligible-read-only"
  | "mutation"
  | "broker"
  | "creative"
  | "external"
  | "unknown";

export type ReadOnlyToolRouteMode =
  | "read-only-local-execute"
  | "blocked-mutation"
  | "blocked-broker"
  | "blocked-creative"
  | "blocked-external"
  | "blocked-unknown";

export type ReadOnlyExecutionExpectedResultKind =
  | "file-content"
  | "file-list"
  | "search-results"
  | "project-snapshot"
  | "blocked-result";

export type ReadOnlyExecutionStatus =
  | "pending"
  | "skipped"
  | "blocked"
  | "failed"
  | "completed";

export type ReadOnlyEvidenceItemType =
  | "file"
  | "path"
  | "line"
  | "match"
  | "summary"
  | "warning"
  | "error";

export type ReadOnlyEvidenceConfidence = "high" | "medium" | "low";

export type ReadOnlyExecutionLedgerState =
  | "requested"
  | "approval-required"
  | "blocked"
  | "approved"
  | "routed"
  | "executed"
  | "captured"
  | "failed"
  | "skipped";

export type ReadOnlyJsonValue =
  | string
  | number
  | boolean
  | null
  | ReadOnlyJsonValue[]
  | { [key: string]: ReadOnlyJsonValue };

export type ReadOnlyToolInputPreview = {
  fingerprint: string;
  input: Record<string, ReadOnlyJsonValue>;
  hasInput: boolean;
  previewLines: string[];
  summary: string;
};

export type ReadOnlyExecutionApproval = {
  state: ReadOnlyExecutionApprovalState;
  approved: boolean;
  explicit: boolean;
  approvalId: string | null;
  approvedBy: string | null;
  reason: string;
};

export type ReadOnlyExecutionRequestDraft = {
  taskId?: string | null;
  stepId?: string | null;
  stepLabel?: string | null;
  selectedReadOnlyTool?: string | null;
  toolName?: string | null;
  toolInput?: Record<string, unknown> | null;
  approvalState?: ReadOnlyExecutionApprovalState | null;
  approved?: boolean | null;
  approvalId?: string | null;
  approvedBy?: string | null;
  approvalReason?: string | null;
  reason?: string | null;
  expectedEvidence?: string[] | null;
  source?: ReadOnlyExecutionRequestSource | null;
  fromApprovedStepRunnerPreview?: boolean | null;
};

export type ReadOnlyExecutionRequestValidation = {
  id: string;
  requestId: string;
  valid: boolean;
  state: "valid" | "blocked";
  reasons: string[];
  summary: string[];
};

export type ReadOnlyExecutionRequest = {
  id: string;
  requestId: string;
  taskId: string;
  stepId: string;
  stepLabel: string;
  selectedReadOnlyTool: string;
  toolInputPreview: ReadOnlyToolInputPreview;
  approval: ReadOnlyExecutionApproval;
  approvalState: ReadOnlyExecutionApprovalState;
  reason: string;
  expectedEvidence: string[];
  safetyPosture: ReadOnlyExecutionSafetyPosture;
  noMutationGuarantee: string;
  noFileMutation: true;
  noGraphMutation: true;
  source: ReadOnlyExecutionRequestSource;
  fromApprovedStepRunnerPreview: boolean;
  summary: string[];
};

export type ReadOnlyExecutionPolicyRuleState =
  | "passed"
  | "approval-required"
  | "blocked";

export type ReadOnlyExecutionPolicyRule = {
  id: string;
  label: string;
  state: ReadOnlyExecutionPolicyRuleState;
  detail: string;
};

export type ReadOnlyExecutionPolicy = {
  id: "read-only-execution-policy";
  requestId: string;
  allowed: boolean;
  blocked: boolean;
  eligibleTools: ReadOnlyExecutionToolName[];
  mutationTools: string[];
  creativeTools: string[];
  externalTools: string[];
  blockedTools: string[];
  explicitReadOnlyExecutionApprovalRequired: true;
  mutationToolsBlocked: true;
  brokerExecutionBlocked: true;
  creativeToolsBlocked: true;
  externalApiBlocked: true;
  unknownToolsBlocked: true;
  missingApprovalBlocksExecution: boolean;
  missingToolInputBlocksExecution: boolean;
  requiresApprovedStepRunnerPreview: true;
  requestFromApprovedStepRunnerPreview: boolean;
  visibleResultCaptureRequired: true;
  noGraphMutation: true;
  noFileMutation: true;
  rules: ReadOnlyExecutionPolicyRule[];
  blockedReasons: string[];
  requiredApprovals: string[];
  summary: string[];
};

export type ReadOnlyToolRoute = {
  id: string;
  requestId: string;
  toolName: string;
  routeMode: ReadOnlyToolRouteMode;
  toolClass: ReadOnlyExecutionToolClass;
  normalizedInput: Record<string, ReadOnlyJsonValue>;
  allowed: boolean;
  blocked: boolean;
  reason: string;
  expectedResultKind: ReadOnlyExecutionExpectedResultKind;
  evidenceLabels: string[];
  safeFallback: string;
  summary: string[];
};

export type ReadOnlyMatchedLine = {
  id: string;
  path: string;
  line: number | null;
  preview: string;
  matchText: string | null;
};

export type ReadOnlyExecutionResult = {
  id: string;
  requestId: string;
  toolName: string;
  ok: boolean;
  status: ReadOnlyExecutionStatus;
  summary: string;
  evidenceSnippets: string[];
  filePaths: string[];
  matchedLines: ReadOnlyMatchedLine[];
  warnings: string[];
  errorMessage: string | null;
  nextSafeAction: string;
  raw: unknown;
};

export type ReadOnlyEvidenceItem = {
  id: string;
  type: ReadOnlyEvidenceItemType;
  label: string;
  value: string;
  source: string;
  confidence: ReadOnlyEvidenceConfidence;
  relatedTaskId: string;
  relatedStepId: string;
};

export type ReadOnlyEvidence = {
  id: "read-only-evidence";
  requestId: string;
  items: ReadOnlyEvidenceItem[];
  summary: string[];
};

export type ReadOnlyExecutionLedgerItem = {
  id: string;
  state: ReadOnlyExecutionLedgerState;
  label: string;
  detail: string;
  requestId: string;
  taskId: string;
  stepId: string;
};

export type ReadOnlyExecutionLedger = {
  id: "read-only-execution-ledger";
  requestId: string;
  items: ReadOnlyExecutionLedgerItem[];
  summary: string[];
};

export type ReadOnlyExecutionSummary = {
  id: "read-only-execution-summary";
  request: ReadOnlyExecutionRequest;
  policy: ReadOnlyExecutionPolicy;
  route: ReadOnlyToolRoute;
  result: ReadOnlyExecutionResult;
  evidence: ReadOnlyEvidence;
  ledger: ReadOnlyExecutionLedger;
  executionAllowed: boolean;
  summary: string[];
};

export const READ_ONLY_EXECUTION_ELIGIBLE_TOOLS: ReadOnlyExecutionToolName[] = [
  "read-file",
  "list-files",
  "search-project",
  "snapshot-project",
];

export const READ_ONLY_EXECUTION_MUTATION_TOOLS = [
  "write-file",
  "apply-diff",
  "run-command",
  "run-tests",
  "build-web-app",
  "generate-diff",
];

export const READ_ONLY_EXECUTION_CREATIVE_TOOLS = [
  "blender-python",
  "unreal-editor-command",
  "comfyui-workflow-run",
  "render-job",
  "video-render",
  "deck-export",
];

export const READ_ONLY_EXECUTION_EXTERNAL_TOOLS = ["external-api"];

export const READ_ONLY_EXECUTION_ALWAYS_BLOCKED_TOOLS = ["broker-execution"];

export function buildReadOnlyExecutionStableKey(
  ...parts: Array<string | number | boolean | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function toReadOnlyJsonValue(value: unknown): ReadOnlyJsonValue {
  if (value === null) return null;
  if (typeof value === "string") return value;
  if (typeof value === "boolean") return value;
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (Array.isArray(value)) {
    return value.map(toReadOnlyJsonValue);
  }
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, item]) => item !== undefined && typeof item !== "function")
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, toReadOnlyJsonValue(item)])
    );
  }

  return String(value);
}

export function normalizeReadOnlyJsonRecord(
  value: unknown
): Record<string, ReadOnlyJsonValue> {
  const normalized = toReadOnlyJsonValue(value);
  return normalized !== null && typeof normalized === "object" && !Array.isArray(normalized)
    ? (normalized as Record<string, ReadOnlyJsonValue>)
    : {};
}

export function stableReadOnlyJsonStringify(value: unknown): string {
  return JSON.stringify(toReadOnlyJsonValue(value));
}

export function fingerprintReadOnlyInput(value: unknown): string {
  const text = stableReadOnlyJsonStringify(value);
  let hash = 2166136261;

  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash +=
      (hash << 1) +
      (hash << 4) +
      (hash << 7) +
      (hash << 8) +
      (hash << 24);
  }

  return `ro-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

export function uniqueReadOnlyExecutionStrings(values: string[] = []): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort();
}
