"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildEndToEndRolloutHardeningPassModel, buildEndToEndRolloutHardeningPassStableKey } from "@/lib/codexforge/end-to-end-rollout-hardening-pass";

const END_TO_END_ROLLOUT_HARDENING_PASS_MARKERS = [
  "End-to-end rollout hardening pass",
  "End-to-end rollout hardening pass does not apply changes",
  "Rollout hardening changes require explicit operator approval",
  "Unresolved rollout hardening blockers stay blocked",
  "Hardening groups",
  "Boundary readiness checklist",
] as const;

export function EndToEndRolloutHardeningPassPanel() {
  const model = buildEndToEndRolloutHardeningPassModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.passes.map((pass) => ({
    id: buildEndToEndRolloutHardeningPassStableKey("end-to-end-rollout-hardening-pass-card", pass.id),
    title: pass.rolloutHardeningPassIdentity,
    status: pass.status,
    sections: [
      { label: "Hardening groups", items: pass.hardeningGroups },
      { label: "Rollout review status", items: pass.rolloutReviewStatus },
      { label: "Feedback status", items: pass.feedbackStatus },
      { label: "Regression status", items: pass.regressionStatus },
      { label: "Boundary readiness checklist", items: pass.boundaryReadinessChecklist },
      { label: "Denied hardening actions", items: pass.deniedHardeningActions },
      { label: "Unresolved hardening blockers", items: pass.unresolvedHardeningBlockers },
    ],
    routes: [pass.finalLiveBoundarySignoffRoute, pass.dailyBetaCandidateRoute],
    nextRecommendedAction: pass.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 558"
      title="Rollout hardening pass"
      subtitle="End-to-end rollout hardening pass reviews rollout hardening needs in plain English without applying changes. End-to-end rollout hardening pass does not apply changes. Rollout hardening changes require explicit operator approval, and unresolved rollout hardening blockers stay blocked."
      primaryLabel="Review hardening"
      anchor="end-to-end-rollout-hardening-pass"
      plainEnglishTitle="Plain-English end-to-end rollout hardening pass"
      plainEnglishCopy="This page reviews rollout hardening pass identity, hardening groups, rollout review status, feedback status, regression status, boundary readiness checklist, denied hardening actions, unresolved hardening blockers, final live boundary signoff route, Daily Beta candidate route, and next recommended action. It is review-only, approval required, and it does not apply changes, execute workflows, run rollout, run tests, mutate files, mutate memory, persist settings, call providers, call local models, call connectors, create automations, store outputs, or store credentials."
      language={model.language}
      markers={[...END_TO_END_ROLLOUT_HARDENING_PASS_MARKERS]}
      links={[
        { href: "/end-to-end-rollout-feedback-inbox", label: "Feedback" },
        { href: "/end-to-end-rollout-regression-review", label: "Regression" },
        { href: "/live-execution-boundary-final-signoff", label: "Final boundary" },
        { href: "/codexforge-end-to-end-daily-beta-candidate", label: "Daily Beta" },
      ]}
      cards={cards}
      advancedSummary="Advanced rollout hardening pass details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.passes.map((pass) => pass.advancedRolloutHardeningPassDetails)}
      advancedCopy="advanced rollout hardening pass details collapsed/secondary. This route remains review-only and approval required. It never applies changes, executes workflows, runs rollout, runs tests, mutates files, mutates memory, persists settings, calls providers, calls local models, calls connectors, creates automations, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="end-to-end-rollout-hardening-pass buildEndToEndRolloutHardeningPassStableKey EndToEndRolloutHardeningPassPanel"
    />
  );
}
