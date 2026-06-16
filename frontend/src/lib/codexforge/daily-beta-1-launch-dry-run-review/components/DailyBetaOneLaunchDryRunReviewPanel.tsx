"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneLaunchDryRunReviewModel, buildDailyBetaOneLaunchDryRunReviewStableKey } from "@/lib/codexforge/daily-beta-1-launch-dry-run-review";

const DAILY_BETA_ONE_LAUNCH_DRY_RUN_REVIEW_MARKERS = [
  "Daily Beta 1 launch dry-run review",
  "Daily Beta 1 launch dry-run review does not run launch dry-runs",
  "Launch dry-runs require explicit operator approval",
  "Unapproved launch dry-run paths remain blocked",
  "Dry-run groups",
  "Rollback checklist",
] as const;

export function DailyBetaOneLaunchDryRunReviewPanel() {
  const model = buildDailyBetaOneLaunchDryRunReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.launchDryRunReviews.map((launchDryRunReview) => ({
    id: buildDailyBetaOneLaunchDryRunReviewStableKey("daily-beta-1-launch-dry-run-review-card", launchDryRunReview.id),
    title: launchDryRunReview.launchDryRunReviewIdentity,
    status: launchDryRunReview.status,
    sections: [
      { label: "Dry-run groups", items: launchDryRunReview.dryRunGroups },
      { label: "Boundary dry-run checklist", items: launchDryRunReview.boundaryDryRunChecklist },
      { label: "Rollout dry-run checklist", items: launchDryRunReview.rolloutDryRunChecklist },
      { label: "Operator decision checklist", items: launchDryRunReview.operatorDecisionChecklist },
      { label: "Rollback checklist", items: launchDryRunReview.rollbackChecklist },
      { label: "Denied dry-run actions", items: launchDryRunReview.deniedDryRunActions },
      { label: "Unresolved dry-run blockers", items: launchDryRunReview.unresolvedDryRunBlockers },
    ],
    routes: [launchDryRunReview.launchEvidenceReviewRoute, launchDryRunReview.launchResultReviewRoute],
    nextRecommendedAction: launchDryRunReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 597"
      title="Daily Beta 1 launch dry-run review"
      subtitle="Daily Beta 1 launch dry-run review reviews launch dry-run steps in plain English without running them. Daily Beta 1 launch dry-run review does not run launch dry-runs. Launch dry-runs require explicit operator approval, and unapproved launch dry-run paths remain blocked."
      primaryLabel="Review dry-run plan"
      anchor="daily-beta-1-launch-dry-run-review"
      plainEnglishTitle="Plain-English Daily Beta 1 launch dry-run review"
      plainEnglishCopy="This page reviews launch dry-run review identity, dry-run groups, boundary dry-run checklist, rollout dry-run checklist, operator decision checklist, rollback checklist, denied dry-run actions, unresolved dry-run blockers, launch evidence review route, launch result review route, and next recommended action. It is review-only and approval required. It does not run launch dry-runs, execute workflows, launch Daily Beta 1, go live, approve launch, ingest evidence, persist results, create background jobs, create polling loops, send notifications, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_LAUNCH_DRY_RUN_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-launch-evidence-review", label: "Evidence review" },
        { href: "/daily-beta-1-launch-result-review", label: "Result review" },
        { href: "/daily-beta-1-launch-readiness-summary", label: "Launch summary" },
        { href: "/daily-beta-1-release-handoff-final-review", label: "Final handoff" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 launch dry-run review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.launchDryRunReviews.map((launchDryRunReview) => launchDryRunReview.advancedDailyBetaOneLaunchDryRunReviewDetails)}
      advancedCopy="advanced Daily Beta 1 launch dry-run review details collapsed/secondary. This route remains review-only and approval required. It never runs launch dry-runs, executes workflows, launches Daily Beta 1, goes live, approves launch, ingests evidence, persists results, creates background jobs, creates polling loops, sends notifications, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-launch-dry-run-review buildDailyBetaOneLaunchDryRunReviewStableKey DailyBetaOneLaunchDryRunReviewPanel"
    />
  );
}
