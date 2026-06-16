"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaActivationEvidenceReviewModel, buildDailyBetaActivationEvidenceReviewStableKey } from "@/lib/codexforge/daily-beta-activation-evidence-review";

const DAILY_BETA_ACTIVATION_EVIDENCE_REVIEW_MARKERS = [
  "Daily Beta activation evidence review",
  "Daily Beta activation evidence review does not ingest evidence automatically",
  "Activation evidence requires operator review before use",
  "Private activation evidence stays redacted",
  "Evidence groups",
  "Citation source checklist",
] as const;

export function DailyBetaActivationEvidenceReviewPanel() {
  const model = buildDailyBetaActivationEvidenceReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.evidenceReviews.map((evidenceReview) => ({
    id: buildDailyBetaActivationEvidenceReviewStableKey("daily-beta-activation-evidence-review-card", evidenceReview.id),
    title: evidenceReview.activationEvidenceIdentity,
    status: evidenceReview.status,
    sections: [
      { label: "Evidence groups", items: evidenceReview.evidenceGroups },
      { label: "Live boundary evidence checklist", items: evidenceReview.liveBoundaryEvidenceChecklist },
      { label: "Rollout evidence checklist", items: evidenceReview.rolloutEvidenceChecklist },
      { label: "Citation source checklist", items: evidenceReview.citationSourceChecklist },
      { label: "Redaction/privacy checklist", items: evidenceReview.redactionPrivacyChecklist },
      { label: "Denied evidence actions", items: evidenceReview.deniedEvidenceActions },
      { label: "Unresolved evidence blockers", items: evidenceReview.unresolvedEvidenceBlockers },
    ],
    routes: [evidenceReview.activationResultReviewRoute, evidenceReview.activationRecoveryReviewRoute],
    nextRecommendedAction: evidenceReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 564"
      title="Daily Beta activation evidence review"
      subtitle="Daily Beta activation evidence review reviews evidence in plain English before use. Daily Beta activation evidence review does not ingest evidence automatically. Activation evidence requires operator review before use, and private activation evidence stays redacted."
      primaryLabel="Review evidence"
      anchor="daily-beta-activation-evidence-review"
      plainEnglishTitle="Plain-English Daily Beta activation evidence review"
      plainEnglishCopy="This page reviews activation evidence identity, evidence groups, live boundary evidence checklist, rollout evidence checklist, citation source checklist, redaction/privacy checklist, denied evidence actions, unresolved evidence blockers, activation result review route, activation recovery review route, and next recommended action. It is review-only, approval required, and it does not ingest evidence, store provider outputs, store local model outputs, store connector outputs, store test outputs, mutate memory, mutate files, call providers, call local models, call connectors, create automations, persist credentials, or store outputs."
      language={model.language}
      markers={[...DAILY_BETA_ACTIVATION_EVIDENCE_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-activation-dry-run-review", label: "Dry-run" },
        { href: "/daily-beta-activation-result-review", label: "Result" },
        { href: "/daily-beta-activation-recovery-review", label: "Recovery" },
        { href: "/live-execution-boundary-final-signoff", label: "Boundary" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta activation evidence review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.evidenceReviews.map((evidenceReview) => evidenceReview.advancedDailyBetaActivationEvidenceReviewDetails)}
      advancedCopy="advanced Daily Beta activation evidence review details collapsed/secondary. This route remains review-only and approval required. It never ingests evidence, stores provider outputs, stores local model outputs, stores connector outputs, stores test outputs, mutates memory, mutates files, calls providers, calls local models, calls connectors, creates automations, persists credentials, stores outputs, or creates an MCP runtime."
      dataScope="daily-beta-activation-evidence-review buildDailyBetaActivationEvidenceReviewStableKey DailyBetaActivationEvidenceReviewPanel"
    />
  );
}
