"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaActivationHardeningPassModel, buildDailyBetaActivationHardeningPassStableKey } from "@/lib/codexforge/daily-beta-activation-hardening-pass";

const DAILY_BETA_ACTIVATION_HARDENING_PASS_MARKERS = [
  "Daily Beta activation hardening pass",
  "Daily Beta activation hardening pass does not apply changes",
  "Activation hardening changes require explicit operator approval",
  "Unresolved activation hardening blockers stay blocked",
  "Hardening groups",
  "Live boundary status",
] as const;

export function DailyBetaActivationHardeningPassPanel() {
  const model = buildDailyBetaActivationHardeningPassModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.hardeningPasses.map((hardeningPass) => ({
    id: buildDailyBetaActivationHardeningPassStableKey("daily-beta-activation-hardening-pass-card", hardeningPass.id),
    title: hardeningPass.activationHardeningIdentity,
    status: hardeningPass.status,
    sections: [
      { label: "Hardening groups", items: hardeningPass.hardeningGroups },
      { label: "Checklist/dry-run/evidence/result/recovery status", items: hardeningPass.checklistDryRunEvidenceResultRecoveryStatus },
      { label: "Live boundary status", items: hardeningPass.liveBoundaryStatus },
      { label: "Operator readiness checklist", items: hardeningPass.operatorReadinessChecklist },
      { label: "Denied hardening actions", items: hardeningPass.deniedHardeningActions },
      { label: "Unresolved activation hardening blockers", items: hardeningPass.unresolvedHardeningBlockers },
    ],
    routes: [hardeningPass.activationReleaseCandidateRoute, hardeningPass.operatorReadinessReviewRoute],
    nextRecommendedAction: hardeningPass.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 567"
      title="Daily Beta activation hardening pass"
      subtitle="Daily Beta activation hardening pass reviews activation hardening needs in plain English without applying changes. Daily Beta activation hardening pass does not apply changes. Activation hardening changes require explicit operator approval, and unresolved activation hardening blockers stay blocked."
      primaryLabel="Review hardening"
      anchor="daily-beta-activation-hardening-pass"
      plainEnglishTitle="Plain-English Daily Beta activation hardening pass"
      plainEnglishCopy="This page reviews activation hardening identity, hardening groups, checklist/dry-run/evidence/result/recovery status, live boundary status, operator readiness checklist, denied hardening actions, unresolved activation hardening blockers, activation release candidate route, operator readiness review route, and next recommended action. It is review-only, approval required, and it does not apply changes, execute workflows, trigger recovery, mutate files, mutate memory, persist settings, persist approval decisions, call providers, call local models, call connectors, create automations, store outputs, go live, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ACTIVATION_HARDENING_PASS_MARKERS]}
      links={[
        { href: "/daily-beta-activation-recovery-review", label: "Recovery" },
        { href: "/codexforge-daily-beta-activation-release-candidate", label: "Activation RC" },
        { href: "/daily-beta-activation-operator-readiness-review", label: "Operator" },
        { href: "/live-execution-boundary-final-signoff", label: "Boundary" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta activation hardening pass details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.hardeningPasses.map((hardeningPass) => hardeningPass.advancedDailyBetaActivationHardeningPassDetails)}
      advancedCopy="advanced Daily Beta activation hardening pass details collapsed/secondary. This route remains review-only and approval required. It never applies changes, executes workflows, triggers recovery, mutates files, mutates memory, persists settings, persists approval decisions, calls providers, calls local models, calls connectors, creates automations, stores outputs, goes live, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-activation-hardening-pass buildDailyBetaActivationHardeningPassStableKey DailyBetaActivationHardeningPassPanel"
    />
  );
}
