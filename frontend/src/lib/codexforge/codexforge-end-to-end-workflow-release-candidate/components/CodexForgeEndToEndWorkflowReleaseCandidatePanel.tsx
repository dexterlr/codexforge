"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildCodexForgeEndToEndWorkflowReleaseCandidateModel, buildCodexForgeEndToEndWorkflowReleaseCandidateStableKey } from "@/lib/codexforge/codexforge-end-to-end-workflow-release-candidate";

const CODEXFORGE_END_TO_END_WORKFLOW_RELEASE_CANDIDATE_MARKERS = [
  "CodexForge end-to-end workflow release candidate",
  "CodexForge end-to-end workflow release candidate does not go live",
  "End-to-end release requires explicit operator approval",
  "Unresolved end-to-end release blockers stay blocked",
  "End-to-end release candidate identity",
  "Workflow plan trial status",
] as const;

export function CodexForgeEndToEndWorkflowReleaseCandidatePanel() {
  const model = buildCodexForgeEndToEndWorkflowReleaseCandidateModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.releaseCandidates.map((candidate) => ({
    id: buildCodexForgeEndToEndWorkflowReleaseCandidateStableKey("codexforge-end-to-end-workflow-release-candidate-card", candidate.id),
    title: candidate.endToEndReleaseCandidateIdentity,
    status: candidate.status,
    sections: [
      { label: "Test execution status", items: candidate.testExecutionStatus },
      { label: "Workflow plan trial status", items: candidate.workflowPlanTrialStatus },
      { label: "Evidence/result/recovery/hardening status", items: candidate.evidenceResultRecoveryHardeningStatus },
      { label: "Boundary readiness status", items: candidate.boundaryReadinessStatus },
      { label: "Denied release candidate actions", items: candidate.deniedReleaseCandidateActions },
      { label: "Unresolved release candidate blockers", items: candidate.unresolvedReleaseCandidateBlockers },
    ],
    routes: [candidate.nextControlledRolloutRoute, candidate.checkpointDocsRoute],
    nextRecommendedAction: candidate.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 553"
      title="End-to-end release candidate"
      subtitle="CodexForge end-to-end workflow release candidate summarizes first end-to-end readiness in plain English without going live. CodexForge end-to-end workflow release candidate does not go live. End-to-end release requires explicit operator approval, and unresolved end-to-end release blockers stay blocked."
      primaryLabel="Review RC"
      anchor="codexforge-end-to-end-workflow-release-candidate"
      plainEnglishTitle="Plain-English CodexForge end-to-end workflow release candidate"
      plainEnglishCopy="This page reviews end-to-end release candidate identity, Test execution status, Workflow plan trial status, Evidence/result/recovery/hardening status, Boundary readiness status, Denied release candidate actions, Unresolved release candidate blockers, Next controlled rollout route, Checkpoint docs route, and next recommended action. It is review-only, approval required, and it does not go live, execute workflows, execute rollout, approve release automatically, persist release settings, persist approval decisions, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...CODEXFORGE_END_TO_END_WORKFLOW_RELEASE_CANDIDATE_MARKERS]}
      links={[
        { href: "/end-to-end-workflow-hardening-pass", label: "Hardening" },
        { href: "/end-to-end-workflow-recovery-review", label: "Recovery review" },
        { href: "/daily-beta-1-controlled-rollout-plan", label: "Rollout plan" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
      ]}
      cards={cards}
      advancedSummary="Advanced release candidate details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.releaseCandidates.map((candidate) => candidate.advancedReleaseCandidateDetails)}
      advancedCopy="advanced release candidate details collapsed/secondary. This route remains review-only and approval required. It never goes live, executes workflows, executes rollout, approves release automatically, persists release settings, persists approval decisions, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="codexforge-end-to-end-workflow-release-candidate buildCodexForgeEndToEndWorkflowReleaseCandidateStableKey CodexForgeEndToEndWorkflowReleaseCandidatePanel"
    />
  );
}
