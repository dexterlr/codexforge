import { buildMvpAdapterSelection, selectRecommendedMvpAdapter } from "./mvp-adapter-selection";
import { buildMvpApprovalRequirements } from "./mvp-approval-requirements";
import { buildMvpArtifactReviewLoop } from "./mvp-artifact-review-loop";
import { buildDefaultRealCreativeMvpCandidates } from "./mvp-candidate";
import { buildMvpExecutionPath } from "./mvp-execution-path";
import { buildMvpKillSwitchRequirements } from "./mvp-kill-switch-requirements";
import { buildMvpOutputBoundary } from "./mvp-output-boundary";
import { buildMvpReadinessDecision } from "./mvp-readiness-decision";
import { buildMvpSafetyRequirements } from "./mvp-safety-requirements";
import { buildRealCreativeMvpUserFlow } from "./mvp-user-flow";
import type {
  RealCreativeExecutorMvpDesignModel,
  RealCreativeMvpCandidate,
  RealCreativeMvpSummary,
} from "./real-creative-mvp-types";

export function buildRealCreativeMvpSummary(input: {
  candidates: readonly RealCreativeMvpCandidate[];
  recommendedCandidate: RealCreativeMvpCandidate;
  blockerCount: number;
  warningCount: number;
  userFlowReady: boolean;
}): RealCreativeMvpSummary {
  const summary: Omit<RealCreativeMvpSummary, "summary"> = {
    candidateCount: input.candidates.length,
    recommendedCandidateId: input.recommendedCandidate.candidateId,
    recommendedCandidateLabel: input.recommendedCandidate.label,
    blockerCount: input.blockerCount,
    warningCount: input.warningCount,
    executionAllowed: false,
    futureMvpCandidate: input.blockerCount === 0,
    userFlowReady: input.userFlowReady,
    nextSafeAction: "Review MVP candidate",
  };

  return { ...summary, summary: summarizeRealCreativeMvpSession(summary) };
}

export function buildRealCreativeExecutorMvpDesignModel(): RealCreativeExecutorMvpDesignModel {
  const candidates = buildDefaultRealCreativeMvpCandidates();
  const recommendedCandidate = selectRecommendedMvpAdapter(candidates);
  const adapterSelection = buildMvpAdapterSelection(candidates);
  const executionPath = buildMvpExecutionPath(recommendedCandidate.candidateId);
  const safetyRequirements = buildMvpSafetyRequirements(recommendedCandidate.candidateId);
  const approvalRequirements = buildMvpApprovalRequirements(recommendedCandidate.candidateId);
  const outputBoundary = buildMvpOutputBoundary(recommendedCandidate.candidateId);
  const killSwitchRequirements = buildMvpKillSwitchRequirements(recommendedCandidate.candidateId);
  const artifactReviewLoop = buildMvpArtifactReviewLoop(recommendedCandidate.candidateId);
  const warningCount =
    safetyRequirements.warningCount +
    outputBoundary.warningCount +
    killSwitchRequirements.warningCount;
  const blockerCount =
    safetyRequirements.blockerCount +
    approvalRequirements.blockerCount +
    outputBoundary.blockerCount +
    killSwitchRequirements.blockerCount;
  const readinessDecision = buildMvpReadinessDecision({
    selectedCandidateId: recommendedCandidate.candidateId,
    blockerCount,
    warningCount,
  });
  const userFlow = buildRealCreativeMvpUserFlow();
  const summary = buildRealCreativeMvpSummary({
    candidates,
    recommendedCandidate,
    blockerCount,
    warningCount,
    userFlowReady: userFlow.ready,
  });

  return {
    candidates,
    adapterSelection,
    executionPath,
    safetyRequirements,
    approvalRequirements,
    outputBoundary,
    killSwitchRequirements,
    artifactReviewLoop,
    readinessDecision,
    userFlow,
    summary,
  };
}

export function summarizeRealCreativeMvpSession(
  summary: Omit<RealCreativeMvpSummary, "summary"> | RealCreativeMvpSummary
): string[] {
  return [
    `Candidate count: ${summary.candidateCount}.`,
    `Recommended candidate: ${summary.recommendedCandidateLabel} (${summary.recommendedCandidateId}).`,
    `Blockers: ${summary.blockerCount}; warnings: ${summary.warningCount}.`,
    `Execution allowed false: ${String(summary.executionAllowed)}.`,
    `Future MVP candidate: ${String(summary.futureMvpCandidate)}.`,
    `User flow ready: ${String(summary.userFlowReady)}.`,
    `Next safe action: ${summary.nextSafeAction}.`,
  ];
}
