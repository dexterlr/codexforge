"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneActivationControlledTrialModel, buildDailyBetaOneActivationControlledTrialStableKey } from "@/lib/codexforge/daily-beta-1-activation-controlled-trial";

const DAILY_BETA_ONE_ACTIVATION_CONTROLLED_TRIAL_MARKERS = [
  "Daily Beta 1 activation controlled trial",
  "Daily Beta 1 activation controlled trial does not execute workflows",
  "Daily Beta 1 controlled trial actions require explicit operator approval",
  "Unapproved Daily Beta 1 controlled trial paths remain blocked",
  "Controlled trial groups",
  "Operator task checklist",
] as const;

export function DailyBetaOneActivationControlledTrialPanel() {
  const model = buildDailyBetaOneActivationControlledTrialModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.controlledTrials.map((controlledTrial) => ({
    id: buildDailyBetaOneActivationControlledTrialStableKey("daily-beta-1-activation-controlled-trial-card", controlledTrial.id),
    title: controlledTrial.dailyBetaOneControlledTrialIdentity,
    status: controlledTrial.status,
    sections: [
      { label: "Controlled trial groups", items: controlledTrial.controlledTrialGroups },
      { label: "Operator task checklist", items: controlledTrial.operatorTaskChecklist },
      { label: "Approval gate checklist", items: controlledTrial.approvalGateChecklist },
      { label: "Evidence/result/recovery checklist", items: controlledTrial.evidenceResultRecoveryChecklist },
      { label: "Live boundary checklist", items: controlledTrial.liveBoundaryChecklist },
      { label: "Denied controlled trial actions", items: controlledTrial.deniedControlledTrialActions },
      { label: "Unresolved controlled trial blockers", items: controlledTrial.unresolvedControlledTrialBlockers },
    ],
    routes: [controlledTrial.feedbackReviewRoute, controlledTrial.regressionReviewRoute],
    nextRecommendedAction: controlledTrial.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 587"
      title="Daily Beta 1 activation controlled trial"
      subtitle="Daily Beta 1 activation controlled trial previews controlled activation behavior in plain English without executing workflows. Daily Beta 1 activation controlled trial does not execute workflows. Daily Beta 1 controlled trial actions require explicit operator approval, and unapproved Daily Beta 1 controlled trial paths remain blocked."
      primaryLabel="Review controlled trial"
      anchor="daily-beta-1-activation-controlled-trial"
      plainEnglishTitle="Plain-English Daily Beta 1 activation controlled trial"
      plainEnglishCopy="This page reviews Daily Beta 1 controlled trial identity, controlled trial groups, operator task checklist, approval gate checklist, evidence/result/recovery checklist, live boundary checklist, denied controlled trial actions, unresolved controlled trial blockers, feedback review route, regression review route, and next recommended action. It is review-only and approval required. It does not execute workflows, run controlled trials, activate Daily Beta 1, call providers, call local models, call connectors, create automations, schedule tasks, create watches, send notifications, run tests, mutate files, mutate memory, persist approvals, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_ACTIVATION_CONTROLLED_TRIAL_MARKERS]}
      links={[
        { href: "/daily-beta-1-activation-final-gate", label: "Final gate" },
        { href: "/daily-beta-1-activation-feedback-review", label: "Feedback review" },
        { href: "/daily-beta-1-activation-regression-review", label: "Regression review" },
        { href: "/codexforge-daily-beta-1-activation-candidate", label: "Activation candidate" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 activation controlled trial details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.controlledTrials.map((controlledTrial) => controlledTrial.advancedDailyBetaOneActivationControlledTrialDetails)}
      advancedCopy="advanced Daily Beta 1 activation controlled trial details collapsed/secondary. This route remains review-only and approval required. It never executes workflows, runs controlled trials, activates Daily Beta 1, calls providers, calls local models, calls connectors, creates automations, schedules tasks, creates watches, sends notifications, runs tests, mutates files, mutates memory, persists approvals, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-activation-controlled-trial buildDailyBetaOneActivationControlledTrialStableKey DailyBetaOneActivationControlledTrialPanel"
    />
  );
}
