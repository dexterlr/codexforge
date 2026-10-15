import "server-only";
import { hashJarvisChatCanonicalJson as digest } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import type { AdapterRequest, AdapterResult, CapabilityObservation, GenerationProvider, ShotManifest, StudioId } from "./domain";
import { DEFAULT_EXTERNAL_EXECUTION_POLICY, evaluateApprovalGates, routeShot } from "./policies";
import { StudioStoreError, type StudioRepository, type StudioSnapshot } from "./store.server";
import { validateAdapterRequest, validateJsonObject, validateShotManifest } from "./validation";
import { resolveStudioPath } from "./workspace";
import { buildHiggsfieldRequest } from "./higgsfield-contract.server";
import { isManagedProviderJob, readProviderIntent } from "./higgsfield-intent";
import type { HiggsfieldEstimateView, HiggsfieldSupportedContractView } from "./higgsfield-view";
import { submitHiggsfieldMock, type HiggsfieldManagedDependencies } from "./higgsfield-provider.server";
import { ESTIMATE_ENDPOINT, isEstimateJob, readEstimateIntent } from "./higgsfield-estimate-intent";
import { savedEstimateExecutionReport } from "./higgsfield-estimate-execution.server";

/** Local inspection only. No credential, environment, endpoint or SDK access occurs here. */
export function higgsfieldLocalReadiness(configuration: unknown = {}) {
  let valid = false;
  try { valid = Object.keys(validateJsonObject(configuration)).length === 0; } catch { /* Never echo configuration values. */ }
  return {
    configuration: valid ? "NOT_CONFIGURED" as const : "CONFIGURATION_INVALID" as const,
    integrationSurface: "OFFICIAL_API_FOUND" as const,
    remoteAuthentication: "NOT_VERIFIED" as const,
    capability: "UNKNOWN" as const,
    execution: "EXECUTION_DISABLED" as const,
    credentialInspection: "NOT_PERFORMED" as const,
  };
}

export interface GenerationPreparation {
  schemaVersion: 1;
  projectId: StudioId<"project">; sequenceId: StudioId<"sequence">; shotId: StudioId<"shot">;
  projectRevision: number; shotRevision: number;
  provider: "HIGGSFIELD"; mode: null; model: null;
  prompt: string; negativePrompt: null;
  references: { assetId: StudioId<"asset">; version: number; contentHash: string }[];
  settings: Record<string, never>;
  plannedOutput: { durationSeconds: number; width: number; height: number; fps: number };
  attempt: 1; maxAttempts: 1; automaticRetries: 0;
}

/** Implements the existing canonical interface, but cannot make a live request under any input. */
export class HiggsfieldGenerationProvider implements GenerationProvider {
  constructor(private readonly managed?: HiggsfieldManagedDependencies) {}
  readonly kind = "GENERATION" as const;
  readonly adapterId = "higgsfield-local-foundation-v1";
  async discover(): Promise<CapabilityObservation[]> { return []; }
  configuration(configuration: unknown = {}) { return higgsfieldLocalReadiness(configuration); }
  async execute(request: AdapterRequest): Promise<AdapterResult> {
    try { validateAdapterRequest(request); }
    catch { return { status: "BLOCKED", outputs: [], adapterMetadata: null, reasons: ["INVALID_ADAPTER_REQUEST", "LIVE_DISPATCH_NOT_AUTHORIZED"] }; }
    if (this.managed?.transport.kind === "MOCK") return submitHiggsfieldMock(this.managed, request.job.projectId, request.job.jobId, request.idempotencyToken);
    // Even a caller-supplied permissive policy, intent or approval cannot activate this adapter.
    return { status: "BLOCKED", outputs: [], adapterMetadata: null, reasons: ["REMOTE_CAPABILITY_NOT_VERIFIED", "LIVE_DISPATCH_NOT_AUTHORIZED"] };
  }
  /** Pure, documented model mapping; does not discover or execute an account capability. */
  mapProviderRequest(shot: ShotManifest) { return buildHiggsfieldRequest(shot); }
  async poll(): Promise<never> { throw new Error("LIVE_PROVIDER_OPERATION_DISABLED"); }
  async retrieve(): Promise<never> { throw new Error("LIVE_PROVIDER_OPERATION_DISABLED"); }
  async reconcile(): Promise<never> { throw new Error("LIVE_PROVIDER_OPERATION_DISABLED"); }
}

/** The sole server request builder. This is a canonical plan, NOT a sendable provider payload. */
export function buildGenerationPreparation(shotInput: ShotManifest, projectRevision: number, references: GenerationPreparation["references"]): GenerationPreparation {
  const shot = validateShotManifest(shotInput);
  if (!Number.isSafeInteger(projectRevision) || projectRevision < 1) throw new StudioStoreError("REVISION_CONFLICT", "A valid saved project revision is required.");
  const clean = validateJsonObject({ references }).references;
  if (!Array.isArray(clean) || clean.length > 64) throw new StudioStoreError("INVALID_REFERENCES", "Bounded registered references are required.");
  const intended = [...shot.sourceReferences, ...shot.inputAssets];
  const unique = [...new Map(intended.map(ref => [`${ref.assetId}@${ref.version}`, ref])).values()];
  if (clean.length !== unique.length) throw new StudioStoreError("INVALID_REFERENCES", "Every request reference must be inventory-bound.");
  const bound = unique.map(ref => {
    const matches = clean.filter(item => item !== null && typeof item === "object" && !Array.isArray(item) && item.assetId === ref.assetId && item.version === ref.version);
    const item = matches[0];
    if (matches.length !== 1 || !item || Array.isArray(item) || typeof item !== "object" || Object.keys(item).sort().join() !== "assetId,contentHash,version" || typeof item.contentHash !== "string" || !/^[a-f0-9]{64}$/u.test(item.contentHash)) throw new StudioStoreError("INVALID_REFERENCES", "Reference identity, version and content hash must agree.");
    return { ...ref, contentHash: item.contentHash };
  });
  return {
    schemaVersion: 1, projectId: shot.projectId, sequenceId: shot.sequenceId, shotId: shot.shotId,
    projectRevision, shotRevision: shot.revision, provider: "HIGGSFIELD", mode: null, model: null,
    prompt: shot.description, negativePrompt: null, references: bound, settings: {},
    plannedOutput: { durationSeconds: shot.duration, width: shot.resolution.width, height: shot.resolution.height, fps: shot.fps },
    attempt: 1, maxAttempts: 1, automaticRetries: 0,
  };
}

/** Pure saved-state projection. Loading or refreshing it neither authorizes nor executes an estimate. */
export function projectEstimateViews(state: StudioSnapshot, repository?: Pick<StudioRepository, "recoveryPlan">): HiggsfieldEstimateView[] {
  const scopeHash = digest({ projectId: state.project.projectId, projectMetadata: { title: state.project.title, description: state.project.description, currency: state.project.currency }, sequences: state.sequences, shots: state.shots, assets: state.assets, definitions: state.definitions });
  return state.shots.map((shot): HiggsfieldEstimateView => {
    let prepared: ReturnType<typeof buildHiggsfieldRequest> | null = null;
    try { prepared = buildHiggsfieldRequest(shot); } catch { /* Incompatible saved intent has no current digest; historical evidence remains visible. */ }
    const job = state.jobs.filter(item => item.shotId === shot.shotId && isEstimateJob(item)).at(-1);
    const intent = job ? readEstimateIntent(job) : null;
    const route = prepared ? routeShot(shot, [], state.project.createdAt, { purpose: "ESTIMATE", provider: prepared.provider, model: prepared.model }) : null;
    const eligible = route?.status === "PLANNING_ELIGIBLE" && route.selectedEngines.join() === "HIGGSFIELD";
    const preparationBlockers = [...(prepared ? [] : ["SAVED_INTENT_NOT_PROVIDER_COMPATIBLE"]), ...(eligible ? [] : route?.reasoningCodes ?? ["ESTIMATE_ROUTE_BLOCKED"]), ...(state.project.currency === "USD" ? [] : ["USD_SYNTHETIC_PROJECT_REQUIRED"]), ...(intent ? ["EXISTING_INTENT_CANNOT_BE_REPLACED"] : [])];
    return {
      shotId: shot.shotId, projectRevision: state.project.revision, shotRevision: shot.revision,
      provider: "HIGGSFIELD", model: prepared?.model ?? intent?.request.model ?? null, endpoint: ESTIMATE_ENDPOINT,
      preparedRequest: prepared, currentRequestDigest: prepared?.requestDigest ?? null,
      planningEligibility: eligible ? "PLANNING_ELIGIBLE" : "BLOCKED", preparationBlockers, preparationAllowed: preparationBlockers.length === 0,
      estimateIntentId: intent?.estimateIntentId ?? null, state: intent?.phase ?? "NOT_REQUESTED",
      stale: intent !== null && (prepared?.requestDigest !== intent.request.requestDigest || scopeHash !== intent.scopeHash || !eligible || !state.sequences.some(sequence => sequence.sequenceId === shot.sequenceId && sequence.projectId === state.project.projectId && sequence.shotIds.includes(shot.shotId))),
      requestDigest: intent?.request.requestDigest ?? null, attempt: job?.attempt ?? 0, maxAttempts: 1,
      createdAt: intent?.createdAt ?? null, startedAt: intent?.startedAt ?? null, completedAt: intent?.completedAt ?? null,
      correlationId: intent?.correlationId ?? null,
      result: intent?.result ? { credits: intent.result.credits, usd: intent.result.usd, estimatedAt: intent.result.estimatedAt, correlationId: intent.result.correlationId, synthetic: intent.result.synthetic } : null,
      failure: intent?.failure ? { code: intent.failure.code, httpStatus: intent.failure.httpStatus, transmitted: intent.failure.transmitted, terminal: intent.failure.terminal, retryable: intent.failure.retryable } : null,
      liveAuthorization: intent?.executionMode !== "LIVE_ESTIMATE" || !intent.authorization ? "NOT_GRANTED" : intent.authorization.consumedAt ? "CONSUMED" : "GRANTED",
      executionMode: intent?.executionMode ?? "MOCK", generationAttempts: state.jobs.filter(item => item.shotId === shot.shotId && item.type === "GENERATION").reduce((count, item) => count + item.attempt, 0),
      generationAuthorization: "NOT_GRANTED", liveExecutionAllowed: false,
      executionOutcome: savedEstimateExecutionReport(job ?? null, Boolean(job && repository?.recoveryPlan(state.project.projectId, job.jobId).action === "RECONCILE_EXTERNAL")),
    };
  });
}

export function inspectGeneration(repository: StudioRepository, projectId: StudioId<"project">, shotId: StudioId<"shot">, expectedProjectRevision: number, expectedShotRevision: number, now: string) {
  if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(now) || !Number.isFinite(Date.parse(now)) || new Date(now).toISOString() !== now) throw new StudioStoreError("INVALID_TIME", "An exact UTC timestamp is required.");
  const state = repository.load(projectId), shot = state.shots.find(item => item.shotId === shotId);
  if (!shot) throw new StudioStoreError("MISSING_SHOT", "Saved shot was not found.");
  if (state.project.revision !== expectedProjectRevision || shot.revision !== expectedShotRevision) throw new StudioStoreError("REVISION_CONFLICT", "Reload the saved project and shot before inspecting their request.");
  const refs = [...new Map([...shot.sourceReferences, ...shot.inputAssets].map(ref => [`${ref.assetId}@${ref.version}`, ref])).values()];
  const references = refs.map(ref => {
    const asset = state.assets.find(item => item.assetId === ref.assetId && item.version === ref.version);
    if (!asset) throw new StudioStoreError("INVALID_REFERENCES", "Reference is not registered in this workspace.");
    return { ...ref, contentHash: asset.contentHash };
  });
  const request = buildGenerationPreparation(shot, state.project.revision, references);
  // Derive scope from this same validated snapshot, not a second read racing a writer.
  const approvalScope = digest({ projectId, projectMetadata: { title: state.project.title, description: state.project.description, currency: state.project.currency }, sequences: state.sequences, shots: state.shots, assets: state.assets, definitions: state.definitions });
  const approval = evaluateApprovalGates(projectId, ["GATE_03"], approvalScope, state.approvals);
  const attemptsUsed = state.jobs.filter(job => job.shotId === shotId && job.type === "GENERATION").reduce((sum, job) => sum + job.attempt, 0);
  const supportedContract: HiggsfieldSupportedContractView = {
    surface: "OFFICIAL_API_FOUND", sdk: "NOT_USED_EXPLICIT_REST",
    model: "bytedance/seedance/v1/lite", endpoint: "/bytedance/seedance/v1/lite/text-to-video", mode: "TEXT_TO_VIDEO",
    requestDigest: null, request: null, compatibility: [],
    credentials: "NOT_INSPECTED", estimate: "NOT_REQUESTED", providerOperation: null,
    estimateOperation: projectEstimateViews(state, repository).find(item => item.shotId === shotId),
  };
  try {
    const mapped = buildHiggsfieldRequest(shot, references);
    supportedContract.request = mapped; supportedContract.requestDigest = mapped.requestDigest;
    supportedContract.compatibility = ["Saved intent maps to the official schema. Account access and output FPS/exact pixel grid are not verified."];
  } catch {
    supportedContract.compatibility = ["Saved intent does not match the bounded text-only candidate. It requires 2–12 whole seconds, a supported 480/720/1080 resolution and aspect ratio, static camera, and no reference or identity media. No saved value was changed."];
  }
  const managed = state.jobs.filter(job => job.shotId === shotId && isManagedProviderJob(job)).at(-1);
  if (managed) {
    const intent = readProviderIntent(managed), uncertain = ["SUBMISSION_STARTED", "SUBMISSION_STATE_UNKNOWN"].includes(intent.phase);
    supportedContract.providerOperation = {
      jobId: managed.jobId, state: intent.phase, requestDigest: intent.request.requestDigest,
      requestId: intent.providerStatus?.requestId ?? intent.observedRequestId, correlationId: intent.providerStatus?.correlationId ?? null,
      estimate: { credits: intent.estimate.credits, usd: intent.estimate.usd },
      approval: intent.approval ? "MOCK_APPROVAL_RECORDED" : "NOT_GRANTED",
      authorization: intent.authorization ? (intent.authorization.consumedAt ? "MOCK_AUTHORIZATION_CONSUMED" : "MOCK_AUTHORIZATION_RECORDED") : "NOT_GRANTED",
      attempt: managed.attempt, reconciliationRequired: uncertain, outputsCount: managed.outputs.length,
    };
  }
  return {
    provider: "HIGGSFIELD" as const, readiness: { ...higgsfieldLocalReadiness(), configuration: "NOT_INSPECTED" as const }, route: routeShot(shot, [], now), supportedContract,
    request, requestHash: digest(request), hashKind: "CANONICAL_PLAN_NOT_PROVIDER_PAYLOAD" as const, sourceRecordDigest: state.recordDigest,
    jobId: null, cost: { state: "UNKNOWN" as const, estimate: null, hardCeiling: null, policy: "SEPARATE_EXACT_OPERATION_AUTHORIZATION_REQUIRED" as const },
    approval: { state: "REQUIRED" as const, reasons: [...approval.reasons, "EXACT_DISPATCH_APPROVAL_REQUIRED"] },
    authorization: "NOT_GRANTED" as const, attemptsUsed, executionAllowed: false as const, providerRequests: 0 as const,
    executionPolicy: DEFAULT_EXTERNAL_EXECUTION_POLICY,
    blockers: ["REMOTE_AUTHENTICATION_NOT_VERIFIED", "CAPABILITY_NOT_EVIDENCED", ...(supportedContract.request ? [] : ["SAVED_INTENT_NOT_PROVIDER_COMPATIBLE"]), "UNKNOWN_COST_REQUIRES_SEPARATE_AUTHORIZATION", "EXACT_DISPATCH_APPROVAL_REQUIRED", "LIVE_SCOPED_AUTHORIZATION_NOT_GRANTED", "EXECUTION_DISABLED", ...(attemptsUsed >= 1 ? ["MAX_ATTEMPTS_REACHED"] : [])],
    destination: resolveStudioPath(projectId, "generation"),
  };
}
export type GenerationPlan = ReturnType<typeof inspectGeneration>;
