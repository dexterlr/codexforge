"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneReleaseHandoffFinalReviewModel, buildDailyBetaOneReleaseHandoffFinalReviewStableKey } from "@/lib/codexforge/daily-beta-1-release-handoff-final-review";

const DAILY_BETA_ONE_RELEASE_HANDOFF_FINAL_REVIEW_MARKERS = [
  "Daily Beta 1 release handoff final review",
  "Daily Beta 1 release handoff final review does not send or apply handoff automatically",
  "Final release handoff requires explicit operator approval",
  "Unresolved final handoff blockers stay blocked",
  "Handoff groups",
  "Live boundary limitation summary",
] as const;

export function DailyBetaOneReleaseHandoffFinalReviewPanel() {
  const model = buildDailyBetaOneReleaseHandoffFinalReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.releaseHandoffFinalReviews.map((releaseHandoffFinalReview) => ({
    id: buildDailyBetaOneReleaseHandoffFinalReviewStableKey("daily-beta-1-release-handoff-final-review-card", releaseHandoffFinalReview.id),
    title: releaseHandoffFinalReview.releaseHandoffFinalReviewIdentity,
    status: releaseHandoffFinalReview.status,
    sections: [
      { label: "Handoff groups", items: releaseHandoffFinalReview.handoffGroups },
      { label: "Operator runbook summary", items: releaseHandoffFinalReview.operatorRunbookSummary },
      { label: "Final gate summary", items: releaseHandoffFinalReview.finalGateSummary },
      { label: "Live boundary limitation summary", items: releaseHandoffFinalReview.liveBoundaryLimitationSummary },
      { label: "Launch readiness checklist", items: releaseHandoffFinalReview.launchReadinessChecklist },
      { label: "Denied handoff actions", items: releaseHandoffFinalReview.deniedHandoffActions },
      { label: "Unresolved final handoff blockers", items: releaseHandoffFinalReview.unresolvedHandoffBlockers },
    ],
    routes: [releaseHandoffFinalReview.launchReadinessSummaryRoute, releaseHandoffFinalReview.launchDryRunReviewRoute],
    nextRecommendedAction: releaseHandoffFinalReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 595"
      title="Daily Beta 1 release handoff final review"
      subtitle="Daily Beta 1 release handoff final review reviews final handoff guidance in plain English without sending or applying it. Daily Beta 1 release handoff final review does not send or apply handoff automatically. Final release handoff requires explicit operator approval, and unresolved final handoff blockers stay blocked."
      primaryLabel="Review final handoff"
      anchor="daily-beta-1-release-handoff-final-review"
      plainEnglishTitle="Plain-English Daily Beta 1 release handoff final review"
      plainEnglishCopy="This page reviews release handoff final review identity, handoff groups, operator runbook summary, final gate summary, live boundary limitation summary, launch readiness checklist, denied handoff actions, unresolved handoff blockers, launch readiness summary route, launch dry-run review route, and next recommended action. It is review-only and approval required. It does not send handoff, apply handoff, export files automatically, approve launch, launch Daily Beta 1, run launch dry-runs, lock launch readiness, execute workflows, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_RELEASE_HANDOFF_FINAL_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-launch-readiness-summary", label: "Launch summary" },
        { href: "/daily-beta-1-launch-dry-run-review", label: "Dry-run review" },
        { href: "/daily-beta-1-activation-lock-audit", label: "Lock audit" },
        { href: "/daily-beta-1-activation-readiness-lock", label: "Activation lock" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 release handoff final review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.releaseHandoffFinalReviews.map((releaseHandoffFinalReview) => releaseHandoffFinalReview.advancedDailyBetaOneReleaseHandoffFinalReviewDetails)}
      advancedCopy="advanced Daily Beta 1 release handoff final review details collapsed/secondary. This route remains review-only and approval required. It never sends handoff, applies handoff, exports files automatically, approves launch, launches Daily Beta 1, runs launch dry-runs, locks launch readiness, executes workflows, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-release-handoff-final-review buildDailyBetaOneReleaseHandoffFinalReviewStableKey DailyBetaOneReleaseHandoffFinalReviewPanel"
    />
  );
}
