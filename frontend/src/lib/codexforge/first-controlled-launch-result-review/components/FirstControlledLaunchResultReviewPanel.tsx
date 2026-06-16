"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFirstControlledLaunchResultReviewModel, buildFirstControlledLaunchResultReviewStableKey } from "@/lib/codexforge/first-controlled-launch-result-review";

const FIRST_CONTROLLED_LAUNCH_RESULT_REVIEW_MARKERS = [
  "First controlled launch result review",
  "First controlled launch result review does not store live outputs",
  "Controlled launch results require operator review before use",
  "Unsafe controlled launch results remain blocked",
  "Result groups",
  "Acceptance checklist",
] as const;

export function FirstControlledLaunchResultReviewPanel() {
  const model = buildFirstControlledLaunchResultReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.firstControlledLaunchResultReviews.map((resultReview) => ({
    id: buildFirstControlledLaunchResultReviewStableKey("first-controlled-launch-result-review-card", resultReview.id),
    title: resultReview.controlledLaunchResultIdentity,
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
    routes: [resultReview.controlledLaunchRecoveryRoute, resultReview.controlledLaunchHardeningRoute],
    nextRecommendedAction: resultReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 612"
      title="First controlled launch result review"
      subtitle="First controlled launch result review checks launch results before any reuse. First controlled launch result review does not store live outputs. Controlled launch results require operator review before use, and unsafe controlled launch results remain blocked."
      primaryLabel="Review launch results"
      anchor="first-controlled-launch-result-review"
      plainEnglishTitle="Plain-English first controlled launch result review"
      plainEnglishCopy="This page reviews controlled launch result identity, result groups, acceptance checklist, rejection checklist, reuse checklist, safety review checklist, denied result actions, unresolved result blockers, controlled launch recovery route, controlled launch hardening route, and next recommended action. It is review-only and approval required. It does not store live outputs, ingest results, persist results, reuse results automatically, launch Daily Beta 1, approve launch, lock launch readiness, call providers, call local models, call connectors, mutate files, mutate memory, store outputs, or store credentials. Actual project/server building still requires approved file, command, local runtime, package, and deployment execution boundaries."
      language={model.language}
      markers={[...FIRST_CONTROLLED_LAUNCH_RESULT_REVIEW_MARKERS]}
      links={[
        { href: "/first-controlled-launch-recovery-review", label: "Recovery review" },
        { href: "/first-controlled-launch-hardening", label: "Hardening review" },
        { href: "/first-controlled-launch-evidence-review", label: "Evidence review" },
        { href: "/daily-beta-1-controlled-launch-candidate", label: "Controlled candidate" },
      ]}
      cards={cards}
      advancedSummary="Advanced first controlled launch result review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.firstControlledLaunchResultReviews.map((resultReview) => resultReview.advancedFirstControlledLaunchResultReviewDetails)}
      advancedCopy="advanced first controlled launch result review details collapsed/secondary. This route remains review-only and approval required. It never stores live outputs, ingests results, persists results, reuses results automatically, launches Daily Beta 1, approves launch, locks launch readiness, calls providers, calls local models, calls connectors, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="first-controlled-launch-result-review buildFirstControlledLaunchResultReviewStableKey FirstControlledLaunchResultReviewPanel"
    />
  );
}
