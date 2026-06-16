"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildLaunchGoNoGoReviewModel, buildLaunchGoNoGoReviewStableKey } from "@/lib/codexforge/launch-go-no-go-review";

const LAUNCH_GO_NO_GO_REVIEW_MARKERS = [
  "Launch go/no-go review",
  "Launch go/no-go review does not launch or approve automatically",
  "Go/no-go decisions require explicit operator approval",
  "Unresolved go/no-go blockers stay blocked",
  "Decision groups",
  "No-go criteria checklist",
] as const;

export function LaunchGoNoGoReviewPanel() {
  const model = buildLaunchGoNoGoReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.launchGoNoGoReviews.map((review) => ({
    id: buildLaunchGoNoGoReviewStableKey("launch-go-no-go-review-card", review.id),
    title: review.launchGoNoGoIdentity,
    status: review.status,
    sections: [
      { label: "Decision groups", items: review.decisionGroups },
      { label: "Go criteria checklist", items: review.goCriteriaChecklist },
      { label: "No-go criteria checklist", items: review.noGoCriteriaChecklist },
      { label: "Operator approval checklist", items: review.operatorApprovalChecklist },
      { label: "Escalation checklist", items: review.escalationChecklist },
      { label: "Denied go/no-go actions", items: review.deniedGoNoGoActions },
      { label: "Unresolved decision blockers", items: review.unresolvedDecisionBlockers },
    ],
    routes: [review.rollbackPlanRoute, review.monitoringPlanRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 604"
      title="Launch go/no-go review"
      subtitle="Launch go/no-go review keeps the operator decision visible without launching or approving automatically. Launch go/no-go review does not launch or approve automatically. Go/no-go decisions require explicit operator approval, and unresolved go/no-go blockers stay blocked."
      primaryLabel="Review go/no-go"
      anchor="launch-go-no-go-review"
      plainEnglishTitle="Plain-English launch go/no-go review"
      plainEnglishCopy="This page reviews launch go/no-go identity, decision groups, go criteria, no-go criteria, operator approval checklist, escalation checklist, denied actions, unresolved blockers, rollback route, monitoring route, and next recommended action. It is review-only and approval required. It does not launch Daily Beta 1, approve automatically, pass go/no-go, persist approval decisions, send packets, execute workflows, trigger rollback, start monitoring jobs, call providers, call local models, call connectors, create automations, mutate files, or claim actual server/build/project execution works."
      language={model.language}
      markers={[...LAUNCH_GO_NO_GO_REVIEW_MARKERS]}
      links={[
        { href: "/launch-rollback-plan-review", label: "Rollback plan" },
        { href: "/launch-monitoring-plan-review", label: "Monitoring plan" },
        { href: "/launch-approval-packet", label: "Approval packet" },
        { href: "/launch-boundary-audit", label: "Boundary audit" },
      ]}
      cards={cards}
      advancedSummary="Advanced launch go/no-go review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.launchGoNoGoReviews.map((review) => review.advancedLaunchGoNoGoReviewDetails)}
      advancedCopy="advanced launch go/no-go review details collapsed/secondary. This route remains review-only and approval required. It never launches Daily Beta 1, approves go/no-go automatically, persists decisions, executes workflows, calls providers, calls local models, calls connectors, creates automations, mutates files, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="launch-go-no-go-review buildLaunchGoNoGoReviewStableKey LaunchGoNoGoReviewPanel"
    />
  );
}
