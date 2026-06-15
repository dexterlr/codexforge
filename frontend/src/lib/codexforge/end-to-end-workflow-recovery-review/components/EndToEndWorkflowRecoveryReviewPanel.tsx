"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildEndToEndWorkflowRecoveryReviewModel, buildEndToEndWorkflowRecoveryReviewStableKey } from "@/lib/codexforge/end-to-end-workflow-recovery-review";

const END_TO_END_WORKFLOW_RECOVERY_REVIEW_MARKERS = [
  "End-to-end workflow recovery review",
  "End-to-end workflow recovery review does not trigger recovery",
  "Recovery actions require explicit operator approval",
  "Unsafe end-to-end recovery shortcuts stay blocked",
  "Recovery groups",
  "Failure categories",
] as const;

export function EndToEndWorkflowRecoveryReviewPanel() {
  const model = buildEndToEndWorkflowRecoveryReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.recoveryReviews.map((review) => ({
    id: buildEndToEndWorkflowRecoveryReviewStableKey("end-to-end-workflow-recovery-review-card", review.id),
    title: review.endToEndWorkflowRecoveryIdentity,
    status: review.status,
    sections: [
      { label: "Recovery groups", items: review.recoveryGroups },
      { label: "Failure categories", items: review.failureCategories },
      { label: "Rollback checklist", items: review.rollbackChecklist },
      { label: "Escalation checklist", items: review.escalationChecklist },
      { label: "Operator decision checklist", items: review.operatorDecisionChecklist },
      { label: "Denied recovery actions", items: review.deniedRecoveryActions },
      { label: "Unresolved recovery blockers", items: review.unresolvedRecoveryBlockers },
    ],
    routes: [review.endToEndHardeningRoute, review.releaseCandidateRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 551"
      title="Workflow recovery review"
      subtitle="End-to-end workflow recovery review reviews recovery options in plain English without triggering them. End-to-end workflow recovery review does not trigger recovery. Recovery actions require explicit operator approval, and unsafe end-to-end recovery shortcuts stay blocked."
      primaryLabel="Review recovery"
      anchor="end-to-end-workflow-recovery-review"
      plainEnglishTitle="Plain-English end-to-end workflow recovery review"
      plainEnglishCopy="This page reviews end-to-end workflow recovery identity, Recovery groups, Failure categories, Rollback checklist, Escalation checklist, Operator decision checklist, Denied recovery actions, Unresolved recovery blockers, End-to-end hardening route, Release candidate route, and next recommended action. It is review-only, approval required, and it does not trigger recovery, execute workflows, mutate files, apply patches, run commands, persist decisions, store outputs, mutate memory, call providers, call local models, call connectors, or create automations."
      language={model.language}
      markers={[...END_TO_END_WORKFLOW_RECOVERY_REVIEW_MARKERS]}
      links={[
        { href: "/end-to-end-workflow-result-review", label: "Result review" },
        { href: "/end-to-end-workflow-hardening-pass", label: "Hardening" },
        { href: "/codexforge-end-to-end-workflow-release-candidate", label: "Release candidate" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
      ]}
      cards={cards}
      advancedSummary="Advanced recovery review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.recoveryReviews.map((review) => review.advancedRecoveryReviewDetails)}
      advancedCopy="advanced recovery review details collapsed/secondary. This route remains review-only and approval required. It never triggers recovery, executes workflows, mutates files, applies patches, runs commands, persists decisions, stores outputs, mutates memory, calls providers, calls local models, calls connectors, creates automations, or creates an MCP runtime."
      dataScope="end-to-end-workflow-recovery-review buildEndToEndWorkflowRecoveryReviewStableKey EndToEndWorkflowRecoveryReviewPanel"
    />
  );
}
