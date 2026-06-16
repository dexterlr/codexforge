"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaActivationControlledOperatorTrialModel, buildDailyBetaActivationControlledOperatorTrialStableKey } from "@/lib/codexforge/daily-beta-activation-controlled-operator-trial";

const DAILY_BETA_ACTIVATION_CONTROLLED_OPERATOR_TRIAL_MARKERS = [
  "Daily Beta activation controlled operator trial",
  "Daily Beta activation controlled operator trial does not execute workflows",
  "Controlled operator trial actions require explicit operator approval",
  "Unapproved controlled operator trial paths remain blocked",
  "Controlled trial groups",
  "Operator task checklist",
] as const;

export function DailyBetaActivationControlledOperatorTrialPanel() {
  const model = buildDailyBetaActivationControlledOperatorTrialModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.controlledOperatorTrials.map((controlledOperatorTrial) => ({
    id: buildDailyBetaActivationControlledOperatorTrialStableKey("daily-beta-activation-controlled-operator-trial-card", controlledOperatorTrial.id),
    title: controlledOperatorTrial.activationControlledOperatorTrialIdentity,
    status: controlledOperatorTrial.status,
    sections: [
      { label: "Controlled trial groups", items: controlledOperatorTrial.controlledTrialGroups },
      { label: "Operator task checklist", items: controlledOperatorTrial.operatorTaskChecklist },
      { label: "Approval gate checklist", items: controlledOperatorTrial.approvalGateChecklist },
      { label: "Evidence/result/recovery checklist", items: controlledOperatorTrial.evidenceResultRecoveryChecklist },
      { label: "Denied trial actions", items: controlledOperatorTrial.deniedTrialActions },
      { label: "Unresolved controlled trial blockers", items: controlledOperatorTrial.unresolvedControlledTrialBlockers },
    ],
    routes: [controlledOperatorTrial.feedbackInboxRoute, controlledOperatorTrial.regressionReviewRoute],
    nextRecommendedAction: controlledOperatorTrial.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 571"
      title="Daily Beta activation controlled operator trial"
      subtitle="Daily Beta activation controlled operator trial previews controlled operator trial behavior in plain English without executing it. Daily Beta activation controlled operator trial does not execute workflows. Controlled operator trial actions require explicit operator approval, and unapproved controlled operator trial paths remain blocked."
      primaryLabel="Review controlled trial"
      anchor="daily-beta-activation-controlled-operator-trial"
      plainEnglishTitle="Plain-English Daily Beta activation controlled operator trial"
      plainEnglishCopy="This page reviews activation controlled operator trial identity, controlled trial groups, operator task checklist, approval gate checklist, evidence/result/recovery checklist, denied trial actions, unresolved controlled trial blockers, feedback inbox route, regression review route, and next recommended action. It is review-only, approval required, and it does not execute workflows, run controlled operator trial steps, call providers, call local models, call local bridge endpoints, call connectors, create automations, schedule tasks, send notifications, mutate files, mutate memory, persist approvals, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ACTIVATION_CONTROLLED_OPERATOR_TRIAL_MARKERS]}
      links={[
        { href: "/daily-beta-activation-final-gate", label: "Final gate" },
        { href: "/daily-beta-activation-feedback-inbox", label: "Feedback" },
        { href: "/daily-beta-activation-regression-review", label: "Regression" },
        { href: "/live-execution-boundary-final-signoff", label: "Boundary" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta activation controlled operator trial details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.controlledOperatorTrials.map((controlledOperatorTrial) => controlledOperatorTrial.advancedDailyBetaActivationControlledOperatorTrialDetails)}
      advancedCopy="advanced Daily Beta activation controlled operator trial details collapsed/secondary. This route remains review-only and approval required. It never executes workflows, runs controlled operator trial steps, calls providers, calls local models, calls local bridge endpoints, calls connectors, creates automations, schedules tasks, sends notifications, mutates files, mutates memory, persists approvals, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-activation-controlled-operator-trial buildDailyBetaActivationControlledOperatorTrialStableKey DailyBetaActivationControlledOperatorTrialPanel"
    />
  );
}
