import type { AssetRef, CostPolicy, Generation, Job, JsonObject, Money, StudioId } from "./domain";
import { validateCostPolicy, validateGeneration, validateJsonObject, validateMoney } from "./validation";
import { hashJarvisChatCanonicalJson as digest } from "../jarvis-chat/jarvis-chat-crypto";
import { validateHiggsfieldRequest, validateHiggsfieldStatus, type HiggsfieldPreparedRequest, type HiggsfieldStatus } from "./higgsfield-contract.server";

/** Persisted inside the canonical Job, never a second job database or live authority. */
export interface HiggsfieldIntent {
  schemaVersion: 1; kind: "HIGGSFIELD_SINGLE_TEST"; executionMode: "MOCK";
  jobId: StudioId<"job">; request: HiggsfieldPreparedRequest; promptId: StudioId<"prompt">; modelId: StudioId<"model">;
  references: (AssetRef & { contentHash: string })[];
  estimate: { requestDigest: string; credits: string; usd: string; estimatedAt: string; expiresAt: string };
  estimateId: string;
  maxCostUsd: string; costPolicy: CostPolicy; scopeHash: string; createdAt: string; updatedAt: string;
  phase: "PREPARED" | "APPROVED" | "AUTHORIZED" | "SUBMISSION_STARTED" | "SUBMISSION_STATE_UNKNOWN" | "ACCEPTED" | "COMPLETED" | "FAILED" | "NSFW" | "CANCELED" | "INGESTED";
  approval: { approvalId: string; subjectHash: string; actor: string; approvedAt: string } | null;
  authorization: { authorizationId: string; approvalId: string; subjectHash: string; actor: string; authorizedAt: string; consumedAt: string | null } | null;
  submissionToken: string | null; submissionStartedAt: string | null;
  providerStatus: HiggsfieldStatus | null;
  observedRequestId: string | null;
  failure: { code: string; message: string; at: string } | null;
  generation: Generation | null;
  actualCostState: "MOCK_NO_SPEND";
}
export interface PrepareProviderJobInput {
  executionMode: "MOCK"; request: HiggsfieldPreparedRequest; promptId: StudioId<"prompt">; modelId: StudioId<"model">;
  references: HiggsfieldIntent["references"]; estimate: HiggsfieldIntent["estimate"]; maxCostUsd: string; costPolicy: CostPolicy;
}
export function intentAssert(value: unknown, message: string): asserts value { if (!value) throw new Error(`INVALID_PROVIDER_INTENT: ${message}`); }
function exact(value: unknown, keys: string): Record<string, unknown> {
  intentAssert(value && typeof value === "object" && !Array.isArray(value), "Expected object.");
  intentAssert(Object.keys(value).sort().join() === keys.split(",").sort().join(), "Unexpected or missing fields.");
  return value as Record<string, unknown>;
}
export function intentTime(value: unknown): asserts value is string {
  intentAssert(typeof value === "string" && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value, "Exact UTC timestamp required.");
}
function hash(value: unknown): void { intentAssert(typeof value === "string" && /^[a-f0-9]{64}$/u.test(value), "SHA-256 binding required."); }
function id(value: unknown, kind: string): void { intentAssert(typeof value === "string" && new RegExp(`^${kind}_[a-z0-9][a-z0-9_]{0,127}$`, "u").test(value), "Canonical identity required."); }
function actor(value: unknown): void { intentAssert(typeof value === "string" && value.trim().length > 0 && value.length <= 160, "Explicit bounded actor required."); }
/** Exact decimal arithmetic; unknown, exponent notation, signs and excess precision fail closed. */
export function decimalUnits(value: unknown): bigint {
  intentAssert(typeof value === "string" && /^(?:0|[1-9]\d{0,8})(?:\.\d{1,9})?$/u.test(value), "Exact non-negative bounded decimal required.");
  const [whole, fraction = ""] = value.split("."); return BigInt(whole) * BigInt(1_000_000_000) + BigInt(fraction.padEnd(9, "0"));
}
export function estimateMoney(value: string): Money {
  const cents = (decimalUnits(value) + BigInt(9_999_999)) / BigInt(10_000_000);
  intentAssert(cents <= BigInt(Number.MAX_SAFE_INTEGER), "Estimate overflow.");
  return validateMoney({ currency: "USD", minorUnits: Number(cents) });
}
export function providerAuthorizationScope(intent: HiggsfieldIntent): string {
  return digest({ executionMode: intent.executionMode, jobId: intent.jobId, request: intent.request, promptId: intent.promptId, modelId: intent.modelId, references: intent.references, estimate: intent.estimate, estimateId: intent.estimateId, maxCostUsd: intent.maxCostUsd, costPolicy: intent.costPolicy, scopeHash: intent.scopeHash, maxAttempts: 1 });
}
export function providerCheckpoint(intent: HiggsfieldIntent): JsonObject { return validateJsonObject({ providerExecution: intent }); }
export function isManagedProviderJob(job: Job): boolean { return Object.prototype.hasOwnProperty.call(job.checkpoint, "providerExecution"); }
export function readProviderIntent(job: Job): HiggsfieldIntent {
  exact(job.checkpoint, "providerExecution");
  const raw = validateJsonObject(job.checkpoint).providerExecution;
  exact(raw, "schemaVersion,kind,executionMode,jobId,request,promptId,modelId,references,estimate,estimateId,maxCostUsd,costPolicy,scopeHash,createdAt,updatedAt,phase,approval,authorization,submissionToken,submissionStartedAt,providerStatus,observedRequestId,failure,generation,actualCostState");
  const intent = raw as unknown as HiggsfieldIntent;
  intentAssert(intent.schemaVersion === 1 && intent.kind === "HIGGSFIELD_SINGLE_TEST" && intent.executionMode === "MOCK" && intent.actualCostState === "MOCK_NO_SPEND", "Unsupported or live authority.");
  const request = validateHiggsfieldRequest(intent.request);
  id(intent.jobId, "job"); id(intent.promptId, "prompt"); id(intent.modelId, "model"); hash(intent.scopeHash);
  intentAssert(intent.jobId === job.jobId && request.projectId === job.projectId && request.shotId === job.shotId && job.type === "GENERATION" && job.maxAttempts === 1, "Job scope mismatch.");
  intentAssert(job.requiredGates.join() === "GATE_03" && job.externalActions.join() === "EXTERNAL_GENERATION,PAID_GENERATION", "Mandatory approval/effect classification missing.");
  intentAssert(job.approvalSubjectHash === intent.scopeHash && job.actualCost.minorUnits === 0 && job.actualCost.currency === "USD", "Scope or mock-spend mismatch.");
  intentAssert(Array.isArray(intent.references) && intent.references.length <= 1000, "Bounded references required.");
  const seen = new Set<string>();
  for (const reference of intent.references) {
    exact(reference, "assetId,version,contentHash"); id(reference.assetId, "asset"); hash(reference.contentHash);
    intentAssert(Number.isSafeInteger(reference.version) && reference.version > 0 && !seen.has(`${reference.assetId}@${reference.version}`), "Duplicate or invalid reference."); seen.add(`${reference.assetId}@${reference.version}`);
  }
  intentAssert(digest(job.inputs) === digest(intent.references.map(({ assetId, version }) => ({ assetId, version }))), "Input references differ.");
  exact(intent.estimate, "requestDigest,credits,usd,estimatedAt,expiresAt");
  hash(intent.estimate.requestDigest); intentAssert(intent.estimate.requestDigest === request.requestDigest, "Estimate binds another request.");
  intentAssert(intent.estimateId === `estimate_${digest({ executionMode: "MOCK", estimate: intent.estimate }).slice(0, 24)}`, "Estimate identity differs.");
  decimalUnits(intent.estimate.credits); const amount = decimalUnits(intent.estimate.usd), ceiling = decimalUnits(intent.maxCostUsd);
  intentAssert(amount <= ceiling && ceiling > BigInt(0), "Estimate exceeds explicit ceiling.");
  intentAssert(digest(job.costEstimate) === digest(estimateMoney(intent.estimate.usd)), "Estimate cents differ.");
  validateCostPolicy(intent.costPolicy);
  intentAssert(intent.costPolicy.MAX_SHOT_GENERATION_COST.currency === "USD" && intent.costPolicy.MAX_PROJECT_GENERATION_COST.currency === "USD" && intent.costPolicy.MAX_ATTEMPTS_PER_SHOT === 1, "Test budget currency/attempt limit differs.");
  for (const time of [intent.createdAt, intent.updatedAt, intent.estimate.estimatedAt, intent.estimate.expiresAt]) intentTime(time);
  intentAssert(intent.createdAt === job.createdAt && intent.createdAt >= intent.estimate.estimatedAt && intent.createdAt < intent.estimate.expiresAt && intent.updatedAt >= intent.createdAt, "Intent/estimate time ordering differs.");
  const phases = ["PREPARED", "APPROVED", "AUTHORIZED", "SUBMISSION_STARTED", "SUBMISSION_STATE_UNKNOWN", "ACCEPTED", "COMPLETED", "FAILED", "NSFW", "CANCELED", "INGESTED"];
  intentAssert(phases.includes(intent.phase), "Unknown lifecycle phase.");
  const scope = providerAuthorizationScope(intent);
  if (intent.approval) { exact(intent.approval, "approvalId,subjectHash,actor,approvedAt"); actor(intent.approval.actor); intentTime(intent.approval.approvedAt); intentAssert(intent.approval.approvalId === `approval_${digest({ scope, actor: intent.approval.actor, now: intent.approval.approvedAt }).slice(0, 24)}` && intent.approval.subjectHash === scope && intent.approval.approvedAt >= intent.createdAt && intent.approval.approvedAt <= intent.updatedAt, "Approval binding differs."); }
  if (intent.authorization) { exact(intent.authorization, "authorizationId,approvalId,subjectHash,actor,authorizedAt,consumedAt"); actor(intent.authorization.actor); intentTime(intent.authorization.authorizedAt); intentAssert(intent.authorization.authorizationId === `authorization_${digest({ scope, actor: intent.authorization.actor, now: intent.authorization.authorizedAt }).slice(0, 24)}` && intent.authorization.approvalId === intent.approval?.approvalId && intent.authorization.subjectHash === scope && intent.approval && intent.authorization.authorizedAt >= intent.approval.approvedAt && intent.authorization.authorizedAt <= intent.updatedAt, "Authorization binding differs."); if (intent.authorization.consumedAt !== null) { intentTime(intent.authorization.consumedAt); intentAssert(intent.authorization.consumedAt >= intent.authorization.authorizedAt && intent.authorization.consumedAt === intent.submissionStartedAt, "Consumption time differs."); } }
  const unstarted = ["PREPARED", "APPROVED", "AUTHORIZED"].includes(intent.phase);
  intentAssert((intent.phase !== "PREPARED") === (intent.approval !== null), "Approval lifecycle differs.");
  intentAssert(!["PREPARED", "APPROVED"].includes(intent.phase) === (intent.authorization !== null), "Authorization lifecycle differs.");
  intentAssert((job.attempt === 0) === unstarted && (job.dispatch === null) === unstarted && (intent.submissionToken === null) === unstarted && (intent.submissionStartedAt === null) === unstarted, "Submission lifecycle differs.");
  if (!unstarted) { hash(intent.submissionToken); intentTime(intent.submissionStartedAt); intentAssert(intent.authorization?.consumedAt === intent.submissionStartedAt && job.dispatch?.token === intent.submissionToken && job.startedAt === intent.submissionStartedAt && intent.submissionStartedAt <= intent.updatedAt, "Dispatch must consume exact authorization before POST."); }
  else intentAssert(intent.authorization?.consumedAt == null && job.state === "QUEUED", "Unstarted authorization already consumed.");
  if (intent.providerStatus) validateHiggsfieldStatus(intent.providerStatus);
  if (intent.observedRequestId !== null) intentAssert(typeof intent.observedRequestId === "string" && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/u.test(intent.observedRequestId) && !unstarted, "Observed provider identity must be a bounded UUID from the consumed response.");
  if (intent.providerStatus) intentAssert(intent.observedRequestId === intent.providerStatus.requestId, "Observed and validated provider identities differ.");
  if (["ACCEPTED", "COMPLETED", "NSFW", "CANCELED", "INGESTED"].includes(intent.phase)) intentAssert(intent.providerStatus !== null, "Provider identity missing.");
  if (intent.failure) { exact(intent.failure, "code,message,at"); intentTime(intent.failure.at); intentAssert(typeof intent.failure.code === "string" && intent.failure.code.length > 0 && intent.failure.code.length <= 128 && typeof intent.failure.message === "string" && intent.failure.message.length <= 4096 && intent.failure.at <= intent.updatedAt, "Malformed failure."); }
  if (intent.generation) { validateGeneration(intent.generation); intentAssert(intent.phase === "INGESTED" && intent.generation.jobId === job.jobId && intent.generation.shotId === job.shotId && intent.generation.promptId === intent.promptId && intent.generation.modelId === intent.modelId && digest(intent.generation.outputs) === digest(job.outputs), "Canonical generation binding differs."); }
  intentAssert((intent.phase === "INGESTED") === (intent.generation !== null) && (intent.phase === "INGESTED") === (job.state === "SUCCEEDED"), "Ingestion state differs.");
  if (unstarted) intentAssert(job.adapterMetadata === null && intent.providerStatus === null && job.outputs.length === 0 && job.error === null && intent.failure === null, "Unstarted jobs cannot claim provider outcomes.");
  if (["SUBMISSION_STARTED", "SUBMISSION_STATE_UNKNOWN"].includes(intent.phase)) intentAssert(job.state === "RUNNING" && job.dispatch?.state === "INTENT_RECORDED" && job.adapterMetadata === null && intent.providerStatus === null, "Unacknowledged submission state differs.");
  if (intent.phase === "SUBMISSION_STATE_UNKNOWN") intentAssert(intent.failure?.code === "SUBMISSION_STATE_UNKNOWN" && job.error?.code === "SUBMISSION_STATE_UNKNOWN" && job.error.retryable === false, "Ambiguous POST must remain a nonretryable reconciliation requirement.");
  if (["ACCEPTED", "COMPLETED"].includes(intent.phase)) intentAssert(job.state === "WAITING_EXTERNAL" && job.dispatch?.state === "ACKNOWLEDGED", "Provider wait state differs.");
  if (intent.phase === "ACCEPTED") intentAssert(["queued", "in_progress"].includes(intent.providerStatus!.status), "Active provider state differs.");
  if (["COMPLETED", "INGESTED"].includes(intent.phase)) intentAssert(intent.providerStatus?.status === "completed", "Completed provider evidence missing.");
  if (["FAILED", "NSFW", "CANCELED"].includes(intent.phase)) intentAssert(job.state === (intent.phase === "CANCELED" ? "CANCELLED" : "FAILED") && job.dispatch?.state === "COMPLETED", "Terminal failure/cancellation state differs.");
  if (intent.phase === "NSFW") intentAssert(intent.providerStatus?.status === "nsfw", "NSFW requires matching provider evidence.");
  if (intent.phase === "CANCELED") intentAssert(intent.providerStatus?.status === "canceled" && intent.failure === null && job.error === null, "Cancellation requires matching nonfailure provider evidence.");
  if (intent.phase === "FAILED") intentAssert(intent.providerStatus ? intent.providerStatus.status === "failed" : intent.failure?.code === "EXPLICIT_SUBMISSION_REJECTED", "Failure requires matching provider failure or explicit POST rejection.");
  if (["SUBMISSION_STATE_UNKNOWN", "FAILED", "NSFW"].includes(intent.phase)) intentAssert(intent.failure !== null && job.error !== null && job.error.retryable === false && job.error.code === intent.failure.code && job.error.message === intent.failure.message && intent.failure.at >= intent.submissionStartedAt!, "Failure evidence must be exact, ordered and nonretryable.");
  else intentAssert(intent.failure === null && job.error === null, "Nonfailure phase cannot retain failure evidence.");
  if (intent.providerStatus) intentAssert(job.adapterMetadata?.providerJobId === intent.providerStatus.requestId && job.adapterMetadata.externalGenerationId === intent.providerStatus.requestId && job.adapterMetadata.model === intent.request.model && job.adapterMetadata.provider === "HIGGSFIELD" && job.adapterMetadata.settings.executionMode === "MOCK" && job.adapterMetadata.settings.requestDigest === intent.request.requestDigest && job.adapterMetadata.settings.correlationId === intent.providerStatus.correlationId && job.adapterMetadata.settings.temporaryVideoUrl === intent.providerStatus.videoUrl, "Provider provenance identity differs.");
  if (intent.phase !== "INGESTED") intentAssert(job.outputs.length === 0, "Output requires completed canonical ingestion.");
  return intent;
}
