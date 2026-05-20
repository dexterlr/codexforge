import type { MvpReadinessDecision, MvpReadinessDecisionReason } from "./real-creative-mvp-types";

export function buildMvpReadinessDecisionReason(input: MvpReadinessDecisionReason): MvpReadinessDecisionReason {
  return input;
}

export function buildMvpReadinessDecision(input: {
  selectedCandidateId?: string;
  blockerCount?: number;
  warningCount?: number;
  uxStillBusy?: boolean;
} = {}): MvpReadinessDecision {
  const selectedCandidateId = input.selectedCandidateId ?? "artifact-capture-only";
  const blockers = input.blockerCount && input.blockerCount > 0 ? ["Resolve safety blockers before implementation."] : [];
  const warnings = [
    "Future executor must enforce output path and stop boundary before real render.",
    ...(input.warningCount && input.warningCount > 0 ? ["Warnings require next-phase implementation review."] : []),
  ];
  const requiredNextPhase = input.uxStillBusy
    ? "Phase 73 User-Friendly Product Simplification"
    : "Phase 73.5 Real Executor MVP Implementation Plan";
  const decision: Omit<MvpReadinessDecision, "summary"> = {
    decisionId: "real-creative-mvp-readiness-decision",
    selectedCandidateId,
    mvpRecommended: blockers.length === 0,
    executionAllowed: false,
    futurePhaseCandidate: blockers.length === 0,
    blockers,
    warnings,
    requiredNextPhase,
    recommendedNextAction: input.uxStillBusy
      ? "Simplify the creative workflow before implementation."
      : "Review MVP candidate, then plan the artifact-capture-only implementation boundary.",
    reasons: [
      buildMvpReadinessDecisionReason({ reasonId: "smallest-safe-mvp", label: "smallest safe MVP", status: "satisfied", detail: "artifact-capture-only has the smallest blast radius." }),
      buildMvpReadinessDecisionReason({ reasonId: "execution-allowed-false", label: "executionAllowed false in Phase 72", status: "satisfied", detail: "Phase 72 designs the path only." }),
      buildMvpReadinessDecisionReason({ reasonId: "mixed-pipeline-rejected", label: "mixed-pipeline rejected", status: "satisfied", detail: "First MVP must be single-adapter and bounded." }),
      buildMvpReadinessDecisionReason({ reasonId: "implementation-blocked", label: "real execution blocked", status: "warning", detail: "Future implementation needs guarded stop and output enforcement." }),
    ],
  };

  return { ...decision, summary: summarizeMvpReadinessDecision(decision) };
}

export function summarizeMvpReadinessDecision(decision: Omit<MvpReadinessDecision, "summary"> | MvpReadinessDecision): string[] {
  return [
    `Selected candidate: ${decision.selectedCandidateId}.`,
    `MVP recommended: ${String(decision.mvpRecommended)}.`,
    `Execution allowed false in Phase 72: ${String(decision.executionAllowed)}.`,
    `Future phase candidate: ${String(decision.futurePhaseCandidate)}.`,
    `Required next phase: ${decision.requiredNextPhase}.`,
  ];
}
