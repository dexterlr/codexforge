"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneControlledTrialResultReviewModel, buildDailyBetaOneControlledTrialResultReviewStableKey } from "@/lib/codexforge/daily-beta-1-controlled-trial-result-review";

const DAILY_BETA_ONE_CONTROLLED_TRIAL_RESULT_REVIEW_MARKERS = [
  "Daily Beta 1 controlled trial result review",
  "Daily Beta 1 controlled trial result review does not store live outputs",
  "Controlled trial results require explicit operator review before use",
  "Unsafe trial results remain blocked",
  "Result groups",
  "Trial evidence checklist",
] as const;

export function DailyBetaOneControlledTrialResultReviewPanel() {
  const model = buildDailyBetaOneControlledTrialResultReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.resultReviews.map((review) => ({
    id: buildDailyBetaOneControlledTrialResultReviewStableKey("daily-beta-1-controlled-trial-result-review-card", review.id),
    title: review.controlledTrialResultReviewIdentity,
    status: review.status,
    sections: [
      { label: "Result groups", items: review.resultGroups },
      { label: "Trial evidence checklist", items: review.trialEvidenceChecklist },
      { label: "Result acceptance checklist", items: review.resultAcceptanceChecklist },
      { label: "Result rejection checklist", items: review.resultRejectionChecklist },
      { label: "Result reuse checklist", items: review.resultReuseChecklist },
      { label: "Denied result actions", items: review.deniedResultActions },
      { label: "Unresolved result blockers", items: review.unresolvedResultBlockers },
    ],
    routes: [review.recoveryReviewRoute, review.hardeningRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 530"
      title="Trial results"
      subtitle="Daily Beta 1 controlled trial result review reviews controlled-trial results in plain English. Daily Beta 1 controlled trial result review does not store live outputs. Controlled trial results require explicit operator review before use, and unsafe trial results remain blocked."
      primaryLabel="Review results"
      anchor="daily-beta-1-controlled-trial-result-review"
      plainEnglishTitle="Plain-English Daily Beta 1 controlled trial result review"
      plainEnglishCopy="This page reviews controlled trial result review identity, Result groups, Trial evidence checklist, Result acceptance checklist, Result rejection checklist, Result reuse checklist, Denied result actions, Unresolved result blockers, Recovery review route, Hardening route, and next recommended action. It is review-only, approval required, and it does not store live outputs, accept results automatically, execute workflows, launch Daily Beta 1, call providers, call local models, call connectors, create automations, mutate files, mutate memory, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_CONTROLLED_TRIAL_RESULT_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-controlled-trial-recovery-review", label: "Recovery review" },
        { href: "/daily-beta-1-controlled-trial-hardening", label: "Hardening" },
        { href: "/codexforge-daily-beta-1-release-candidate", label: "Release candidate" },
        { href: "/daily-beta-1-final-safety-review", label: "Safety review" },
      ]}
      cards={cards}
      advancedSummary="Advanced controlled trial result details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.resultReviews.map((review) => review.advancedControlledTrialResultReviewDetails)}
      advancedCopy="advanced controlled trial result details collapsed/secondary. This route remains review-only and approval required. It never stores live outputs, accepts results automatically, executes workflows, launches Daily Beta 1, executes controlled trial, triggers recovery, applies hardening, runs boundary probes, calls providers, calls local models, calls local bridge endpoints, calls connectors, creates automations, mutates files, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="daily-beta-1-controlled-trial-result-review buildDailyBetaOneControlledTrialResultReviewStableKey DailyBetaOneControlledTrialResultReviewPanel"
    />
  );
}
