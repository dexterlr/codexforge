"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneLaunchEvidenceReviewModel, buildDailyBetaOneLaunchEvidenceReviewStableKey } from "@/lib/codexforge/daily-beta-1-launch-evidence-review";

const DAILY_BETA_ONE_LAUNCH_EVIDENCE_REVIEW_MARKERS = [
  "Daily Beta 1 launch evidence review",
  "Daily Beta 1 launch evidence review does not ingest evidence automatically",
  "Launch evidence requires operator review before use",
  "Private launch evidence stays redacted",
  "Evidence groups",
  "Citation source checklist",
] as const;

export function DailyBetaOneLaunchEvidenceReviewPanel() {
  const model = buildDailyBetaOneLaunchEvidenceReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.launchEvidenceReviews.map((launchEvidenceReview) => ({
    id: buildDailyBetaOneLaunchEvidenceReviewStableKey("daily-beta-1-launch-evidence-review-card", launchEvidenceReview.id),
    title: launchEvidenceReview.launchEvidenceReviewIdentity,
    status: launchEvidenceReview.status,
    sections: [
      { label: "Evidence groups", items: launchEvidenceReview.evidenceGroups },
      { label: "Live boundary evidence checklist", items: launchEvidenceReview.liveBoundaryEvidenceChecklist },
      { label: "Rollout evidence checklist", items: launchEvidenceReview.rolloutEvidenceChecklist },
      { label: "Citation source checklist", items: launchEvidenceReview.citationSourceChecklist },
      { label: "Redaction/privacy checklist", items: launchEvidenceReview.redactionPrivacyChecklist },
      { label: "Denied evidence actions", items: launchEvidenceReview.deniedEvidenceActions },
      { label: "Unresolved evidence blockers", items: launchEvidenceReview.unresolvedEvidenceBlockers },
    ],
    routes: [launchEvidenceReview.launchResultReviewRoute, launchEvidenceReview.launchCandidateRoute],
    nextRecommendedAction: launchEvidenceReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 598"
      title="Daily Beta 1 launch evidence review"
      subtitle="Daily Beta 1 launch evidence review reviews launch evidence in plain English before use. Daily Beta 1 launch evidence review does not ingest evidence automatically. Launch evidence requires operator review before use, and private launch evidence stays redacted."
      primaryLabel="Review launch evidence"
      anchor="daily-beta-1-launch-evidence-review"
      plainEnglishTitle="Plain-English Daily Beta 1 launch evidence review"
      plainEnglishCopy="This page reviews launch evidence review identity, evidence groups, live boundary evidence checklist, rollout evidence checklist, citation source checklist, redaction/privacy checklist, denied evidence actions, unresolved evidence blockers, launch result review route, launch candidate route, and next recommended action. It is review-only and approval required. It does not ingest evidence automatically, store provider/local/connector/test outputs, store launch results, launch Daily Beta 1, approve launch, run dry-runs, call providers, call local models, call connectors, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_LAUNCH_EVIDENCE_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-launch-result-review", label: "Result review" },
        { href: "/codexforge-daily-beta-1-launch-candidate", label: "Launch candidate" },
        { href: "/daily-beta-1-launch-dry-run-review", label: "Dry-run review" },
        { href: "/daily-beta-1-launch-readiness-summary", label: "Launch summary" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 launch evidence review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.launchEvidenceReviews.map((launchEvidenceReview) => launchEvidenceReview.advancedDailyBetaOneLaunchEvidenceReviewDetails)}
      advancedCopy="advanced Daily Beta 1 launch evidence review details collapsed/secondary. This route remains review-only and approval required. It never ingests evidence automatically, stores provider/local/connector/test outputs, stores launch results, launches Daily Beta 1, approves launch, runs dry-runs, calls providers, calls local models, calls connectors, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-launch-evidence-review buildDailyBetaOneLaunchEvidenceReviewStableKey DailyBetaOneLaunchEvidenceReviewPanel"
    />
  );
}
