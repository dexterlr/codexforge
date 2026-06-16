"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFirstControlledLaunchEvidenceReviewModel, buildFirstControlledLaunchEvidenceReviewStableKey } from "@/lib/codexforge/first-controlled-launch-evidence-review";

const FIRST_CONTROLLED_LAUNCH_EVIDENCE_REVIEW_MARKERS = [
  "First controlled launch evidence review",
  "First controlled launch evidence review does not ingest evidence automatically",
  "Controlled launch evidence requires operator review before use",
  "Private launch evidence stays redacted",
  "Evidence groups",
  "Launch monitoring evidence checklist",
] as const;

export function FirstControlledLaunchEvidenceReviewPanel() {
  const model = buildFirstControlledLaunchEvidenceReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.firstControlledLaunchEvidenceReviews.map((evidenceReview) => ({
    id: buildFirstControlledLaunchEvidenceReviewStableKey("first-controlled-launch-evidence-review-card", evidenceReview.id),
    title: evidenceReview.controlledLaunchEvidenceIdentity,
    status: evidenceReview.status,
    sections: [
      { label: "Evidence groups", items: evidenceReview.evidenceGroups },
      { label: "Boundary evidence checklist", items: evidenceReview.boundaryEvidenceChecklist },
      { label: "Launch monitoring evidence checklist", items: evidenceReview.launchMonitoringEvidenceChecklist },
      { label: "Citation/source checklist", items: evidenceReview.citationSourceChecklist },
      { label: "Redaction/privacy checklist", items: evidenceReview.redactionPrivacyChecklist },
      { label: "Denied evidence actions", items: evidenceReview.deniedEvidenceActions },
      { label: "Unresolved evidence blockers", items: evidenceReview.unresolvedEvidenceBlockers },
    ],
    routes: [evidenceReview.controlledLaunchResultRoute, evidenceReview.controlledLaunchRecoveryRoute],
    nextRecommendedAction: evidenceReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 611"
      title="First controlled launch evidence review"
      subtitle="First controlled launch evidence review checks operator-supplied launch evidence before use. First controlled launch evidence review does not ingest evidence automatically. Controlled launch evidence requires operator review before use, and private launch evidence stays redacted."
      primaryLabel="Review launch evidence"
      anchor="first-controlled-launch-evidence-review"
      plainEnglishTitle="Plain-English first controlled launch evidence review"
      plainEnglishCopy="This page reviews controlled launch evidence identity, evidence groups, boundary evidence checklist, launch monitoring evidence checklist, citation/source checklist, redaction/privacy checklist, denied evidence actions, unresolved evidence blockers, controlled launch result route, controlled launch recovery route, and next recommended action. It is review-only and approval required. It does not ingest evidence automatically, store provider/local/connector/test outputs, store launch results, mutate memory, mutate files, launch Daily Beta 1, approve launch, call providers, call local models, call connectors, create automations, store outputs, or store credentials. Actual project/server building still requires approved file, command, local runtime, package, and deployment execution boundaries."
      language={model.language}
      markers={[...FIRST_CONTROLLED_LAUNCH_EVIDENCE_REVIEW_MARKERS]}
      links={[
        { href: "/first-controlled-launch-result-review", label: "Result review" },
        { href: "/first-controlled-launch-recovery-review", label: "Recovery review" },
        { href: "/first-controlled-launch-review", label: "Launch review" },
        { href: "/launch-monitoring-plan-review", label: "Monitoring review" },
      ]}
      cards={cards}
      advancedSummary="Advanced first controlled launch evidence review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.firstControlledLaunchEvidenceReviews.map((evidenceReview) => evidenceReview.advancedFirstControlledLaunchEvidenceReviewDetails)}
      advancedCopy="advanced first controlled launch evidence review details collapsed/secondary. This route remains review-only and approval required. It never ingests evidence automatically, stores provider/local/connector/test outputs, stores launch results, mutates memory, mutates files, launches Daily Beta 1, approves launch, calls providers, calls local models, calls connectors, creates automations, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="first-controlled-launch-evidence-review buildFirstControlledLaunchEvidenceReviewStableKey FirstControlledLaunchEvidenceReviewPanel"
    />
  );
}
