import { explainGroundedFixConfidence, scoreGroundedFixConfidence } from "./fix-confidence";
import { classifyGroundedFixRisk, scoreGroundedFixRisk } from "./fix-risk-model";
import {
  buildGroundedFixStableKey,
  uniqueGroundedFixStrings,
  type GroundedFixCandidate,
  type GroundedFixCandidateInput,
  type GroundedFixCandidateKind,
  type GroundedFixSignal,
} from "./grounded-fix-types";

function inferKind(signals: readonly GroundedFixSignal[], goal: string): GroundedFixCandidateKind {
  const text = `${goal} ${signals.map((signal) => `${signal.title} ${signal.summary} ${signal.filePath ?? ""}`).join(" ")}`.toLowerCase();
  if (signals.some((signal) => signal.weakWarnings.length > 0 || signal.staleWarnings.length > 0) && signals.length < 2) return "investigation-needed";
  if (text.includes("smoke") || text.includes(".ps1")) return "smoke-fix";
  if (text.includes("policy") || text.includes("safety") || text.includes("blocked")) return "safety-fix";
  if (text.includes("route") || text.includes("/api/")) return "routing-fix";
  if (text.includes("state") || text.includes("hook")) return "state-fix";
  if (text.includes("type") || text.includes("typing")) return "typing-fix";
  if (text.includes(".tsx") || text.includes("ui") || text.includes("component")) return "UI-fix";
  if (text.includes("docs") || text.includes("readme")) return "docs-fix";
  if (text.includes("refactor")) return "refactor-recommendation";
  return "bug-fix";
}

function signalsForFile(signals: readonly GroundedFixSignal[], filePath: string | null): GroundedFixSignal[] {
  if (!filePath) return [...signals];
  return signals.filter((signal) => signal.filePath === filePath || !signal.filePath);
}

export function buildGroundedFixCandidate(args: {
  signals?: readonly GroundedFixSignal[];
  manualGoal?: string | null;
  relatedTasks?: readonly string[] | null;
  relatedMemories?: readonly string[] | null;
  missingTestPlan?: boolean | null;
}): GroundedFixCandidate {
  const signals = [...(args.signals ?? [])];
  const targetFiles = uniqueGroundedFixStrings(signals.map((signal) => signal.filePath));
  const goal = args.manualGoal?.trim() || signals[0]?.summary || "Investigate grounded fix recommendation";
  const kind = inferKind(signals, goal);
  const confidence = scoreGroundedFixConfidence({
    signals,
    hasTestPlan: !args.missingTestPlan,
    readOnlyExecutionSucceeded: signals.some((signal) => signal.sourceType === "read-only-step-execution"),
    memoryReviewed: signals.some((signal) => signal.sourceType === "evidence-memory"),
  });
  const riskScore = scoreGroundedFixRisk({
    targetFiles,
    signals,
    missingTestPlan: args.missingTestPlan,
    mutationRequired: true,
    broadImpact: targetFiles.length > 3,
  });
  const riskLevel = classifyGroundedFixRisk(riskScore);
  const id = buildGroundedFixStableKey("grounded-fix-candidate", kind, goal, targetFiles.join("|") || "manual");
  const reviewState = confidence < 0.45 || kind === "investigation-needed" ? "investigation-needed" : riskLevel === "critical" ? "needs-review" : "recommended";

  return {
    id,
    kind,
    title: kind === "investigation-needed" ? "Investigate before recommending a fix" : `Recommend ${kind}`,
    goal,
    targetFiles,
    suspectedRootCause: signals[0]?.summary || "Root cause is not proven; evidence is context, not proof.",
    recommendedApproach: "Inspect current files first, verify evidence against current source, then produce a preview diff only through Safe Patch Preview.",
    evidenceIds: uniqueGroundedFixStrings(signals.map((signal) => signal.sourceId)),
    sourceSignalIds: uniqueGroundedFixStrings(signals.map((signal) => signal.id)),
    relatedMemories: uniqueGroundedFixStrings([...(args.relatedMemories ?? []), ...signals.filter((signal) => signal.sourceType === "evidence-memory").map((signal) => signal.sourceId)]),
    relatedTasks: uniqueGroundedFixStrings([...(args.relatedTasks ?? []), ...signals.filter((signal) => signal.sourceType === "task" || signal.sourceType === "execution-readiness").map((signal) => signal.sourceId)]),
    relatedRisks: uniqueGroundedFixStrings(signals.flatMap((signal) => signal.riskHints)),
    patchPreviewReadiness: targetFiles.length > 0 ? "needs-current-file-verification" : "blocked",
    confidence,
    confidenceReasons: explainGroundedFixConfidence({ signals, score: confidence, hasTestPlan: !args.missingTestPlan }),
    riskLevel,
    riskScore,
    reviewState,
    nextSafeAction: "Review recommendation, inspect current files, then prepare Safe Patch Preview handoff.",
  };
}

export function buildGroundedFixCandidates(input: GroundedFixCandidateInput = {}): GroundedFixCandidate[] {
  const signals = [...(input.signals ?? [])];
  if (signals.length === 0) {
    return input.manualGoal
      ? [buildGroundedFixCandidate({ ...input, signals: [] })]
      : [];
  }
  const files = uniqueGroundedFixStrings(signals.map((signal) => signal.filePath));
  const grouped = files.length > 0 ? files.map((filePath) => signalsForFile(signals, filePath)) : [signals];
  return grouped.map((group) => buildGroundedFixCandidate({ ...input, signals: group }));
}

export function summarizeGroundedFixCandidates(candidates: readonly GroundedFixCandidate[]): string[] {
  const investigation = candidates.filter((candidate) => candidate.reviewState === "investigation-needed").length;
  return [
    `${candidates.length} grounded fix candidates built.`,
    `${investigation} candidates require investigation before a fix recommendation.`,
    "All candidates are preview-only and route edits through Safe Patch Preview.",
  ];
}
