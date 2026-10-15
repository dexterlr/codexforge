import "server-only";
import { acquireLiveEstimateDispatch } from "./higgsfield-estimate-authority.server";
import type { Job, StudioId } from "./domain";
import { hashJarvisChatCanonicalJson as digest } from "../jarvis-chat/jarvis-chat-crypto";
import { normalizeHiggsfieldEstimate } from "./higgsfield-contract.server";
import { estimateResponseCorrelation, isDefiniteEstimateHttpFailure, readEstimateIntent, type EstimateFailure, type EstimateOutcome } from "./higgsfield-estimate-intent";
import { HiggsfieldTransportError, type HiggsfieldTransport, type HiggsfieldTransportResponse } from "./higgsfield-transport.server";
import { StudioStoreError, type StudioRepository } from "./store.server";
import { EstimateExecutionTracker } from "./higgsfield-estimate-execution.server";
import type { EstimateExecutionReport } from "./higgsfield-estimate-execution";

export interface HiggsfieldEstimateDependencies {
  repository: StudioRepository; transport: HiggsfieldTransport; actor: string; now(): string; timeoutMs?: number; executionTracker?: EstimateExecutionTracker;
}
export class EstimatePublicationError extends Error {
  constructor(readonly primaryCode: string, readonly executionOutcome: EstimateExecutionReport) { super(`${primaryCode}; ESTIMATE_PUBLICATION_FAILED; RECONCILIATION_REQUIRED`); this.name = "EstimatePublicationError"; }
}
class EstimateDeadlineError extends Error { constructor() { super("ESTIMATE_TIMEOUT"); } }
function currentJob(deps: HiggsfieldEstimateDependencies, projectId: StudioId<"project">, jobId: StudioId<"job">): Job {
  const job = deps.repository.load(projectId).jobs.find(item => item.jobId === jobId);
  if (!job) throw new StudioStoreError("MISSING_ESTIMATE_INTENT", "Saved estimate intent is missing.");
  readEstimateIntent(job); return job;
}
function failed(phase: "FAILED" | "RESULT_UNKNOWN", code: EstimateFailure["code"], httpStatus: number | null, transmitted: boolean, correlationId: string | null): EstimateOutcome {
  return { phase, result: null, correlationId, failure: { code, httpStatus, transmitted, terminal: true, retryable: false } };
}
/** Explicit entry points share the same persistent lifecycle and never authorize on execution. */
export async function executeHiggsfieldEstimateMock(deps: HiggsfieldEstimateDependencies, projectId: StudioId<"project">, jobId: StudioId<"job">, key: string): Promise<Job> {
  if (deps.transport.kind !== "MOCK") throw new Error("LIVE_HIGGSFIELD_ESTIMATE_DISABLED");
  return executeEstimate(deps, projectId, jobId, key, "MOCK");
}
export async function executeHiggsfieldEstimateLive(deps: HiggsfieldEstimateDependencies, projectId: StudioId<"project">, jobId: StudioId<"job">, key: string): Promise<Job> {
  if (deps.transport.kind !== "LIVE_ESTIMATE") throw new StudioStoreError("ESTIMATE_EXECUTION_NOT_AUTHORIZED", "An estimate-only transport is required.");
  return executeEstimate(deps, projectId, jobId, key, "LIVE_ESTIMATE");
}
async function executeEstimate(deps: HiggsfieldEstimateDependencies, projectId: StudioId<"project">, jobId: StudioId<"job">, key: string, mode: "MOCK" | "LIVE_ESTIMATE"): Promise<Job> {
  const tracker = deps.executionTracker ?? new EstimateExecutionTracker();
  const timeoutMs = deps.timeoutMs ?? 30000;
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 120000) throw new Error("ESTIMATE_DEADLINE_REJECTED");
  const before = currentJob(deps, projectId, jobId);
  if (readEstimateIntent(before).executionMode !== mode) throw new Error("ESTIMATE_EXECUTION_PROVENANCE_MISMATCH");
  const live = mode === "LIVE_ESTIMATE" ? acquireLiveEstimateDispatch(deps.repository, projectId, jobId, key, deps.actor, deps.now) : null;
  const acquisition = live?.acquisition ?? deps.repository.acquireEstimateExecution(projectId, jobId, key, deps.actor, deps.now());
  if (!acquisition.acquired || !acquisition.token) {
    tracker.replay(acquisition.job, acquisition.reason === "ESTIMATE_CLAIM_CONSUMED_RECONCILIATION_REQUIRED");
    return acquisition.job;
  }
  const intent = readEstimateIntent(acquisition.job), controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined, response: HiggsfieldTransportResponse | null = null, outcome: EstimateOutcome;
  let correlationId: string | null = null;
  try {
    try {
      response = await Promise.race([
        Promise.resolve().then(() => deps.transport.estimate(intent.request, { signal: controller.signal, authority: live?.authority, onTransportEntered: () => tracker.transportEntered() })),
        new Promise<never>((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new EstimateDeadlineError()); }, timeoutMs); }),
      ]);
    } finally { if (timer !== undefined) clearTimeout(timer); }
    tracker.transportEntered();
    try { correlationId = estimateResponseCorrelation(response.headers); } catch { /* Invalid correlation is never persisted or echoed. */ }
    if (isDefiniteEstimateHttpFailure(response.status)) {
      // An actual HTTP response is a known terminal failure, including 429 and 5xx. Never retry POST.
      outcome = failed("FAILED", "ESTIMATE_HTTP_REJECTED", response.status, true, correlationId);
    } else if (response.status !== 200) {
      outcome = failed("RESULT_UNKNOWN", "ESTIMATE_RESPONSE_REJECTED", null, true, correlationId);
    } else {
      // Malformed metadata/body cannot be represented as a successful estimate.
      correlationId = estimateResponseCorrelation(response.headers);
      const quote = normalizeHiggsfieldEstimate(response.body, intent.request.requestDigest);
      outcome = { phase: "SUCCEEDED", failure: null, correlationId, result: {
        ...quote, provider: intent.request.provider, projectId, sequenceId: intent.request.sequenceId, shotId: intent.request.shotId,
        shotRevision: intent.request.shotRevision, model: intent.request.model, estimatedAt: deps.now(), correlationId,
        estimateIntentId: jobId, attempt: 1, synthetic: mode === "MOCK",
      } };
    }
  } catch (error) {
    if (error instanceof HiggsfieldTransportError && error.httpStatus !== null && isDefiniteEstimateHttpFailure(error.httpStatus)) outcome = failed("FAILED", "ESTIMATE_HTTP_REJECTED", error.httpStatus, true, correlationId);
    else if (error instanceof HiggsfieldTransportError && error.httpStatus === null && error.transmitted === false && !tracker.transportWasEntered) outcome = failed("FAILED", "ESTIMATE_BEFORE_SEND_FAILED", null, false, null);
    else outcome = failed("RESULT_UNKNOWN", error instanceof EstimateDeadlineError ? "ESTIMATE_TIMEOUT" : response ? "ESTIMATE_RESPONSE_REJECTED" : "ESTIMATE_RESULT_UNKNOWN", null, true, correlationId);
  }
  tracker.observed(outcome, response && Number.isInteger(response.status) && response.status >= 100 && response.status <= 599 ? response.status : outcome.failure?.httpStatus ?? null);
  try {
    const completedAt = outcome.phase === "SUCCEEDED" ? outcome.result.estimatedAt : deps.now();
    const outcomeKey = `estimate-${digest({ key, outcome: "terminal" })}`;
    deps.repository.recordEstimateOutcome(projectId, jobId, acquisition.token, outcome, outcomeKey, deps.actor, completedAt);
    tracker.publicationCompleted();
  } catch {
    // Publication can fail before or after the atomic commit. Neither case permits another request.
    try { const current = currentJob(deps, projectId, jobId); if (["SUCCEEDED", "FAILED", "RESULT_UNKNOWN"].includes(readEstimateIntent(current).phase)) { tracker.persisted(current); return current; } } catch { /* Preserve sanitized primary result instead of raw filesystem/transport data. */ }
    tracker.localFailure();
    throw new EstimatePublicationError(outcome.failure?.code ?? "ESTIMATE_SUCCESS_OBSERVED", tracker.snapshot());
  }
  return currentJob(deps, projectId, jobId);
}
