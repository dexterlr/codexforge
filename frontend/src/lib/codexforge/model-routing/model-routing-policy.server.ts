import "server-only";

import { getCodexForgeProductionModelCatalog } from "./model-routing-catalog";
import type {
  CodexForgeCandidateEvaluation,
  CodexForgeCapability,
  CodexForgeModelCatalogSnapshot,
  CodexForgeModelCostClass,
  CodexForgeModelDescriptor,
  CodexForgeModelKey,
  CodexForgeModelPricing,
  CodexForgeModelRuntimeSnapshot,
  CodexForgeProviderDescriptor,
  CodexForgeRoutingDecision,
  CodexForgeRoutingReasonCode,
  CodexForgeRoutingRequest,
  CodexForgeRoutingRejectionCode,
} from "./model-routing-types";

type EvaluatedCandidate = Readonly<{
  provider: CodexForgeProviderDescriptor;
  model: CodexForgeModelDescriptor;
  evaluation: CodexForgeCandidateEvaluation;
  estimatedCostUsd: number | null;
  paidApprovalMissing: boolean;
}>;

function freezeReasonCodes(
  ...reasonCodes: readonly CodexForgeRoutingReasonCode[]
): readonly CodexForgeRoutingReasonCode[] {
  return Object.freeze([...reasonCodes]);
}

function freezeRejectionCodes(
  ...rejectionCodes: readonly CodexForgeRoutingRejectionCode[]
): readonly CodexForgeRoutingRejectionCode[] {
  return Object.freeze([...rejectionCodes]);
}

function addUniqueCode<TCode extends string>(codes: TCode[], code: TCode): void {
  if (!codes.includes(code)) {
    codes.push(code);
  }
}

function buildRuntimeSnapshotIndex(
  runtimeSnapshots: readonly CodexForgeModelRuntimeSnapshot[]
): ReadonlyMap<CodexForgeModelKey, CodexForgeModelRuntimeSnapshot> {
  const runtimeIndex = new Map<CodexForgeModelKey, CodexForgeModelRuntimeSnapshot>();

  for (const runtimeSnapshot of runtimeSnapshots) {
    runtimeIndex.set(runtimeSnapshot.modelKey, runtimeSnapshot);
  }

  return runtimeIndex;
}

function getTaskProfileScore(
  model: CodexForgeModelDescriptor,
  request: CodexForgeRoutingRequest
): number {
  return model.taskProfileScores[request.taskProfile] ?? 0;
}

function getQualificationRank(model: CodexForgeModelDescriptor): number {
  if (model.qualificationState === "live-verified") {
    return 2;
  }

  if (model.qualificationState === "deterministic-tested") {
    return 1;
  }

  return 0;
}

function hasAllRequiredCapabilities(
  model: CodexForgeModelDescriptor,
  requiredCapabilities: readonly CodexForgeCapability[]
): boolean {
  const capabilitySet = new Set(model.capabilities);
  return requiredCapabilities.every((requiredCapability) =>
    capabilitySet.has(requiredCapability)
  );
}

function formatEstimatedCost(estimatedCostUsd: number | null): string {
  if (estimatedCostUsd === null) {
    return "cost unavailable";
  }

  return `$${estimatedCostUsd.toFixed(6)}`;
}

function cloneReasonCodes(
  reasonCodes: readonly CodexForgeRoutingReasonCode[]
): readonly CodexForgeRoutingReasonCode[] {
  return freezeReasonCodes(...reasonCodes);
}

function cloneRejectionCodes(
  rejectionCodes: readonly CodexForgeRoutingRejectionCode[]
): readonly CodexForgeRoutingRejectionCode[] {
  return freezeRejectionCodes(...rejectionCodes);
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
    rejectionCodes: cloneRejectionCodes(candidate.rejectionCodes),
  });
}

function buildRoutingDecision(
  catalogVersion: string,
  mode: CodexForgeRoutingRequest["policy"]["mode"],
  status: CodexForgeRoutingDecision["status"],
  selectedModelKey: CodexForgeModelKey | null,
  recommendedPaidModelKey: CodexForgeModelKey | null,
  estimatedCostUsd: number | null,
  requiresPaidApproval: boolean,
  explanation: string,
  reasonCodes: readonly CodexForgeRoutingReasonCode[],
  candidates: readonly CodexForgeCandidateEvaluation[]
): CodexForgeRoutingDecision {
  return Object.freeze({
    catalogVersion,
    status,
    mode,
    selectedModelKey,
    recommendedPaidModelKey,
    estimatedCostUsd,
    requiresPaidApproval,
    explanation,
    reasonCodes: cloneReasonCodes(reasonCodes),
    candidates: Object.freeze(candidates.map(cloneCandidateEvaluation)),
  });
}

function compareCandidates(a: EvaluatedCandidate, b: EvaluatedCandidate): number {
  if (a.evaluation.score !== b.evaluation.score) {
    return b.evaluation.score - a.evaluation.score;
  }

  const qualificationDelta = getQualificationRank(b.model) - getQualificationRank(a.model);
  if (qualificationDelta !== 0) {
    return qualificationDelta;
  }

  if (
    a.estimatedCostUsd !== null &&
    b.estimatedCostUsd !== null &&
    a.estimatedCostUsd !== b.estimatedCostUsd
  ) {
    return a.estimatedCostUsd - b.estimatedCostUsd;
  }

  if (a.provider.locality !== b.provider.locality) {
    return a.provider.locality === "local" ? -1 : 1;
  }

  return a.model.modelKey.localeCompare(b.model.modelKey);
}

function tiedBeforeLexical(a: EvaluatedCandidate, b: EvaluatedCandidate): boolean {
  if (a.evaluation.score !== b.evaluation.score) {
    return false;
  }

  if (getQualificationRank(a.model) !== getQualificationRank(b.model)) {
    return false;
  }

  if (
    a.estimatedCostUsd !== null &&
    b.estimatedCostUsd !== null &&
    a.estimatedCostUsd !== b.estimatedCostUsd
  ) {
    return false;
  }

  if (a.provider.locality !== b.provider.locality) {
    return false;
  }

  return true;
}

function withSelectionReasonCodes(
  candidates: readonly EvaluatedCandidate[],
  selectedModelKey: CodexForgeModelKey,
  reasonCodes: readonly CodexForgeRoutingReasonCode[]
): readonly CodexForgeCandidateEvaluation[] {
  return candidates.map((candidate) => {
    const candidateReasonCodes =
      candidate.model.modelKey === selectedModelKey ? reasonCodes : candidate.evaluation.reasonCodes;

    return {
      ...candidate.evaluation,
      reasonCodes: cloneReasonCodes(candidateReasonCodes),
    };
  });
}

function estimatePaidModelCostUsd(
  pricing: CodexForgeModelPricing,
  estimatedInputTokens: number,
  maximumOutputTokens: number
): number | null {
  if (pricing.inputUsdPerMillionTokens === null || pricing.outputUsdPerMillionTokens === null) {
    return null;
  }

  return (
    (estimatedInputTokens * pricing.inputUsdPerMillionTokens) / 1_000_000 +
    (maximumOutputTokens * pricing.outputUsdPerMillionTokens) / 1_000_000
  );
}

export function estimateCodexForgeModelCostUsd(
  pricing: CodexForgeModelPricing,
  estimatedInputTokens: number,
  maximumOutputTokens: number
): number | null {
  if (
    !Number.isFinite(estimatedInputTokens) ||
    !Number.isFinite(maximumOutputTokens) ||
    estimatedInputTokens < 0 ||
    maximumOutputTokens < 0
  ) {
    return null;
  }

  if (pricing.costClass === "local-no-provider-token-charge") {
    return 0;
  }

  if (pricing.costClass === "free-tier") {
    return 0;
  }

  if (pricing.costClass === "unknown") {
    return null;
  }

  if (
    pricing.inputUsdPerMillionTokens === null ||
    pricing.outputUsdPerMillionTokens === null ||
    pricing.inputUsdPerMillionTokens < 0 ||
    pricing.outputUsdPerMillionTokens < 0
  ) {
    return null;
  }

  return estimatePaidModelCostUsd(pricing, estimatedInputTokens, maximumOutputTokens);
}

function evaluateCandidate(
  provider: CodexForgeProviderDescriptor,
  model: CodexForgeModelDescriptor,
  request: CodexForgeRoutingRequest,
  runtimeIndex: ReadonlyMap<CodexForgeModelKey, CodexForgeModelRuntimeSnapshot>
): EvaluatedCandidate {
  const rejectionCodes: CodexForgeRoutingRejectionCode[] = [];
  const runtimeSnapshot = runtimeIndex.get(model.modelKey);
  const availability = runtimeSnapshot?.availability ?? "unknown";
  const quotaState = runtimeSnapshot?.quotaState ?? "unknown";
  const candidateAllowlist =
    request.candidateModelKeys === null
      ? null
      : new Set<CodexForgeModelKey>(request.candidateModelKeys);
  const estimatedCostUsd = estimateCodexForgeModelCostUsd(
    model.pricing,
    request.estimatedInputTokens,
    request.maximumOutputTokens
  );

  if (provider.catalogState !== "enabled") {
    addUniqueCode(rejectionCodes, "provider-disabled");
  }

  if (
    candidateAllowlist !== null &&
    !candidateAllowlist.has(model.modelKey)
  ) {
    addUniqueCode(rejectionCodes, "candidate-not-allowed");
  }

  if (request.policy.mode === "manual") {
    if (
      model.routingState !== "automatic" &&
      model.routingState !== "manual-only"
    ) {
      addUniqueCode(rejectionCodes, "model-disabled");
    }
  } else {
    if (model.routingState !== "automatic") {
      addUniqueCode(rejectionCodes, "model-disabled");
    } else if (
      model.automaticRoutingAdmission === null ||
      !model.automaticRoutingAdmission.modes.includes(request.policy.mode)
    ) {
      addUniqueCode(rejectionCodes, "routing-mode-not-admitted");
    }
  }

  if (
    model.qualificationState !== "deterministic-tested" &&
    model.qualificationState !== "live-verified"
  ) {
    addUniqueCode(rejectionCodes, "model-not-qualified");
  }

  if (availability !== "available") {
    addUniqueCode(rejectionCodes, "unavailable");
  }

  if (!hasAllRequiredCapabilities(model, request.requiredCapabilities)) {
    addUniqueCode(rejectionCodes, "capability-mismatch");
  }

  if (request.maximumOutputTokens > model.approvedMaximumOutputTokens) {
    addUniqueCode(rejectionCodes, "output-limit-exceeded");
  }

  if (
    request.policy.privacyRequirement === "local-required" &&
    provider.locality === "cloud"
  ) {
    addUniqueCode(rejectionCodes, "privacy-local-required");
  }

  if (request.policy.mode === "local-only" && provider.locality !== "local") {
    addUniqueCode(rejectionCodes, "locality-not-allowed");
  }

  if (
    request.policy.mode === "free-only" &&
    (model.pricing.costClass === "paid" || model.pricing.costClass === "unknown")
  ) {
    addUniqueCode(rejectionCodes, "cost-class-not-allowed");
  }

  if (
    model.pricing.costClass === "free-tier" &&
    request.policy.freeTierConfirmationState !== "confirmed-for-request"
  ) {
    addUniqueCode(rejectionCodes, "free-tier-not-confirmed");
  }

  if (model.pricing.costClass === "free-tier" && quotaState !== "available") {
    addUniqueCode(rejectionCodes, "quota-unavailable");
  }

  if (model.pricing.costClass === "paid") {
    if (request.policy.paidExecutionAdmission === "disabled") {
      addUniqueCode(rejectionCodes, "paid-execution-disabled");
    }

    if (
      model.pricing.inputUsdPerMillionTokens === null ||
      model.pricing.outputUsdPerMillionTokens === null
    ) {
      addUniqueCode(rejectionCodes, "pricing-unknown");
    }

    if (request.policy.maximumEstimatedCostUsd === null) {
      addUniqueCode(rejectionCodes, "budget-required");
    }

    if (
      request.policy.maximumEstimatedCostUsd !== null &&
      estimatedCostUsd !== null &&
      estimatedCostUsd > request.policy.maximumEstimatedCostUsd
    ) {
      addUniqueCode(rejectionCodes, "over-budget");
    }

    if (estimatedCostUsd === null) {
      addUniqueCode(rejectionCodes, "pricing-unknown");
    }
  }

  if (model.pricing.costClass === "unknown") {
    addUniqueCode(rejectionCodes, "pricing-unknown");
  }

  const evaluation: CodexForgeCandidateEvaluation = {
    modelKey: model.modelKey,
    eligible: rejectionCodes.length === 0,
    score: getTaskProfileScore(model, request),
    estimatedCostUsd,
    reasonCodes: freezeReasonCodes(),
    rejectionCodes: cloneRejectionCodes(rejectionCodes),
  };

  return {
    provider,
    model,
    evaluation,
    estimatedCostUsd,
    paidApprovalMissing:
      model.pricing.costClass === "paid" &&
      request.policy.paidApprovalState !== "granted-for-request",
  };
}

function chooseBestCandidate(
  candidates: readonly EvaluatedCandidate[]
): EvaluatedCandidate | null {
  if (candidates.length === 0) {
    return null;
  }

  return [...candidates].sort(compareCandidates)[0] ?? null;
}

function getAutomaticCandidates(
  request: CodexForgeRoutingRequest,
  catalogSnapshot: CodexForgeModelCatalogSnapshot
): readonly EvaluatedCandidate[] {
  const providerIndex = new Map<string, CodexForgeProviderDescriptor>();
  const runtimeIndex = buildRuntimeSnapshotIndex(request.runtimeSnapshots);

  for (const provider of catalogSnapshot.providers) {
    providerIndex.set(provider.providerId, provider);
  }

  return catalogSnapshot.models
    .map((model) => {
      const provider = providerIndex.get(model.providerId);
      if (!provider) {
        return null;
      }

      return evaluateCandidate(provider, model, request, runtimeIndex);
    })
    .filter((candidate): candidate is EvaluatedCandidate => candidate !== null);
}

function buildSelectedExplanation(
  selectedCandidate: EvaluatedCandidate,
  mode: CodexForgeRoutingRequest["policy"]["mode"],
  decisiveReason: CodexForgeRoutingReasonCode
): string {
  return `Selected ${selectedCandidate.model.modelKey} in ${mode} mode via ${decisiveReason}; estimated max cost ${formatEstimatedCost(selectedCandidate.estimatedCostUsd)}.`;
}

function buildPaidApprovalExplanation(
  recommendedCandidate: EvaluatedCandidate,
  mode: CodexForgeRoutingRequest["policy"]["mode"]
): string {
  return `Recommended ${recommendedCandidate.model.modelKey} in ${mode} mode via paid-approval-required; estimated max cost ${formatEstimatedCost(recommendedCandidate.estimatedCostUsd)}; explicit paid approval required before selection.`;
}

function buildNoEligibleExplanation(
  mode: CodexForgeRoutingRequest["policy"]["mode"]
): string {
  return `No eligible model in ${mode} mode; deterministic hard gates rejected all candidates.`;
}

function buildManualSelectionRequiredExplanation(): string {
  return "Manual mode requires an exact manualModelKey; no model was evaluated.";
}

function buildManualSelectionInvalidExplanation(
  manualModelKey: CodexForgeModelKey,
  requiresPaidApproval: boolean,
  estimatedCostUsd: number | null
): string {
  const approvalSuffix = requiresPaidApproval
    ? "; explicit paid approval required before selection"
    : "";
  const costSuffix =
    estimatedCostUsd === null ? "" : `; estimated max cost ${formatEstimatedCost(estimatedCostUsd)}`;
  return `Manual selection invalid for ${manualModelKey} in manual mode; exact model was not eligible${costSuffix}${approvalSuffix}.`;
}

function candidateUsesStableKeyTiebreak(
  selectedCandidate: EvaluatedCandidate,
  candidates: readonly EvaluatedCandidate[]
): boolean {
  return candidates.some(
    (candidate) =>
      candidate.model.modelKey !== selectedCandidate.model.modelKey &&
      tiedBeforeLexical(selectedCandidate, candidate)
  );
}

function buildSelectedReasonCodes(
  baseCode: CodexForgeRoutingReasonCode,
  selectedCandidate: EvaluatedCandidate,
  candidatePool: readonly EvaluatedCandidate[]
): readonly CodexForgeRoutingReasonCode[] {
  const reasonCodes: CodexForgeRoutingReasonCode[] = [baseCode];

  if (baseCode !== "manual-selection") {
    reasonCodes.push("highest-task-fit");
  }

  if (candidateUsesStableKeyTiebreak(selectedCandidate, candidatePool)) {
    reasonCodes.push("stable-key-tiebreak");
  }

  return Object.freeze(reasonCodes);
}

function buildPaidApprovalReasonCodes(
  mode: CodexForgeRoutingRequest["policy"]["mode"],
  recommendedCandidate: EvaluatedCandidate,
  candidatePool: readonly EvaluatedCandidate[]
): readonly CodexForgeRoutingReasonCode[] {
  const reasonCodes: CodexForgeRoutingReasonCode[] = [];

  if (mode === "best-within-budget") {
    reasonCodes.push("best-within-budget");
  }

  if (mode === "local-only") {
    reasonCodes.push("local-only-policy");
  }

  reasonCodes.push("paid-approval-required", "highest-task-fit");

  if (candidateUsesStableKeyTiebreak(recommendedCandidate, candidatePool)) {
    reasonCodes.push("stable-key-tiebreak");
  }

  return Object.freeze(reasonCodes);
}

function buildExactManualMismatchCandidate(
  manualModelKey: CodexForgeModelKey
): CodexForgeCandidateEvaluation {
  return Object.freeze({
    modelKey: manualModelKey,
    eligible: false,
    score: 0,
    estimatedCostUsd: null,
    reasonCodes: freezeReasonCodes(),
    rejectionCodes: freezeRejectionCodes("manual-model-mismatch"),
  });
}

function isLocalFreeFirstCandidate(candidate: EvaluatedCandidate): boolean {
  return (
    candidate.evaluation.eligible &&
    candidate.provider.locality === "local" &&
    (candidate.model.pricing.costClass === "local-no-provider-token-charge" ||
      candidate.model.pricing.costClass === "free-tier")
  );
}

function isFreeTierCandidate(candidate: EvaluatedCandidate): boolean {
  return (
    candidate.evaluation.eligible && candidate.model.pricing.costClass === "free-tier"
  );
}

function isPaidCandidate(candidate: EvaluatedCandidate): boolean {
  return candidate.evaluation.eligible && candidate.model.pricing.costClass === "paid";
}

function isAutomaticEligible(candidate: EvaluatedCandidate): boolean {
  if (!candidate.evaluation.eligible) {
    return false;
  }

  if (candidate.model.pricing.costClass === "unknown") {
    return false;
  }

  if (candidate.model.pricing.costClass === "free-tier") {
    return true;
  }

  if (candidate.model.pricing.costClass === "local-no-provider-token-charge") {
    return true;
  }

  return candidate.model.pricing.costClass === "paid";
}

function filterByCostClass(
  candidates: readonly EvaluatedCandidate[],
  allowedCostClasses: readonly CodexForgeModelCostClass[]
): readonly EvaluatedCandidate[] {
  return candidates.filter(
    (candidate) =>
      isAutomaticEligible(candidate) &&
      allowedCostClasses.includes(candidate.model.pricing.costClass)
  );
}

export function routeCodexForgeModel(
  request: CodexForgeRoutingRequest,
  catalogSnapshot: CodexForgeModelCatalogSnapshot = getCodexForgeProductionModelCatalog()
): CodexForgeRoutingDecision {
  if (request.policy.mode === "manual" && request.policy.manualModelKey === null) {
    return buildRoutingDecision(
      catalogSnapshot.catalogVersion,
      request.policy.mode,
      "manual-selection-required",
      null,
      null,
      null,
      false,
      buildManualSelectionRequiredExplanation(),
      freezeReasonCodes("manual-selection"),
      Object.freeze([])
    );
  }

  const evaluatedCandidates = getAutomaticCandidates(request, catalogSnapshot);

  if (request.policy.mode === "manual") {
    const manualModelKey = request.policy.manualModelKey;
    if (manualModelKey === null) {
      throw new Error("Manual mode requires an exact manualModelKey.");
    }

    const exactCandidate = evaluatedCandidates.find(
      (candidate) => candidate.model.modelKey === manualModelKey
    );

    if (!exactCandidate) {
      return buildRoutingDecision(
        catalogSnapshot.catalogVersion,
        request.policy.mode,
        "manual-selection-invalid",
        null,
        null,
        null,
        false,
        buildManualSelectionInvalidExplanation(manualModelKey, false, null),
        freezeReasonCodes("manual-selection"),
        Object.freeze([buildExactManualMismatchCandidate(manualModelKey)])
      );
    }

    const requiresPaidApproval = exactCandidate.paidApprovalMissing;
    const exactCandidateSelected =
      exactCandidate.evaluation.eligible && !requiresPaidApproval;
    const reasonCodes = requiresPaidApproval
      ? freezeReasonCodes("manual-selection", "paid-approval-required")
      : freezeReasonCodes("manual-selection");
    const candidatesWithReasons = withSelectionReasonCodes(
      [exactCandidate],
      exactCandidate.model.modelKey,
      reasonCodes
    );

    if (!exactCandidateSelected) {
      return buildRoutingDecision(
        catalogSnapshot.catalogVersion,
        request.policy.mode,
        "manual-selection-invalid",
        null,
        null,
        exactCandidate.estimatedCostUsd,
        requiresPaidApproval,
        buildManualSelectionInvalidExplanation(
          exactCandidate.model.modelKey,
          requiresPaidApproval,
          exactCandidate.estimatedCostUsd
        ),
        reasonCodes,
        Object.freeze(candidatesWithReasons)
      );
    }

    return buildRoutingDecision(
      catalogSnapshot.catalogVersion,
      request.policy.mode,
      "selected",
      exactCandidate.model.modelKey,
      null,
      exactCandidate.estimatedCostUsd,
      false,
      buildSelectedExplanation(
        exactCandidate,
        request.policy.mode,
        "manual-selection"
      ),
      reasonCodes,
      Object.freeze(candidatesWithReasons)
    );
  }

  if (request.policy.mode === "local-only") {
    const eligibleCandidates = evaluatedCandidates.filter(
      (candidate) =>
        candidate.evaluation.eligible && candidate.provider.locality === "local"
    );
    const selectedCandidate = chooseBestCandidate(eligibleCandidates);

    if (!selectedCandidate) {
      return buildRoutingDecision(
        catalogSnapshot.catalogVersion,
        request.policy.mode,
        "no-eligible-model",
        null,
        null,
        null,
        false,
        buildNoEligibleExplanation(request.policy.mode),
        freezeReasonCodes("local-only-policy"),
        Object.freeze(evaluatedCandidates.map((candidate) => candidate.evaluation))
      );
    }

    if (selectedCandidate.paidApprovalMissing) {
      const reasonCodes = buildPaidApprovalReasonCodes(
        request.policy.mode,
        selectedCandidate,
        eligibleCandidates
      );

      return buildRoutingDecision(
        catalogSnapshot.catalogVersion,
        request.policy.mode,
        "paid-approval-required",
        null,
        selectedCandidate.model.modelKey,
        selectedCandidate.estimatedCostUsd,
        true,
        buildPaidApprovalExplanation(selectedCandidate, request.policy.mode),
        reasonCodes,
        Object.freeze(
          withSelectionReasonCodes(
            evaluatedCandidates,
            selectedCandidate.model.modelKey,
            reasonCodes
          )
        )
      );
    }

    const reasonCodes = buildSelectedReasonCodes(
      "local-only-policy",
      selectedCandidate,
      eligibleCandidates
    );

    return buildRoutingDecision(
      catalogSnapshot.catalogVersion,
      request.policy.mode,
      "selected",
      selectedCandidate.model.modelKey,
      null,
      selectedCandidate.estimatedCostUsd,
      false,
      buildSelectedExplanation(
        selectedCandidate,
        request.policy.mode,
        "local-only-policy"
      ),
      reasonCodes,
      Object.freeze(
        withSelectionReasonCodes(
          evaluatedCandidates,
          selectedCandidate.model.modelKey,
          reasonCodes
        )
      )
    );
  }

  if (request.policy.mode === "free-only") {
    const eligibleCandidates = filterByCostClass(evaluatedCandidates, [
      "local-no-provider-token-charge",
      "free-tier",
    ]);
    const selectedCandidate = chooseBestCandidate(eligibleCandidates);

    if (!selectedCandidate) {
      return buildRoutingDecision(
        catalogSnapshot.catalogVersion,
        request.policy.mode,
        "no-eligible-model",
        null,
        null,
        null,
        false,
        buildNoEligibleExplanation(request.policy.mode),
        freezeReasonCodes("free-only-policy"),
        Object.freeze(evaluatedCandidates.map((candidate) => candidate.evaluation))
      );
    }

    const reasonCodes = buildSelectedReasonCodes(
      "free-only-policy",
      selectedCandidate,
      eligibleCandidates
    );

    return buildRoutingDecision(
      catalogSnapshot.catalogVersion,
      request.policy.mode,
      "selected",
      selectedCandidate.model.modelKey,
      null,
      selectedCandidate.estimatedCostUsd,
      false,
      buildSelectedExplanation(
        selectedCandidate,
        request.policy.mode,
        "free-only-policy"
      ),
      reasonCodes,
      Object.freeze(
        withSelectionReasonCodes(
          evaluatedCandidates,
          selectedCandidate.model.modelKey,
          reasonCodes
        )
      )
    );
  }

  if (request.policy.mode === "free-first") {
    const eligibleLocalCandidates = evaluatedCandidates.filter(isLocalFreeFirstCandidate);
    const selectedLocalCandidate = chooseBestCandidate(eligibleLocalCandidates);

    if (selectedLocalCandidate) {
      const reasonCodes = buildSelectedReasonCodes(
        "free-first-local",
        selectedLocalCandidate,
        eligibleLocalCandidates
      );

      return buildRoutingDecision(
        catalogSnapshot.catalogVersion,
        request.policy.mode,
        "selected",
        selectedLocalCandidate.model.modelKey,
        null,
        selectedLocalCandidate.estimatedCostUsd,
        false,
        buildSelectedExplanation(
          selectedLocalCandidate,
          request.policy.mode,
          "free-first-local"
        ),
        reasonCodes,
        Object.freeze(
          withSelectionReasonCodes(
            evaluatedCandidates,
            selectedLocalCandidate.model.modelKey,
            reasonCodes
          )
        )
      );
    }

    const eligibleFreeCandidates = evaluatedCandidates.filter(isFreeTierCandidate);
    const selectedFreeCandidate = chooseBestCandidate(eligibleFreeCandidates);

    if (selectedFreeCandidate) {
      const reasonCodes = buildSelectedReasonCodes(
        "free-first-free",
        selectedFreeCandidate,
        eligibleFreeCandidates
      );

      return buildRoutingDecision(
        catalogSnapshot.catalogVersion,
        request.policy.mode,
        "selected",
        selectedFreeCandidate.model.modelKey,
        null,
        selectedFreeCandidate.estimatedCostUsd,
        false,
        buildSelectedExplanation(
          selectedFreeCandidate,
          request.policy.mode,
          "free-first-free"
        ),
        reasonCodes,
        Object.freeze(
          withSelectionReasonCodes(
            evaluatedCandidates,
            selectedFreeCandidate.model.modelKey,
            reasonCodes
          )
        )
      );
    }

    const eligiblePaidCandidates = evaluatedCandidates.filter(isPaidCandidate);
    const selectedPaidCandidate = chooseBestCandidate(eligiblePaidCandidates);

    if (!selectedPaidCandidate) {
      return buildRoutingDecision(
        catalogSnapshot.catalogVersion,
        request.policy.mode,
        "no-eligible-model",
        null,
        null,
        null,
        false,
        buildNoEligibleExplanation(request.policy.mode),
        freezeReasonCodes(),
        Object.freeze(evaluatedCandidates.map((candidate) => candidate.evaluation))
      );
    }

    if (selectedPaidCandidate.paidApprovalMissing) {
      const reasonCodes = buildPaidApprovalReasonCodes(
        request.policy.mode,
        selectedPaidCandidate,
        eligiblePaidCandidates
      );

      return buildRoutingDecision(
        catalogSnapshot.catalogVersion,
        request.policy.mode,
        "paid-approval-required",
        null,
        selectedPaidCandidate.model.modelKey,
        selectedPaidCandidate.estimatedCostUsd,
        true,
        buildPaidApprovalExplanation(selectedPaidCandidate, request.policy.mode),
        reasonCodes,
        Object.freeze(
          withSelectionReasonCodes(
            evaluatedCandidates,
            selectedPaidCandidate.model.modelKey,
            reasonCodes
          )
        )
      );
    }

    const reasonCodes = buildSelectedReasonCodes(
      "free-first-paid",
      selectedPaidCandidate,
      eligiblePaidCandidates
    );

    return buildRoutingDecision(
      catalogSnapshot.catalogVersion,
      request.policy.mode,
      "selected",
      selectedPaidCandidate.model.modelKey,
      null,
      selectedPaidCandidate.estimatedCostUsd,
      false,
      buildSelectedExplanation(
        selectedPaidCandidate,
        request.policy.mode,
        "free-first-paid"
      ),
      reasonCodes,
      Object.freeze(
        withSelectionReasonCodes(
          evaluatedCandidates,
          selectedPaidCandidate.model.modelKey,
          reasonCodes
        )
      )
    );
  }

  const eligibleCandidates = evaluatedCandidates.filter(isAutomaticEligible);
  const selectedCandidate = chooseBestCandidate(eligibleCandidates);

  if (!selectedCandidate) {
    return buildRoutingDecision(
      catalogSnapshot.catalogVersion,
      request.policy.mode,
      "no-eligible-model",
      null,
      null,
      null,
      false,
      buildNoEligibleExplanation(request.policy.mode),
      freezeReasonCodes("best-within-budget"),
      Object.freeze(evaluatedCandidates.map((candidate) => candidate.evaluation))
    );
  }

  if (selectedCandidate.paidApprovalMissing) {
    const reasonCodes = buildPaidApprovalReasonCodes(
      request.policy.mode,
      selectedCandidate,
      eligibleCandidates
    );

    return buildRoutingDecision(
      catalogSnapshot.catalogVersion,
      request.policy.mode,
      "paid-approval-required",
      null,
      selectedCandidate.model.modelKey,
      selectedCandidate.estimatedCostUsd,
      true,
      buildPaidApprovalExplanation(selectedCandidate, request.policy.mode),
      reasonCodes,
      Object.freeze(
        withSelectionReasonCodes(
          evaluatedCandidates,
          selectedCandidate.model.modelKey,
          reasonCodes
        )
      )
    );
  }

  const reasonCodes = buildSelectedReasonCodes(
    "best-within-budget",
    selectedCandidate,
    eligibleCandidates
  );

  return buildRoutingDecision(
    catalogSnapshot.catalogVersion,
    request.policy.mode,
    "selected",
    selectedCandidate.model.modelKey,
    null,
    selectedCandidate.estimatedCostUsd,
    false,
    buildSelectedExplanation(
      selectedCandidate,
      request.policy.mode,
      "best-within-budget"
    ),
    reasonCodes,
    Object.freeze(
      withSelectionReasonCodes(
        evaluatedCandidates,
        selectedCandidate.model.modelKey,
        reasonCodes
      )
    )
  );
}
