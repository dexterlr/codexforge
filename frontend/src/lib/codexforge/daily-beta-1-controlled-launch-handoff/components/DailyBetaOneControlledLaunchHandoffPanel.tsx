"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneControlledLaunchHandoffModel, buildDailyBetaOneControlledLaunchHandoffStableKey } from "@/lib/codexforge/daily-beta-1-controlled-launch-handoff";

const DAILY_BETA_ONE_CONTROLLED_LAUNCH_HANDOFF_MARKERS = [
  "Daily Beta 1 controlled launch handoff",
  "Daily Beta 1 controlled launch handoff does not send or apply handoff automatically",
  "Controlled launch handoff requires explicit operator approval",
  "Unresolved controlled launch handoff blockers stay blocked",
  "Handoff groups",
  "Controlled launch limitation summary",
] as const;

export function DailyBetaOneControlledLaunchHandoffPanel() {
  const model = buildDailyBetaOneControlledLaunchHandoffModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.dailyBetaOneControlledLaunchHandoffs.map((handoff) => ({
    id: buildDailyBetaOneControlledLaunchHandoffStableKey("daily-beta-1-controlled-launch-handoff-card", handoff.id),
    title: handoff.controlledLaunchHandoffIdentity,
    status: handoff.status,
    sections: [
      { label: "Handoff groups", items: handoff.handoffGroups },
      { label: "Operator runbook summary", items: handoff.operatorRunbookSummary },
      { label: "Controlled launch limitation summary", items: handoff.controlledLaunchLimitationSummary },
      { label: "Rollback/monitoring summary", items: handoff.rollbackMonitoringSummary },
      { label: "Validation checklist", items: handoff.validationChecklist },
      { label: "Denied handoff actions", items: handoff.deniedHandoffActions },
      { label: "Unresolved handoff blockers", items: handoff.unresolvedHandoffBlockers },
    ],
    routes: [handoff.controlledLaunchReadinessLockRoute, handoff.goNoGoCandidateRoute],
    nextRecommendedAction: handoff.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 616"
      title="Daily Beta 1 controlled launch handoff"
      subtitle="Daily Beta 1 controlled launch handoff packages guidance without sending or applying it. Daily Beta 1 controlled launch handoff does not send or apply handoff automatically. Controlled launch handoff requires explicit operator approval, and unresolved controlled launch handoff blockers stay blocked."
      primaryLabel="Review handoff"
      anchor="daily-beta-1-controlled-launch-handoff"
      plainEnglishTitle="Plain-English Daily Beta 1 controlled launch handoff"
      plainEnglishCopy="This page reviews controlled launch handoff identity, handoff groups, operator runbook summary, controlled launch limitation summary, rollback/monitoring summary, validation checklist, denied handoff actions, unresolved handoff blockers, controlled launch readiness lock route, go/no-go candidate route, and next recommended action. It is review-only and approval required. It does not send handoff, apply handoff, export files automatically, mutate files, mutate memory, execute workflows, launch Daily Beta 1, go live, approve launch, lock readiness, call providers, call local models, call connectors, create automations, store outputs, or store credentials. Actual project/server building still requires approved file, command, local runtime, package, and deployment execution boundaries."
      language={model.language}
      markers={[...DAILY_BETA_ONE_CONTROLLED_LAUNCH_HANDOFF_MARKERS]}
      links={[
        { href: "/daily-beta-1-controlled-launch-readiness-lock", label: "Controlled lock" },
        { href: "/codexforge-daily-beta-1-go-no-go-candidate", label: "Go/no-go candidate" },
        { href: "/daily-beta-1-controlled-launch-candidate", label: "Controlled candidate" },
        { href: "/launch-support-runbook-review", label: "Support runbook" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 controlled launch handoff details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.dailyBetaOneControlledLaunchHandoffs.map((handoff) => handoff.advancedDailyBetaOneControlledLaunchHandoffDetails)}
      advancedCopy="advanced Daily Beta 1 controlled launch handoff details collapsed/secondary. This route remains review-only and approval required. It never sends handoff, applies handoff, exports files automatically, mutates files, mutates memory, executes workflows, launches Daily Beta 1, goes live, approves launch, locks readiness, calls providers, calls local models, calls connectors, creates automations, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-controlled-launch-handoff buildDailyBetaOneControlledLaunchHandoffStableKey DailyBetaOneControlledLaunchHandoffPanel"
    />
  );
}
