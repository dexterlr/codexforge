import "server-only";

import {
  PRIVATE_ALPHA_MAX_OUTPUT_TEXT_LENGTH,
  PRIVATE_ALPHA_MAX_REQUEST_LENGTH,
} from "../private-alpha/private-alpha-validation";
import { readCodexForgeGroqCredential } from "./groq-provider-credential.server";
import {
  CODEXFORGE_GROQ_MODEL_IDS,
  CODEXFORGE_GROQ_PROVIDER_ID,
  type CodexForgeGroqConfigurationStatus,
  type CodexForgeGroqDiscoveredModel,
  type CodexForgeGroqErrorCode,
  type CodexForgeGroqGenerationInput,
  type CodexForgeGroqGenerationResult,
  type CodexForgeGroqModelDiscoveryResult,
  type CodexForgeGroqModelId,
  type CodexForgeGroqObservedRateLimitHeaders,
} from "./groq-provider-types";

export const CODEXFORGE_GROQ_ORIGIN = "https://api.groq.com";
export const CODEXFORGE_GROQ_MODELS_PATH = "/openai/v1/models";
export const CODEXFORGE_GROQ_CHAT_COMPLETIONS_PATH =
  "/openai/v1/chat/completions";
export const CODEXFORGE_GROQ_REASONING_EFFORT = "low" as const;

const CODEXFORGE_GROQ_DISCOVERY_TIMEOUT_MS = 15_000;
const CODEXFORGE_GROQ_GENERATION_TIMEOUT_MS = 240_000;
const CODEXFORGE_GROQ_MAX_RESPONSE_BYTES = 524_288;
const CODEXFORGE_GROQ_MAX_HEADER_VALUE_LENGTH = 64;
const CODEXFORGE_GROQ_MAX_OWNED_BY_LENGTH = 200;
const CODEXFORGE_GROQ_QUOTA_ERROR_CODES = [
  "insufficient_quota",
  "quota_exceeded",
  "quota_exhausted",
  "billing_hard_limit_reached",
  "billing_not_active",
] as const;
const CODEXFORGE_GROQ_RATE_LIMIT_HEADER_NAMES = [
  "x-ratelimit-limit-requests",
  "x-ratelimit-remaining-requests",
  "x-ratelimit-reset-requests",
  "x-ratelimit-limit-tokens",
  "x-ratelimit-remaining-tokens",
  "x-ratelimit-reset-tokens",
] as const;

type CodexForgeGroqFetchLike = typeof fetch;

type CodexForgeGroqFailureStatus = 503 | 504;

type CodexForgeGroqClientOptions = Readonly<{
  apiKey: string | null;
  credentialSource: "environment" | "none";
  fetchFn: CodexForgeGroqFetchLike;
  discoveryTimeoutMs: number;
  generationTimeoutMs: number;
}>;

type CodexForgeGroqRequestInput = Readonly<{
  pathname:
    | typeof CODEXFORGE_GROQ_MODELS_PATH
    | typeof CODEXFORGE_GROQ_CHAT_COMPLETIONS_PATH;
  init: RequestInit;
  timeoutMs: number;
  requestedModel?: CodexForgeGroqModelId;
}>;

type CodexForgeGroqRequestResult = Readonly<{
  payload: unknown;
  headers: Headers;
}>;

export type CodexForgeGroqClient = Readonly<{
  getConfigurationStatus: () => CodexForgeGroqConfigurationStatus;
  discoverAllowedModels: () => Promise<CodexForgeGroqModelDiscoveryResult>;
  generateApprovedText: (
    input: CodexForgeGroqGenerationInput
  ) => Promise<CodexForgeGroqGenerationResult>;
}>;

export class CodexForgeGroqError extends Error {
  readonly code: CodexForgeGroqErrorCode;
  readonly safeMessage: string;
  readonly status: CodexForgeGroqFailureStatus;

  constructor(
    code: CodexForgeGroqErrorCode,
    safeMessage: string,
    status: CodexForgeGroqFailureStatus
  ) {
    super(safeMessage);
    this.name = "CodexForgeGroqError";
    this.code = code;
    this.safeMessage = safeMessage;
    this.status = status;
  }
}

function createGroqError(
  code: CodexForgeGroqErrorCode,
  safeMessage: string,
  status: CodexForgeGroqFailureStatus
): CodexForgeGroqError {
  return new CodexForgeGroqError(code, safeMessage, status);
}

function isAbortError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as { name?: string }).name === "AbortError"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSafeNonNegativeInteger(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0 &&
    Number.isSafeInteger(value)
  );
}

function isSafeNonNegativeNumber(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= Number.MAX_SAFE_INTEGER
  );
}

function readOptionalBoundedString(
  value: unknown,
  maximumLength: number
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  return trimmed.slice(0, maximumLength);
}

function normalizeInjectedApiKey(value: string | null | undefined): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function isAllowedModelId(value: string): value is CodexForgeGroqModelId {
  return (CODEXFORGE_GROQ_MODEL_IDS as readonly string[]).includes(value);
}

function buildGroqUrl(
  pathname:
    | typeof CODEXFORGE_GROQ_MODELS_PATH
    | typeof CODEXFORGE_GROQ_CHAT_COMPLETIONS_PATH
): URL {
  return new URL(pathname, CODEXFORGE_GROQ_ORIGIN);
}

function getConfiguredStatus(
  credentialSource: "environment" | "none"
): CodexForgeGroqConfigurationStatus {
  const configured = credentialSource === "environment";
  return {
    configured,
    credentialSource,
    safeMessage: configured
      ? "Groq credential is configured in the server environment."
      : "Groq credential is not configured.",
  };
}

function assertConfiguredApiKey(apiKey: string | null): string {
  if (!apiKey) {
    throw createGroqError(
      "groq_credential_missing",
      "Groq credential is not configured.",
      503
    );
  }

  return apiKey;
}

async function readResponseTextWithLimit(response: Response): Promise<string> {
  if (!response.body) {
    return "";
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let totalBytes = 0;
  let text = "";

  while (true) {
    const chunk = await reader.read();
    if (chunk.done) {
      text += decoder.decode();
      break;
    }

    totalBytes += chunk.value.byteLength;
    if (totalBytes > CODEXFORGE_GROQ_MAX_RESPONSE_BYTES) {
      await reader.cancel();
      throw createGroqError(
        "groq_output_too_large",
        "Groq returned more data than this slice allows.",
        503
      );
    }

    text += decoder.decode(chunk.value, { stream: true });
  }

  return text;
}

function extractProviderErrorCode(payload: unknown): string | null {
  if (!isRecord(payload)) {
    return null;
  }

  const directCode = readOptionalBoundedString(payload.code, 80);
  if (directCode) {
    return directCode.toLowerCase();
  }

  if (isRecord(payload.error)) {
    const nestedCode = readOptionalBoundedString(payload.error.code, 80);
    if (nestedCode) {
      return nestedCode.toLowerCase();
    }
  }

  return null;
}

function isQuotaExhaustionCode(payload: unknown): boolean {
  const code = extractProviderErrorCode(payload);
  return code
    ? CODEXFORGE_GROQ_QUOTA_ERROR_CODES.includes(
        code as (typeof CODEXFORGE_GROQ_QUOTA_ERROR_CODES)[number]
      )
    : false;
}

async function parseJsonPayload(text: string): Promise<unknown> {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw createGroqError(
      "groq_malformed_response",
      "Groq returned malformed JSON.",
      503
    );
  }
}

function readObservedRateLimitHeaders(
  headers: Headers
): CodexForgeGroqObservedRateLimitHeaders {
  const observed: Record<string, string> = {};

  for (const headerName of CODEXFORGE_GROQ_RATE_LIMIT_HEADER_NAMES) {
    const rawValue = headers.get(headerName);
    if (!rawValue) {
      continue;
    }

    const normalizedValue = rawValue.trim();
    if (
      normalizedValue.length === 0 ||
      normalizedValue.length > CODEXFORGE_GROQ_MAX_HEADER_VALUE_LENGTH
    ) {
      continue;
    }

    if (!/^[A-Za-z0-9._:-]+$/.test(normalizedValue)) {
      continue;
    }

    observed[headerName] = normalizedValue;
  }

  return Object.freeze(observed);
}

function parseDiscoveryEntry(
  payload: unknown
): CodexForgeGroqDiscoveredModel | null {
  if (!isRecord(payload) || typeof payload.id !== "string") {
    return null;
  }

  if (!isAllowedModelId(payload.id)) {
    return null;
  }

  return Object.freeze({
    modelId: payload.id,
    active: typeof payload.active === "boolean" ? payload.active : null,
    contextWindowTokens: isSafeNonNegativeInteger(payload.context_window)
      ? payload.context_window
      : null,
    maximumOutputTokens: isSafeNonNegativeInteger(payload.max_completion_tokens)
      ? payload.max_completion_tokens
      : null,
    ownedBy: readOptionalBoundedString(
      payload.owned_by,
      CODEXFORGE_GROQ_MAX_OWNED_BY_LENGTH
    ),
  });
}

function parseDiscoveredModels(
  payload: unknown
): readonly CodexForgeGroqDiscoveredModel[] {
  if (!isRecord(payload) || !Array.isArray(payload.data)) {
    throw createGroqError(
      "groq_malformed_response",
      "Groq model discovery returned an invalid payload.",
      503
    );
  }

  if ("object" in payload && payload.object !== "list") {
    throw createGroqError(
      "groq_malformed_response",
      "Groq model discovery returned an invalid payload.",
      503
    );
  }

  const discoveredById = new Map<CodexForgeGroqModelId, CodexForgeGroqDiscoveredModel>();

  for (const entry of payload.data) {
    const discoveredModel = parseDiscoveryEntry(entry);
    if (discoveredModel && !discoveredById.has(discoveredModel.modelId)) {
      discoveredById.set(discoveredModel.modelId, discoveredModel);
    }
  }

  return Object.freeze(
    CODEXFORGE_GROQ_MODEL_IDS.flatMap((modelId) => {
      const discoveredModel = discoveredById.get(modelId);
      return discoveredModel ? [discoveredModel] : [];
    })
  );
}

function readUsageCount(
  usage: Record<string, unknown>,
  key: "prompt_tokens" | "completion_tokens" | "total_tokens"
): number | null {
  const value = usage[key];

  if (value === undefined) {
    return null;
  }

  if (!isSafeNonNegativeNumber(value)) {
    throw createGroqError(
      "groq_malformed_response",
      "Groq returned invalid usage metrics.",
      503
    );
  }

  return value;
}

function readTotalDurationNanoseconds(
  usage: Record<string, unknown>
): number | null {
  const value = usage.total_time;

  if (!isSafeNonNegativeNumber(value)) {
    return null;
  }

  const nanoseconds = Math.round(value * 1_000_000_000);
  return Number.isSafeInteger(nanoseconds) && nanoseconds >= 0
    ? nanoseconds
    : null;
}

function parseGenerationResult(
  payload: unknown,
  requestedModel: CodexForgeGroqModelId
): CodexForgeGroqGenerationResult {
  if (!isRecord(payload)) {
    throw createGroqError(
      "groq_malformed_response",
      "Groq returned an invalid chat response.",
      503
    );
  }

  if ("object" in payload && payload.object !== "chat.completion") {
    throw createGroqError(
      "groq_malformed_response",
      "Groq returned an invalid chat response.",
      503
    );
  }

  if (payload.model !== requestedModel) {
    throw createGroqError(
      "groq_malformed_response",
      "Groq returned an unexpected model identifier.",
      503
    );
  }

  if (Array.isArray(payload.executed_tools) && payload.executed_tools.length > 0) {
    throw createGroqError(
      "groq_malformed_response",
      "Groq returned unsupported tool execution details.",
      503
    );
  }

  if (!Array.isArray(payload.choices) || payload.choices.length !== 1) {
    throw createGroqError(
      "groq_malformed_response",
      "Groq returned an invalid chat response.",
      503
    );
  }

  const firstChoice = payload.choices[0];
  if (!isRecord(firstChoice) || !isRecord(firstChoice.message)) {
    throw createGroqError(
      "groq_malformed_response",
      "Groq returned malformed message content.",
      503
    );
  }

  if (
    firstChoice.finish_reason !== null &&
    typeof firstChoice.finish_reason !== "string"
  ) {
    throw createGroqError(
      "groq_malformed_response",
      "Groq returned an invalid finish reason.",
      503
    );
  }

  const message = firstChoice.message;

  if (Array.isArray(message.tool_calls) && message.tool_calls.length > 0) {
    throw createGroqError(
      "groq_malformed_response",
      "Groq returned unsupported tool output.",
      503
    );
  }

  if (Array.isArray(message.executed_tools) && message.executed_tools.length > 0) {
    throw createGroqError(
      "groq_malformed_response",
      "Groq returned unsupported tool execution details.",
      503
    );
  }

  if (Array.isArray(message.images) && message.images.length > 0) {
    throw createGroqError(
      "groq_malformed_response",
      "Groq returned unsupported image output.",
      503
    );
  }

  if (typeof message.content !== "string") {
    throw createGroqError(
      "groq_malformed_response",
      "Groq returned malformed message content.",
      503
    );
  }

  if (message.content.length > PRIVATE_ALPHA_MAX_OUTPUT_TEXT_LENGTH) {
    throw createGroqError(
      "groq_output_too_large",
      "Groq visible output exceeded the bounded text limit.",
      503
    );
  }

  if (message.content.trim().length === 0) {
    throw createGroqError(
      "groq_empty_response",
      "Groq completed without visible text output.",
      503
    );
  }

  let promptTokens: number | null = null;
  let outputTokens: number | null = null;
  let totalTokens: number | null = null;
  let totalDurationNanoseconds: number | null = null;

  if (payload.usage !== undefined) {
    if (!isRecord(payload.usage)) {
      throw createGroqError(
        "groq_malformed_response",
        "Groq returned invalid usage metrics.",
        503
      );
    }

    promptTokens = readUsageCount(payload.usage, "prompt_tokens");
    outputTokens = readUsageCount(payload.usage, "completion_tokens");
    totalTokens = readUsageCount(payload.usage, "total_tokens");
    totalDurationNanoseconds = readTotalDurationNanoseconds(payload.usage);
  }

  return Object.freeze({
    model: requestedModel,
    outputText: message.content,
    finishReason:
      typeof firstChoice.finish_reason === "string"
        ? firstChoice.finish_reason
        : null,
    promptTokens,
    outputTokens,
    totalTokens,
    totalDurationNanoseconds,
  });
}

function classifyHttpError(
  status: number,
  errorPayload: unknown,
  requestedModel: CodexForgeGroqModelId | undefined
): CodexForgeGroqError {
  if (status === 401 || status === 403) {
    return createGroqError(
      "groq_authentication_failed",
      "Groq authentication failed with the configured server credential.",
      503
    );
  }

  if (status === 429) {
    return isQuotaExhaustionCode(errorPayload)
      ? createGroqError(
          "groq_quota_exhausted",
          "Groq account quota is exhausted for this request.",
          503
        )
      : createGroqError(
          "groq_rate_limited",
          "Groq rejected the request because a rate limit was reached.",
          503
        );
  }

  if (status === 404 && requestedModel) {
    return createGroqError(
      "groq_model_unavailable",
      "Groq does not currently expose the requested model.",
      503
    );
  }

  return createGroqError(
    "groq_http_error",
    "Groq returned an unexpected HTTP status.",
    503
  );
}

async function requestGroq(
  options: CodexForgeGroqClientOptions,
  input: CodexForgeGroqRequestInput
): Promise<CodexForgeGroqRequestResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), input.timeoutMs);

  try {
    const response = await options.fetchFn(buildGroqUrl(input.pathname), {
      ...input.init,
      redirect: "error",
      signal: controller.signal,
    });

    if (!response.ok) {
      let errorPayload: unknown = null;

      try {
        const errorText = await readResponseTextWithLimit(response);
        errorPayload = errorText ? await parseJsonPayload(errorText) : null;
      } catch (error) {
        if (error instanceof CodexForgeGroqError) {
          throw error;
        }
      }

      throw classifyHttpError(response.status, errorPayload, input.requestedModel);
    }

    const responseText = await readResponseTextWithLimit(response);
    const payload = await parseJsonPayload(responseText);

    return {
      payload,
      headers: response.headers,
    };
  } catch (error) {
    if (error instanceof CodexForgeGroqError) {
      throw error;
    }

    if (isAbortError(error)) {
      throw createGroqError(
        "groq_timeout",
        "Groq did not respond before the fixed timeout.",
        504
      );
    }

    throw createGroqError(
      "groq_unavailable",
      "Groq is unavailable on the fixed cloud endpoint.",
      503
    );
  } finally {
    clearTimeout(timeout);
  }
}

function validateGenerationInput(
  input: CodexForgeGroqGenerationInput
): CodexForgeGroqGenerationInput {
  if (!isAllowedModelId(input.model)) {
    throw createGroqError(
      "groq_model_unavailable",
      "Groq request validation failed.",
      503
    );
  }

  if (typeof input.approvedRequestText !== "string") {
    throw createGroqError(
      "groq_http_error",
      "Groq request validation failed.",
      503
    );
  }

  if (input.approvedRequestText.trim().length === 0) {
    throw createGroqError(
      "groq_http_error",
      "Groq request validation failed.",
      503
    );
  }

  if (input.approvedRequestText.length > PRIVATE_ALPHA_MAX_REQUEST_LENGTH) {
    throw createGroqError(
      "groq_http_error",
      "Groq request validation failed.",
      503
    );
  }

  if (
    !Number.isInteger(input.maximumOutputTokens) ||
    input.maximumOutputTokens < 1 ||
    input.maximumOutputTokens > 4_096
  ) {
    throw createGroqError(
      "groq_http_error",
      "Groq request validation failed.",
      503
    );
  }

  return input;
}

function createGroqClient(
  options: CodexForgeGroqClientOptions
): CodexForgeGroqClient {
  return Object.freeze({
    getConfigurationStatus(): CodexForgeGroqConfigurationStatus {
      return getConfiguredStatus(options.credentialSource);
    },

    async discoverAllowedModels(): Promise<CodexForgeGroqModelDiscoveryResult> {
      const apiKey = assertConfiguredApiKey(options.apiKey);

      const response = await requestGroq(options, {
        pathname: CODEXFORGE_GROQ_MODELS_PATH,
        init: {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: "application/json",
          },
        },
        timeoutMs: options.discoveryTimeoutMs,
      });

      const discoveredModels = parseDiscoveredModels(response.payload);
      const discoveredModelIds = new Set(
        discoveredModels.map((model) => model.modelId)
      );
      const missingAllowedModels = Object.freeze(
        CODEXFORGE_GROQ_MODEL_IDS.filter(
          (modelId) => !discoveredModelIds.has(modelId)
        )
      );

      return Object.freeze({
        providerId: CODEXFORGE_GROQ_PROVIDER_ID,
        discoveredModels,
        missingAllowedModels,
        observedRateLimitHeaders: readObservedRateLimitHeaders(response.headers),
        safeWarning:
          missingAllowedModels.length > 0
            ? "Groq model discovery did not return every allowlisted model."
            : null,
      });
    },

    async generateApprovedText(
      input: CodexForgeGroqGenerationInput
    ): Promise<CodexForgeGroqGenerationResult> {
      const apiKey = assertConfiguredApiKey(options.apiKey);
      const validatedInput = validateGenerationInput(input);

      const response = await requestGroq(options, {
        pathname: CODEXFORGE_GROQ_CHAT_COMPLETIONS_PATH,
        init: {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            model: validatedInput.model,
            messages: [
              {
                role: "user",
                content: validatedInput.approvedRequestText,
              },
            ],
            stream: false,
            reasoning_effort: CODEXFORGE_GROQ_REASONING_EFFORT,
            include_reasoning: false,
            max_completion_tokens: validatedInput.maximumOutputTokens,
            n: 1,
            tool_choice: "none",
            citation_options: "disabled",
          }),
        },
        timeoutMs: options.generationTimeoutMs,
        requestedModel: validatedInput.model,
      });

      return parseGenerationResult(response.payload, validatedInput.model);
    },
  });
}

export function createCodexForgeGroqClient(): CodexForgeGroqClient {
  const credential = readCodexForgeGroqCredential();

  return createGroqClient({
    apiKey: credential.apiKey,
    credentialSource: credential.source,
    fetchFn: fetch,
    discoveryTimeoutMs: CODEXFORGE_GROQ_DISCOVERY_TIMEOUT_MS,
    generationTimeoutMs: CODEXFORGE_GROQ_GENERATION_TIMEOUT_MS,
  });
}

export function createCodexForgeGroqClientForTesting(input: {
  apiKey?: string | null;
  fetchFn?: CodexForgeGroqFetchLike;
  discoveryTimeoutMs?: number;
  generationTimeoutMs?: number;
} = {}): CodexForgeGroqClient {
  const apiKey = normalizeInjectedApiKey(input.apiKey);

  return createGroqClient({
    apiKey,
    credentialSource: apiKey ? "environment" : "none",
    fetchFn: input.fetchFn ?? fetch,
    discoveryTimeoutMs:
      input.discoveryTimeoutMs ?? CODEXFORGE_GROQ_DISCOVERY_TIMEOUT_MS,
    generationTimeoutMs:
      input.generationTimeoutMs ?? CODEXFORGE_GROQ_GENERATION_TIMEOUT_MS,
  });
}
