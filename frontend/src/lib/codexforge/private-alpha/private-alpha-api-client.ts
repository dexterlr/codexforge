import type {
  PrivateAlphaApprovalInput,
  PrivateAlphaCancellationInput,
  PrivateAlphaCreateRunInput,
  PrivateAlphaCreateRunResult,
  PrivateAlphaRunRecord,
  PrivateAlphaRunSummary,
  PrivateAlphaStatus,
} from "./private-alpha-types";
import {
  PRIVATE_ALPHA_DEFAULT_LIST_LIMIT,
  validatePrivateAlphaListLimit,
  validatePrivateAlphaRunId,
} from "./private-alpha-validation";

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
      kind: "approve-run";
      runId: string;
      input: PrivateAlphaApprovalInput;
    }>
  | Readonly<{
      kind: "cancel-run";
      runId: string;
      input: PrivateAlphaCancellationInput;
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
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": operation.idempotencyKey,
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
