"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFirstRealEndToEndWorkflowTrialReviewModel, buildFirstRealEndToEndWorkflowTrialReviewStableKey } from "@/lib/codexforge/first-real-end-to-end-workflow-trial-review";

const FIRST_REAL_END_TO_END_WORKFLOW_TRIAL_REVIEW_MARKERS = [
  "First real end-to-end workflow trial review",
  "First real end-to-end workflow trial review does not execute workflows",
  "End-to-end trial decisions require explicit operator approval",
  "Unresolved end-to-end trial blockers stay blocked",
  "Trial review groups",
  "Boundary readiness checklist",
] as const;

export function FirstRealEndToEndWorkflowTrialReviewPanel() {
  const model = buildFirstRealEndToEndWorkflowTrialReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.workflowTrialReviews.map((review) => ({
    id: buildFirstRealEndToEndWorkflowTrialReviewStableKey("first-real-end-to-end-workflow-trial-review-card", review.id),
    title: review.endToEndWorkflowTrialReviewIdentity,
    status: review.status,
    sections: [
      { label: "Trial review groups", items: review.trialReviewGroups },
      { label: "Boundary readiness checklist", items: review.boundaryReadinessChecklist },
      { label: "Approval/evidence/result/recovery checklist", items: review.approvalEvidenceResultRecoveryChecklist },
      { label: "Operator decision checklist", items: review.operatorDecisionChecklist },
      { label: "Denied trial review actions", items: review.deniedTrialReviewActions },
      { label: "Unresolved trial review blockers", items: review.unresolvedTrialReviewBlockers },
    ],
    routes: [review.endToEndEvidenceReviewRoute, review.endToEndResultReviewRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 548"
      title="Workflow trial review"
      subtitle="First real end-to-end workflow trial review reviews readiness and decisions in plain English without executing workflows. First real end-to-end workflow trial review does not execute workflows. End-to-end trial decisions require explicit operator approval, and unresolved end-to-end trial blockers stay blocked."
      primaryLabel="Review trial"
      anchor="first-real-end-to-end-workflow-trial-review"
      plainEnglishTitle="Plain-English first real end-to-end workflow trial review"
      plainEnglishCopy="This page reviews end-to-end workflow trial review identity, Trial review groups, Boundary readiness checklist, Approval/evidence/result/recovery checklist, Operator decision checklist, Denied trial review actions, Unresolved trial review blockers, End-to-end evidence review route, End-to-end result review route, and next recommended action. It is review-only, approval required, and it does not execute workflows, accept results automatically, store outputs, trigger recovery, apply hardening, call providers, call local models, call connectors, create automations, mutate files, or mutate memory."
      language={model.language}
      markers={[...FIRST_REAL_END_TO_END_WORKFLOW_TRIAL_REVIEW_MARKERS]}
      links={[
        { href: "/first-real-end-to-end-workflow-trial-plan", label: "Trial plan" },
        { href: "/end-to-end-workflow-evidence-review", label: "Evidence review" },
        { href: "/end-to-end-workflow-result-review", label: "Result review" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
      ]}
      cards={cards}
      advancedSummary="Advanced workflow trial review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.workflowTrialReviews.map((review) => review.advancedWorkflowTrialReviewDetails)}
      advancedCopy="advanced workflow trial review details collapsed/secondary. This route remains review-only and approval required. It never executes workflows, accepts results automatically, stores outputs, triggers recovery, applies hardening, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, or creates an MCP runtime."
      dataScope="first-real-end-to-end-workflow-trial-review buildFirstRealEndToEndWorkflowTrialReviewStableKey FirstRealEndToEndWorkflowTrialReviewPanel"
    />
  );
}
