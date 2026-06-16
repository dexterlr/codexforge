"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaActivationReleaseHandoffModel, buildDailyBetaActivationReleaseHandoffStableKey } from "@/lib/codexforge/daily-beta-activation-release-handoff";

const DAILY_BETA_ACTIVATION_RELEASE_HANDOFF_MARKERS = [
  "Daily Beta activation release handoff",
  "Daily Beta activation release handoff does not send or apply handoff automatically",
  "Release handoff requires explicit operator approval",
  "Unresolved handoff blockers stay blocked",
  "Handoff groups",
  "Live boundary limitation summary",
] as const;

export function DailyBetaActivationReleaseHandoffPanel() {
  const model = buildDailyBetaActivationReleaseHandoffModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.releaseHandoffs.map((releaseHandoff) => ({
    id: buildDailyBetaActivationReleaseHandoffStableKey("daily-beta-activation-release-handoff-card", releaseHandoff.id),
    title: releaseHandoff.activationReleaseHandoffIdentity,
    status: releaseHandoff.status,
    sections: [
      { label: "Handoff groups", items: releaseHandoff.handoffGroups },
      { label: "Operator runbook summary", items: releaseHandoff.operatorRunbookSummary },
      { label: "Final gate summary", items: releaseHandoff.finalGateSummary },
      { label: "Live boundary limitation summary", items: releaseHandoff.liveBoundaryLimitationSummary },
      { label: "Rollout limitation summary", items: releaseHandoff.rolloutLimitationSummary },
      { label: "Denied handoff actions", items: releaseHandoff.deniedHandoffActions },
      { label: "Unresolved handoff blockers", items: releaseHandoff.unresolvedHandoffBlockers },
    ],
    routes: [releaseHandoff.readinessLockRoute, releaseHandoff.activationCandidateRoute],
    nextRecommendedAction: releaseHandoff.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 576"
      title="Daily Beta activation release handoff"
      subtitle="Daily Beta activation release handoff packages release handoff guidance in plain English without sending or applying it. Daily Beta activation release handoff does not send or apply handoff automatically. Release handoff requires explicit operator approval, and unresolved handoff blockers stay blocked."
      primaryLabel="Review handoff"
      anchor="daily-beta-activation-release-handoff"
      plainEnglishTitle="Plain-English Daily Beta activation release handoff"
      plainEnglishCopy="This page reviews activation release handoff identity, handoff groups, operator runbook summary, final gate summary, live boundary limitation summary, rollout limitation summary, denied handoff actions, unresolved handoff blockers, readiness lock route, activation candidate route, and next recommended action. It is review-only, approval required, and it does not send handoff, apply handoff, export files automatically, mutate files, mutate memory, go live, activate Daily Beta, lock readiness, execute workflows, call providers, call local models, call connectors, create automations, persist approvals, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ACTIVATION_RELEASE_HANDOFF_MARKERS]}
      links={[
        { href: "/codexforge-daily-beta-activation-candidate", label: "Candidate" },
        { href: "/daily-beta-activation-readiness-lock", label: "Readiness lock" },
        { href: "/daily-beta-activation-final-hardening", label: "Hardening" },
        { href: "/daily-beta-activation-final-gate", label: "Final gate" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta activation release handoff details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.releaseHandoffs.map((releaseHandoff) => releaseHandoff.advancedDailyBetaActivationReleaseHandoffDetails)}
      advancedCopy="advanced Daily Beta activation release handoff details collapsed/secondary. This route remains review-only and approval required. It never sends handoff, applies handoff, exports files automatically, mutates files, mutates memory, goes live, activates Daily Beta, locks readiness, executes workflows, calls providers, calls local models, calls connectors, creates automations, persists approvals, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-activation-release-handoff buildDailyBetaActivationReleaseHandoffStableKey DailyBetaActivationReleaseHandoffPanel"
    />
  );
}
