"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneLaunchReadinessSummaryModel, buildDailyBetaOneLaunchReadinessSummaryStableKey } from "@/lib/codexforge/daily-beta-1-launch-readiness-summary";

const DAILY_BETA_ONE_LAUNCH_READINESS_SUMMARY_MARKERS = [
  "Daily Beta 1 launch readiness summary",
  "Daily Beta 1 launch readiness summary does not approve launch",
  "Daily Beta 1 launch decisions require explicit operator approval",
  "Unresolved launch readiness blockers stay blocked",
  "Summary groups",
  "Boundary readiness status",
] as const;

export function DailyBetaOneLaunchReadinessSummaryPanel() {
  const model = buildDailyBetaOneLaunchReadinessSummaryModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.launchReadinessSummaries.map((launchReadinessSummary) => ({
    id: buildDailyBetaOneLaunchReadinessSummaryStableKey("daily-beta-1-launch-readiness-summary-card", launchReadinessSummary.id),
    title: launchReadinessSummary.launchReadinessSummaryIdentity,
    status: launchReadinessSummary.status,
    sections: [
      { label: "Summary groups", items: launchReadinessSummary.summaryGroups },
      { label: "Activation lock audit status", items: launchReadinessSummary.activationLockAuditStatus },
      { label: "Final handoff status", items: launchReadinessSummary.finalHandoffStatus },
      { label: "Boundary readiness status", items: launchReadinessSummary.boundaryReadinessStatus },
      { label: "Operator readiness status", items: launchReadinessSummary.operatorReadinessStatus },
      { label: "Denied launch summary actions", items: launchReadinessSummary.deniedLaunchSummaryActions },
      { label: "Unresolved launch summary blockers", items: launchReadinessSummary.unresolvedLaunchSummaryBlockers },
    ],
    routes: [launchReadinessSummary.launchDryRunReviewRoute, launchReadinessSummary.launchEvidenceReviewRoute],
    nextRecommendedAction: launchReadinessSummary.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 596"
      title="Daily Beta 1 launch readiness summary"
      subtitle="Daily Beta 1 launch readiness summary summarizes launch readiness in plain English without approving launch. Daily Beta 1 launch readiness summary does not approve launch. Daily Beta 1 launch decisions require explicit operator approval, and unresolved launch readiness blockers stay blocked."
      primaryLabel="Review launch summary"
      anchor="daily-beta-1-launch-readiness-summary"
      plainEnglishTitle="Plain-English Daily Beta 1 launch readiness summary"
      plainEnglishCopy="This page reviews launch readiness summary identity, summary groups, activation lock audit status, final handoff status, boundary readiness status, operator readiness status, denied launch summary actions, unresolved launch summary blockers, launch dry-run review route, launch evidence review route, and next recommended action. It is review-only and approval required. It does not approve launch, launch Daily Beta 1, go live, persist launch settings, run launch dry-runs, ingest evidence, store results, execute workflows, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_LAUNCH_READINESS_SUMMARY_MARKERS]}
      links={[
        { href: "/daily-beta-1-launch-dry-run-review", label: "Dry-run review" },
        { href: "/daily-beta-1-launch-evidence-review", label: "Evidence review" },
        { href: "/daily-beta-1-activation-lock-audit", label: "Lock audit" },
        { href: "/daily-beta-1-release-handoff-final-review", label: "Final handoff" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 launch readiness summary details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.launchReadinessSummaries.map((launchReadinessSummary) => launchReadinessSummary.advancedDailyBetaOneLaunchReadinessSummaryDetails)}
      advancedCopy="advanced Daily Beta 1 launch readiness summary details collapsed/secondary. This route remains review-only and approval required. It never approves launch, launches Daily Beta 1, goes live, persists launch settings, runs launch dry-runs, ingests evidence, stores results, executes workflows, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-launch-readiness-summary buildDailyBetaOneLaunchReadinessSummaryStableKey DailyBetaOneLaunchReadinessSummaryPanel"
    />
  );
}
