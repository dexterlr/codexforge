"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildEndToEndWorkflowHardeningPassModel, buildEndToEndWorkflowHardeningPassStableKey } from "@/lib/codexforge/end-to-end-workflow-hardening-pass";

const END_TO_END_WORKFLOW_HARDENING_PASS_MARKERS = [
  "End-to-end workflow hardening pass",
  "End-to-end workflow hardening pass does not apply changes",
  "Hardening changes require explicit operator approval",
  "Unresolved hardening blockers stay blocked",
  "Hardening groups",
  "Boundary readiness status",
] as const;

export function EndToEndWorkflowHardeningPassPanel() {
  const model = buildEndToEndWorkflowHardeningPassModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.hardeningPasses.map((pass) => ({
    id: buildEndToEndWorkflowHardeningPassStableKey("end-to-end-workflow-hardening-pass-card", pass.id),
    title: pass.endToEndWorkflowHardeningIdentity,
    status: pass.status,
    sections: [
      { label: "Hardening groups", items: pass.hardeningGroups },
      { label: "Trial/evidence/result/recovery status", items: pass.trialEvidenceResultRecoveryStatus },
      { label: "Boundary readiness status", items: pass.boundaryReadinessStatus },
      { label: "Release candidate readiness checklist", items: pass.releaseCandidateReadinessChecklist },
      { label: "Denied hardening actions", items: pass.deniedHardeningActions },
      { label: "Unresolved hardening blockers", items: pass.unresolvedHardeningBlockers },
    ],
    routes: [pass.releaseCandidateRoute, pass.unifiedExecutionGapReportRoute],
    nextRecommendedAction: pass.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 552"
      title="Workflow hardening"
      subtitle="End-to-end workflow hardening pass reviews hardening needs in plain English without applying changes. End-to-end workflow hardening pass does not apply changes. Hardening changes require explicit operator approval, and unresolved hardening blockers stay blocked."
      primaryLabel="Review hardening"
      anchor="end-to-end-workflow-hardening-pass"
      plainEnglishTitle="Plain-English end-to-end workflow hardening pass"
      plainEnglishCopy="This page reviews end-to-end workflow hardening identity, Hardening groups, Trial/evidence/result/recovery status, Boundary readiness status, Release candidate readiness checklist, Denied hardening actions, Unresolved hardening blockers, Release candidate route, Unified execution gap report route, and next recommended action. It is review-only, approval required, and it does not apply changes, execute workflows, mutate files, mutate memory, apply patches, run commands, persist settings, auto-apply policies, call providers, call local models, call connectors, or create automations."
      language={model.language}
      markers={[...END_TO_END_WORKFLOW_HARDENING_PASS_MARKERS]}
      links={[
        { href: "/end-to-end-workflow-recovery-review", label: "Recovery review" },
        { href: "/codexforge-end-to-end-workflow-release-candidate", label: "Release candidate" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
        { href: "/first-real-end-to-end-workflow-trial-review", label: "Trial review" },
      ]}
      cards={cards}
      advancedSummary="Advanced hardening pass details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.hardeningPasses.map((pass) => pass.advancedHardeningPassDetails)}
      advancedCopy="advanced hardening pass details collapsed/secondary. This route remains review-only and approval required. It never applies changes, executes workflows, mutates files, mutates memory, applies patches, runs commands, persists settings, auto-applies policies, calls providers, calls local models, calls connectors, creates automations, or creates an MCP runtime."
      dataScope="end-to-end-workflow-hardening-pass buildEndToEndWorkflowHardeningPassStableKey EndToEndWorkflowHardeningPassPanel"
    />
  );
}
