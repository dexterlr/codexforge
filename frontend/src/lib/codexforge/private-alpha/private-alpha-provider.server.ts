import "server-only";

import type {
  CodexForgeModelCostClass,
  CodexForgeModelDataBoundary,
  CodexForgeModelId,
  CodexForgeModelKey,
  CodexForgeProviderId,
  CodexForgeProviderLocality,
  CodexForgeQuotaState,
} from "../model-routing/model-routing-types";
import type {
  PrivateAlphaExecutionErrorCode,
  PrivateAlphaProviderErrorCode,
} from "./private-alpha-types";

export type PrivateAlphaProviderIdentity = Readonly<{
  providerId: CodexForgeProviderId;
  providerLabel: string;
  modelId: CodexForgeModelId;
  modelLabel: string;
  modelKey: CodexForgeModelKey;
  locality: CodexForgeProviderLocality;
  dataBoundary: CodexForgeModelDataBoundary;
  costClass: CodexForgeModelCostClass;
  approvedMaximumOutputTokens: number;
}>;

export type PrivateAlphaProviderAvailabilityErrorCode = Exclude<
  PrivateAlphaProviderErrorCode,
  "kill_switch_blocked" | "ollama_empty_response" | "groq_empty_response"
>;

export type PrivateAlphaProviderExecutionErrorCode = Exclude<
  PrivateAlphaProviderErrorCode,
  "kill_switch_blocked"
>;

type PrivateAlphaLocalProviderExecutionErrorCode = Exclude<
  PrivateAlphaExecutionErrorCode,
  "kill_switch_blocked"
>;

export type PrivateAlphaProviderAvailability = Readonly<{
  providerAvailable: boolean;
  modelAvailable: boolean;
  quotaState: CodexForgeQuotaState;
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
  identity: PrivateAlphaProviderIdentity;
  getAvailability: () => Promise<PrivateAlphaProviderAvailability>;
  generateApprovedText: (
    input: PrivateAlphaProviderGenerationInput
  ) => Promise<PrivateAlphaProviderGenerationResult>;
}>;

type PrivateAlphaProviderFailureStatus = 503 | 504;

export class PrivateAlphaProviderError<
  TCode extends
    PrivateAlphaProviderExecutionErrorCode = PrivateAlphaLocalProviderExecutionErrorCode,
> extends Error {
  readonly code: TCode;
  readonly safeMessage: string;
  readonly status: PrivateAlphaProviderFailureStatus;

  constructor(
    code: TCode,
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
