import type {
  CodexForgeCandidateEvaluation,
  CodexForgeModelRuntimeSnapshot,
  CodexForgeRoutingDecision,
  CodexForgeRoutingReasonCode,
} from "../model-routing/model-routing-types";

export const PRIVATE_ALPHA_FREE_FIRST_ROUTING_POLICY_VERSION =
  "codexforge-private-alpha-free-first-routing-v1" as const;

export const PRIVATE_ALPHA_FREE_FIRST_ROUTING_SELECTED_MODEL_KEYS = [
  "ollama-local::gpt-oss:20b",
  "groq-cloud::openai/gpt-oss-20b",
] as const;

type PrivateAlphaFreeFirstRoutingCloudRouting =
  | Readonly<{
      state: "disallowed";
    }>
  | Readonly<{
      state: "allowed-free-tier-only";
      metadataProbeAcknowledgement: true;
      freeTierConfirmation: true;
    }>;

export type PrivateAlphaFreeFirstRoutingInput = Readonly<{
  routingMode: "free-first";
  capability: "text";
  maximumOutputTokens: number;
  cloudRouting: PrivateAlphaFreeFirstRoutingCloudRouting;
}>;

export type PrivateAlphaFreeFirstRoutingSelectedModelKey =
  (typeof PRIVATE_ALPHA_FREE_FIRST_ROUTING_SELECTED_MODEL_KEYS)[number];

export type PrivateAlphaFreeFirstRoutingResult = Readonly<{
  policyVersion: typeof PRIVATE_ALPHA_FREE_FIRST_ROUTING_POLICY_VERSION;
  status: "selected-for-approval" | "no-eligible-model" | "blocked";
  selectedModelKey: PrivateAlphaFreeFirstRoutingSelectedModelKey | null;
  decision: CodexForgeRoutingDecision;
  runtimeSnapshots: readonly CodexForgeModelRuntimeSnapshot[];
  cloudProviderInspected: boolean;
  promptTransferredToCloud: false;
  providerGenerationPerformed: false;
}>;

export type PrivateAlphaFreeFirstRoutingValidationResult<T> =
  | Readonly<{
      ok: true;
      value: T;
    }>
  | Readonly<{
      ok: false;
      status: 400;
      error: string;
    }>;

function failure<T>(
  error: string
): PrivateAlphaFreeFirstRoutingValidationResult<T> {
  return {
    ok: false,
    status: 400,
    error,
  };
}

function success<T>(value: T): PrivateAlphaFreeFirstRoutingValidationResult<T> {
  return {
    ok: true,
    value,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function collectUnknownKeys(
  record: Record<string, unknown>,
  allowedKeys: readonly string[]
): readonly string[] {
  const allowed = new Set(allowedKeys);
  return Object.keys(record).filter((key) => !allowed.has(key));
}

function cloneReasonCodes(
  reasonCodes: readonly CodexForgeRoutingReasonCode[]
): readonly CodexForgeRoutingReasonCode[] {
  return Object.freeze([...reasonCodes]);
}

function cloneCandidateEvaluation(
  candidate: CodexForgeCandidateEvaluation
): CodexForgeCandidateEvaluation {
  return Object.freeze({
    modelKey: candidate.modelKey,
    eligible: candidate.eligible,
    score: candidate.score,
    estimatedCostUsd: candidate.estimatedCostUsd,
    reasonCodes: cloneReasonCodes(candidate.reasonCodes),
    rejectionCodes: Object.freeze([...candidate.rejectionCodes]),
  });
}

function cloneRoutingDecision(
  decision: CodexForgeRoutingDecision
): CodexForgeRoutingDecision {
  return Object.freeze({
    catalogVersion: decision.catalogVersion,
    status: decision.status,
    mode: decision.mode,
    selectedModelKey: decision.selectedModelKey,
    recommendedPaidModelKey: decision.recommendedPaidModelKey,
    estimatedCostUsd: decision.estimatedCostUsd,
    requiresPaidApproval: decision.requiresPaidApproval,
    explanation: decision.explanation,
    reasonCodes: cloneReasonCodes(decision.reasonCodes),
    candidates: Object.freeze(decision.candidates.map(cloneCandidateEvaluation)),
  });
}

function cloneRuntimeSnapshot(
  snapshot: CodexForgeModelRuntimeSnapshot
): CodexForgeModelRuntimeSnapshot {
  return Object.freeze({
    modelKey: snapshot.modelKey,
    availability: snapshot.availability,
    quotaState: snapshot.quotaState,
    observedLatencyMs: snapshot.observedLatencyMs,
    observedAt: snapshot.observedAt,
  });
}

export function isPrivateAlphaFreeFirstRoutingSelectedModelKey(
  value: unknown
): value is PrivateAlphaFreeFirstRoutingSelectedModelKey {
  return PRIVATE_ALPHA_FREE_FIRST_ROUTING_SELECTED_MODEL_KEYS.includes(
    value as PrivateAlphaFreeFirstRoutingSelectedModelKey
  );
}

export function isPrivateAlphaFreeFirstRoutingResultSafeForCreate(
  result: PrivateAlphaFreeFirstRoutingResult
): boolean {
  if (
    result.policyVersion !== PRIVATE_ALPHA_FREE_FIRST_ROUTING_POLICY_VERSION ||
    result.status !== "selected-for-approval" ||
    !isPrivateAlphaFreeFirstRoutingSelectedModelKey(result.selectedModelKey) ||
    result.decision.status !== "selected" ||
    result.decision.mode !== "free-first" ||
    result.decision.selectedModelKey !== result.selectedModelKey ||
    result.decision.recommendedPaidModelKey !== null ||
    result.decision.requiresPaidApproval !== false ||
    result.promptTransferredToCloud !== false ||
    result.providerGenerationPerformed !== false
  ) {
    return false;
  }

  const allowlistedModelKeys = new Set<string>(
    PRIVATE_ALPHA_FREE_FIRST_ROUTING_SELECTED_MODEL_KEYS
  );
  const seenCandidateModelKeys = new Set<string>();
  let selectedCandidateCount = 0;

  for (const candidate of result.decision.candidates) {
    if (seenCandidateModelKeys.has(candidate.modelKey)) {
      return false;
    }
    seenCandidateModelKeys.add(candidate.modelKey);

    if (candidate.modelKey === result.selectedModelKey) {
      selectedCandidateCount += 1;

      if (candidate.eligible !== true || candidate.rejectionCodes.length !== 0) {
        return false;
      }

      continue;
    }

    if (!allowlistedModelKeys.has(candidate.modelKey)) {
      if (
        candidate.eligible !== false ||
        !candidate.rejectionCodes.includes("candidate-not-allowed")
      ) {
        return false;
      }
    }
  }

  return selectedCandidateCount === 1;
}

export function validatePrivateAlphaFreeFirstRoutingInput(
  input: unknown
): PrivateAlphaFreeFirstRoutingValidationResult<PrivateAlphaFreeFirstRoutingInput> {
  if (!isRecord(input)) {
    return failure("Free-first routing requires a JSON object payload.");
  }

  const unknownTopLevelKeys = collectUnknownKeys(input, [
    "routingMode",
    "capability",
    "maximumOutputTokens",
    "cloudRouting",
  ]);
  if (unknownTopLevelKeys.length > 0) {
    return failure(
      `Unknown fields are not allowed: ${unknownTopLevelKeys.join(", ")}.`
    );
  }

  if (input.routingMode !== "free-first") {
    return failure('routingMode must be exactly "free-first".');
  }

  if (input.capability !== "text") {
    return failure('capability must be exactly "text".');
  }

  if (
    typeof input.maximumOutputTokens !== "number" ||
    !Number.isInteger(input.maximumOutputTokens) ||
    input.maximumOutputTokens < 1 ||
    input.maximumOutputTokens > 4096
  ) {
    return failure(
      "maximumOutputTokens must be an integer between 1 and 4096."
    );
  }

  if (!isRecord(input.cloudRouting)) {
    return failure("cloudRouting is required.");
  }

  if (input.cloudRouting.state === "disallowed") {
    const unknownDisallowedKeys = collectUnknownKeys(input.cloudRouting, ["state"]);
    if (unknownDisallowedKeys.length > 0) {
      return failure(
        `Unknown cloudRouting fields are not allowed: ${unknownDisallowedKeys.join(", ")}.`
      );
    }

    return success({
      routingMode: "free-first",
      capability: "text",
      maximumOutputTokens: input.maximumOutputTokens,
      cloudRouting: {
        state: "disallowed",
      },
    });
  }

  if (input.cloudRouting.state !== "allowed-free-tier-only") {
    return failure(
      'cloudRouting.state must be either "disallowed" or "allowed-free-tier-only".'
    );
  }

  const unknownAllowedKeys = collectUnknownKeys(input.cloudRouting, [
    "state",
    "metadataProbeAcknowledgement",
    "freeTierConfirmation",
  ]);
  if (unknownAllowedKeys.length > 0) {
    return failure(
      `Unknown cloudRouting fields are not allowed: ${unknownAllowedKeys.join(", ")}.`
    );
  }

  if (input.cloudRouting.metadataProbeAcknowledgement !== true) {
    return failure(
      "cloudRouting.metadataProbeAcknowledgement must be exactly true when cloud routing is allowed."
    );
  }

  if (input.cloudRouting.freeTierConfirmation !== true) {
    return failure(
      "cloudRouting.freeTierConfirmation must be exactly true when cloud routing is allowed."
    );
  }

  return success({
    routingMode: "free-first",
    capability: "text",
    maximumOutputTokens: input.maximumOutputTokens,
    cloudRouting: {
      state: "allowed-free-tier-only",
      metadataProbeAcknowledgement: true,
      freeTierConfirmation: true,
    },
  });
}

export function clonePrivateAlphaFreeFirstRoutingResult(
  result: PrivateAlphaFreeFirstRoutingResult
): PrivateAlphaFreeFirstRoutingResult {
  return Object.freeze({
    policyVersion: result.policyVersion,
    status: result.status,
    selectedModelKey: result.selectedModelKey,
    decision: cloneRoutingDecision(result.decision),
    runtimeSnapshots: Object.freeze(result.runtimeSnapshots.map(cloneRuntimeSnapshot)),
    cloudProviderInspected: result.cloudProviderInspected,
    promptTransferredToCloud: false,
    providerGenerationPerformed: false,
  });
}
