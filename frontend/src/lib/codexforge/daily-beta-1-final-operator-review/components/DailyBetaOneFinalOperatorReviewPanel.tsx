"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneFinalOperatorReviewModel, buildDailyBetaOneFinalOperatorReviewStableKey } from "@/lib/codexforge/daily-beta-1-final-operator-review";

const DAILY_BETA_ONE_FINAL_OPERATOR_REVIEW_MARKERS = [
  "Daily Beta 1 final operator review",
  "Daily Beta 1 final operator review does not sign off automatically",
  "Final operator signoff requires explicit operator approval",
  "Unresolved final operator blockers stay blocked",
  "Operator review groups",
  "Support rollback checklist",
] as const;

export function DailyBetaOneFinalOperatorReviewPanel() {
  const model = buildDailyBetaOneFinalOperatorReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.finalOperatorReviews.map((finalOperatorReview) => ({
    id: buildDailyBetaOneFinalOperatorReviewStableKey("daily-beta-1-final-operator-review-card", finalOperatorReview.id),
    title: finalOperatorReview.finalOperatorReviewIdentity,
    status: finalOperatorReview.status,
    sections: [
      { label: "Operator review groups", items: finalOperatorReview.operatorReviewGroups },
      { label: "Operator checklist", items: finalOperatorReview.operatorChecklist },
      { label: "Support rollback checklist", items: finalOperatorReview.supportRollbackChecklist },
      { label: "Approval boundary checklist", items: finalOperatorReview.approvalBoundaryChecklist },
      { label: "Handoff checklist", items: finalOperatorReview.handoffChecklist },
      { label: "Denied operator review actions", items: finalOperatorReview.deniedOperatorReviewActions },
      { label: "Unresolved final operator blockers", items: finalOperatorReview.unresolvedOperatorReviewBlockers },
    ],
    routes: [finalOperatorReview.finalRegressionReviewRoute, finalOperatorReview.finalRecoveryReviewRoute],
    nextRecommendedAction: finalOperatorReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 581"
      title="Daily Beta 1 final operator review"
      subtitle="Daily Beta 1 final operator review reviews operator readiness in plain English without signing off automatically. Daily Beta 1 final operator review does not sign off automatically. Final operator signoff requires explicit operator approval, and unresolved final operator blockers stay blocked."
      primaryLabel="Review operator readiness"
      anchor="daily-beta-1-final-operator-review"
      plainEnglishTitle="Plain-English Daily Beta 1 final operator review"
      plainEnglishCopy="This page reviews final operator review identity, operator review groups, operator checklist, support rollback checklist, approval boundary checklist, handoff checklist, denied operator review actions, unresolved operator review blockers, final regression review route, final recovery review route, and next recommended action. It is review-only, approval required, and it does not sign off automatically, activate Daily Beta 1, send handoff, execute workflows, run tests, trigger recovery, apply hardening, call providers, call local models, call connectors, create automations, mutate files, mutate memory, persist approvals, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_FINAL_OPERATOR_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-final-regression-review", label: "Regression" },
        { href: "/daily-beta-1-final-recovery-review", label: "Recovery" },
        { href: "/codexforge-daily-beta-1-final-candidate", label: "Final candidate" },
        { href: "/daily-beta-release-candidate-summary", label: "Summary" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 final operator review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.finalOperatorReviews.map((finalOperatorReview) => finalOperatorReview.advancedDailyBetaOneFinalOperatorReviewDetails)}
      advancedCopy="advanced Daily Beta 1 final operator review details collapsed/secondary. This route remains review-only and approval required. It never signs off automatically, runs final operator review as a live action from UI, activates Daily Beta 1, sends handoff, executes workflows, runs tests, triggers recovery, applies hardening, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, persists approvals, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-final-operator-review buildDailyBetaOneFinalOperatorReviewStableKey DailyBetaOneFinalOperatorReviewPanel"
    />
  );
}
