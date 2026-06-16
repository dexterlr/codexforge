"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFirstControlledLaunchHardeningModel, buildFirstControlledLaunchHardeningStableKey } from "@/lib/codexforge/first-controlled-launch-hardening";

const FIRST_CONTROLLED_LAUNCH_HARDENING_MARKERS = [
  "First controlled launch hardening",
  "First controlled launch hardening does not apply changes",
  "Controlled launch hardening changes require explicit operator approval",
  "Unresolved controlled launch hardening blockers stay blocked",
  "Hardening groups",
  "Boundary readiness status",
] as const;

export function FirstControlledLaunchHardeningPanel() {
  const model = buildFirstControlledLaunchHardeningModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.firstControlledLaunchHardenings.map((hardening) => ({
    id: buildFirstControlledLaunchHardeningStableKey("first-controlled-launch-hardening-card", hardening.id),
    title: hardening.controlledLaunchHardeningIdentity,
    status: hardening.status,
    sections: [
      { label: "Hardening groups", items: hardening.hardeningGroups },
      { label: "Launch review status", items: hardening.launchReviewStatus },
      { label: "Evidence/result/recovery status", items: hardening.evidenceResultRecoveryStatus },
      { label: "Boundary readiness status", items: hardening.boundaryReadinessStatus },
      { label: "Operator readiness checklist", items: hardening.operatorReadinessChecklist },
      { label: "Denied hardening actions", items: hardening.deniedHardeningActions },
      { label: "Unresolved hardening blockers", items: hardening.unresolvedHardeningBlockers },
    ],
    routes: [hardening.controlledLaunchCandidateRoute, hardening.controlledLaunchHandoffRoute],
    nextRecommendedAction: hardening.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 614"
      title="First controlled launch hardening"
      subtitle="First controlled launch hardening reviews hardening needs without applying them. First controlled launch hardening does not apply changes. Controlled launch hardening changes require explicit operator approval, and unresolved controlled launch hardening blockers stay blocked."
      primaryLabel="Review hardening"
      anchor="first-controlled-launch-hardening"
      plainEnglishTitle="Plain-English first controlled launch hardening"
      plainEnglishCopy="This page reviews controlled launch hardening identity, hardening groups, launch review status, evidence/result/recovery status, boundary readiness status, operator readiness checklist, denied hardening actions, unresolved hardening blockers, controlled launch candidate route, controlled launch handoff route, and next recommended action. It is review-only and approval required. It does not apply changes, apply patches, execute workflows, mutate files, mutate memory, launch Daily Beta 1, approve launch, trigger recovery, lock readiness, send handoff, call providers, call local models, call connectors, create automations, store outputs, or store credentials. Actual project/server building still requires approved file, command, local runtime, package, and deployment execution boundaries."
      language={model.language}
      markers={[...FIRST_CONTROLLED_LAUNCH_HARDENING_MARKERS]}
      links={[
        { href: "/daily-beta-1-controlled-launch-candidate", label: "Controlled candidate" },
        { href: "/daily-beta-1-controlled-launch-handoff", label: "Controlled handoff" },
        { href: "/first-controlled-launch-recovery-review", label: "Recovery review" },
        { href: "/first-controlled-launch-review", label: "Launch review" },
      ]}
      cards={cards}
      advancedSummary="Advanced first controlled launch hardening details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.firstControlledLaunchHardenings.map((hardening) => hardening.advancedFirstControlledLaunchHardeningDetails)}
      advancedCopy="advanced first controlled launch hardening details collapsed/secondary. This route remains review-only and approval required. It never applies changes, applies patches, executes workflows, mutates files, mutates memory, launches Daily Beta 1, approves launch, triggers recovery, locks readiness, sends handoff, calls providers, calls local models, calls connectors, creates automations, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="first-controlled-launch-hardening buildFirstControlledLaunchHardeningStableKey FirstControlledLaunchHardeningPanel"
    />
  );
}
