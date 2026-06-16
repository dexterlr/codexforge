"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneLaunchResultReviewModel, buildDailyBetaOneLaunchResultReviewStableKey } from "@/lib/codexforge/daily-beta-1-launch-result-review";

const DAILY_BETA_ONE_LAUNCH_RESULT_REVIEW_MARKERS = [
  "Daily Beta 1 launch result review",
  "Daily Beta 1 launch result review does not store live outputs",
  "Launch results require operator review before use",
  "Unsafe launch results remain blocked",
  "Result groups",
  "Acceptance checklist",
] as const;

export function DailyBetaOneLaunchResultReviewPanel() {
  const model = buildDailyBetaOneLaunchResultReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.launchResultReviews.map((launchResultReview) => ({
    id: buildDailyBetaOneLaunchResultReviewStableKey("daily-beta-1-launch-result-review-card", launchResultReview.id),
    title: launchResultReview.launchResultReviewIdentity,
    status: launchResultReview.status,
    sections: [
      { label: "Result groups", items: launchResultReview.resultGroups },
      { label: "Acceptance checklist", items: launchResultReview.acceptanceChecklist },
      { label: "Rejection checklist", items: launchResultReview.rejectionChecklist },
      { label: "Reuse checklist", items: launchResultReview.reuseChecklist },
      { label: "Safety review checklist", items: launchResultReview.safetyReviewChecklist },
      { label: "Denied result actions", items: launchResultReview.deniedResultActions },
      { label: "Unresolved result blockers", items: launchResultReview.unresolvedResultBlockers },
    ],
    routes: [launchResultReview.launchCandidateRoute, launchResultReview.launchReadinessLockRoute],
    nextRecommendedAction: launchResultReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 599"
      title="Daily Beta 1 launch result review"
      subtitle="Daily Beta 1 launch result review reviews launch outputs in plain English before reuse. Daily Beta 1 launch result review does not store live outputs. Launch results require operator review before use, and unsafe launch results remain blocked."
      primaryLabel="Review launch results"
      anchor="daily-beta-1-launch-result-review"
      plainEnglishTitle="Plain-English Daily Beta 1 launch result review"
      plainEnglishCopy="This page reviews launch result review identity, result groups, acceptance checklist, rejection checklist, reuse checklist, safety review checklist, denied result actions, unresolved result blockers, launch candidate route, launch readiness lock route, and next recommended action. It is review-only and approval required. It does not store live outputs, ingest results, persist results, reuse results automatically, launch Daily Beta 1, approve launch, lock launch readiness, run dry-runs, call providers, call local models, call connectors, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_LAUNCH_RESULT_REVIEW_MARKERS]}
      links={[
        { href: "/codexforge-daily-beta-1-launch-candidate", label: "Launch candidate" },
        { href: "/daily-beta-1-launch-readiness-lock", label: "Launch lock" },
        { href: "/daily-beta-1-launch-evidence-review", label: "Evidence review" },
        { href: "/daily-beta-1-launch-dry-run-review", label: "Dry-run review" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 launch result review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.launchResultReviews.map((launchResultReview) => launchResultReview.advancedDailyBetaOneLaunchResultReviewDetails)}
      advancedCopy="advanced Daily Beta 1 launch result review details collapsed/secondary. This route remains review-only and approval required. It never stores live outputs, ingests results, persists results, reuses results automatically, launches Daily Beta 1, approves launch, locks launch readiness, runs dry-runs, calls providers, calls local models, calls connectors, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-launch-result-review buildDailyBetaOneLaunchResultReviewStableKey DailyBetaOneLaunchResultReviewPanel"
    />
  );
}
