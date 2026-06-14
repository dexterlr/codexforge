"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneFinalSafetyReviewModel, buildDailyBetaOneFinalSafetyReviewStableKey } from "@/lib/codexforge/daily-beta-1-final-safety-review";

const DAILY_BETA_1_FINAL_SAFETY_REVIEW_MARKERS = [
  "Daily Beta 1 final safety review",
  "Daily Beta 1 final safety review does not sign off release automatically",
  "Final safety signoff requires explicit operator approval",
  "Unresolved final safety blockers stay blocked",
  "Safety groups",
  "Rollback recovery checklist",
] as const;

export function DailyBetaOneFinalSafetyReviewPanel() {
  const model = buildDailyBetaOneFinalSafetyReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.safetyReviews.map((review) => ({
    id: buildDailyBetaOneFinalSafetyReviewStableKey("daily-beta-1-final-safety-review-card", review.id),
    title: review.dailyBetaOneFinalSafetyIdentity,
    status: review.status,
    sections: [
          { label: "Safety groups", items: review.safetyGroups },
          { label: "Approval boundary checklist", items: review.approvalBoundaryChecklist },
          { label: "Data/privacy checklist", items: review.dataPrivacyChecklist },
          { label: "Live capability checklist", items: review.liveCapabilityChecklist },
          { label: "Rollback recovery checklist", items: review.rollbackRecoveryChecklist },
          { label: "Denied safety shortcuts", items: review.deniedSafetyShortcuts },
          { label: "Unresolved safety blockers", items: review.unresolvedSafetyBlockers },
    ],
    routes: [review.dailyBetaOneReleaseCandidateRoute, review.releaseReadinessDashboardRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 528"
      title="Daily Beta 1 safety"
      subtitle="Daily Beta 1 final safety review reviews final safety posture in plain English. Daily Beta 1 final safety review does not sign off release automatically. Final safety signoff requires explicit operator approval, and unresolved final safety blockers stay blocked."
      primaryLabel="Review safety"
      anchor="daily-beta-1-final-safety-review"
      plainEnglishTitle="Plain-English Daily Beta 1 final safety review"
      plainEnglishCopy="This page reviews Daily Beta 1 final safety identity, Safety groups, Approval boundary checklist, Data/privacy checklist, Live capability checklist, Rollback recovery checklist, Denied safety shortcuts, Unresolved safety blockers, Daily Beta 1 release candidate route, Release readiness dashboard route, next recommended action. It is review-only, approval required, and it does not execute workflows, go live, launch Daily Beta 1, mutate files, mutate memory, call providers, call local models, call connectors, create automations, or store outputs."
      language={model.language}
      markers={[...DAILY_BETA_1_FINAL_SAFETY_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-release-notes-review", label: "Release notes" },
        { href: "/daily-beta-1-operator-handoff-packet", label: "Handoff" },
        { href: "/codexforge-daily-beta-1-release-candidate", label: "Release candidate" },
        { href: "/release-readiness-dashboard", label: "Readiness" },
      ]}
      cards={cards}
      advancedSummary="Advanced final safety details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.safetyReviews.map((review) => review.advancedDailyBetaOneFinalSafetyReviewDetails)}
      advancedCopy="advanced final safety details collapsed/secondary. This route remains review-only and approval required. It never executes workflows, runs tests, applies changes, publishes documentation, publishes release notes, sends handoff, signs off release, goes live, launches Daily Beta 1, executes rollout, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="daily-beta-1-final-safety-review buildDailyBetaOneFinalSafetyReviewStableKey DailyBetaOneFinalSafetyReviewPanel"
    />
  );
}
