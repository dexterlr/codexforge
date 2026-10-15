import type { EstimateExecutionReport } from "./higgsfield-estimate-execution";
/** Explicit non-secret projection for the local Generate workspace. No adapter or transport imports. */
export interface HiggsfieldProviderOperationView {
  jobId: string;
  state: string;
  requestDigest: string;
  requestId: string | null;
  correlationId: string | null;
  estimate: { credits: string; usd: string } | null;
  approval: string;
  authorization: string;
  attempt: number;
  reconciliationRequired: boolean;
  outputsCount: number;
}

/** Read-only projection of canonical estimate state; never an execution capability. */
export interface HiggsfieldEstimateView {
  shotId: string;
  projectRevision: number;
  shotRevision: number;
  provider: "HIGGSFIELD";
  model: string | null;
  endpoint: string | null;
  preparedRequest: unknown | null;
  planningEligibility: "PLANNING_ELIGIBLE" | "BLOCKED";
  preparationBlockers: string[];
  preparationAllowed: boolean;
  currentRequestDigest: string | null;
  estimateIntentId: string | null;
  state: "NOT_REQUESTED" | "PREPARED" | "READY" | "EXECUTION_STARTED" | "SUCCEEDED" | "FAILED" | "RESULT_UNKNOWN";
  stale: boolean;
  requestDigest: string | null;
  attempt: number;
  maxAttempts: 1;
  createdAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  correlationId: string | null;
  result: { credits: string; usd: string; estimatedAt: string; correlationId: string | null; synthetic: boolean } | null;
  failure: { code: string; httpStatus: number | null; transmitted: boolean; terminal: boolean; retryable: boolean } | null;
  executionMode: "MOCK" | "LIVE_ESTIMATE";
  liveAuthorization: "NOT_GRANTED" | "GRANTED" | "CONSUMED";
  generationAttempts: number;
  generationAuthorization: "NOT_GRANTED";
  liveExecutionAllowed: false;
  executionOutcome: EstimateExecutionReport;
}

export interface HiggsfieldSupportedContractView {
  surface: "OFFICIAL_API_FOUND";
  sdk: "NOT_USED_EXPLICIT_REST";
  model: string | null;
  endpoint: string | null;
  mode: string | null;
  requestDigest: string | null;
  request: unknown | null;
  compatibility: readonly string[];
  credentials: "NOT_INSPECTED";
  estimate: "NOT_REQUESTED";
  providerOperation: HiggsfieldProviderOperationView | null;
  estimateOperation?: HiggsfieldEstimateView;
}
