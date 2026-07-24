import "server-only";

import {
  PRIVATE_ALPHA_MAX_DONE_REASON_LENGTH,
  PRIVATE_ALPHA_MAX_OUTPUT_TEXT_LENGTH,
  PRIVATE_ALPHA_MAX_REQUEST_LENGTH,
  PRIVATE_ALPHA_PRODUCTION_MODEL,
} from "./private-alpha-validation";
import type { PrivateAlphaExecutionErrorCode } from "./private-alpha-types";

export const PRIVATE_ALPHA_OLLAMA_ORIGIN = "http://127.0.0.1:11434";
export const PRIVATE_ALPHA_OLLAMA_TAGS_PATH = "/api/tags";
export const PRIVATE_ALPHA_OLLAMA_CHAT_PATH = "/api/chat";
export const PRIVATE_ALPHA_OLLAMA_THINK_LEVEL = "low" as const;

const PRIVATE_ALPHA_OLLAMA_AVAILABILITY_TIMEOUT_MS = 5_000;
const PRIVATE_ALPHA_OLLAMA_GENERATION_TIMEOUT_MS = 240_000;
const PRIVATE_ALPHA_OLLAMA_MAX_RESPONSE_BYTES = 262_144;
const PRIVATE_ALPHA_OLLAMA_EMPTY_RESPONSE_SAFE_MESSAGE =
  "Local Ollama completed without a visible final response. Create a new run with a larger output-token budget.";

type PrivateAlphaFetchLike = typeof fetch;

type PrivateAlphaOllamaClientOptions = Readonly<{
  fetchFn: PrivateAlphaFetchLike;
  availabilityTimeoutMs: number;
  generationTimeoutMs: number;
}>;

type PrivateAlphaOllamaFailureStatus = 503 | 504;

export type PrivateAlphaOllamaAvailability = Readonly<{
  providerAvailable: boolean;
  modelAvailable: boolean;
  errorCode:
    | "ollama_unavailable"
    | "ollama_model_missing"
    | "ollama_timeout"
    | "ollama_http_error"
    | "ollama_malformed_response"
    | "ollama_output_too_large"
    | null;
  safeErrorMessage: string | null;
}>;

export type PrivateAlphaOllamaGenerationInput = Readonly<{
  approvedRequestText: string;
  model: string;
  maximumOutputTokens: number;
}>;

export type PrivateAlphaOllamaGenerationResult = Readonly<{
  model: "gpt-oss:20b";
  outputText: string;
  doneReason: string | null;
  totalDurationNanoseconds: number | null;
  loadDurationNanoseconds: number | null;
  promptEvalCount: number | null;
  evalCount: number | null;
}>;

export type PrivateAlphaOllamaClient = Readonly<{
  getAvailability: () => Promise<PrivateAlphaOllamaAvailability>;
  generateApprovedText: (
    input: PrivateAlphaOllamaGenerationInput
  ) => Promise<PrivateAlphaOllamaGenerationResult>;
}>;

export class PrivateAlphaOllamaError extends Error {
  readonly code: PrivateAlphaExecutionErrorCode;
  readonly safeMessage: string;
  readonly status: PrivateAlphaOllamaFailureStatus;

  constructor(
    code: PrivateAlphaExecutionErrorCode,
    safeMessage: string,
    status: PrivateAlphaOllamaFailureStatus
  ) {
    super(safeMessage);
    this.name = "PrivateAlphaOllamaError";
    this.code = code;
    this.safeMessage = safeMessage;
    this.status = status;
  }
}

function createOllamaError(
  code:
    | "ollama_unavailable"
    | "ollama_model_missing"
    | "ollama_timeout"
    | "ollama_http_error"
    | "ollama_malformed_response"
    | "ollama_empty_response"
    | "ollama_output_too_large",
  safeMessage: string,
  status: PrivateAlphaOllamaFailureStatus
): PrivateAlphaOllamaError {
  return new PrivateAlphaOllamaError(code, safeMessage, status);
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

function buildOllamaUrl(pathname: string): URL {
  return new URL(pathname, PRIVATE_ALPHA_OLLAMA_ORIGIN);
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
    if (totalBytes > PRIVATE_ALPHA_OLLAMA_MAX_RESPONSE_BYTES) {
      await reader.cancel();
      throw createOllamaError(
        "ollama_output_too_large",
        "Local Ollama returned more data than this slice allows.",
        503
      );
    }

    text += decoder.decode(chunk.value, { stream: true });
  }

  return text;
}

async function requestOllama(
  options: PrivateAlphaOllamaClientOptions,
  input: {
    pathname: string;
    init: RequestInit;
    timeoutMs: number;
    timeoutStatus: PrivateAlphaOllamaFailureStatus;
  }
): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), input.timeoutMs);

  try {
    const response = await options.fetchFn(buildOllamaUrl(input.pathname), {
      ...input.init,
      redirect: "error",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw createOllamaError(
        "ollama_http_error",
        "Local Ollama returned an unexpected HTTP status.",
        input.timeoutStatus === 504 ? 503 : input.timeoutStatus
      );
    }

    const bodyText = await readResponseTextWithLimit(response);

    try {
      return JSON.parse(bodyText) as unknown;
    } catch {
      throw createOllamaError(
        "ollama_malformed_response",
        "Local Ollama returned malformed JSON.",
        input.timeoutStatus === 504 ? 503 : input.timeoutStatus
      );
    }
  } catch (error) {
    if (error instanceof PrivateAlphaOllamaError) {
      throw error;
    }

    if (isAbortError(error)) {
      throw createOllamaError(
        "ollama_timeout",
        "Local Ollama did not respond before the fixed timeout.",
        input.timeoutStatus
      );
    }

    throw createOllamaError(
      "ollama_unavailable",
      "Local Ollama is unavailable on the fixed loopback endpoint.",
      503
    );
  } finally {
    clearTimeout(timeout);
  }
}

function extractInstalledModels(payload: unknown): readonly string[] {
  if (!isRecord(payload) || !Array.isArray(payload.models)) {
    throw createOllamaError(
      "ollama_malformed_response",
      "Local Ollama availability data was malformed.",
      503
    );
  }

  const installedModels: string[] = [];
  for (const modelEntry of payload.models) {
    if (!isRecord(modelEntry)) {
      throw createOllamaError(
        "ollama_malformed_response",
        "Local Ollama availability data was malformed.",
        503
      );
    }

    const discoveredName =
      typeof modelEntry.model === "string"
        ? modelEntry.model
        : typeof modelEntry.name === "string"
          ? modelEntry.name
          : null;
    if (discoveredName) {
      installedModels.push(discoveredName);
    }
  }

  return installedModels;
}

function parseGenerationResult(payload: unknown): PrivateAlphaOllamaGenerationResult {
  if (!isRecord(payload)) {
    throw createOllamaError(
      "ollama_malformed_response",
      "Local Ollama returned an invalid chat response.",
      503
    );
  }

  if (payload.model !== PRIVATE_ALPHA_PRODUCTION_MODEL) {
    throw createOllamaError(
      "ollama_malformed_response",
      "Local Ollama returned an unexpected model identifier.",
      503
    );
  }

  if (payload.done !== true) {
    throw createOllamaError(
      "ollama_malformed_response",
      "Local Ollama did not report a completed response.",
      503
    );
  }

  if (!isRecord(payload.message)) {
    throw createOllamaError(
      "ollama_malformed_response",
      "Local Ollama chat content was malformed.",
      503
    );
  }

  const message = payload.message;

  if (Array.isArray(message.tool_calls) && message.tool_calls.length > 0) {
    throw createOllamaError(
      "ollama_malformed_response",
      "Local Ollama returned unsupported tool output.",
      503
    );
  }

  if (Array.isArray(message.images) && message.images.length > 0) {
    throw createOllamaError(
      "ollama_malformed_response",
      "Local Ollama returned unsupported image output.",
      503
    );
  }

  if (typeof message.content !== "string") {
    throw createOllamaError(
      "ollama_malformed_response",
      "Local Ollama chat content was malformed.",
      503
    );
  }

  if (message.content.length > PRIVATE_ALPHA_MAX_OUTPUT_TEXT_LENGTH) {
    throw createOllamaError(
      "ollama_output_too_large",
      "Local Ollama output exceeded the local persistence limit.",
      503
    );
  }

  if (message.content.trim().length === 0) {
    throw createOllamaError(
      "ollama_empty_response",
      PRIVATE_ALPHA_OLLAMA_EMPTY_RESPONSE_SAFE_MESSAGE,
      503
    );
  }

  const doneReason = readOptionalBoundedString(
    payload.done_reason,
    PRIVATE_ALPHA_MAX_DONE_REASON_LENGTH
  );

  const totalDurationNanoseconds = isSafeNonNegativeInteger(payload.total_duration)
    ? payload.total_duration
    : null;
  const loadDurationNanoseconds = isSafeNonNegativeInteger(payload.load_duration)
    ? payload.load_duration
    : null;
  const promptEvalCount = isSafeNonNegativeInteger(payload.prompt_eval_count)
    ? payload.prompt_eval_count
    : null;
  const evalCount = isSafeNonNegativeInteger(payload.eval_count)
    ? payload.eval_count
    : null;

  return {
    model: PRIVATE_ALPHA_PRODUCTION_MODEL,
    outputText: message.content,
    doneReason,
    totalDurationNanoseconds,
    loadDurationNanoseconds,
    promptEvalCount,
    evalCount,
  };
}

function createOllamaClient(
  options: PrivateAlphaOllamaClientOptions
): PrivateAlphaOllamaClient {
  return {
    async getAvailability(): Promise<PrivateAlphaOllamaAvailability> {
      try {
        const payload = await requestOllama(options, {
          pathname: PRIVATE_ALPHA_OLLAMA_TAGS_PATH,
          init: {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          },
          timeoutMs: options.availabilityTimeoutMs,
          timeoutStatus: 503,
        });

        const installedModels = extractInstalledModels(payload);
        const modelAvailable = installedModels.includes(PRIVATE_ALPHA_PRODUCTION_MODEL);

        return {
          providerAvailable: true,
          modelAvailable,
          errorCode: modelAvailable ? null : "ollama_model_missing",
          safeErrorMessage: modelAvailable
            ? null
            : "The required local Ollama model is not installed.",
        };
      } catch (error) {
        if (error instanceof PrivateAlphaOllamaError) {
          const errorCode =
            error.code === "kill_switch_blocked" ||
            error.code === "ollama_empty_response"
              ? "ollama_unavailable"
              : error.code;
          const safeErrorMessage =
            error.code === "ollama_empty_response"
              ? "Local Ollama is unavailable on the fixed loopback endpoint."
              : error.safeMessage;

          return {
            providerAvailable: false,
            modelAvailable: false,
            errorCode,
            safeErrorMessage,
          };
        }

        return {
          providerAvailable: false,
          modelAvailable: false,
          errorCode: "ollama_unavailable",
          safeErrorMessage:
            "Local Ollama is unavailable on the fixed loopback endpoint.",
        };
      }
    },

    async generateApprovedText(
      input: PrivateAlphaOllamaGenerationInput
    ): Promise<PrivateAlphaOllamaGenerationResult> {
      if (input.model !== PRIVATE_ALPHA_PRODUCTION_MODEL) {
        throw createOllamaError(
          "ollama_malformed_response",
          "Local Ollama request validation failed.",
          503
        );
      }

      if (!input.approvedRequestText.trim()) {
        throw createOllamaError(
          "ollama_malformed_response",
          "Local Ollama request validation failed.",
          503
        );
      }

      if (input.approvedRequestText.length > PRIVATE_ALPHA_MAX_REQUEST_LENGTH) {
        throw createOllamaError(
          "ollama_malformed_response",
          "Local Ollama request validation failed.",
          503
        );
      }

      const payload = await requestOllama(options, {
        pathname: PRIVATE_ALPHA_OLLAMA_CHAT_PATH,
        init: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            model: PRIVATE_ALPHA_PRODUCTION_MODEL,
            messages: [
              {
                role: "user",
                content: input.approvedRequestText,
              },
            ],
            stream: false,
            think: PRIVATE_ALPHA_OLLAMA_THINK_LEVEL,
            options: {
              num_predict: input.maximumOutputTokens,
            },
          }),
        },
        timeoutMs: options.generationTimeoutMs,
        timeoutStatus: 504,
      });

      return parseGenerationResult(payload);
    },
  };
}

export function createPrivateAlphaOllamaClient(): PrivateAlphaOllamaClient {
  return createOllamaClient({
    fetchFn: fetch,
    availabilityTimeoutMs: PRIVATE_ALPHA_OLLAMA_AVAILABILITY_TIMEOUT_MS,
    generationTimeoutMs: PRIVATE_ALPHA_OLLAMA_GENERATION_TIMEOUT_MS,
  });
}

export function createPrivateAlphaOllamaClientForTesting(input: {
  fetchFn?: PrivateAlphaFetchLike;
  availabilityTimeoutMs?: number;
  generationTimeoutMs?: number;
} = {}): PrivateAlphaOllamaClient {
  return createOllamaClient({
    fetchFn: input.fetchFn ?? fetch,
    availabilityTimeoutMs:
      input.availabilityTimeoutMs ?? PRIVATE_ALPHA_OLLAMA_AVAILABILITY_TIMEOUT_MS,
    generationTimeoutMs:
      input.generationTimeoutMs ?? PRIVATE_ALPHA_OLLAMA_GENERATION_TIMEOUT_MS,
  });
}
