import type {
  PrivateAlphaApprovalInput,
  PrivateAlphaCancellationInput,
  PrivateAlphaCreateRunInput,
  PrivateAlphaCreateRunResult,
  PrivateAlphaExecuteInput,
  PrivateAlphaRunRecord,
  PrivateAlphaRunSummary,
  PrivateAlphaStatus,
} from "./private-alpha-types";
import {
  PRIVATE_ALPHA_DEFAULT_LIST_LIMIT,
  validatePrivateAlphaListLimit,
  validatePrivateAlphaRunId,
} from "./private-alpha-validation";
import {
  PRIVATE_ALPHA_FREE_FIRST_ROUTING_POLICY_VERSION,
  type PrivateAlphaFreeFirstRoutingInput,
  type PrivateAlphaFreeFirstRoutingResult,
  isPrivateAlphaFreeFirstRoutingSelectedModelKey,
} from "./private-alpha-free-first-routing-types";

const PRIVATE_ALPHA_API_BASE_PATH = "/api/codexforge/private-alpha";

type PrivateAlphaOperation =
  | Readonly<{
      kind: "status";
    }>
  | Readonly<{
      kind: "list-runs";
      limit: number;
    }>
  | Readonly<{
      kind: "fetch-run";
      runId: string;
    }>
  | Readonly<{
      kind: "create-run";
      input: PrivateAlphaCreateRunInput;
      idempotencyKey: string;
    }>
  | Readonly<{
      kind: "route-free-first";
      input: PrivateAlphaFreeFirstRoutingInput;
    }>
  | Readonly<{
      kind: "approve-run";
      runId: string;
      input: PrivateAlphaApprovalInput;
    }>
  | Readonly<{
      kind: "cancel-run";
      runId: string;
      input: PrivateAlphaCancellationInput;
    }>
  | Readonly<{
      kind: "execute-run";
      runId: string;
      input: PrivateAlphaExecuteInput;
      idempotencyKey: string;
    }>;

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function extractApiError(payload: unknown): string | null {
  const record = asRecord(payload);
  if (record && typeof record.error === "string" && record.error.trim()) {
    return record.error;
  }

  return null;
}

function readStatus(payload: unknown): PrivateAlphaStatus {
  const record = asRecord(payload);
  if (!record || record.ok !== true) {
    throw new Error("Private-alpha status response was malformed.");
  }

  return record as PrivateAlphaStatus;
}

function readRuns(payload: unknown): readonly PrivateAlphaRunSummary[] {
  const record = asRecord(payload);
  if (!record || record.ok !== true || !Array.isArray(record.runs)) {
    throw new Error("Private-alpha runs response was malformed.");
  }

  return record.runs as readonly PrivateAlphaRunSummary[];
}

function readRun(payload: unknown): PrivateAlphaRunRecord {
  const record = asRecord(payload);
  if (!record || record.ok !== true || !asRecord(record.run)) {
    throw new Error("Private-alpha run response was malformed.");
  }

  return record.run as PrivateAlphaRunRecord;
}

function readCreateRunResult(payload: unknown): PrivateAlphaCreateRunResult {
  const record = asRecord(payload);
  if (
    !record ||
    record.ok !== true ||
    typeof record.created !== "boolean" ||
    !asRecord(record.run)
  ) {
    throw new Error("Private-alpha create response was malformed.");
  }

  return {
    created: record.created,
    run: record.run as PrivateAlphaRunRecord,
  };
}

function readFreeFirstRoutingResult(
  payload: unknown
): PrivateAlphaFreeFirstRoutingResult {
  const record = asRecord(payload);
  const result = record ? asRecord(record.result) : null;

  if (!record || record.ok !== true || !result) {
    throw new Error("Private-alpha free-first routing response was malformed.");
  }

  const status = result.status;
  const selectedModelKey = result.selectedModelKey;
  const decision = asRecord(result.decision);

  if (
    result.policyVersion !== PRIVATE_ALPHA_FREE_FIRST_ROUTING_POLICY_VERSION ||
    (status !== "selected-for-approval" &&
      status !== "no-eligible-model" &&
      status !== "blocked") ||
    !Array.isArray(result.runtimeSnapshots) ||
    typeof result.cloudProviderInspected !== "boolean" ||
    result.promptTransferredToCloud !== false ||
    result.providerGenerationPerformed !== false ||
    !decision
  ) {
    throw new Error("Private-alpha free-first routing response was malformed.");
  }

  if (
    selectedModelKey !== null &&
    !isPrivateAlphaFreeFirstRoutingSelectedModelKey(selectedModelKey)
  ) {
    throw new Error("Private-alpha free-first routing response was malformed.");
  }

  if (
    status === "selected-for-approval" &&
    (!isPrivateAlphaFreeFirstRoutingSelectedModelKey(selectedModelKey) ||
      decision.selectedModelKey !== selectedModelKey)
  ) {
    throw new Error("Private-alpha free-first routing response was malformed.");
  }

  if (
    status !== "selected-for-approval" &&
    selectedModelKey !== null
  ) {
    throw new Error("Private-alpha free-first routing response was malformed.");
  }

  return result as PrivateAlphaFreeFirstRoutingResult;
}

function buildClientIdempotencyKey(): string {
  const generated = globalThis.crypto?.randomUUID?.();
  if (!generated) {
    throw new Error("Browser crypto.randomUUID() is unavailable.");
  }

  return `private-alpha-${generated}`;
}

function validateReadLimit(limit: number): number {
  const validation = validatePrivateAlphaListLimit(String(limit));
  if (!validation.ok) {
    throw new Error(validation.error);
  }

  return validation.value;
}

function buildValidatedRunSegment(runId: string): string {
  const validation = validatePrivateAlphaRunId(runId);
  if (!validation.ok) {
    throw new Error(validation.error);
  }

  return encodeURIComponent(validation.value);
}

function assertApprovedTarget(target: string): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(target)) {
    throw new Error("Absolute URLs are not allowed for private-alpha requests.");
  }

  if (target.startsWith("//")) {
    throw new Error(
      "Protocol-relative URLs are not allowed for private-alpha requests."
    );
  }

  if (!target.startsWith("/")) {
    throw new Error("Private-alpha requests must use relative same-origin targets.");
  }

  if (target.includes("\\")) {
    throw new Error("Backslash-separated targets are not allowed.");
  }

  if (/(^|\/)\.\.(?:\/|$)/.test(target)) {
    throw new Error("Traversal is not allowed for private-alpha requests.");
  }

  if (!target.startsWith(PRIVATE_ALPHA_API_BASE_PATH)) {
    throw new Error("Only approved private-alpha API targets are allowed.");
  }

  return target;
}

function buildIdempotencyHeaders(operation: {
  idempotencyKey: string;
}): Record<string, string> {
  return {
    "Idempotency-Key": operation.idempotencyKey,
  };
}

function buildTarget(operation: PrivateAlphaOperation): string {
  switch (operation.kind) {
    case "status":
      return assertApprovedTarget(`${PRIVATE_ALPHA_API_BASE_PATH}/status`);
    case "list-runs": {
      const search = new URLSearchParams({
        limit: String(validateReadLimit(operation.limit)),
      });

      return assertApprovedTarget(
        `${PRIVATE_ALPHA_API_BASE_PATH}/runs?${search.toString()}`
      );
    }
    case "fetch-run":
      return assertApprovedTarget(
        `${PRIVATE_ALPHA_API_BASE_PATH}/runs/${buildValidatedRunSegment(
          operation.runId
        )}`
      );
    case "create-run":
      return assertApprovedTarget(`${PRIVATE_ALPHA_API_BASE_PATH}/runs`);
    case "route-free-first":
      return assertApprovedTarget(
        `${PRIVATE_ALPHA_API_BASE_PATH}/routing/free-first`
      );
    case "approve-run":
      return assertApprovedTarget(
        `${PRIVATE_ALPHA_API_BASE_PATH}/runs/${buildValidatedRunSegment(
          operation.runId
        )}/approve`
      );
    case "cancel-run":
      return assertApprovedTarget(
        `${PRIVATE_ALPHA_API_BASE_PATH}/runs/${buildValidatedRunSegment(
          operation.runId
        )}/cancel`
      );
    case "execute-run":
      return assertApprovedTarget(
        `${PRIVATE_ALPHA_API_BASE_PATH}/runs/${buildValidatedRunSegment(
          operation.runId
        )}/execute`
      );
  }
}

function buildRequestInit(operation: PrivateAlphaOperation): RequestInit {
  switch (operation.kind) {
    case "status":
    case "list-runs":
    case "fetch-run":
      return {
        cache: "no-store",
      };
    case "create-run":
    case "route-free-first":
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(operation.kind === "create-run"
            ? buildIdempotencyHeaders(operation)
            : {}),
        },
        body: JSON.stringify(operation.input),
      };
    case "approve-run":
    case "cancel-run":
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operation.input),
      };
    case "execute-run":
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...buildIdempotencyHeaders(operation),
        },
        body: JSON.stringify(operation.input),
      };
  }
}

async function readResponsePayload(response: Response): Promise<unknown> {
  const source = await response.text();
  const trimmed = source.trim();

  if (!trimmed) {
    return null;
  }

  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    return null;
  }
}

async function requestPrivateAlpha<T>(
  operation: PrivateAlphaOperation,
  read: (payload: unknown) => T,
  defaultMessage: string
): Promise<T> {
  const response = await fetch(buildTarget(operation), buildRequestInit(operation));
  const payload = await readResponsePayload(response);

  if (!response.ok) {
    const message =
      extractApiError(payload) ?? `${defaultMessage} (status ${response.status}).`;
    throw new Error(message);
  }

  return read(payload);
}

export function fetchPrivateAlphaStatus(): Promise<PrivateAlphaStatus> {
  return requestPrivateAlpha(
    {
      kind: "status",
    },
    readStatus,
    "Unable to load private-alpha status."
  );
}

export function createPrivateAlphaRun(
  input: PrivateAlphaCreateRunInput
): Promise<PrivateAlphaCreateRunResult> {
  return requestPrivateAlpha(
    {
      kind: "create-run",
      input,
      idempotencyKey: buildClientIdempotencyKey(),
    },
    readCreateRunResult,
    "Unable to create the private-alpha run."
  );
}

export function routePrivateAlphaFreeFirst(
  input: PrivateAlphaFreeFirstRoutingInput
): Promise<PrivateAlphaFreeFirstRoutingResult> {
  return requestPrivateAlpha(
    {
      kind: "route-free-first",
      input,
    },
    readFreeFirstRoutingResult,
    "Unable to route the private-alpha free-first request."
  );
}

export function listPrivateAlphaRuns(
  limit = PRIVATE_ALPHA_DEFAULT_LIST_LIMIT
): Promise<readonly PrivateAlphaRunSummary[]> {
  return requestPrivateAlpha(
    {
      kind: "list-runs",
      limit,
    },
    readRuns,
    "Unable to load private-alpha runs."
  );
}

export function fetchPrivateAlphaRun(
  runId: string
): Promise<PrivateAlphaRunRecord> {
  return requestPrivateAlpha(
    {
      kind: "fetch-run",
      runId,
    },
    readRun,
    "Unable to load the private-alpha run."
  );
}

export function approvePrivateAlphaRun(
  runId: string,
  input: PrivateAlphaApprovalInput
): Promise<PrivateAlphaRunRecord> {
  return requestPrivateAlpha(
    {
      kind: "approve-run",
      runId,
      input,
    },
    readRun,
    "Unable to record manual approval."
  );
}

export function cancelPrivateAlphaRun(
  runId: string,
  input: PrivateAlphaCancellationInput
): Promise<PrivateAlphaRunRecord> {
  return requestPrivateAlpha(
    {
      kind: "cancel-run",
      runId,
      input,
    },
    readRun,
    "Unable to cancel the private-alpha run."
  );
}

export function executePrivateAlphaRun(
  runId: string,
  input: PrivateAlphaExecuteInput
): Promise<PrivateAlphaRunRecord> {
  return requestPrivateAlpha(
    {
      kind: "execute-run",
      runId,
      input,
      idempotencyKey: buildClientIdempotencyKey(),
    },
    readRun,
    "Unable to execute the private-alpha run."
  );
}
