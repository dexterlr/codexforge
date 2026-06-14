"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneDocumentationRefreshModel, buildDailyBetaOneDocumentationRefreshStableKey } from "@/lib/codexforge/daily-beta-1-documentation-refresh";

const DAILY_BETA_1_DOCUMENTATION_REFRESH_MARKERS = [
  "Daily Beta 1 documentation refresh",
  "Daily Beta 1 documentation refresh does not publish documentation automatically",
  "Documentation changes require explicit operator approval",
  "Stale documentation blockers stay blocked",
  "Documentation groups",
  "Release notes handoff checklist",
] as const;

export function DailyBetaOneDocumentationRefreshPanel() {
  const model = buildDailyBetaOneDocumentationRefreshModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.documentationReviews.map((review) => ({
    id: buildDailyBetaOneDocumentationRefreshStableKey("daily-beta-1-documentation-refresh-card", review.id),
    title: review.dailyBetaOneDocumentationRefreshIdentity,
    status: review.status,
    sections: [
          { label: "Documentation groups", items: review.documentationGroups },
          { label: "Operator runbook checklist", items: review.operatorRunbookChecklist },
          { label: "Checkpoint docs checklist", items: review.checkpointDocsChecklist },
          { label: "Release notes handoff checklist", items: review.releaseNotesHandoffChecklist },
          { label: "Safety wording checklist", items: review.safetyWordingChecklist },
          { label: "Denied documentation shortcuts", items: review.deniedDocumentationShortcuts },
          { label: "Unresolved documentation blockers", items: review.unresolvedDocumentationBlockers },
    ],
    routes: [review.releaseNotesReviewRoute, review.operatorHandoffPacketRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 525"
      title="Daily Beta 1 docs"
      subtitle="Daily Beta 1 documentation refresh reviews documentation refresh posture in plain English. Daily Beta 1 documentation refresh does not publish documentation automatically. Documentation changes require explicit operator approval, and stale documentation blockers stay blocked."
      primaryLabel="Review docs"
      anchor="daily-beta-1-documentation-refresh"
      plainEnglishTitle="Plain-English Daily Beta 1 documentation refresh"
      plainEnglishCopy="This page reviews Daily Beta 1 documentation refresh identity, Documentation groups, Operator runbook checklist, Checkpoint docs checklist, Release notes handoff checklist, Safety wording checklist, Denied documentation shortcuts, Unresolved documentation blockers, Release notes review route, Operator handoff packet route, next recommended action. It is review-only, approval required, and it does not execute workflows, go live, launch Daily Beta 1, mutate files, mutate memory, call providers, call local models, call connectors, create automations, or store outputs."
      language={model.language}
      markers={[...DAILY_BETA_1_DOCUMENTATION_REFRESH_MARKERS]}
      links={[
        { href: "/daily-beta-1-hardening-pass", label: "Hardening" },
        { href: "/daily-beta-1-release-notes-review", label: "Release notes" },
        { href: "/daily-beta-1-operator-handoff-packet", label: "Handoff" },
        { href: "/daily-beta-1-final-safety-review", label: "Safety" },
      ]}
      cards={cards}
      advancedSummary="Advanced documentation details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.documentationReviews.map((review) => review.advancedDailyBetaOneDocumentationRefreshDetails)}
      advancedCopy="advanced documentation details collapsed/secondary. This route remains review-only and approval required. It never executes workflows, runs tests, applies changes, publishes documentation, publishes release notes, sends handoff, signs off release, goes live, launches Daily Beta 1, executes rollout, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="daily-beta-1-documentation-refresh buildDailyBetaOneDocumentationRefreshStableKey DailyBetaOneDocumentationRefreshPanel"
    />
  );
}
