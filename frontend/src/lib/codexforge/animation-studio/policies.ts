import {
  APPROVAL_GATES, ENGINE_IDS, PRODUCTION_METHODS,
  type Approval, type ApprovalGate, type CapabilityObservation, type CostPolicy,
  type Decision, type EngineId, type ExternalAction, type ExternalExecutionPolicy,
  type Job, type Money, type ProductionMethod, type RoutingResult, type ShotManifest,
  type StudioId,
} from "./domain";
import { validateApproval, validateCapabilityObservation, validateExternalExecutionPolicy, validateJsonObject, validateShotManifest } from "./validation";

/** No execution authority is granted by importing this module. All leaves are primitive. */
export const DEFAULT_EXTERNAL_EXECUTION_POLICY: Readonly<ExternalExecutionPolicy> = Object.freeze({
  externalGenerationEnabled: false,
  paidGenerationEnabled: false,
  adobeAutomationEnabled: false,
  blenderRenderEnabled: false,
});

const methods = (...values: ProductionMethod[]): readonly ProductionMethod[] => Object.freeze(values);
const engines = (...values: EngineId[]): readonly EngineId[] => Object.freeze(values);
const gates = (...values: ApprovalGate[]): readonly ApprovalGate[] => Object.freeze(values);

/** Static eligibility, not evidence of installed tools, credentials, or execution permission. */
export const ENGINE_METHOD_COMPATIBILITY: Readonly<Record<EngineId, readonly ProductionMethod[]>> = Object.freeze({
  HIGGSFIELD: methods("GENERATIVE", "HYBRID"),
  COMFYUI: methods("GENERATIVE", "HYBRID"),
  BLENDER: methods("RIGGED", "3D", "2_5D", "HYBRID"),
  AFTER_EFFECTS: methods("RIGGED", "2_5D", "LIVE_ACTION", "HYBRID"),
  CHARACTER_ANIMATOR: methods("RIGGED", "HYBRID"),
  MOHO: methods("RIGGED", "2_5D", "HYBRID"),
  TOON_BOOM: methods("RIGGED", "2_5D", "HYBRID"),
  PHOTOSHOP: methods(),
  ILLUSTRATOR: methods(),
  PREMIERE: methods("LIVE_ACTION", "HYBRID"),
  AUDITION: methods(),
  MEDIA_ENCODER: methods(),
  FFMPEG: methods("LIVE_ACTION", "HYBRID"),
});

/** The array order is the stable routing tie-breaker; asset/audio/encoding tools are support-only. */
export const METHOD_ENGINE_PREFERENCES: Readonly<Record<ProductionMethod, readonly EngineId[]>> = Object.freeze({
  GENERATIVE: engines("HIGGSFIELD", "COMFYUI"),
  RIGGED: engines("CHARACTER_ANIMATOR", "MOHO", "TOON_BOOM", "BLENDER", "AFTER_EFFECTS"),
  "3D": engines("BLENDER"),
  "2_5D": engines("AFTER_EFFECTS", "BLENDER", "MOHO", "TOON_BOOM"),
  LIVE_ACTION: engines("PREMIERE", "AFTER_EFFECTS", "FFMPEG"),
  HYBRID: engines("AFTER_EFFECTS", "BLENDER", "PREMIERE", "CHARACTER_ANIMATOR", "MOHO", "TOON_BOOM", "HIGGSFIELD", "COMFYUI", "FFMPEG"),
});

export const REQUIRED_JOB_GATES: Readonly<Record<Job["type"], readonly ApprovalGate[]>> = Object.freeze({
  ESTIMATE: gates(),
  GENERATION: gates("GATE_03"),
  ANIMATION: gates("GATE_04"),
  RENDER: gates("GATE_04"),
  COMPOSITE: gates("GATE_04"),
  EDIT: gates("GATE_04"),
  AUDIO: gates("GATE_06"),
  DELIVERY: gates("GATE_08"),
  QC: gates(),
});

/** Observations expire after 24 hours. Callers provide the clock; this module never reads it. */
export const CAPABILITY_MAX_AGE_MS = 24 * 60 * 60 * 1000;

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function own(value: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function nonempty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function member<T extends string>(value: unknown, values: readonly T[]): value is T {
  return typeof value === "string" && values.includes(value as T);
}

function instant(value: unknown): number | null {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(value)) return null;
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) return null;
  const normalized = value.includes(".") ? value.replace(/\.(\d{1,3})Z$/, (_, fraction: string) => `.${fraction.padEnd(3, "0")}Z`) : value.replace(/Z$/, ".000Z");
  return new Date(parsed).toISOString() === normalized ? parsed : null;
}

function blocked(...reasons: string[]): Decision {
  return { status: "BLOCKED", reasons };
}

export function evaluateExternalExecution(
  policy: Readonly<ExternalExecutionPolicy>,
  actions: readonly ExternalAction[],
): Decision {
  try {
    policy = validateExternalExecutionPolicy(policy);
    actions = validateJsonObject({ actions }).actions as unknown as readonly ExternalAction[];
  } catch {
    return blocked("MALFORMED_EXTERNAL_EXECUTION_INPUT");
  }
  const keys = ["externalGenerationEnabled", "paidGenerationEnabled", "adobeAutomationEnabled", "blenderRenderEnabled"] as const;
  if (!record(policy) || Object.keys(policy).length !== keys.length || keys.some((key) => !own(policy, key) || typeof policy[key] !== "boolean")) {
    return blocked("MALFORMED_EXTERNAL_EXECUTION_POLICY");
  }
  const validActions: readonly ExternalAction[] = ["EXTERNAL_GENERATION", "PAID_GENERATION", "ADOBE_AUTOMATION", "BLENDER_RENDER"];
  if (!Array.isArray(actions) || Array.from(actions).some((action) => !member(action, validActions))) return blocked("MALFORMED_EXTERNAL_ACTIONS");
  const reasons: string[] = [];
  if ((actions.includes("EXTERNAL_GENERATION") || actions.includes("PAID_GENERATION")) && !policy.externalGenerationEnabled) reasons.push("EXTERNAL_GENERATION_DISABLED");
  if (actions.includes("PAID_GENERATION") && !policy.paidGenerationEnabled) reasons.push("PAID_GENERATION_DISABLED");
  if (actions.includes("ADOBE_AUTOMATION") && !policy.adobeAutomationEnabled) reasons.push("ADOBE_AUTOMATION_DISABLED");
  if (actions.includes("BLENDER_RENDER") && !policy.blenderRenderEnabled) reasons.push("BLENDER_RENDER_DISABLED");
  return reasons.length ? blocked(...reasons) : { status: "ALLOWED", reasons: ["EXTERNAL_EXECUTION_POLICY_SATISFIED"] };
}

function blockedRoute(method: ProductionMethod, reason: string, blockedCapabilities: EngineId[] = [], requirements: string[] = []): RoutingResult {
  return { selectedMethod: method, selectedEngines: [], fallbacks: [], reasoningCodes: [reason], requirements, blockedCapabilities, status: "BLOCKED", priority: 0 };
}

function observationKey(observation: CapabilityObservation): string {
  return JSON.stringify([observation.availability, observation.evidence, observation.checkedAt, [...observation.methods].sort()]);
}

/** Pure discovery consumption: no filesystem scan, adapter discovery, network, or execution. */
export function routeShot(
  shot: Readonly<ShotManifest>,
  observations: readonly CapabilityObservation[],
  nowIso?: string,
  purpose?: { purpose: "ESTIMATE"; provider: "HIGGSFIELD"; model: "bytedance/seedance/v1/lite" },
): RoutingResult {
  let requestedMethod: ProductionMethod = "GENERATIVE";
  try {
    shot = validateShotManifest(shot);
    requestedMethod = shot.generationMethod;
  } catch {
    return blockedRoute(requestedMethod, "MALFORMED_SHOT_MANIFEST");
  }
  const now = instant(nowIso);
  if (now === null) return blockedRoute(requestedMethod, "CAPABILITY_REFERENCE_TIME_REQUIRED", [], ["Provide a valid UTC nowIso to establish capability freshness."]);
  let cleanObservations: CapabilityObservation[];
  try {
    const candidates = validateJsonObject({ observations }).observations;
    if (!Array.isArray(candidates)) return blockedRoute(requestedMethod, "MALFORMED_CAPABILITY_OBSERVATIONS");
    cleanObservations = candidates.map(validateCapabilityObservation);
  } catch {
    return blockedRoute(requestedMethod, "MALFORMED_CAPABILITY_OBSERVATIONS");
  }
  const observed = new Map<EngineId, CapabilityObservation>();
  const conflicts = new Set<EngineId>();
  for (const observation of cleanObservations) {
    if (!record(observation) || !member(observation.engine, ENGINE_IDS) ||
        !member(observation.availability, ["AVAILABLE", "UNAVAILABLE", "UNKNOWN"] as const) ||
        !nonempty(observation.evidence) || instant(observation.checkedAt) === null ||
        !Array.isArray(observation.methods) || Array.from(observation.methods).some((method) => !member(method, PRODUCTION_METHODS)) ||
        new Set(observation.methods).size !== observation.methods.length) {
      return blockedRoute(requestedMethod, "MALFORMED_CAPABILITY_OBSERVATION");
    }
    const previous = observed.get(observation.engine);
    if (previous && observationKey(previous) !== observationKey(observation)) conflicts.add(observation.engine);
    else observed.set(observation.engine, observation);
  }
  if (conflicts.size) return blockedRoute(requestedMethod, "CONFLICTING_CAPABILITY_OBSERVATIONS", ENGINE_IDS.filter((engine) => conflicts.has(engine)));

  let selectedMethod = requestedMethod;
  const reasoningCodes: string[] = [];
  const requirements: string[] = [];
  let preferred = shot.preferredEngine;
  let explicitFallback = shot.fallbackEngine;
  if (preferred !== null && !ENGINE_METHOD_COMPATIBILITY[preferred].includes(requestedMethod)) return blockedRoute(requestedMethod, "INCOMPATIBLE_PREFERRED_ENGINE", [preferred]);
  if (shot.identityStrictness === "EXACT" && requestedMethod === "GENERATIVE") {
    if (explicitFallback === null || !ENGINE_METHOD_COMPATIBILITY[explicitFallback].includes("RIGGED")) {
      return blockedRoute(requestedMethod, "EXACT_IDENTITY_BLOCKS_GENERATIVE", [], ["Exact identity requires an explicitly selected, observed rigged fallback; generative production is not identity-safe."]);
    }
    selectedMethod = "RIGGED";
    preferred = explicitFallback;
    explicitFallback = null;
    reasoningCodes.push("EXACT_IDENTITY_EXPLICIT_RIGGED_FALLBACK");
    requirements.push("Use the explicit rigged fallback with approved identity assets; do not execute generative identity production.");
  } else {
    if (explicitFallback !== null && !ENGINE_METHOD_COMPATIBILITY[explicitFallback].includes(selectedMethod)) return blockedRoute(selectedMethod, "INCOMPATIBLE_FALLBACK_ENGINE", [explicitFallback]);
  }

  const identitySafe = (engine: EngineId) => shot.identityStrictness !== "EXACT" || (engine !== "HIGGSFIELD" && engine !== "COMFYUI");
  if ((preferred !== null && !identitySafe(preferred)) || (explicitFallback !== null && !identitySafe(explicitFallback))) {
    return blockedRoute(selectedMethod, "EXACT_IDENTITY_BLOCKS_GENERATIVE_ENGINE");
  }
  // An exact-identity fallback is explicit authority for that route, not for substituting another rig engine.
  const candidateOrder = requestedMethod === "GENERATIVE" && selectedMethod === "RIGGED"
    ? [preferred!]
    : [...new Set([...(preferred === null ? [] : [preferred]), ...(explicitFallback === null ? [] : [explicitFallback]), ...METHOD_ENGINE_PREFERENCES[selectedMethod]])].filter(identitySafe);
  const unavailable: EngineId[] = [];
  // The same identity/method/preference routing above governs documented estimate eligibility.
  // This distinct result is never READY and provides neither discovery evidence nor execution authority.
  if (purpose !== undefined) {
    try {
      const clean = validateJsonObject(purpose);
      if (Object.keys(clean).sort().join() !== "model,provider,purpose" || clean.purpose !== "ESTIMATE" || clean.provider !== "HIGGSFIELD" || clean.model !== "bytedance/seedance/v1/lite") return blockedRoute(selectedMethod, "INVALID_ROUTING_PURPOSE");
    } catch { return blockedRoute(selectedMethod, "INVALID_ROUTING_PURPOSE"); }
    if (!candidateOrder.includes("HIGGSFIELD") || selectedMethod !== "GENERATIVE" || shot.identityStrictness !== "FLEXIBLE" || (preferred !== null && preferred !== "HIGGSFIELD")) return blockedRoute(selectedMethod, "DOCUMENTED_ESTIMATE_ROUTE_INELIGIBLE");
    return { selectedMethod, selectedEngines: ["HIGGSFIELD"], fallbacks: [], reasoningCodes: [...reasoningCodes, "DOCUMENTED_CONTRACT_ESTIMATE_ELIGIBLE", "NOT_CAPABILITY_OBSERVATION", "ROUTING_IS_NOT_EXECUTION_AUTHORIZATION"], requirements: ["Exact supported request and independent estimate-only single-use authorization are required. Generation remains disabled."], blockedCapabilities: [], status: "PLANNING_ELIGIBLE", priority: 0 };
  }
  const available: EngineId[] = [];
  for (const engine of candidateOrder) {
    const observation = observed.get(engine);
    const checkedAt = observation ? instant(observation.checkedAt) : null;
    let reason: string | null = null;
    if (!observation) reason = "MISSING";
    else if (observation.availability !== "AVAILABLE") reason = observation.availability;
    else if (checkedAt === null || checkedAt > now || now - checkedAt > CAPABILITY_MAX_AGE_MS) reason = "STALE_OR_FUTURE";
    else if (!observation.methods.includes(selectedMethod) || !ENGINE_METHOD_COMPATIBILITY[engine].includes(selectedMethod)) reason = "METHOD_NOT_OBSERVED";
    if (reason) {
      unavailable.push(engine);
      requirements.push(`${engine}: ${reason}; require fresh AVAILABLE evidence for ${selectedMethod}.`);
    } else available.push(engine);
  }
  if (!available.length) {
    return { ...blockedRoute(selectedMethod, "NO_OBSERVED_COMPATIBLE_ENGINE", unavailable, requirements), reasoningCodes: [...reasoningCodes, "NO_OBSERVED_COMPATIBLE_ENGINE"] };
  }
  const selected = available[0];
  reasoningCodes.push(preferred === selected ? "PREFERRED_ENGINE_OBSERVED" : explicitFallback === selected ? "EXPLICIT_FALLBACK_OBSERVED" : "DETERMINISTIC_OBSERVED_ENGINE_SELECTED");
  if (preferred !== null && preferred !== selected) reasoningCodes.push("PREFERRED_ENGINE_NOT_AVAILABLE");
  reasoningCodes.push("ROUTING_IS_NOT_EXECUTION_AUTHORIZATION");
  return { selectedMethod, selectedEngines: [selected], fallbacks: available.slice(1), reasoningCodes, requirements, blockedCapabilities: unavailable, status: "READY", priority: shot.identityStrictness === "EXACT" ? 100 : 50 };
}

export function evaluateApprovalGates(
  projectId: StudioId<"project">,
  requiredGates: readonly ApprovalGate[],
  subjectHash: string,
  approvals: readonly Approval[],
): Decision {
  try {
    const input = validateJsonObject({ requiredGates, approvals });
    requiredGates = input.requiredGates as unknown as readonly ApprovalGate[];
    approvals = input.approvals as unknown as readonly Approval[];
    if (Array.isArray(approvals)) approvals = approvals.map(validateApproval);
  } catch {
    return blocked("MALFORMED_APPROVAL_REQUEST");
  }
  if (typeof projectId !== "string" || projectId.length > 128 || !/^project_[a-z0-9]+(?:_[a-z0-9]+)*$/.test(projectId) ||
      typeof subjectHash !== "string" || !/^[0-9a-f]{64}$/.test(subjectHash) ||
      !Array.isArray(requiredGates) || Array.from(requiredGates).some((gate) => !member(gate, APPROVAL_GATES)) || !Array.isArray(approvals)) {
    return blocked("MALFORMED_APPROVAL_REQUEST");
  }
  const seenIds = new Map<string, string>();
  for (const approval of approvals) {
    if (instant(approval.createdAt) === null || (approval.decidedAt !== null && instant(approval.decidedAt) === null) ||
        (approval.state !== "PENDING" && approval.decidedAt === null) ||
        (approval.decidedAt !== null && instant(approval.decidedAt)! < instant(approval.createdAt)!)) return blocked("MALFORMED_APPROVAL_TIMESTAMP");
    const fingerprint = JSON.stringify([approval.projectId, approval.gate, approval.subjectHash, approval.state, approval.actor, approval.reason, approval.createdAt, approval.decidedAt]);
    const previous = seenIds.get(approval.approvalId);
    if (previous !== undefined && previous !== fingerprint) return blocked("CONFLICTING_APPROVAL_ID");
    seenIds.set(approval.approvalId, fingerprint);
  }
  const highest = Math.max(-1, ...requiredGates.map((gate) => APPROVAL_GATES.indexOf(gate)));
  const needed = APPROVAL_GATES.slice(0, highest + 1);
  const reasons: string[] = [];
  let rejected = false;
  let previousDecisionTime = -Infinity;
  for (const gate of needed) {
    const matching = approvals.filter((approval) => approval.projectId === projectId && approval.subjectHash === subjectHash && approval.gate === gate);
    if (!matching.length) {
      reasons.push(`${gate}_APPROVAL_REQUIRED`);
      continue;
    }
    const effectiveTime = (approval: Approval) => instant(approval.decidedAt ?? approval.createdAt)!;
    const latestTime = Math.max(...matching.map(effectiveTime));
    const latest = matching.filter((approval) => effectiveTime(approval) === latestTime);
    if (new Set(latest.map((approval) => approval.state)).size !== 1) return blocked(`${gate}_CONFLICTING_LATEST_DECISIONS`);
    const state = latest[0].state;
    if (state === "REJECTED") {
      rejected = true;
      reasons.push(`${gate}_REJECTED`);
    } else if (state !== "APPROVED") reasons.push(`${gate}_APPROVAL_REQUIRED`);
    else if (latestTime < previousDecisionTime) reasons.push(`${gate}_UPSTREAM_APPROVAL_CHANGED`);
    if (state === "APPROVED") previousDecisionTime = Math.max(previousDecisionTime, latestTime);
  }
  if (rejected) return blocked(...reasons);
  return reasons.length ? { status: "REQUIRES_APPROVAL", reasons } : { status: "ALLOWED", reasons: ["ORDERED_APPROVAL_GATES_SATISFIED"] };
}

export interface CostPolicyContext {
  shotSpent: Money;
  projectSpent: Money;
  estimate: Money;
  /** Completed/previous attempts; starting the next attempt must remain below the ceiling. */
  attempts: number;
  /** Deprecated and deliberately ignored. A boolean cannot authorize an overage. */
  approvedOverage?: boolean;
}

function validMoney(value: unknown): value is Money {
  return record(value) && own(value, "currency") && own(value, "minorUnits") &&
    typeof value.currency === "string" && /^[A-Z]{3}$/.test(value.currency) &&
    typeof value.minorUnits === "number" && Number.isSafeInteger(value.minorUnits) && value.minorUnits >= 0;
}

export function evaluateCostPolicy(policy: Readonly<CostPolicy>, context: Readonly<CostPolicyContext>): Decision {
  try {
    policy = validateJsonObject(policy) as unknown as Readonly<CostPolicy>;
    context = validateJsonObject(context) as unknown as Readonly<CostPolicyContext>;
  } catch {
    return blocked("MALFORMED_COST_POLICY_INPUT");
  }
  if (!record(policy) || !record(context) ||
      !["MAX_SHOT_GENERATION_COST", "MAX_PROJECT_GENERATION_COST", "MAX_ATTEMPTS_PER_SHOT"].every((key) => own(policy, key)) ||
      !["shotSpent", "projectSpent", "estimate", "attempts"].every((key) => own(context, key)) ||
      !validMoney(policy.MAX_SHOT_GENERATION_COST) || !validMoney(policy.MAX_PROJECT_GENERATION_COST) ||
      !Number.isSafeInteger(policy.MAX_ATTEMPTS_PER_SHOT) || policy.MAX_ATTEMPTS_PER_SHOT < 0 ||
      !validMoney(context.shotSpent) || !validMoney(context.projectSpent) || !validMoney(context.estimate) ||
      !Number.isSafeInteger(context.attempts) || context.attempts < 0) return blocked("MALFORMED_COST_POLICY_INPUT");
  const amounts = [policy.MAX_SHOT_GENERATION_COST, policy.MAX_PROJECT_GENERATION_COST, context.shotSpent, context.projectSpent, context.estimate];
  if (new Set(amounts.map((amount) => amount.currency)).size !== 1) return blocked("COST_CURRENCY_MISMATCH");
  if (context.attempts >= policy.MAX_ATTEMPTS_PER_SHOT) return blocked("MAX_ATTEMPTS_PER_SHOT_REACHED");
  const projectedShot = context.shotSpent.minorUnits + context.estimate.minorUnits;
  const projectedProject = context.projectSpent.minorUnits + context.estimate.minorUnits;
  if (!Number.isSafeInteger(projectedShot) || !Number.isSafeInteger(projectedProject)) return blocked("COST_SAFE_INTEGER_OVERFLOW");
  const reasons: string[] = [];
  if (projectedShot > policy.MAX_SHOT_GENERATION_COST.minorUnits) reasons.push("MAX_SHOT_GENERATION_COST_EXCEEDED");
  if (projectedProject > policy.MAX_PROJECT_GENERATION_COST.minorUnits) reasons.push("MAX_PROJECT_GENERATION_COST_EXCEEDED");
  return reasons.length ? { status: "REQUIRES_APPROVAL", reasons } : { status: "ALLOWED", reasons: ["COST_LIMITS_SATISFIED"] };
}
