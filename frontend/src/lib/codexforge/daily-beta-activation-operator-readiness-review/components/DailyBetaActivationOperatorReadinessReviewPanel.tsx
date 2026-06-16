"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaActivationOperatorReadinessReviewModel, buildDailyBetaActivationOperatorReadinessReviewStableKey } from "@/lib/codexforge/daily-beta-activation-operator-readiness-review";

const DAILY_BETA_ACTIVATION_OPERATOR_READINESS_REVIEW_MARKERS = [
  "Daily Beta activation operator readiness review",
  "Daily Beta activation operator readiness review does not activate Daily Beta",
  "Operator readiness signoff requires explicit operator approval",
  "Unresolved operator readiness blockers stay blocked",
  "Readiness groups",
  "Support rollback checklist",
] as const;

export function DailyBetaActivationOperatorReadinessReviewPanel() {
  const model = buildDailyBetaActivationOperatorReadinessReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.readinessReviews.map((readinessReview) => ({
    id: buildDailyBetaActivationOperatorReadinessReviewStableKey("daily-beta-activation-operator-readiness-review-card", readinessReview.id),
    title: readinessReview.activationOperatorReadinessIdentity,
    status: readinessReview.status,
    sections: [
      { label: "Readiness groups", items: readinessReview.readinessGroups },
      { label: "Operator checklist", items: readinessReview.operatorChecklist },
      { label: "Support rollback checklist", items: readinessReview.supportRollbackChecklist },
      { label: "Approval boundary checklist", items: readinessReview.approvalBoundaryChecklist },
      { label: "Handoff checklist", items: readinessReview.handoffChecklist },
      { label: "Denied readiness actions", items: readinessReview.deniedReadinessActions },
      { label: "Unresolved readiness blockers", items: readinessReview.unresolvedReadinessBlockers },
    ],
    routes: [readinessReview.activationReleaseCandidateRoute, readinessReview.checkpointDocsRoute],
    nextRecommendedAction: readinessReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 569"
      title="Daily Beta activation operator readiness review"
      subtitle="Daily Beta activation operator readiness review reviews operator readiness in plain English without activating or sending handoff. Daily Beta activation operator readiness review does not activate Daily Beta. Operator readiness signoff requires explicit operator approval, and unresolved operator readiness blockers stay blocked."
      primaryLabel="Review readiness"
      anchor="daily-beta-activation-operator-readiness-review"
      plainEnglishTitle="Plain-English Daily Beta activation operator readiness review"
      plainEnglishCopy="This page reviews activation operator readiness identity, readiness groups, operator checklist, support rollback checklist, approval boundary checklist, handoff checklist, denied readiness actions, unresolved readiness blockers, activation release candidate route, checkpoint docs route, and next recommended action. It is review-only, approval required, and it does not activate Daily Beta, send handoff, sign off operator readiness automatically, execute workflows, call providers, call local models, call connectors, create automations, mutate files, mutate memory, persist approval decisions, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ACTIVATION_OPERATOR_READINESS_REVIEW_MARKERS]}
      links={[
        { href: "/codexforge-daily-beta-activation-release-candidate", label: "Activation RC" },
        { href: "/daily-beta-activation-hardening-pass", label: "Hardening" },
        { href: "/release-readiness-dashboard", label: "Readiness" },
        { href: "/end-to-end-daily-beta-operator-handoff", label: "Handoff" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta activation operator readiness review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.readinessReviews.map((readinessReview) => readinessReview.advancedDailyBetaActivationOperatorReadinessReviewDetails)}
      advancedCopy="advanced Daily Beta activation operator readiness review details collapsed/secondary. This route remains review-only and approval required. It never activates Daily Beta, sends handoff, signs off operator readiness automatically, executes workflows, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, persists approval decisions, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-activation-operator-readiness-review buildDailyBetaActivationOperatorReadinessReviewStableKey DailyBetaActivationOperatorReadinessReviewPanel"
    />
  );
}
