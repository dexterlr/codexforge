"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneReleaseNotesReviewModel, buildDailyBetaOneReleaseNotesReviewStableKey } from "@/lib/codexforge/daily-beta-1-release-notes-review";

const DAILY_BETA_1_RELEASE_NOTES_REVIEW_MARKERS = [
  "Daily Beta 1 release notes review",
  "Daily Beta 1 release notes review does not publish release notes",
  "Release notes require explicit operator approval",
  "Unresolved release note blockers stay blocked",
  "Release note groups",
  "Known blocker checklist",
] as const;

export function DailyBetaOneReleaseNotesReviewPanel() {
  const model = buildDailyBetaOneReleaseNotesReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.releaseNotesReviews.map((review) => ({
    id: buildDailyBetaOneReleaseNotesReviewStableKey("daily-beta-1-release-notes-review-card", review.id),
    title: review.dailyBetaOneReleaseNotesIdentity,
    status: review.status,
    sections: [
          { label: "Release note groups", items: review.releaseNoteGroups },
          { label: "User-visible change checklist", items: review.userVisibleChangeChecklist },
          { label: "Safety limitation checklist", items: review.safetyLimitationChecklist },
          { label: "Known blocker checklist", items: review.knownBlockerChecklist },
          { label: "Validation evidence checklist", items: review.validationEvidenceChecklist },
          { label: "Denied release note actions", items: review.deniedReleaseNoteActions },
          { label: "Unresolved release note blockers", items: review.unresolvedReleaseNoteBlockers },
    ],
    routes: [review.operatorHandoffPacketRoute, review.finalSafetyReviewRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 526"
      title="Daily Beta 1 release notes"
      subtitle="Daily Beta 1 release notes review reviews release notes posture in plain English. Daily Beta 1 release notes review does not publish release notes. Release notes require explicit operator approval, and unresolved release note blockers stay blocked."
      primaryLabel="Review notes"
      anchor="daily-beta-1-release-notes-review"
      plainEnglishTitle="Plain-English Daily Beta 1 release notes review"
      plainEnglishCopy="This page reviews Daily Beta 1 release notes identity, Release note groups, User-visible change checklist, Safety limitation checklist, Known blocker checklist, Validation evidence checklist, Denied release note actions, Unresolved release note blockers, Operator handoff packet route, Final safety review route, next recommended action. It is review-only, approval required, and it does not execute workflows, go live, launch Daily Beta 1, mutate files, mutate memory, call providers, call local models, call connectors, create automations, or store outputs."
      language={model.language}
      markers={[...DAILY_BETA_1_RELEASE_NOTES_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-documentation-refresh", label: "Docs refresh" },
        { href: "/daily-beta-1-operator-handoff-packet", label: "Handoff" },
        { href: "/daily-beta-1-final-safety-review", label: "Safety" },
        { href: "/codexforge-daily-beta-1-release-candidate", label: "Release candidate" },
      ]}
      cards={cards}
      advancedSummary="Advanced release note details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.releaseNotesReviews.map((review) => review.advancedDailyBetaOneReleaseNotesReviewDetails)}
      advancedCopy="advanced release note details collapsed/secondary. This route remains review-only and approval required. It never executes workflows, runs tests, applies changes, publishes documentation, publishes release notes, sends handoff, signs off release, goes live, launches Daily Beta 1, executes rollout, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="daily-beta-1-release-notes-review buildDailyBetaOneReleaseNotesReviewStableKey DailyBetaOneReleaseNotesReviewPanel"
    />
  );
}
