"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFirstControlledLaunchRecoveryReviewModel, buildFirstControlledLaunchRecoveryReviewStableKey } from "@/lib/codexforge/first-controlled-launch-recovery-review";

const FIRST_CONTROLLED_LAUNCH_RECOVERY_REVIEW_MARKERS = [
  "First controlled launch recovery review",
  "First controlled launch recovery review does not trigger recovery",
  "Controlled launch recovery actions require explicit operator approval",
  "Unsafe controlled launch recovery shortcuts stay blocked",
  "Recovery groups",
  "Launch failure categories",
] as const;

export function FirstControlledLaunchRecoveryReviewPanel() {
  const model = buildFirstControlledLaunchRecoveryReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.firstControlledLaunchRecoveryReviews.map((recoveryReview) => ({
    id: buildFirstControlledLaunchRecoveryReviewStableKey("first-controlled-launch-recovery-review-card", recoveryReview.id),
    title: recoveryReview.controlledLaunchRecoveryIdentity,
    status: recoveryReview.status,
    sections: [
      { label: "Recovery groups", items: recoveryReview.recoveryGroups },
      { label: "Launch failure categories", items: recoveryReview.launchFailureCategories },
      { label: "Rollback checklist", items: recoveryReview.rollbackChecklist },
      { label: "Escalation checklist", items: recoveryReview.escalationChecklist },
      { label: "Operator decision checklist", items: recoveryReview.operatorDecisionChecklist },
      { label: "Denied recovery actions", items: recoveryReview.deniedRecoveryActions },
      { label: "Unresolved recovery blockers", items: recoveryReview.unresolvedRecoveryBlockers },
    ],
    routes: [recoveryReview.controlledLaunchHardeningRoute, recoveryReview.controlledLaunchCandidateRoute],
    nextRecommendedAction: recoveryReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 613"
      title="First controlled launch recovery review"
      subtitle="First controlled launch recovery review checks recovery and rollback options without triggering them. First controlled launch recovery review does not trigger recovery. Controlled launch recovery actions require explicit operator approval, and unsafe controlled launch recovery shortcuts stay blocked."
      primaryLabel="Review recovery"
      anchor="first-controlled-launch-recovery-review"
      plainEnglishTitle="Plain-English first controlled launch recovery review"
      plainEnglishCopy="This page reviews controlled launch recovery identity, recovery groups, launch failure categories, rollback checklist, escalation checklist, operator decision checklist, denied recovery actions, unresolved recovery blockers, controlled launch hardening route, controlled launch candidate route, and next recommended action. It is review-only and approval required. It does not trigger recovery, trigger rollback, execute workflows, run commands, mutate files, call providers, call local models, call connectors, create automations, start monitoring jobs, send notifications, store outputs, or store credentials. Actual project/server building still requires approved file, command, local runtime, package, and deployment execution boundaries."
      language={model.language}
      markers={[...FIRST_CONTROLLED_LAUNCH_RECOVERY_REVIEW_MARKERS]}
      links={[
        { href: "/first-controlled-launch-hardening", label: "Hardening review" },
        { href: "/daily-beta-1-controlled-launch-candidate", label: "Controlled candidate" },
        { href: "/first-controlled-launch-result-review", label: "Result review" },
        { href: "/launch-rollback-plan-review", label: "Rollback review" },
      ]}
      cards={cards}
      advancedSummary="Advanced first controlled launch recovery review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.firstControlledLaunchRecoveryReviews.map((recoveryReview) => recoveryReview.advancedFirstControlledLaunchRecoveryReviewDetails)}
      advancedCopy="advanced first controlled launch recovery review details collapsed/secondary. This route remains review-only and approval required. It never triggers recovery, triggers rollback, executes workflows, runs commands, mutates files, calls providers, calls local models, calls connectors, creates automations, starts monitoring jobs, sends notifications, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="first-controlled-launch-recovery-review buildFirstControlledLaunchRecoveryReviewStableKey FirstControlledLaunchRecoveryReviewPanel"
    />
  );
}
