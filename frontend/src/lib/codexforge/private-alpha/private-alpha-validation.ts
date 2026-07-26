import type {
  PrivateAlphaApprovalInput,
  PrivateAlphaApprovalScope,
  PrivateAlphaBoundDataBoundary,
  PrivateAlphaCapability,
  PrivateAlphaCancellationInput,
  PrivateAlphaCloudDataTransferRequirement,
  PrivateAlphaCreateRunInput,
  PrivateAlphaExecuteInput,
  PrivateAlphaExecutionMode,
  PrivateAlphaProviderPreference,
  PrivateAlphaRetentionMode,
  PrivateAlphaRuntimeModelKey,
  PrivateAlphaRunRequest,
  PrivateAlphaRunSummary,
  PrivateAlphaRunRecord,
} from "./private-alpha-types";
import {
  PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
  PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_RUNTIME_MODEL_KEYS,
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
export const PRIVATE_ALPHA_MAX_SAFE_ERROR_MESSAGE_LENGTH = 240;
export const PRIVATE_ALPHA_MAX_DONE_REASON_LENGTH = 120;
export const PRIVATE_ALPHA_MAX_OUTPUT_TEXT_LENGTH = 65_536;
export const PRIVATE_ALPHA_RETENTION_MODE = "local-private-alpha" as const;
export const PRIVATE_ALPHA_LEGACY_PROVIDER_PREFERENCE = "auto" as const;
export const PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID = "ollama-local" as const;
export const PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL = "Local Ollama" as const;
export const PRIVATE_ALPHA_PRODUCTION_MODEL = "gpt-oss:20b" as const;
export const PRIVATE_ALPHA_LEGACY_EXECUTION_MODE =
  "locked-until-provider-slice" as const;
export const PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE =
  "manual-approved-local-provider" as const;
export const PRIVATE_ALPHA_CLOUD_APPROVAL_ONLY_EXECUTION_MODE =
  "manual-approved-cloud-provider-locked" as const;
export const PRIVATE_ALPHA_APPROVAL_LOCK_STATEMENT =
  "Provider execution remains unavailable until the provider execution slice.";
export const PRIVATE_ALPHA_LOCAL_EXECUTION_APPROVAL_STATEMENT =
  "Manual approval recorded for this exact local Ollama execution scope. Execution still requires a separate explicit operator action.";
export const PRIVATE_ALPHA_CLOUD_APPROVAL_STATEMENT =
  "Manual approval recorded for this exact Groq Cloud provider and model scope. The approved request may be transferred to Groq only after a later separate execution action is implemented. Cloud execution remains disabled.";
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
export const PRIVATE_ALPHA_LEGACY_RUNTIME_PROFILE =
  "legacy-foundation" as const;
export const PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE = "local-ollama" as const;

const PRIVATE_ALPHA_GROQ_PROVIDER_ID = "groq-cloud" as const;
const PRIVATE_ALPHA_GROQ_20B_MODEL = "openai/gpt-oss-20b" as const;
const PRIVATE_ALPHA_GROQ_120B_MODEL = "openai/gpt-oss-120b" as const;
const PRIVATE_ALPHA_LOCAL_DATA_BOUNDARY = "local-machine" as const;
const PRIVATE_ALPHA_CLOUD_DATA_BOUNDARY = "cloud-provider" as const;
const PRIVATE_ALPHA_NOT_REQUIRED_CLOUD_TRANSFER = "not-required" as const;
const PRIVATE_ALPHA_REQUIRED_CLOUD_TRANSFER =
  "explicit-operator-acknowledgement-required" as const;

export type PrivateAlphaRuntimeProfile =
  | typeof PRIVATE_ALPHA_LEGACY_RUNTIME_PROFILE
  | typeof PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE;

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

type PrivateAlphaResolvedBoundConfiguration = Readonly<{
  bindingVersion: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
  modelKey: PrivateAlphaRuntimeModelKey;
  providerPreference: "ollama-local" | "groq-cloud";
  modelPreferenceLabel:
    | typeof PRIVATE_ALPHA_PRODUCTION_MODEL
    | typeof PRIVATE_ALPHA_GROQ_20B_MODEL
    | typeof PRIVATE_ALPHA_GROQ_120B_MODEL;
  executionMode:
    | typeof PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE
    | typeof PRIVATE_ALPHA_CLOUD_APPROVAL_ONLY_EXECUTION_MODE;
  dataBoundary: PrivateAlphaBoundDataBoundary;
  cloudDataTransferRequirement: PrivateAlphaCloudDataTransferRequirement;
}>;

type PrivateAlphaExecutionConfigurationInput = Readonly<{
  providerPreference: PrivateAlphaProviderPreference;
  modelPreferenceLabel: string | null;
  retentionMode: PrivateAlphaRetentionMode;
  executionMode: PrivateAlphaExecutionMode;
  capability?: PrivateAlphaCapability;
  bindingVersion?: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
  modelKey?: PrivateAlphaRuntimeModelKey;
  dataBoundary?: PrivateAlphaBoundDataBoundary;
  cloudDataTransferRequirement?: PrivateAlphaCloudDataTransferRequirement;
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

function hasNoApprovalBindingFields(
  input: PrivateAlphaExecutionConfigurationInput
): boolean {
  return (
    input.bindingVersion === undefined &&
    input.modelKey === undefined &&
    input.dataBoundary === undefined &&
    input.cloudDataTransferRequirement === undefined
  );
}

function hasCompleteApprovalBindingFields(
  input: PrivateAlphaExecutionConfigurationInput
): input is PrivateAlphaExecutionConfigurationInput &
  Readonly<{
    bindingVersion: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
    modelKey: PrivateAlphaRuntimeModelKey;
    dataBoundary: PrivateAlphaBoundDataBoundary;
    cloudDataTransferRequirement: PrivateAlphaCloudDataTransferRequirement;
  }> {
  return (
    input.bindingVersion === PRIVATE_ALPHA_APPROVAL_BINDING_VERSION &&
    input.modelKey !== undefined &&
    input.dataBoundary !== undefined &&
    input.cloudDataTransferRequirement !== undefined
  );
}

function isPrivateAlphaRuntimeModelKey(
  value: string
): value is PrivateAlphaRuntimeModelKey {
  return PRIVATE_ALPHA_RUNTIME_MODEL_KEYS.includes(value as PrivateAlphaRuntimeModelKey);
}

export function resolvePrivateAlphaBoundConfiguration(
  modelKey: PrivateAlphaRuntimeModelKey
): PrivateAlphaResolvedBoundConfiguration {
  switch (modelKey) {
    case PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY:
      return {
        bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
        modelKey,
        providerPreference: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
        modelPreferenceLabel: PRIVATE_ALPHA_PRODUCTION_MODEL,
        executionMode: PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE,
        dataBoundary: PRIVATE_ALPHA_LOCAL_DATA_BOUNDARY,
        cloudDataTransferRequirement: PRIVATE_ALPHA_NOT_REQUIRED_CLOUD_TRANSFER,
      };
    case PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY:
      return {
        bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
        modelKey,
        providerPreference: PRIVATE_ALPHA_GROQ_PROVIDER_ID,
        modelPreferenceLabel: PRIVATE_ALPHA_GROQ_20B_MODEL,
        executionMode: PRIVATE_ALPHA_CLOUD_APPROVAL_ONLY_EXECUTION_MODE,
        dataBoundary: PRIVATE_ALPHA_CLOUD_DATA_BOUNDARY,
        cloudDataTransferRequirement: PRIVATE_ALPHA_REQUIRED_CLOUD_TRANSFER,
      };
    case PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY:
      return {
        bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
        modelKey,
        providerPreference: PRIVATE_ALPHA_GROQ_PROVIDER_ID,
        modelPreferenceLabel: PRIVATE_ALPHA_GROQ_120B_MODEL,
        executionMode: PRIVATE_ALPHA_CLOUD_APPROVAL_ONLY_EXECUTION_MODE,
        dataBoundary: PRIVATE_ALPHA_CLOUD_DATA_BOUNDARY,
        cloudDataTransferRequirement: PRIVATE_ALPHA_REQUIRED_CLOUD_TRANSFER,
      };
  }
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

function validateModelPreferenceLabel(
  value: unknown,
  profile: PrivateAlphaRuntimeProfile
): PrivateAlphaValidationResult<string | null> {
  if (value === undefined || value === null) {
    return success(null);
  }

  if (typeof value !== "string") {
    return failure(400, "modelPreferenceLabel must be a string when provided.");
  }

  const normalized = normalizeOptionalLabel(value);
  if (!normalized) {
    return success(null);
  }

  if (normalized.length > PRIVATE_ALPHA_MAX_MODEL_PREFERENCE_LENGTH) {
    return failure(
      400,
      `modelPreferenceLabel exceeds ${PRIVATE_ALPHA_MAX_MODEL_PREFERENCE_LENGTH} characters.`
    );
  }

  if (
    profile === PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE &&
    normalized !== PRIVATE_ALPHA_PRODUCTION_MODEL
  ) {
    return failure(
      400,
      `modelPreferenceLabel must be ${PRIVATE_ALPHA_PRODUCTION_MODEL} when provided.`
    );
  }

  return success(normalized);
}

function validateExplicitModelPreferenceLabel(
  value: unknown,
  modelKey: PrivateAlphaRuntimeModelKey
): PrivateAlphaValidationResult<
  PrivateAlphaResolvedBoundConfiguration["modelPreferenceLabel"]
> {
  const configuration = resolvePrivateAlphaBoundConfiguration(modelKey);

  if (value === undefined || value === null) {
    return success(configuration.modelPreferenceLabel);
  }

  if (typeof value !== "string") {
    return failure(400, "modelPreferenceLabel must be a string when provided.");
  }

  const normalized = normalizeOptionalLabel(value);
  if (!normalized) {
    return success(configuration.modelPreferenceLabel);
  }

  if (normalized.length > PRIVATE_ALPHA_MAX_MODEL_PREFERENCE_LENGTH) {
    return failure(
      400,
      `modelPreferenceLabel exceeds ${PRIVATE_ALPHA_MAX_MODEL_PREFERENCE_LENGTH} characters.`
    );
  }

  if (normalized !== configuration.modelPreferenceLabel) {
    return failure(
      400,
      `modelPreferenceLabel must be ${configuration.modelPreferenceLabel} when provided.`
    );
  }

  return success(configuration.modelPreferenceLabel);
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
  body: unknown,
  profile: PrivateAlphaRuntimeProfile = PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
): PrivateAlphaValidationResult<PrivateAlphaCreateRunInput> {
  if (!isRecord(body)) {
    return failure(400, "Run creation requires a JSON object payload.");
  }

  const unknownKeys = collectUnknownKeys(body, [
    "requestText",
    "capability",
    "modelPreferenceLabel",
    "maximumOutputTokens",
    "modelKey",
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

  if (body.modelKey === undefined) {
    const modelValidation = validateModelPreferenceLabel(
      body.modelPreferenceLabel,
      profile
    );
    if (!modelValidation.ok) {
      return modelValidation;
    }

    return success({
      requestText: normalizedRequestText,
      capability: body.capability,
      modelPreferenceLabel: modelValidation.value,
      maximumOutputTokens: body.maximumOutputTokens,
    });
  }

  if (typeof body.modelKey !== "string") {
    return failure(400, "modelKey must be a string when provided.");
  }

  if (!isPrivateAlphaRuntimeModelKey(body.modelKey)) {
    return failure(400, "modelKey is not supported.");
  }

  const boundConfiguration = resolvePrivateAlphaBoundConfiguration(body.modelKey);
  const explicitModelValidation = validateExplicitModelPreferenceLabel(
    body.modelPreferenceLabel,
    body.modelKey
  );
  if (!explicitModelValidation.ok) {
    return explicitModelValidation;
  }

  if (
    boundConfiguration.providerPreference === PRIVATE_ALPHA_GROQ_PROVIDER_ID &&
    body.capability !== "text"
  ) {
    return failure(400, "capability must be text for Groq-bound requests.");
  }

  return success({
    requestText: normalizedRequestText,
    capability: body.capability,
    modelPreferenceLabel: explicitModelValidation.value,
    maximumOutputTokens: body.maximumOutputTokens,
    modelKey: body.modelKey,
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
    "cloudDataTransferAcknowledgement",
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

  if (
    body.cloudDataTransferAcknowledgement !== undefined &&
    body.cloudDataTransferAcknowledgement !== true
  ) {
    return failure(
      400,
      "cloudDataTransferAcknowledgement must be exactly true when provided."
    );
  }

  return success({
    approvalScopeHash: body.approvalScopeHash.trim(),
    approved: true,
    acknowledgement,
    expectedRevision: body.expectedRevision,
    ...(body.cloudDataTransferAcknowledgement === true
      ? { cloudDataTransferAcknowledgement: true as const }
      : {}),
  });
}

export function validatePrivateAlphaExecuteInput(
  body: unknown
): PrivateAlphaValidationResult<PrivateAlphaExecuteInput> {
  if (!isRecord(body)) {
    return failure(400, "Execution requires a JSON object payload.");
  }

  const unknownKeys = collectUnknownKeys(body, [
    "execute",
    "acknowledgement",
    "approvalScopeHash",
    "expectedRevision",
  ]);
  if (unknownKeys.length > 0) {
    return failure(400, `Unknown fields are not allowed: ${unknownKeys.join(", ")}.`);
  }

  if (body.execute !== true) {
    return failure(400, "execute must be exactly true.");
  }

  if (body.acknowledgement !== true) {
    return failure(400, "acknowledgement must be exactly true.");
  }

  if (
    typeof body.approvalScopeHash !== "string" ||
    !/^[a-f0-9]{64}$/.test(body.approvalScopeHash.trim())
  ) {
    return failure(400, "approvalScopeHash must be a 64-character lowercase hex string.");
  }

  if (
    typeof body.expectedRevision !== "number" ||
    !Number.isInteger(body.expectedRevision) ||
    body.expectedRevision < 1
  ) {
    return failure(400, "expectedRevision must be a positive integer.");
  }

  return success({
    execute: true,
    acknowledgement: true,
    approvalScopeHash: body.approvalScopeHash.trim(),
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

export function isPrivateAlphaLegacyRunConfiguration(input: {
  providerPreference: PrivateAlphaProviderPreference;
  modelPreferenceLabel: string | null;
  retentionMode: PrivateAlphaRetentionMode;
  executionMode: PrivateAlphaExecutionMode;
}): boolean {
  return (
    input.providerPreference === PRIVATE_ALPHA_LEGACY_PROVIDER_PREFERENCE &&
    input.retentionMode === PRIVATE_ALPHA_RETENTION_MODE &&
    input.executionMode === PRIVATE_ALPHA_LEGACY_EXECUTION_MODE &&
    (input.modelPreferenceLabel === null ||
      input.modelPreferenceLabel.length <=
        PRIVATE_ALPHA_MAX_MODEL_PREFERENCE_LENGTH)
  );
}

export function isPrivateAlphaLocalExecutionConfiguration(
  input: PrivateAlphaExecutionConfigurationInput
): boolean {
  if (
    input.providerPreference !== PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID ||
    input.modelPreferenceLabel !== PRIVATE_ALPHA_PRODUCTION_MODEL ||
    input.retentionMode !== PRIVATE_ALPHA_RETENTION_MODE ||
    input.executionMode !== PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE
  ) {
    return false;
  }

  if (hasNoApprovalBindingFields(input)) {
    return true;
  }

  if (!hasCompleteApprovalBindingFields(input)) {
    return false;
  }

  const configuration = resolvePrivateAlphaBoundConfiguration(input.modelKey);
  return (
    configuration.providerPreference === PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID &&
    configuration.modelPreferenceLabel === PRIVATE_ALPHA_PRODUCTION_MODEL &&
    configuration.executionMode === PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE &&
    input.bindingVersion === PRIVATE_ALPHA_APPROVAL_BINDING_VERSION &&
    input.dataBoundary === configuration.dataBoundary &&
    input.cloudDataTransferRequirement ===
      configuration.cloudDataTransferRequirement
  );
}

export function isPrivateAlphaCloudApprovalOnlyConfiguration(
  input: PrivateAlphaExecutionConfigurationInput
): boolean {
  if (
    input.providerPreference !== PRIVATE_ALPHA_GROQ_PROVIDER_ID ||
    input.retentionMode !== PRIVATE_ALPHA_RETENTION_MODE ||
    input.executionMode !== PRIVATE_ALPHA_CLOUD_APPROVAL_ONLY_EXECUTION_MODE ||
    input.modelPreferenceLabel === null ||
    (input.modelPreferenceLabel !== PRIVATE_ALPHA_GROQ_20B_MODEL &&
      input.modelPreferenceLabel !== PRIVATE_ALPHA_GROQ_120B_MODEL)
  ) {
    return false;
  }

  if (input.capability !== undefined && input.capability !== "text") {
    return false;
  }

  if (!hasCompleteApprovalBindingFields(input)) {
    return false;
  }

  const configuration = resolvePrivateAlphaBoundConfiguration(input.modelKey);
  return (
    configuration.providerPreference === PRIVATE_ALPHA_GROQ_PROVIDER_ID &&
    input.modelPreferenceLabel === configuration.modelPreferenceLabel &&
    input.dataBoundary === configuration.dataBoundary &&
    input.cloudDataTransferRequirement ===
      configuration.cloudDataTransferRequirement
  );
}

export function resolvePrivateAlphaApprovalStatement(
  executionMode: PrivateAlphaExecutionMode
): string {
  if (executionMode === PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE) {
    return PRIVATE_ALPHA_LOCAL_EXECUTION_APPROVAL_STATEMENT;
  }

  if (executionMode === PRIVATE_ALPHA_CLOUD_APPROVAL_ONLY_EXECUTION_MODE) {
    return PRIVATE_ALPHA_CLOUD_APPROVAL_STATEMENT;
  }

  return PRIVATE_ALPHA_APPROVAL_LOCK_STATEMENT;
}

export function buildPrivateAlphaRunRequest(
  input: PrivateAlphaCreateRunInput,
  profile: PrivateAlphaRuntimeProfile = PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE
): PrivateAlphaRunRequest {
  const normalizedRequestText = normalizePrivateAlphaRequestText(input.requestText);
  const commonFields = {
    normalizedRequestText,
    redactedPreview: buildPrivateAlphaRedactedPreview(normalizedRequestText),
    maximumOutputTokens: input.maximumOutputTokens,
    retentionMode: PRIVATE_ALPHA_RETENTION_MODE,
  };

  if (input.modelKey !== undefined) {
    switch (input.modelKey) {
      case PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY:
        return {
          ...commonFields,
          capability: input.capability,
          providerPreference: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
          modelPreferenceLabel: PRIVATE_ALPHA_PRODUCTION_MODEL,
          executionMode: PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE,
          bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
          modelKey: PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
          dataBoundary: PRIVATE_ALPHA_LOCAL_DATA_BOUNDARY,
          cloudDataTransferRequirement: PRIVATE_ALPHA_NOT_REQUIRED_CLOUD_TRANSFER,
        };
      case PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY:
        return {
          ...commonFields,
          capability: "text",
          providerPreference: PRIVATE_ALPHA_GROQ_PROVIDER_ID,
          modelPreferenceLabel: PRIVATE_ALPHA_GROQ_20B_MODEL,
          executionMode: PRIVATE_ALPHA_CLOUD_APPROVAL_ONLY_EXECUTION_MODE,
          bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
          modelKey: PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
          dataBoundary: PRIVATE_ALPHA_CLOUD_DATA_BOUNDARY,
          cloudDataTransferRequirement: PRIVATE_ALPHA_REQUIRED_CLOUD_TRANSFER,
        };
      case PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY:
        return {
          ...commonFields,
          capability: "text",
          providerPreference: PRIVATE_ALPHA_GROQ_PROVIDER_ID,
          modelPreferenceLabel: PRIVATE_ALPHA_GROQ_120B_MODEL,
          executionMode: PRIVATE_ALPHA_CLOUD_APPROVAL_ONLY_EXECUTION_MODE,
          bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
          modelKey: PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
          dataBoundary: PRIVATE_ALPHA_CLOUD_DATA_BOUNDARY,
          cloudDataTransferRequirement: PRIVATE_ALPHA_REQUIRED_CLOUD_TRANSFER,
        };
    }
  }

  if (profile === PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE) {
    return {
      ...commonFields,
      capability: input.capability,
      providerPreference: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
      modelPreferenceLabel: PRIVATE_ALPHA_PRODUCTION_MODEL,
      executionMode: PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE,
    };
  }

  return {
    ...commonFields,
    capability: input.capability,
    providerPreference: PRIVATE_ALPHA_LEGACY_PROVIDER_PREFERENCE,
    modelPreferenceLabel: input.modelPreferenceLabel,
    executionMode: PRIVATE_ALPHA_LEGACY_EXECUTION_MODE,
  };
}

export function serializePrivateAlphaRunRequest(
  request: PrivateAlphaRunRequest
): string {
  if (!("bindingVersion" in request)) {
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

  return JSON.stringify({
    normalizedRequestText: request.normalizedRequestText,
    redactedPreview: request.redactedPreview,
    capability: request.capability,
    providerPreference: request.providerPreference,
    modelPreferenceLabel: request.modelPreferenceLabel,
    maximumOutputTokens: request.maximumOutputTokens,
    retentionMode: request.retentionMode,
    executionMode: request.executionMode,
    bindingVersion: request.bindingVersion,
    modelKey: request.modelKey,
    dataBoundary: request.dataBoundary,
    cloudDataTransferRequirement: request.cloudDataTransferRequirement,
  });
}

export function buildPrivateAlphaApprovalScope(input: {
  runId: string;
  request: PrivateAlphaRunRequest;
  normalizedRequestHash: string;
}): PrivateAlphaApprovalScope {
  if (!("bindingVersion" in input.request)) {
    if (input.request.providerPreference === PRIVATE_ALPHA_LEGACY_PROVIDER_PREFERENCE) {
      return {
        runId: input.runId,
        capability: input.request.capability,
        normalizedRequestHash: input.normalizedRequestHash,
        providerPreference: PRIVATE_ALPHA_LEGACY_PROVIDER_PREFERENCE,
        modelPreferenceLabel: input.request.modelPreferenceLabel,
        maximumOutputTokens: input.request.maximumOutputTokens,
        retentionMode: input.request.retentionMode,
        executionMode: PRIVATE_ALPHA_LEGACY_EXECUTION_MODE,
      };
    }

    return {
      runId: input.runId,
      capability: input.request.capability,
      normalizedRequestHash: input.normalizedRequestHash,
      providerPreference: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
      modelPreferenceLabel: PRIVATE_ALPHA_PRODUCTION_MODEL,
      maximumOutputTokens: input.request.maximumOutputTokens,
      retentionMode: input.request.retentionMode,
      executionMode: PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE,
    };
  }

  switch (input.request.modelKey) {
    case PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY:
      return {
        runId: input.runId,
        capability: input.request.capability,
        normalizedRequestHash: input.normalizedRequestHash,
        providerPreference: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
        modelPreferenceLabel: PRIVATE_ALPHA_PRODUCTION_MODEL,
        maximumOutputTokens: input.request.maximumOutputTokens,
        retentionMode: input.request.retentionMode,
        executionMode: PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE,
        bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
        modelKey: PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
        dataBoundary: PRIVATE_ALPHA_LOCAL_DATA_BOUNDARY,
        cloudDataTransferRequirement: PRIVATE_ALPHA_NOT_REQUIRED_CLOUD_TRANSFER,
      };
    case PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY:
      return {
        runId: input.runId,
        capability: "text",
        normalizedRequestHash: input.normalizedRequestHash,
        providerPreference: PRIVATE_ALPHA_GROQ_PROVIDER_ID,
        modelPreferenceLabel: PRIVATE_ALPHA_GROQ_20B_MODEL,
        maximumOutputTokens: input.request.maximumOutputTokens,
        retentionMode: input.request.retentionMode,
        executionMode: PRIVATE_ALPHA_CLOUD_APPROVAL_ONLY_EXECUTION_MODE,
        bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
        modelKey: PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
        dataBoundary: PRIVATE_ALPHA_CLOUD_DATA_BOUNDARY,
        cloudDataTransferRequirement: PRIVATE_ALPHA_REQUIRED_CLOUD_TRANSFER,
      };
    case PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY:
      return {
        runId: input.runId,
        capability: "text",
        normalizedRequestHash: input.normalizedRequestHash,
        providerPreference: PRIVATE_ALPHA_GROQ_PROVIDER_ID,
        modelPreferenceLabel: PRIVATE_ALPHA_GROQ_120B_MODEL,
        maximumOutputTokens: input.request.maximumOutputTokens,
        retentionMode: input.request.retentionMode,
        executionMode: PRIVATE_ALPHA_CLOUD_APPROVAL_ONLY_EXECUTION_MODE,
        bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
        modelKey: PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
        dataBoundary: PRIVATE_ALPHA_CLOUD_DATA_BOUNDARY,
        cloudDataTransferRequirement: PRIVATE_ALPHA_REQUIRED_CLOUD_TRANSFER,
      };
  }
}

export function serializePrivateAlphaApprovalScope(
  scope: PrivateAlphaApprovalScope
): string {
  if (!("bindingVersion" in scope)) {
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

  return JSON.stringify({
    runId: scope.runId,
    capability: scope.capability,
    normalizedRequestHash: scope.normalizedRequestHash,
    providerPreference: scope.providerPreference,
    modelPreferenceLabel: scope.modelPreferenceLabel,
    maximumOutputTokens: scope.maximumOutputTokens,
    retentionMode: scope.retentionMode,
    executionMode: scope.executionMode,
    bindingVersion: scope.bindingVersion,
    modelKey: scope.modelKey,
    dataBoundary: scope.dataBoundary,
    cloudDataTransferRequirement: scope.cloudDataTransferRequirement,
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
