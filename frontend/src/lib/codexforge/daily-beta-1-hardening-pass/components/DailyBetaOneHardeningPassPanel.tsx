"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneHardeningPassModel, buildDailyBetaOneHardeningPassStableKey } from "@/lib/codexforge/daily-beta-1-hardening-pass";

const DAILY_BETA_1_HARDENING_PASS_MARKERS = [
  "Daily Beta 1 hardening pass",
  "Daily Beta 1 hardening pass does not apply changes",
  "Daily Beta 1 hardening changes require explicit operator approval",
  "Unresolved hardening blockers stay blocked",
  "Hardening groups",
  "Feedback triage status",
] as const;

export function DailyBetaOneHardeningPassPanel() {
  const model = buildDailyBetaOneHardeningPassModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.hardeningPasses.map((pass) => ({
    id: buildDailyBetaOneHardeningPassStableKey("daily-beta-1-hardening-pass-card", pass.id),
    title: pass.dailyBetaOneHardeningIdentity,
    status: pass.status,
    sections: [
          { label: "Hardening groups", items: pass.hardeningGroups },
          { label: "Feedback triage status", items: pass.feedbackTriageStatus },
          { label: "Regression status", items: pass.regressionStatus },
          { label: "Rollout status", items: pass.rolloutStatus },
          { label: "Safety readiness checklist", items: pass.safetyReadinessChecklist },
          { label: "Denied hardening actions", items: pass.deniedHardeningActions },
          { label: "Unresolved hardening blockers", items: pass.unresolvedHardeningBlockers },
    ],
    routes: [pass.documentationRefreshRoute, pass.releaseNotesReviewRoute],
    nextRecommendedAction: pass.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 524"
      title="Daily Beta 1 hardening"
      subtitle="Daily Beta 1 hardening pass reviews hardening posture in plain English. Daily Beta 1 hardening pass does not apply changes. Daily Beta 1 hardening changes require explicit operator approval, and unresolved hardening blockers stay blocked."
      primaryLabel="Review hardening"
      anchor="daily-beta-1-hardening-pass"
      plainEnglishTitle="Plain-English Daily Beta 1 hardening pass"
      plainEnglishCopy="This page reviews Daily Beta 1 hardening identity, Hardening groups, Feedback triage status, Regression status, Rollout status, Safety readiness checklist, Denied hardening actions, Unresolved hardening blockers, Documentation refresh route, Release notes review route, next recommended action. It is review-only, approval required, and it does not execute workflows, go live, launch Daily Beta 1, mutate files, mutate memory, call providers, call local models, call connectors, create automations, or store outputs."
      language={model.language}
      markers={[...DAILY_BETA_1_HARDENING_PASS_MARKERS]}
      links={[
        { href: "/daily-beta-1-feedback-triage-review", label: "Feedback triage" },
        { href: "/daily-beta-1-regression-review", label: "Regression" },
        { href: "/daily-beta-1-documentation-refresh", label: "Docs refresh" },
        { href: "/daily-beta-1-release-notes-review", label: "Release notes" },
      ]}
      cards={cards}
      advancedSummary="Advanced hardening details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.hardeningPasses.map((pass) => pass.advancedDailyBetaOneHardeningPassDetails)}
      advancedCopy="advanced hardening details collapsed/secondary. This route remains review-only and approval required. It never executes workflows, runs tests, applies changes, publishes documentation, publishes release notes, sends handoff, signs off release, goes live, launches Daily Beta 1, executes rollout, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="daily-beta-1-hardening-pass buildDailyBetaOneHardeningPassStableKey DailyBetaOneHardeningPassPanel"
    />
  );
}
