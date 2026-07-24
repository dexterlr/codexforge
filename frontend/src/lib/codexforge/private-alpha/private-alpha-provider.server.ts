import "server-only";

import type { PrivateAlphaExecutionErrorCode } from "./private-alpha-types";

export type PrivateAlphaProviderAvailabilityErrorCode = Exclude<
  PrivateAlphaExecutionErrorCode,
  "kill_switch_blocked" | "ollama_empty_response"
>;

export type PrivateAlphaProviderExecutionErrorCode = Exclude<
  PrivateAlphaExecutionErrorCode,
  "kill_switch_blocked"
>;

export type PrivateAlphaProviderAvailability = Readonly<{
  providerAvailable: boolean;
  modelAvailable: boolean;
  errorCode: PrivateAlphaProviderAvailabilityErrorCode | null;
  safeErrorMessage: string | null;
}>;

export type PrivateAlphaProviderGenerationInput = Readonly<{
  approvedRequestText: string;
  model: string;
  maximumOutputTokens: number;
}>;

export type PrivateAlphaProviderGenerationResult = Readonly<{
  outputText: string;
  doneReason: string | null;
  totalDurationNanoseconds: number | null;
  loadDurationNanoseconds: number | null;
  promptEvalCount: number | null;
  evalCount: number | null;
}>;

export type PrivateAlphaProviderAdapter = Readonly<{
  getAvailability: () => Promise<PrivateAlphaProviderAvailability>;
  generateApprovedText: (
    input: PrivateAlphaProviderGenerationInput
  ) => Promise<PrivateAlphaProviderGenerationResult>;
}>;

type PrivateAlphaProviderFailureStatus = 503 | 504;

export class PrivateAlphaProviderError extends Error {
  readonly code: PrivateAlphaProviderExecutionErrorCode;
  readonly safeMessage: string;
  readonly status: PrivateAlphaProviderFailureStatus;

  constructor(
    code: PrivateAlphaProviderExecutionErrorCode,
    safeMessage: string,
    status: PrivateAlphaProviderFailureStatus
  ) {
    super(safeMessage);
    this.name = "PrivateAlphaProviderError";
    this.code = code;
    this.safeMessage = safeMessage;
    this.status = status;
  }
}
