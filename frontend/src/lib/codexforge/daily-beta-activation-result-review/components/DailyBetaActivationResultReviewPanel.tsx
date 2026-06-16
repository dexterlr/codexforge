"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaActivationResultReviewModel, buildDailyBetaActivationResultReviewStableKey } from "@/lib/codexforge/daily-beta-activation-result-review";

const DAILY_BETA_ACTIVATION_RESULT_REVIEW_MARKERS = [
  "Daily Beta activation result review",
  "Daily Beta activation result review does not store live outputs",
  "Activation results require operator review before use",
  "Unsafe activation results remain blocked",
  "Result groups",
  "Acceptance checklist",
] as const;

export function DailyBetaActivationResultReviewPanel() {
  const model = buildDailyBetaActivationResultReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.resultReviews.map((resultReview) => ({
    id: buildDailyBetaActivationResultReviewStableKey("daily-beta-activation-result-review-card", resultReview.id),
    title: resultReview.activationResultIdentity,
    status: resultReview.status,
    sections: [
      { label: "Result groups", items: resultReview.resultGroups },
      { label: "Acceptance checklist", items: resultReview.acceptanceChecklist },
      { label: "Rejection checklist", items: resultReview.rejectionChecklist },
      { label: "Reuse checklist", items: resultReview.reuseChecklist },
      { label: "Safety review checklist", items: resultReview.safetyReviewChecklist },
      { label: "Denied result actions", items: resultReview.deniedResultActions },
      { label: "Unresolved result blockers", items: resultReview.unresolvedResultBlockers },
    ],
    routes: [resultReview.activationRecoveryReviewRoute, resultReview.activationHardeningRoute],
    nextRecommendedAction: resultReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 565"
      title="Daily Beta activation result review"
      subtitle="Daily Beta activation result review reviews activation outputs in plain English before reuse. Daily Beta activation result review does not store live outputs. Activation results require operator review before use, and unsafe activation results remain blocked."
      primaryLabel="Review result"
      anchor="daily-beta-activation-result-review"
      plainEnglishTitle="Plain-English Daily Beta activation result review"
      plainEnglishCopy="This page reviews activation result identity, result groups, acceptance checklist, rejection checklist, reuse checklist, safety review checklist, denied result actions, unresolved result blockers, activation recovery review route, activation hardening route, and next recommended action. It is review-only, approval required, and it does not store live outputs, ingest results, mutate memory, mutate files, call providers, call local models, call connectors, create automations, persist approval decisions, trigger recovery, apply hardening, go live, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ACTIVATION_RESULT_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-activation-evidence-review", label: "Evidence" },
        { href: "/daily-beta-activation-recovery-review", label: "Recovery" },
        { href: "/daily-beta-activation-hardening-pass", label: "Hardening" },
        { href: "/release-readiness-dashboard", label: "Readiness" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta activation result review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.resultReviews.map((resultReview) => resultReview.advancedDailyBetaActivationResultReviewDetails)}
      advancedCopy="advanced Daily Beta activation result review details collapsed/secondary. This route remains review-only and approval required. It never stores live outputs, ingests results, mutates memory, mutates files, calls providers, calls local models, calls connectors, creates automations, persists approval decisions, triggers recovery, applies hardening, goes live, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-activation-result-review buildDailyBetaActivationResultReviewStableKey DailyBetaActivationResultReviewPanel"
    />
  );
}
