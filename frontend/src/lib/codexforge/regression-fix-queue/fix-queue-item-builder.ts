import type {
  RegressionCauseCandidate,
  RegressionClassification,
  RegressionFixCandidate,
  RegressionFixCandidateKind,
  RegressionImpactMap,
  RegressionRiskLevel,
  RegressionRollbackAdvice,
  RegressionSeverity,
  RegressionSignal,
  RegressionSurface,
  RegressionUrgency,
} from "../regression-triage";
import { classifyRegressionFixQueuePriority, scoreRegressionFixQueuePriority } from "./fix-queue-priority";
import {
  buildRegressionFixQueueStableKey,
  clampRegressionFixQueueScore,
  uniqueRegressionFixQueueStrings,
  type RegressionFixQueueItem,
  type RegressionFixQueueItemBuilderInput,
  type RegressionFixQueueState,
} from "./regression-fix-queue-types";

const SEVERITY_RANK: Record<RegressionSeverity, number> = {
  info: 1,
  warning: 2,
  error: 3,
  blocker: 4,
};

const RISK_RANK: Record<RegressionRiskLevel, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

const ROLLBACK_RANK: Record<RegressionUrgency, number> = {
  none: 1,
  low: 2,
  medium: 3,
  high: 4,
  "stop-and-stabilize": 5,
};

function normalizeCauses(input: RegressionFixQueueItemBuilderInput): RegressionCauseCandidate[] {
  return [...(input.suspectedCauses ?? []), ...(input.suspectedCause?.candidates ?? [])];
}

function highestSeverity(
  signals: readonly RegressionSignal[],
  classifications: readonly RegressionClassification[]
): RegressionSeverity {
  const severities = [...signals.map((signal) => signal.severity), ...classifications.map((item) => item.severity)];
  return severities.sort((left, right) => SEVERITY_RANK[right] - SEVERITY_RANK[left])[0] ?? "warning";
}

function highestRisk(candidate: RegressionFixCandidate | null, impactMap: RegressionImpactMap | null): RegressionRiskLevel {
  const risks = [
    candidate?.risk,
    ...(impactMap?.items.map((item) => item.riskLevel) ?? []),
  ].filter((risk): risk is RegressionRiskLevel => Boolean(risk));
  return risks.sort((left, right) => RISK_RANK[right] - RISK_RANK[left])[0] ?? "medium";
}

function highestRollbackUrgency(input: RegressionFixQueueItemBuilderInput): RegressionUrgency {
  const classificationUrgencies = (input.classifications ?? []).flatMap((item) => [item.rollbackUrgency, item.fixUrgency]);
  const urgencies = [input.rollbackAdvice?.urgency, ...classificationUrgencies].filter(
    (urgency): urgency is RegressionUrgency => Boolean(urgency)
  );
  return urgencies.sort((left, right) => ROLLBACK_RANK[right] - ROLLBACK_RANK[left])[0] ?? "none";
}

function inferCandidateKind(
  candidate: RegressionFixCandidate | null,
  signals: readonly RegressionSignal[],
  classifications: readonly RegressionClassification[],
  causes: readonly RegressionCauseCandidate[]
): RegressionFixCandidateKind {
  if (candidate?.kind) return candidate.kind;
  const text = [
    ...signals.map((signal) => `${signal.type} ${signal.title} ${signal.snippet}`),
    ...classifications.map((item) => `${item.regressionClass} ${item.suspectedArea}`),
    ...causes.map((cause) => `${cause.title} ${cause.reason}`),
  ].join(" ").toLowerCase();

  if (text.includes("duplicate-react-key") || text.includes("duplicate key") || text.includes("key generation")) return "key-stability-fix";
  if (text.includes("export") || text.includes("import") || text.includes("client/server")) return "export-contract-fix";
  if (text.includes("type") || text.includes("typescript")) return "type-contract-fix";
  if (text.includes("smoke") || text.includes("missing marker")) return "smoke-marker-fix";
  if (text.includes("layout") || text.includes("overflow") || text.includes("minwidth")) return "layout-polish-fix";
  if (text.includes("policy") || text.includes("approval boundary")) return "policy-boundary-fix";
  if (text.includes("route") || text.includes("/api/")) return "route-contract-fix";
  if (text.includes("mojibake") || text.includes("encoding")) return "encoding-cleanup-fix";
  return "investigation-needed";
}

function titleFor(kind: RegressionFixCandidateKind): string {
  switch (kind) {
    case "key-stability-fix":
      return "Queue stable key regression fix";
    case "export-contract-fix":
      return "Queue import/export regression fix";
    case "type-contract-fix":
      return "Queue type contract regression fix";
    case "smoke-marker-fix":
      return "Queue smoke marker regression fix";
    case "layout-polish-fix":
      return "Queue layout regression fix";
    case "policy-boundary-fix":
      return "Queue policy boundary regression fix";
    case "route-contract-fix":
      return "Queue route contract regression fix";
    case "encoding-cleanup-fix":
      return "Queue encoding regression fix";
    case "investigation-needed":
      return "Queue manual regression investigation";
  }
}

function actionFor(kind: RegressionFixCandidateKind): string {
  switch (kind) {
    case "key-stability-fix":
      return "Inspect mapped collections and preview a stable key repair only.";
    case "export-contract-fix":
      return "Inspect current imports and exports, then preview the smallest contract repair.";
    case "type-contract-fix":
      return "Inspect producer and consumer types, then preview the smallest typed contract repair.";
    case "smoke-marker-fix":
      return "Inspect the smoke marker and rendered or exported marker before composing a preview diff.";
    case "layout-polish-fix":
      return "Inspect the affected layout and preview overflow, min-width, wrap, or sizing guards.";
    case "policy-boundary-fix":
      return "Inspect approval and mutation boundaries before preparing a reviewed preview.";
    case "route-contract-fix":
      return "Inspect route inputs, outputs, and UI callers before previewing a contract repair.";
    case "encoding-cleanup-fix":
      return "Inspect visible text and source literals, then preview an encoding cleanup.";
    case "investigation-needed":
      return "Collect current failed output and inspect impacted files before preparing a fix candidate.";
  }
}

function averageConfidence(
  candidate: RegressionFixCandidate | null,
  signals: readonly RegressionSignal[],
  classifications: readonly RegressionClassification[]
): number {
  const values = [
    candidate?.confidence,
    ...signals.map((signal) => signal.confidence),
    ...classifications.map((classification) => classification.confidence),
  ].filter((value): value is number => typeof value === "number" && Number.isFinite(value));

  if (values.length === 0) return 0.42;
  return Math.round((values.reduce((sum, value) => sum + clampRegressionFixQueueScore(value), 0) / values.length) * 100) / 100;
}

function selectPrimaryFile(
  candidate: RegressionFixCandidate | null,
  causes: readonly RegressionCauseCandidate[],
  impactMap: RegressionImpactMap | null,
  signals: readonly RegressionSignal[],
  investigationNeeded: boolean
): string {
  const firstTarget =
    candidate?.targetFiles[0] ??
    causes.flatMap((cause) => cause.relatedFiles)[0] ??
    impactMap?.items[0]?.filePath ??
    signals.flatMap((signal) => signal.relatedFiles)[0];

  return firstTarget ?? (investigationNeeded ? "investigation-needed" : "verify-current-file-target");
}

function buildQueueState(args: {
  input: RegressionFixQueueItemBuilderInput;
  hasSignalOrManualNote: boolean;
  targetFiles: readonly string[];
  candidate: RegressionFixCandidate | null;
  confidence: number;
  investigationNeeded: boolean;
  reviewedTriage: boolean;
  operatorReviewed: boolean;
}): RegressionFixQueueState {
  if (args.input.queueState) return args.input.queueState;
  if (!args.hasSignalOrManualNote) return "draft";
  if (args.candidate?.reviewState === "blocked") return "blocked";
  if (args.targetFiles.length === 0 && !args.investigationNeeded) return "blocked";
  if (args.investigationNeeded || args.confidence < 0.45) return "needs-review";
  if (args.reviewedTriage && args.operatorReviewed) return "queued";
  if (args.reviewedTriage || args.candidate?.reviewState === "reviewed") return "reviewed";
  return "needs-review";
}

function sourceRegressionIdFor(
  input: RegressionFixQueueItemBuilderInput,
  signalIds: readonly string[],
  causeIds: readonly string[],
  candidate: RegressionFixCandidate | null
): string {
  return (
    String(input.regressionId ?? "").trim() ||
    signalIds[0] ||
    causeIds[0] ||
    candidate?.candidateId ||
    input.triageSummary?.topSuspectedCause ||
    "manual-regression"
  );
}

export function buildRegressionFixQueueItem(
  input: RegressionFixQueueItemBuilderInput = {}
): RegressionFixQueueItem {
  const signals = input.signals ?? [];
  const classifications = input.classifications ?? [];
  const causes = normalizeCauses(input);
  const candidate = input.fixCandidate ?? input.fixRecommendation?.candidates[0] ?? null;
  const rawConfidence = averageConfidence(candidate, signals, classifications);
  const inferredKind = inferCandidateKind(candidate, signals, classifications, causes);
  const candidateKind = rawConfidence < 0.45 ? "investigation-needed" : inferredKind;
  const investigationNeeded = candidateKind === "investigation-needed" || rawConfidence < 0.45;
  const targetFiles = uniqueRegressionFixQueueStrings([
    ...(candidate?.targetFiles ?? []),
    ...causes.flatMap((cause) => cause.relatedFiles),
    ...(input.impactMap?.items.map((item) => item.filePath) ?? []),
    ...signals.flatMap((signal) => signal.relatedFiles),
  ]);
  const primaryFile = selectPrimaryFile(candidate, causes, input.impactMap ?? null, signals, investigationNeeded);
  const sourceSignalIds = uniqueRegressionFixQueueStrings([
    ...(candidate?.evidenceIds ?? []),
    ...signals.map((signal) => signal.id),
  ]);
  const sourceCauseIds = uniqueRegressionFixQueueStrings([
    ...(candidate?.causeIds ?? []),
    ...causes.map((cause) => cause.causeId),
  ]);
  const sourceRegressionId = sourceRegressionIdFor(input, sourceSignalIds, sourceCauseIds, candidate);
  const hasManualNote = Boolean(String(input.manualOperatorNote ?? "").trim());
  const hasSignalOrManualNote = sourceSignalIds.length > 0 || signals.length > 0 || hasManualNote;
  const inferredReviewedTriage =
    candidate?.reviewState === "reviewed" ||
    signals.some((signal) => signal.reviewState === "reviewed") ||
    classifications.some((classification) => !classification.reviewRequired);
  const reviewedTriage = input.reviewedTriage ?? inferredReviewedTriage;
  const operatorReviewed = input.operatorReviewed ?? (reviewedTriage && candidate?.reviewState === "reviewed");
  const severity = highestSeverity(signals, classifications);
  const riskLevel = highestRisk(candidate, input.impactMap ?? null);
  const affectedSurfaces = uniqueRegressionFixQueueStrings(
    (input.impactMap?.items.map((item) => item.routeOrSurface) ?? []) as string[]
  ) as RegressionSurface[];
  const smokeFailureCount = signals.filter((signal) => signal.type === "smoke-failure").length;
  const buildFailurePresent = signals.some((signal) => signal.type === "build-failure" || signal.type === "type-error");
  const browserWarningPresent = signals.some((signal) => signal.type === "browser-warning" || signal.type === "duplicate-react-key");
  const suggestedSmokeScripts = uniqueRegressionFixQueueStrings([
    ...(candidate?.suggestedTests ?? []),
    ...(input.impactMap?.items.flatMap((item) => item.suggestedSmokeScripts) ?? []),
    ...signals.map((signal) => signal.relatedSmokeScript),
    ...(buildFailurePresent ? ["npm run build"] : []),
  ]);
  const rollbackAdviceAttached = Boolean((input.rollbackAdvice?.options.length ?? 0) > 0 || candidate?.rollbackReminder);
  const rollbackReminder =
    candidate?.rollbackReminder ??
    input.rollbackAdvice?.summary[0] ??
    "Rollback advice required before Safe Patch Preview handoff.";
  const staleEvidenceWarnings = uniqueRegressionFixQueueStrings([
    ...(input.staleEvidenceWarnings ?? []),
    ...signals.filter((signal) => signal.stale).map((signal) => `${signal.id} is stale or weak evidence.`),
  ]);
  const blockedWarnings = uniqueRegressionFixQueueStrings(input.blockedWarnings ?? []);
  const warnings = uniqueRegressionFixQueueStrings([
    ...staleEvidenceWarnings,
    ...blockedWarnings,
    ...(rawConfidence < 0.45 ? ["Low confidence marks this queue item investigation-needed."] : []),
    ...(targetFiles.length === 0 && !investigationNeeded ? ["Target file required unless investigation-needed."] : []),
    ...(!rollbackAdviceAttached ? ["Rollback advice required before handoff."] : []),
    ...(suggestedSmokeScripts.length === 0 ? ["Suggested smoke scripts required before handoff."] : []),
    "Current files must be verified before any previewed edit.",
  ]);
  const queueState = buildQueueState({
    input,
    hasSignalOrManualNote,
    targetFiles,
    candidate,
    confidence: rawConfidence,
    investigationNeeded,
    reviewedTriage,
    operatorReviewed,
  });
  const baseItem: RegressionFixQueueItem = {
    id: `regression-fix-queue:${buildRegressionFixQueueStableKey(sourceRegressionId, primaryFile, candidateKind)}`,
    sourceRegressionId,
    sourceSignalIds,
    sourceCauseIds,
    title: candidate?.title ?? titleFor(candidateKind),
    goal:
      input.triageSummary?.nextSafeAction ??
      `Review ${candidate?.title ?? titleFor(candidateKind)} for ${primaryFile} before Safe Patch Preview.`,
    candidateKind,
    targetFiles,
    primaryFile,
    suspectedCause: causes[0] ? `${causes[0].title}: ${causes[0].reason}` : "Suspected cause must be verified against current files.",
    recommendedAction: candidate?.recommendedAction ?? actionFor(candidateKind),
    riskLevel,
    confidence: rawConfidence,
    severity,
    affectedSurfaces,
    smokeFailureCount,
    buildFailurePresent,
    browserWarningPresent,
    rollbackUrgency: highestRollbackUrgency(input),
    priority: "normal",
    priorityScore: 0,
    queueState,
    suggestedSmokeScripts,
    rollbackReminder,
    rollbackAdviceAttached,
    suggestedVerificationAttached: suggestedSmokeScripts.length > 0,
    safePatchPreviewRequired: true,
    previewDiffComposerReadiness:
      !input.previewDiffComposerAvailable && input.previewDiffComposerAvailable !== undefined
        ? "blocked"
        : targetFiles.length === 0 && !investigationNeeded
          ? "needs-file"
          : operatorReviewed
            ? "ready"
            : "needs-review",
    noAutoFixGuarantee: "Regression Fix Queue does not auto-fix regressions.",
    noAutoRollbackGuarantee: "Regression Fix Queue does not auto-rollback regressions.",
    noMutationGuarantee:
      "Regression Fix Queue performs no file writes, no command execution, no apply-diff, no broker-execution, and no Brain graph mutation.",
    reviewedTriage,
    operatorReviewed,
    userSelected: Boolean(input.userSelected),
    manualOperatorNote: String(input.manualOperatorNote ?? "").trim() || null,
    investigationNeeded,
    safePatchPreviewAvailable: input.safePatchPreviewAvailable ?? true,
    previewDiffComposerAvailable: input.previewDiffComposerAvailable ?? true,
    verificationIngestionAvailable: input.verificationIngestionAvailable ?? true,
    patchPreviewQueueAvailable: input.patchPreviewQueueAvailable ?? true,
    groundedFixRecommendationAvailable: input.groundedFixRecommendationAvailable ?? true,
    regressionTriageAvailable: input.regressionTriageAvailable ?? true,
    staleEvidenceWarnings,
    blockedWarnings,
    warnings,
    evidenceIsContextNotProof: true,
    currentFilesMustBeVerified: true,
  };
  const priorityScore = scoreRegressionFixQueuePriority(baseItem);
  const priority = classifyRegressionFixQueuePriority(
    priorityScore,
    queueState === "blocked" || blockedWarnings.length > 0
  );

  return { ...baseItem, priorityScore, priority };
}

export function buildRegressionFixQueueItems(
  inputOrInputs: RegressionFixQueueItemBuilderInput | readonly RegressionFixQueueItemBuilderInput[] = []
): RegressionFixQueueItem[] {
  const inputs: readonly RegressionFixQueueItemBuilderInput[] = Array.isArray(inputOrInputs) ? inputOrInputs : [inputOrInputs];
  return inputs.flatMap((input) => {
    const candidates: readonly (RegressionFixCandidate | null)[] = input.fixCandidate
      ? [input.fixCandidate]
      : input.fixRecommendation?.candidates.length
        ? input.fixRecommendation.candidates
        : [null];

    return candidates.map((fixCandidate) => buildRegressionFixQueueItem({ ...input, fixCandidate }));
  });
}

export function summarizeRegressionFixQueueItem(item: RegressionFixQueueItem): string[] {
  return [
    `${item.title} is queued from regression ${item.sourceRegressionId}.`,
    `Primary file is ${item.primaryFile}; ${item.targetFiles.length} target files are visible.`,
    `Priority is ${item.priority} at ${item.priorityScore}; confidence is ${item.confidence}; risk is ${item.riskLevel}.`,
    "No auto-fix, no auto-rollback, no file writes, no command execution, and Safe Patch Preview is required.",
  ];
}
