"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildEndToEndDailyBetaOperatorHandoffModel, buildEndToEndDailyBetaOperatorHandoffStableKey } from "@/lib/codexforge/end-to-end-daily-beta-operator-handoff";

const END_TO_END_DAILY_BETA_OPERATOR_HANDOFF_MARKERS = [
  "End-to-end Daily Beta operator handoff",
  "End-to-end Daily Beta operator handoff does not send or apply handoff automatically",
  "Operator handoff requires explicit operator approval",
  "Unresolved handoff blockers stay blocked",
  "Handoff groups",
  "Live boundary limitation summary",
] as const;

export function EndToEndDailyBetaOperatorHandoffPanel() {
  const model = buildEndToEndDailyBetaOperatorHandoffModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.handoffs.map((handoff) => ({
    id: buildEndToEndDailyBetaOperatorHandoffStableKey("end-to-end-daily-beta-operator-handoff-card", handoff.id),
    title: handoff.endToEndDailyBetaOperatorHandoffIdentity,
    status: handoff.status,
    sections: [
      { label: "Handoff groups", items: handoff.handoffGroups },
      { label: "Operator runbook summary", items: handoff.operatorRunbookSummary },
      { label: "Approval boundary summary", items: handoff.approvalBoundarySummary },
      { label: "Live boundary limitation summary", items: handoff.liveBoundaryLimitationSummary },
      { label: "Rollout limitation summary", items: handoff.rolloutLimitationSummary },
      { label: "Validation checklist", items: handoff.validationChecklist },
      { label: "Denied handoff actions", items: handoff.deniedHandoffActions },
      { label: "Unresolved handoff blockers", items: handoff.unresolvedHandoffBlockers },
    ],
    routes: [handoff.dailyBetaCandidateRoute, handoff.releaseReadinessDashboardRoute],
    nextRecommendedAction: handoff.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 561"
      title="Daily Beta operator handoff"
      subtitle="End-to-end Daily Beta operator handoff packages operator guidance in plain English without sending or applying it automatically. End-to-end Daily Beta operator handoff does not send or apply handoff automatically. Operator handoff requires explicit operator approval, and unresolved handoff blockers stay blocked."
      primaryLabel="Review handoff"
      anchor="end-to-end-daily-beta-operator-handoff"
      plainEnglishTitle="Plain-English end-to-end Daily Beta operator handoff"
      plainEnglishCopy="This page reviews end-to-end Daily Beta operator handoff identity, handoff groups, operator runbook summary, approval boundary summary, live boundary limitation summary, rollout limitation summary, validation checklist, denied handoff actions, unresolved handoff blockers, Daily Beta candidate route, release readiness dashboard route, and next recommended action. It is review-only, approval required, and it does not send handoff, apply handoff, export files automatically, mutate memory, mutate files, go live, execute workflows, run rollout, call providers, call local models, call connectors, create automations, store outputs, or store credentials."
      language={model.language}
      markers={[...END_TO_END_DAILY_BETA_OPERATOR_HANDOFF_MARKERS]}
      links={[
        { href: "/codexforge-end-to-end-daily-beta-candidate", label: "Daily Beta" },
        { href: "/live-execution-boundary-final-signoff", label: "Final boundary" },
        { href: "/release-readiness-dashboard", label: "Readiness" },
        { href: "/end-to-end-controlled-rollout-plan", label: "Rollout plan" },
      ]}
      cards={cards}
      advancedSummary="Advanced end-to-end Daily Beta operator handoff details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.handoffs.map((handoff) => handoff.advancedEndToEndDailyBetaOperatorHandoffDetails)}
      advancedCopy="advanced end-to-end Daily Beta operator handoff details collapsed/secondary. This route remains review-only and approval required. It never sends handoff, applies handoff, exports files automatically, mutates memory, mutates files, goes live, executes workflows, runs rollout, calls providers, calls local models, calls connectors, creates automations, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="end-to-end-daily-beta-operator-handoff buildEndToEndDailyBetaOperatorHandoffStableKey EndToEndDailyBetaOperatorHandoffPanel"
    />
  );
}
