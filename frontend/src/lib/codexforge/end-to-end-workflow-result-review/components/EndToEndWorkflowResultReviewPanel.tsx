"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildEndToEndWorkflowResultReviewModel, buildEndToEndWorkflowResultReviewStableKey } from "@/lib/codexforge/end-to-end-workflow-result-review";

const END_TO_END_WORKFLOW_RESULT_REVIEW_MARKERS = [
  "End-to-end workflow result review",
  "End-to-end workflow result review does not store live outputs",
  "End-to-end results require operator review before use",
  "Unsafe end-to-end results remain blocked",
  "Result groups",
  "Acceptance checklist",
] as const;

export function EndToEndWorkflowResultReviewPanel() {
  const model = buildEndToEndWorkflowResultReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.resultReviews.map((review) => ({
    id: buildEndToEndWorkflowResultReviewStableKey("end-to-end-workflow-result-review-card", review.id),
    title: review.endToEndWorkflowResultIdentity,
    status: review.status,
    sections: [
      { label: "Result groups", items: review.resultGroups },
      { label: "Acceptance checklist", items: review.acceptanceChecklist },
      { label: "Rejection checklist", items: review.rejectionChecklist },
      { label: "Reuse checklist", items: review.reuseChecklist },
      { label: "Safety review checklist", items: review.safetyReviewChecklist },
      { label: "Denied result actions", items: review.deniedResultActions },
      { label: "Unresolved result blockers", items: review.unresolvedResultBlockers },
    ],
    routes: [review.endToEndRecoveryReviewRoute, review.endToEndHardeningRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 550"
      title="Workflow result review"
      subtitle="End-to-end workflow result review checks outputs before reuse in plain English. End-to-end workflow result review does not store live outputs. End-to-end results require operator review before use, and unsafe end-to-end results remain blocked."
      primaryLabel="Review result"
      anchor="end-to-end-workflow-result-review"
      plainEnglishTitle="Plain-English end-to-end workflow result review"
      plainEnglishCopy="This page reviews end-to-end workflow result identity, Result groups, Acceptance checklist, Rejection checklist, Reuse checklist, Safety review checklist, Denied result actions, Unresolved result blockers, End-to-end recovery review route, End-to-end hardening route, and next recommended action. It is review-only, approval required, and it does not store live outputs, ingest results, reuse results automatically, persist approvals, mutate files, mutate memory, auto-promote memory, call providers, call local models, call connectors, or create automations."
      language={model.language}
      markers={[...END_TO_END_WORKFLOW_RESULT_REVIEW_MARKERS]}
      links={[
        { href: "/end-to-end-workflow-evidence-review", label: "Evidence review" },
        { href: "/end-to-end-workflow-recovery-review", label: "Recovery review" },
        { href: "/end-to-end-workflow-hardening-pass", label: "Hardening" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
      ]}
      cards={cards}
      advancedSummary="Advanced result review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.resultReviews.map((review) => review.advancedResultReviewDetails)}
      advancedCopy="advanced result review details collapsed/secondary. This route remains review-only and approval required. It never stores live outputs, ingests results, reuses results automatically, persists approvals, mutates files, mutates memory, auto-promotes memory, calls providers, calls local models, calls connectors, creates automations, or creates an MCP runtime."
      dataScope="end-to-end-workflow-result-review buildEndToEndWorkflowResultReviewStableKey EndToEndWorkflowResultReviewPanel"
    />
  );
}
