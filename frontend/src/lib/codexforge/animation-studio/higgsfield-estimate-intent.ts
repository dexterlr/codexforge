import type { Job, JsonObject, StudioId } from "./domain";
import { validateJsonObject } from "./validation";
import { hashJarvisChatCanonicalJson as digest } from "../jarvis-chat/jarvis-chat-crypto";
import { normalizeHiggsfieldEstimate, validateHiggsfieldRequest, type HiggsfieldPreparedRequest } from "./higgsfield-contract.server";
import { intentAssert, intentTime } from "./higgsfield-intent";

/** A quote is not actual spend or generation authority. Stored in an ESTIMATE job, never a second database. */
export interface EstimateResult {
  provider: "HIGGSFIELD"; projectId: StudioId<"project">; sequenceId: StudioId<"sequence">; shotId: StudioId<"shot">;
  shotRevision: number; model: HiggsfieldPreparedRequest["model"]; requestDigest: string; credits: string; usd: string;
  estimatedAt: string; correlationId: string | null; estimateIntentId: StudioId<"job">; attempt: 1; synthetic: boolean;
}
export interface EstimateFailure {
  code: "ESTIMATE_HTTP_REJECTED" | "ESTIMATE_BEFORE_SEND_FAILED" | "ESTIMATE_RESULT_UNKNOWN" | "ESTIMATE_TIMEOUT" | "ESTIMATE_RESPONSE_REJECTED";
  httpStatus: number | null; transmitted: boolean; terminal: true; retryable: false;
}
export type EstimateOutcome =
  | { phase: "SUCCEEDED"; result: EstimateResult; failure: null; correlationId: string | null }
  | { phase: "FAILED" | "RESULT_UNKNOWN"; result: null; failure: EstimateFailure; correlationId: string | null };
export interface EstimateIntent {
  schemaVersion: 1; operation: "ESTIMATE"; executionMode: "MOCK" | "LIVE_ESTIMATE"; estimateIntentId: StudioId<"job">;
  request: HiggsfieldPreparedRequest; endpoint: "/estimate/bytedance/seedance/v1/lite/text-to-video";
  operationDigest: string; scopeHash: string; preparedProjectRevision: number; attempt: 0 | 1; maxAttempts: 1;
  phase: "PREPARED" | "READY" | "EXECUTION_STARTED" | "SUCCEEDED" | "FAILED" | "RESULT_UNKNOWN";
  createdAt: string; startedAt: string | null; completedAt: string | null;
  authorization: { operation: "ESTIMATE"; executionMode: "MOCK" | "LIVE_ESTIMATE"; scopeHash: string; actor: string; authorizedAt: string; consumedAt: string | null } | null;
  correlationId: string | null; result: EstimateResult | null; failure: EstimateFailure | null;
}
const exact = (value: unknown, keys: string): Record<string, unknown> => {
  intentAssert(value !== null && typeof value === "object" && !Array.isArray(value) && Object.keys(value).sort().join() === keys.split(",").sort().join(), "Estimate fields differ.");
  return value as Record<string, unknown>;
};
export const ESTIMATE_ENDPOINT = "/estimate/bytedance/seedance/v1/lite/text-to-video" as const;
/** A redirect is the first definite provider response, never permission to follow it. */
export function isDefiniteEstimateHttpFailure(status: number): boolean {
  return Number.isInteger(status) && ([301, 302, 303, 307, 308].includes(status) || (status >= 400 && status <= 599));
}
export function estimateOperationDigest(request: HiggsfieldPreparedRequest): string {
  return digest({ operation: "ESTIMATE", method: "POST", endpoint: ESTIMATE_ENDPOINT, request: validateHiggsfieldRequest(request) });
}
export const LIVE_ESTIMATE_AUTHORIZATION_TTL_MS = 10 * 60 * 1000;
/** Exact server-owned descriptor; never accepted from an HTTP body. */
export function liveEstimateAuthorization(intent: EstimateIntent) {
  return { operation: "ESTIMATE" as const, executionMode: "LIVE_ESTIMATE" as const, estimateIntentId: intent.estimateIntentId,
    projectId: intent.request.projectId, sequenceId: intent.request.sequenceId, shotId: intent.request.shotId, shotRevision: intent.request.shotRevision,
    provider: intent.request.provider, model: intent.request.model, endpoint: intent.endpoint, requestDigest: intent.request.requestDigest,
    operationDigest: intent.operationDigest, createdAt: intent.createdAt, attempt: 1 as const, maxAttempts: 1 as const };
}
export type LiveEstimateAuthorization = ReturnType<typeof liveEstimateAuthorization>;
export function estimateAuthorizationScope(intent: EstimateIntent): string {
  if (intent.executionMode === "LIVE_ESTIMATE") return digest({ ...liveEstimateAuthorization(intent), scopeHash: intent.scopeHash });
  return digest({ operation: "ESTIMATE", executionMode: intent.executionMode, estimateIntentId: intent.estimateIntentId, operationDigest: intent.operationDigest, scopeHash: intent.scopeHash, maxAttempts: 1 });
}
export function estimateCheckpoint(intent: EstimateIntent): JsonObject { return validateJsonObject({ estimateExecution: intent }); }
export function isEstimateJob(job: Job): boolean { return job.type === "ESTIMATE" || Object.prototype.hasOwnProperty.call(job.checkpoint ?? {}, "estimateExecution"); }
export function safeEstimateCorrelation(value: unknown): string | null {
  if (value === null) return null;
  intentAssert(typeof value === "string" && /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/u.test(value), "Invalid estimate correlation."); return value;
}
/** Only the allowlisted correlation header crosses persistence; other headers and raw error bodies are discarded. */
export function estimateResponseCorrelation(headers: unknown): string | null {
  intentAssert(headers !== null && typeof headers === "object" && !Array.isArray(headers), "Invalid estimate headers.");
  const descriptors = Object.getOwnPropertyDescriptors(headers), keys = Object.keys(descriptors).filter(key => key.toLowerCase() === "x-correlation-id");
  intentAssert(keys.length <= 1, "Duplicate estimate correlation.");
  if (!keys.length) return null;
  intentAssert("value" in descriptors[keys[0]], "Estimate header accessor rejected.");
  return safeEstimateCorrelation(descriptors[keys[0]].value);
}
export function readEstimateIntent(job: Job): EstimateIntent {
  exact(job.checkpoint, "estimateExecution");
  const raw = validateJsonObject(job.checkpoint).estimateExecution;
  exact(raw, "schemaVersion,operation,executionMode,estimateIntentId,request,endpoint,operationDigest,scopeHash,preparedProjectRevision,attempt,maxAttempts,phase,createdAt,startedAt,completedAt,authorization,correlationId,result,failure");
  const value = raw as unknown as EstimateIntent, request = validateHiggsfieldRequest(value.request);
  intentAssert(value.schemaVersion === 1 && value.operation === "ESTIMATE" && ["MOCK", "LIVE_ESTIMATE"].includes(value.executionMode) && value.endpoint === ESTIMATE_ENDPOINT, "Estimate operation/provenance differs.");
  intentAssert(job.type === "ESTIMATE" && job.jobId === value.estimateIntentId && job.projectId === request.projectId && job.shotId === request.shotId && job.maxAttempts === 1 && (job.attempt === 0 || job.attempt === 1), "Estimate identity/attempt binding differs.");
  intentAssert(value.attempt === job.attempt && value.maxAttempts === job.maxAttempts, "Estimate attempt ledger differs.");
  intentAssert(value.operationDigest === estimateOperationDigest(request) && /^[a-f0-9]{64}$/u.test(value.scopeHash) && job.approvalSubjectHash === value.scopeHash, "Estimate request/scope digest differs.");
  intentAssert(Number.isSafeInteger(value.preparedProjectRevision) && value.preparedProjectRevision >= 1, "Estimate project revision missing.");
  intentAssert(job.inputs.length === 0 && job.outputs.length === 0 && job.dependencies.length === 0 && job.externalActions.length === 0 && job.requiredGates.length === 0 && job.adapterMetadata === null && job.actualCost.minorUnits === 0 && job.costEstimate.minorUnits === 0 && job.actualCost.currency === "USD" && job.costEstimate.currency === "USD", "Estimate must not carry generation effects, outputs or spend.");
  intentTime(value.createdAt); intentAssert(value.createdAt === job.createdAt && value.startedAt === job.startedAt && value.completedAt === job.finishedAt, "Estimate timestamps differ.");
  safeEstimateCorrelation(value.correlationId);
  const unstarted = ["PREPARED", "READY"].includes(value.phase), terminal = ["SUCCEEDED", "FAILED", "RESULT_UNKNOWN"].includes(value.phase);
  intentAssert(unstarted || terminal || value.phase === "EXECUTION_STARTED", "Unknown estimate phase.");
  intentAssert(unstarted ? job.attempt === 0 && job.state === "QUEUED" && job.dispatch === null : job.attempt === 1 && job.dispatch !== null, "Estimate attempt/lifecycle differs.");
  intentAssert(job.state === (unstarted ? "QUEUED" : value.phase === "EXECUTION_STARTED" ? "RUNNING" : value.phase === "SUCCEEDED" ? "SUCCEEDED" : "FAILED"), "Estimate canonical state differs.");
  if (value.phase === "PREPARED") intentAssert(value.authorization === null, "Prepared estimate cannot carry authorization.");
  else {
    exact(value.authorization, "operation,executionMode,scopeHash,actor,authorizedAt,consumedAt");
    const authority = value.authorization!;
    intentAssert(authority.operation === "ESTIMATE" && authority.executionMode === value.executionMode && authority.scopeHash === estimateAuthorizationScope(value) && typeof authority.actor === "string" && authority.actor.trim().length > 0 && authority.actor.length <= 160, "Estimate-only authority binding differs.");
    intentTime(authority.authorizedAt); intentAssert(authority.authorizedAt >= value.createdAt && (unstarted ? authority.consumedAt === null : authority.consumedAt === value.startedAt && authority.authorizedAt <= value.startedAt!), "Estimate authorization time differs.");
  }
  if (!unstarted) { intentTime(value.startedAt); intentAssert(value.startedAt >= value.createdAt && job.dispatch?.recordedAt === value.startedAt && /^[a-f0-9]{64}$/u.test(job.dispatch!.token), "Estimate start binding differs."); }
  if (terminal) { intentTime(value.completedAt); intentAssert(value.completedAt >= value.startedAt! && job.dispatch?.state === "COMPLETED", "Terminal estimate completion differs."); }
  else intentAssert(value.completedAt === null && value.result === null && value.failure === null && value.correlationId === null && job.error === null && (unstarted || job.dispatch?.state === "INTENT_RECORDED"), "Unfinished estimate cannot contain a result.");
  if (value.phase === "SUCCEEDED") {
    exact(value.result, "provider,projectId,sequenceId,shotId,shotRevision,model,requestDigest,credits,usd,estimatedAt,correlationId,estimateIntentId,attempt,synthetic");
    const result = value.result!;
    normalizeHiggsfieldEstimate({ credits: result.credits, usd: result.usd }, result.requestDigest);
    intentAssert(result.provider === request.provider && result.projectId === request.projectId && result.sequenceId === request.sequenceId && result.shotId === request.shotId && result.shotRevision === request.shotRevision && result.model === request.model && result.requestDigest === request.requestDigest && result.estimateIntentId === value.estimateIntentId && result.attempt === 1 && result.synthetic === (value.executionMode === "MOCK") && result.estimatedAt === value.completedAt && result.correlationId === value.correlationId && value.failure === null && job.error === null, "Estimate result binding differs.");
  } else if (terminal) {
    exact(value.failure, "code,httpStatus,transmitted,terminal,retryable"); const failure = value.failure!;
    intentAssert(value.result === null && failure.terminal === true && failure.retryable === false && typeof failure.transmitted === "boolean" && (failure.httpStatus === null || isDefiniteEstimateHttpFailure(failure.httpStatus)), "Estimate failure fields differ.");
    intentAssert(["ESTIMATE_HTTP_REJECTED", "ESTIMATE_BEFORE_SEND_FAILED", "ESTIMATE_RESULT_UNKNOWN", "ESTIMATE_TIMEOUT", "ESTIMATE_RESPONSE_REJECTED"].includes(failure.code), "Unknown estimate failure.");
    intentAssert(value.phase === "FAILED" ? (failure.code === "ESTIMATE_HTTP_REJECTED" && failure.httpStatus !== null && failure.transmitted) || (failure.code === "ESTIMATE_BEFORE_SEND_FAILED" && failure.httpStatus === null && !failure.transmitted) : failure.transmitted && failure.httpStatus === null && ["ESTIMATE_RESULT_UNKNOWN", "ESTIMATE_TIMEOUT", "ESTIMATE_RESPONSE_REJECTED"].includes(failure.code), "Estimate failure semantics differ.");
    intentAssert(job.error?.code === failure.code && job.error.message === failure.code && job.error.retryable === false, "Unsafe estimate error payload.");
  }
  return value;
}
