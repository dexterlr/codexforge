import {
  buildRegressionTriageStableKey,
  uniqueRegressionStrings,
  type RegressionCauseCandidate,
  type RegressionFixCandidate,
  type RegressionFixCandidateKind,
  type RegressionFixRecommendation,
  type RegressionImpactMap,
  type RegressionRiskLevel,
  type RegressionSignal,
} from "./regression-triage-types";

function isRegressionFixRecommendation(value: readonly RegressionFixCandidate[] | RegressionFixRecommendation): value is RegressionFixRecommendation {
  return !Array.isArray(value);
}

function kindFor(cause: RegressionCauseCandidate | null, signals: readonly RegressionSignal[]): RegressionFixCandidateKind {
  const text = `${cause?.title ?? ""} ${cause?.reason ?? ""} ${signals.map((signal) => `${signal.type} ${signal.title} ${signal.snippet}`).join(" ")}`.toLowerCase();
  if (text.includes("react key generation") || text.includes("duplicate key")) return "key-stability-fix";
  if (text.includes("bad import/export") || text.includes("client/server boundary")) return "export-contract-fix";
  if (text.includes("type contract") || text.includes("typescript")) return "type-contract-fix";
  if (text.includes("smoke expectation") || text.includes("missing marker")) return "smoke-marker-fix";
  if (text.includes("overflow") || text.includes("layout") || text.includes("minwidth")) return "layout-polish-fix";
  if (text.includes("approval boundary") || text.includes("unsafe import") || text.includes("policy")) return "policy-boundary-fix";
  if (text.includes("route") || text.includes("/api/")) return "route-contract-fix";
  if (text.includes("encoding issue") || text.includes("mojibake")) return "encoding-cleanup-fix";
  return "investigation-needed";
}

function titleFor(kind: RegressionFixCandidateKind): string {
  switch (kind) {
    case "key-stability-fix":
      return "Stabilize React list keys";
    case "export-contract-fix":
      return "Repair import/export contract";
    case "type-contract-fix":
      return "Repair type contract";
    case "smoke-marker-fix":
      return "Align smoke marker expectation";
    case "layout-polish-fix":
      return "Add layout overflow guards";
    case "policy-boundary-fix":
      return "Restore approval boundary";
    case "route-contract-fix":
      return "Repair route contract";
    case "encoding-cleanup-fix":
      return "Clean encoded text";
    case "investigation-needed":
      return "Investigate before recommending a fix";
  }
}

function actionFor(kind: RegressionFixCandidateKind): string {
  switch (kind) {
    case "key-stability-fix":
      return "Inspect mapped collections and use stable ids or a stable key helper instead of repeated display text.";
    case "export-contract-fix":
      return "Inspect imports, exports, and client/server boundaries, then preview the smallest contract repair.";
    case "type-contract-fix":
      return "Inspect the current type surface and align producer/consumer shapes.";
    case "smoke-marker-fix":
      return "Inspect the failed smoke assertion and exported or rendered marker before changing either side.";
    case "layout-polish-fix":
      return "Inspect the compact layout and add wrap, minWidth, overflowWrap, or overflow guards where needed.";
    case "policy-boundary-fix":
      return "Inspect safety policy imports and restore the missing approval or mutation boundary.";
    case "route-contract-fix":
      return "Inspect route input/output expectations and preview a minimal route contract repair.";
    case "encoding-cleanup-fix":
      return "Inspect visible text and source literals, then preview an encoding cleanup.";
    case "investigation-needed":
      return "Collect current failed output and inspect impacted files before preparing a fix candidate.";
  }
}

function riskFromImpact(impactMap: RegressionImpactMap): RegressionRiskLevel {
  if (impactMap.items.some((item) => item.riskLevel === "critical")) return "critical";
  if (impactMap.items.some((item) => item.riskLevel === "high")) return "high";
  if (impactMap.items.some((item) => item.riskLevel === "medium")) return "medium";
  return "low";
}

export function buildRegressionFixCandidate(args: {
  cause?: RegressionCauseCandidate | null;
  signals?: readonly RegressionSignal[] | null;
  impactMap?: RegressionImpactMap | null;
} = {}): RegressionFixCandidate {
  const signals = args.signals ?? [];
  const impactMap = args.impactMap ?? { id: "regression-impact-map" as const, items: [], summary: [] };
  const kind = kindFor(args.cause ?? null, signals);
  const targetFiles = uniqueRegressionStrings([
    ...(args.cause?.relatedFiles ?? []),
    ...impactMap.items.map((item) => item.filePath),
    ...signals.flatMap((signal) => signal.relatedFiles),
  ]);
  const confidence = Math.min(1, Math.max(0.28, args.cause?.confidence ?? (signals[0]?.confidence ?? 0.42)));

  return {
    candidateId: buildRegressionTriageStableKey("regression-fix-candidate", kind, args.cause?.causeId ?? "unknown", targetFiles.join("|")),
    kind,
    title: titleFor(kind),
    recommendedAction: actionFor(kind),
    targetFiles,
    evidenceIds: uniqueRegressionStrings(signals.map((signal) => signal.id)),
    causeIds: uniqueRegressionStrings([args.cause?.causeId]),
    confidence,
    risk: riskFromImpact(impactMap),
    safePatchPreviewRequired: true,
    suggestedTests: uniqueRegressionStrings(impactMap.items.flatMap((item) => item.suggestedSmokeScripts)),
    rollbackReminder: "Review rollback advice first; Safe Patch Preview required before any edit.",
    reviewState: kind === "investigation-needed" || confidence < 0.5 ? "needs-review" : "reviewed",
  };
}

export function buildRegressionFixRecommendation(args: {
  signals?: readonly RegressionSignal[] | null;
  causes?: readonly RegressionCauseCandidate[] | null;
  impactMap?: RegressionImpactMap | null;
} = {}): RegressionFixRecommendation {
  const signals = args.signals ?? [];
  const causes = args.causes ?? [];
  const candidates = (causes.length ? causes : [null]).map((cause) =>
    buildRegressionFixCandidate({ cause, signals, impactMap: args.impactMap })
  );
  const deduped = Array.from(new Map(candidates.map((candidate) => [candidate.candidateId, candidate])).values()).sort((a, b) => {
    const riskRank: Record<RegressionRiskLevel, number> = { critical: 0, high: 1, medium: 2, low: 3 };
    return riskRank[a.risk] - riskRank[b.risk] || b.confidence - a.confidence || a.candidateId.localeCompare(b.candidateId);
  });

  return {
    id: "regression-fix-recommendation",
    candidates: deduped,
    summary: summarizeRegressionFixRecommendation(deduped),
  };
}

export function summarizeRegressionFixRecommendation(candidatesOrRecommendation: readonly RegressionFixCandidate[] | RegressionFixRecommendation): string[] {
  const candidates: readonly RegressionFixCandidate[] = isRegressionFixRecommendation(candidatesOrRecommendation)
    ? candidatesOrRecommendation.candidates
    : candidatesOrRecommendation;
  const previewRequired = candidates.filter((candidate) => candidate.safePatchPreviewRequired).length;

  return [
    `${candidates.length} regression fix candidates built.`,
    `${previewRequired} candidates require Safe Patch Preview.`,
    "No regression candidate is auto-applied, auto-fixed, or auto-rolled back.",
  ];
}
