"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFirstControlledLaunchReviewModel, buildFirstControlledLaunchReviewStableKey } from "@/lib/codexforge/first-controlled-launch-review";

const FIRST_CONTROLLED_LAUNCH_REVIEW_MARKERS = [
  "First controlled launch review",
  "First controlled launch review does not execute launch",
  "Controlled launch decisions require explicit operator approval",
  "Unresolved controlled launch blockers stay blocked",
  "Launch review groups",
  "Boundary approval checklist",
] as const;

export function FirstControlledLaunchReviewPanel() {
  const model = buildFirstControlledLaunchReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.firstControlledLaunchReviews.map((launchReview) => ({
    id: buildFirstControlledLaunchReviewStableKey("first-controlled-launch-review-card", launchReview.id),
    title: launchReview.firstControlledLaunchReviewIdentity,
    status: launchReview.status,
    sections: [
      { label: "Launch review groups", items: launchReview.launchReviewGroups },
      { label: "Launch plan status", items: launchReview.launchPlanStatus },
      { label: "Boundary approval checklist", items: launchReview.boundaryApprovalChecklist },
      { label: "Operator decision checklist", items: launchReview.operatorDecisionChecklist },
      { label: "Rollback monitoring checklist", items: launchReview.rollbackMonitoringChecklist },
      { label: "Denied launch review actions", items: launchReview.deniedLaunchReviewActions },
      { label: "Unresolved launch review blockers", items: launchReview.unresolvedLaunchReviewBlockers },
    ],
    routes: [launchReview.controlledLaunchEvidenceRoute, launchReview.controlledLaunchResultRoute],
    nextRecommendedAction: launchReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 610"
      title="First controlled launch review"
      subtitle="First controlled launch review checks controlled launch readiness and result posture without executing launch. First controlled launch review does not execute launch. Controlled launch decisions require explicit operator approval, and unresolved controlled launch blockers stay blocked."
      primaryLabel="Review controlled launch"
      anchor="first-controlled-launch-review"
      plainEnglishTitle="Plain-English first controlled launch review"
      plainEnglishCopy="This page reviews first controlled launch review identity, launch review groups, launch plan status, boundary approval checklist, operator decision checklist, rollback/monitoring checklist, denied launch review actions, unresolved blockers, controlled launch evidence route, controlled launch result route, and next recommended action. It is review-only and approval required. It does not execute launch, proceed automatically, persist launch decisions, launch Daily Beta 1, go live, call providers, call local models, call connectors, create automations, trigger recovery, apply hardening, send handoff, lock readiness, mutate files, mutate memory, store outputs, or store credentials. Actual project/server building still requires approved file, command, local runtime, package, and deployment execution boundaries."
      language={model.language}
      markers={[...FIRST_CONTROLLED_LAUNCH_REVIEW_MARKERS]}
      links={[
        { href: "/first-controlled-launch-evidence-review", label: "Evidence review" },
        { href: "/first-controlled-launch-result-review", label: "Result review" },
        { href: "/first-controlled-launch-plan", label: "Launch plan" },
        { href: "/codexforge-daily-beta-1-go-no-go-candidate", label: "Go/no-go candidate" },
      ]}
      cards={cards}
      advancedSummary="Advanced first controlled launch review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.firstControlledLaunchReviews.map((launchReview) => launchReview.advancedFirstControlledLaunchReviewDetails)}
      advancedCopy="advanced first controlled launch review details collapsed/secondary. This route remains review-only and approval required. It never executes launch, proceeds automatically, persists launch decisions, launches Daily Beta 1, goes live, calls providers, calls local models, calls connectors, creates automations, triggers recovery, applies hardening, sends handoff, locks readiness, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="first-controlled-launch-review buildFirstControlledLaunchReviewStableKey FirstControlledLaunchReviewPanel"
    />
  );
}
