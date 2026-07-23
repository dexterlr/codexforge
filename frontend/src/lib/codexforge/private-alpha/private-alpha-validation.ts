import type {
  PrivateAlphaApprovalInput,
  PrivateAlphaApprovalScope,
  PrivateAlphaCapability,
  PrivateAlphaCancellationInput,
  PrivateAlphaCreateRunInput,
  PrivateAlphaRunRequest,
  PrivateAlphaRunSummary,
  PrivateAlphaRunRecord,
} from "./private-alpha-types";

export const PRIVATE_ALPHA_DATA_ROOT_LABEL = ".codexforge/private-alpha";
export const PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX =
  ".codexforge/private-alpha-tests";
export const PRIVATE_ALPHA_DEFAULT_LIST_LIMIT = 20;
export const PRIVATE_ALPHA_MAX_LIST_LIMIT = 50;
export const PRIVATE_ALPHA_MAX_REQUEST_LENGTH = 8_000;
export const PRIVATE_ALPHA_MAX_MODEL_PREFERENCE_LENGTH = 120;
export const PRIVATE_ALPHA_MIN_OUTPUT_TOKENS = 1;
export const PRIVATE_ALPHA_MAX_OUTPUT_TOKENS = 4_096;
export const PRIVATE_ALPHA_MIN_IDEMPOTENCY_KEY_LENGTH = 16;
export const PRIVATE_ALPHA_MAX_IDEMPOTENCY_KEY_LENGTH = 200;
export const PRIVATE_ALPHA_RUN_ID_LENGTH = 24;
export const PRIVATE_ALPHA_MAX_CANCELLATION_REASON_LENGTH = 240;
export const PRIVATE_ALPHA_MAX_ACKNOWLEDGEMENT_LENGTH = 240;
export const PRIVATE_ALPHA_APPROVAL_LOCK_STATEMENT =
  "Provider execution remains unavailable until the provider execution slice.";
export const PRIVATE_ALPHA_SECRET_GUIDANCE =
  "Do not paste API keys, tokens, passwords, or secrets.";
export const PRIVATE_ALPHA_SECRET_REJECTION_MESSAGE =
  "Request text appears to contain secret-like material. Remove secrets and try again.";
export const PRIVATE_ALPHA_ENGAGED_KILL_SWITCH_VALUES = [
  "1",
  "true",
  "on",
  "enabled",
  "engaged",
] as const;

type ValidationStatus = 400 | 422;

export type PrivateAlphaValidationResult<T> =
  | Readonly<{
      ok: true;
      value: T;
    }>
  | Readonly<{
      ok: false;
      status: ValidationStatus;
      error: string;
    }>;

function failure<T>(
  status: ValidationStatus,
  error: string
): PrivateAlphaValidationResult<T> {
  return {
    ok: false,
    status,
    error,
  };
}

function success<T>(value: T): PrivateAlphaValidationResult<T> {
  return {
    ok: true,
    value,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function collectUnknownKeys(
  record: Record<string, unknown>,
  allowedKeys: readonly string[]
): string[] {
  const allowed = new Set(allowedKeys);
  return Object.keys(record).filter((key) => !allowed.has(key));
}

function normalizeOptionalLabel(value: string): string | null {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function normalizeSingleLineText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function isValidCapability(value: string): value is PrivateAlphaCapability {
  return value === "text" || value === "code";
}

function isPlaceholderLikeSecretValue(value: string): boolean {
  const normalized = value
    .trim()
    .replace(/^['"]+|['"]+$/g, "")
    .replace(/[<>]/g, "")
    .toLowerCase();

  if (!normalized) {
    return true;
  }

  const placeholderTokens = [
    "your_api_key",
    "your-token",
    "your_token",
    "your-secret",
    "your_secret",
    "changeme",
    "change-me",
    "replace-me",
    "replace_me",
    "replace-with-real-value",
    "placeholder",
    "example",
    "example-token",
    "example-key",
    "example-secret",
    "token_here",
    "secret_here",
    "api_key_here",
  ];

  return placeholderTokens.some(
    (token) => normalized === token || normalized.includes(token)
  );
}

export function isPrivateAlphaKillSwitchValueEngaged(value: string): boolean {
  return PRIVATE_ALPHA_ENGAGED_KILL_SWITCH_VALUES.includes(
    value.trim().toLowerCase() as (typeof PRIVATE_ALPHA_ENGAGED_KILL_SWITCH_VALUES)[number]
  );
}

export function normalizePrivateAlphaRequestText(input: string): string {
  return input.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

export function buildPrivateAlphaRedactedPreview(
  normalizedRequestText: string
): string {
  const condensed = normalizedRequestText.replace(/\s+/g, " ").trim();
  if (condensed.length <= 220) {
    return condensed;
  }

  return `${condensed.slice(0, 217)}...`;
}

export function containsPrivateAlphaSecretLikeContent(text: string): boolean {
  const secretPatterns = [
    /\bsk-[A-Za-z0-9_-]{16,}\b/,
    /\bbearer\s+[A-Za-z0-9._~+/=-]{16,}\b/i,
    /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
    /\bAKIA[0-9A-Z]{16}\b/,
  ];

  if (secretPatterns.some((pattern) => pattern.test(text))) {
    return true;
  }

  const assignmentPattern = /\b(API_KEY|TOKEN|SECRET)\b\s*=\s*([^\s]+)/gi;
  for (const match of text.matchAll(assignmentPattern)) {
    const assignedValue = match[2] ?? "";
    if (!isPlaceholderLikeSecretValue(assignedValue)) {
      return true;
    }
  }

  return false;
}

export function sanitizePrivateAlphaTestingSuffix(input: string): string {
  const sanitized = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return sanitized || "test";
}

export function validatePrivateAlphaIdempotencyKey(
  rawIdempotencyKey: string | null | undefined
): PrivateAlphaValidationResult<string> {
  const trimmed = rawIdempotencyKey?.trim() ?? "";
  if (!trimmed) {
    return failure(400, "Idempotency-Key header is required.");
  }

  if (
    trimmed.length < PRIVATE_ALPHA_MIN_IDEMPOTENCY_KEY_LENGTH ||
    trimmed.length > PRIVATE_ALPHA_MAX_IDEMPOTENCY_KEY_LENGTH
  ) {
    return failure(
      400,
      `Idempotency-Key must be ${PRIVATE_ALPHA_MIN_IDEMPOTENCY_KEY_LENGTH}-${PRIVATE_ALPHA_MAX_IDEMPOTENCY_KEY_LENGTH} characters.`
    );
  }

  return success(trimmed);
}

export function validatePrivateAlphaListLimit(
  rawLimit: string | null | undefined
): PrivateAlphaValidationResult<number> {
  if (!rawLimit) {
    return success(PRIVATE_ALPHA_DEFAULT_LIST_LIMIT);
  }

  const parsed = Number(rawLimit);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return failure(400, "limit must be a positive integer.");
  }

  return success(Math.min(parsed, PRIVATE_ALPHA_MAX_LIST_LIMIT));
}

export function validatePrivateAlphaRunId(
  rawRunId: string
): PrivateAlphaValidationResult<string> {
  const trimmed = rawRunId.trim();
  if (!/^[a-f0-9]{24}$/.test(trimmed)) {
    return failure(400, "runId must be a 24-character lowercase hex identifier.");
  }

  return success(trimmed);
}

export function validatePrivateAlphaCreateRunInput(
  body: unknown
): PrivateAlphaValidationResult<PrivateAlphaCreateRunInput> {
  if (!isRecord(body)) {
    return failure(400, "Run creation requires a JSON object payload.");
  }

  const unknownKeys = collectUnknownKeys(body, [
    "requestText",
    "capability",
    "modelPreferenceLabel",
    "maximumOutputTokens",
  ]);
  if (unknownKeys.length > 0) {
    return failure(400, `Unknown fields are not allowed: ${unknownKeys.join(", ")}.`);
  }

  if (typeof body.requestText !== "string") {
    return failure(400, "requestText is required.");
  }

  const normalizedRequestText = normalizePrivateAlphaRequestText(body.requestText);
  if (!normalizedRequestText) {
    return failure(400, "requestText is required.");
  }

  if (normalizedRequestText.length > PRIVATE_ALPHA_MAX_REQUEST_LENGTH) {
    return failure(
      400,
      `requestText exceeds ${PRIVATE_ALPHA_MAX_REQUEST_LENGTH} characters.`
    );
  }

  if (containsPrivateAlphaSecretLikeContent(normalizedRequestText)) {
    return failure(422, PRIVATE_ALPHA_SECRET_REJECTION_MESSAGE);
  }

  if (typeof body.capability !== "string" || !isValidCapability(body.capability)) {
    return failure(400, "capability must be either text or code.");
  }

  if (
    typeof body.maximumOutputTokens !== "number" ||
    !Number.isInteger(body.maximumOutputTokens) ||
    body.maximumOutputTokens < PRIVATE_ALPHA_MIN_OUTPUT_TOKENS ||
    body.maximumOutputTokens > PRIVATE_ALPHA_MAX_OUTPUT_TOKENS
  ) {
    return failure(
      400,
      `maximumOutputTokens must be an integer between ${PRIVATE_ALPHA_MIN_OUTPUT_TOKENS} and ${PRIVATE_ALPHA_MAX_OUTPUT_TOKENS}.`
    );
  }

  let modelPreferenceLabel: string | null = null;
  if (body.modelPreferenceLabel !== undefined && body.modelPreferenceLabel !== null) {
    if (typeof body.modelPreferenceLabel !== "string") {
      return failure(400, "modelPreferenceLabel must be a string when provided.");
    }

    modelPreferenceLabel = normalizeOptionalLabel(body.modelPreferenceLabel);
    if (
      modelPreferenceLabel &&
      modelPreferenceLabel.length > PRIVATE_ALPHA_MAX_MODEL_PREFERENCE_LENGTH
    ) {
      return failure(
        400,
        `modelPreferenceLabel exceeds ${PRIVATE_ALPHA_MAX_MODEL_PREFERENCE_LENGTH} characters.`
      );
    }
  }

  return success({
    requestText: normalizedRequestText,
    capability: body.capability,
    modelPreferenceLabel,
    maximumOutputTokens: body.maximumOutputTokens,
  });
}

export function validatePrivateAlphaApprovalInput(
  body: unknown
): PrivateAlphaValidationResult<PrivateAlphaApprovalInput> {
  if (!isRecord(body)) {
    return failure(400, "Approval requires a JSON object payload.");
  }

  const unknownKeys = collectUnknownKeys(body, [
    "approvalScopeHash",
    "approved",
    "acknowledgement",
    "expectedRevision",
  ]);
  if (unknownKeys.length > 0) {
    return failure(400, `Unknown fields are not allowed: ${unknownKeys.join(", ")}.`);
  }

  if (
    typeof body.approvalScopeHash !== "string" ||
    !/^[a-f0-9]{64}$/.test(body.approvalScopeHash.trim())
  ) {
    return failure(400, "approvalScopeHash must be a 64-character lowercase hex string.");
  }

  if (body.approved !== true) {
    return failure(400, "approved must be exactly true.");
  }

  let acknowledgement: string | true;
  if (body.acknowledgement === true) {
    acknowledgement = true;
  } else if (typeof body.acknowledgement === "string") {
    const normalizedAcknowledgement = normalizeSingleLineText(body.acknowledgement);
    if (!normalizedAcknowledgement) {
      return failure(400, "acknowledgement is required.");
    }

    if (
      normalizedAcknowledgement.length > PRIVATE_ALPHA_MAX_ACKNOWLEDGEMENT_LENGTH
    ) {
      return failure(
        400,
        `acknowledgement exceeds ${PRIVATE_ALPHA_MAX_ACKNOWLEDGEMENT_LENGTH} characters.`
      );
    }

    acknowledgement = normalizedAcknowledgement;
  } else {
    return failure(400, "acknowledgement is required.");
  }

  if (
    typeof body.expectedRevision !== "number" ||
    !Number.isInteger(body.expectedRevision) ||
    body.expectedRevision < 1
  ) {
    return failure(400, "expectedRevision must be a positive integer.");
  }

  return success({
    approvalScopeHash: body.approvalScopeHash.trim(),
    approved: true,
    acknowledgement,
    expectedRevision: body.expectedRevision,
  });
}

export function validatePrivateAlphaCancellationInput(
  body: unknown
): PrivateAlphaValidationResult<PrivateAlphaCancellationInput> {
  if (!isRecord(body)) {
    return failure(400, "Cancellation requires a JSON object payload.");
  }

  const unknownKeys = collectUnknownKeys(body, ["expectedRevision", "reason"]);
  if (unknownKeys.length > 0) {
    return failure(400, `Unknown fields are not allowed: ${unknownKeys.join(", ")}.`);
  }

  if (
    typeof body.expectedRevision !== "number" ||
    !Number.isInteger(body.expectedRevision) ||
    body.expectedRevision < 1
  ) {
    return failure(400, "expectedRevision must be a positive integer.");
  }

  if (typeof body.reason !== "string") {
    return failure(400, "reason is required.");
  }

  const normalizedReason = normalizeSingleLineText(body.reason);
  if (!normalizedReason) {
    return failure(400, "reason is required.");
  }

  if (normalizedReason.length > PRIVATE_ALPHA_MAX_CANCELLATION_REASON_LENGTH) {
    return failure(
      400,
      `reason exceeds ${PRIVATE_ALPHA_MAX_CANCELLATION_REASON_LENGTH} characters.`
    );
  }

  return success({
    expectedRevision: body.expectedRevision,
    reason: normalizedReason,
  });
}

export function buildPrivateAlphaRunRequest(
  input: PrivateAlphaCreateRunInput
): PrivateAlphaRunRequest {
  const normalizedRequestText = normalizePrivateAlphaRequestText(input.requestText);

  return {
    normalizedRequestText,
    redactedPreview: buildPrivateAlphaRedactedPreview(normalizedRequestText),
    capability: input.capability,
    providerPreference: "auto",
    modelPreferenceLabel: input.modelPreferenceLabel,
    maximumOutputTokens: input.maximumOutputTokens,
    retentionMode: "local-private-alpha",
    executionMode: "locked-until-provider-slice",
  };
}

export function serializePrivateAlphaRunRequest(
  request: PrivateAlphaRunRequest
): string {
  return JSON.stringify({
    normalizedRequestText: request.normalizedRequestText,
    redactedPreview: request.redactedPreview,
    capability: request.capability,
    providerPreference: request.providerPreference,
    modelPreferenceLabel: request.modelPreferenceLabel,
    maximumOutputTokens: request.maximumOutputTokens,
    retentionMode: request.retentionMode,
    executionMode: request.executionMode,
  });
}

export function buildPrivateAlphaApprovalScope(input: {
  runId: string;
  request: PrivateAlphaRunRequest;
  normalizedRequestHash: string;
}): PrivateAlphaApprovalScope {
  return {
    runId: input.runId,
    capability: input.request.capability,
    normalizedRequestHash: input.normalizedRequestHash,
    providerPreference: input.request.providerPreference,
    modelPreferenceLabel: input.request.modelPreferenceLabel,
    maximumOutputTokens: input.request.maximumOutputTokens,
    retentionMode: input.request.retentionMode,
    executionMode: input.request.executionMode,
  };
}

export function serializePrivateAlphaApprovalScope(
  scope: PrivateAlphaApprovalScope
): string {
  return JSON.stringify({
    runId: scope.runId,
    capability: scope.capability,
    normalizedRequestHash: scope.normalizedRequestHash,
    providerPreference: scope.providerPreference,
    modelPreferenceLabel: scope.modelPreferenceLabel,
    maximumOutputTokens: scope.maximumOutputTokens,
    retentionMode: scope.retentionMode,
    executionMode: scope.executionMode,
  });
}

export function buildPrivateAlphaRunSummary(
  run: PrivateAlphaRunRecord
): PrivateAlphaRunSummary {
  return {
    runId: run.runId,
    createdAt: run.createdAt,
    updatedAt: run.updatedAt,
    state: run.state,
    revision: run.revision,
    capability: run.request.capability,
    providerPreference: run.request.providerPreference,
    modelPreferenceLabel: run.request.modelPreferenceLabel,
    maximumOutputTokens: run.request.maximumOutputTokens,
    redactedPreview: run.request.redactedPreview,
    approvalScopeHash: run.approvalScopeHash,
  };
}
