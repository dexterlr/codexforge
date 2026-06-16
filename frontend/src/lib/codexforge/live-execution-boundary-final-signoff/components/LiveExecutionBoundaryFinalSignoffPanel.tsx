"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildLiveExecutionBoundaryFinalSignoffModel, buildLiveExecutionBoundaryFinalSignoffStableKey } from "@/lib/codexforge/live-execution-boundary-final-signoff";

const LIVE_EXECUTION_BOUNDARY_FINAL_SIGNOFF_MARKERS = [
  "Live execution boundary final signoff",
  "Live execution boundary final signoff does not sign off live execution automatically",
  "Live execution requires explicit operator approval at every boundary",
  "Unresolved live boundary blockers stay blocked",
  "Boundary signoff groups",
  "Rollback stop checklist",
] as const;

export function LiveExecutionBoundaryFinalSignoffPanel() {
  const model = buildLiveExecutionBoundaryFinalSignoffModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.signoffs.map((signoff) => ({
    id: buildLiveExecutionBoundaryFinalSignoffStableKey("live-execution-boundary-final-signoff-card", signoff.id),
    title: signoff.liveExecutionBoundaryFinalSignoffIdentity,
    status: signoff.status,
    sections: [
      { label: "Boundary signoff groups", items: signoff.boundarySignoffGroups },
      { label: "Provider/local/connector/automation checklist", items: signoff.providerLocalConnectorAutomationChecklist },
      { label: "File/test execution checklist", items: signoff.fileTestExecutionChecklist },
      { label: "Audit/evidence/logging checklist", items: signoff.auditEvidenceLoggingChecklist },
      { label: "Rollback stop checklist", items: signoff.rollbackStopChecklist },
      { label: "Denied signoff actions", items: signoff.deniedSignoffActions },
      { label: "Unresolved boundary signoff blockers", items: signoff.unresolvedBoundarySignoffBlockers },
    ],
    routes: [signoff.dailyBetaCandidateRoute, signoff.operatorHandoffRoute],
    nextRecommendedAction: signoff.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 559"
      title="Final live boundary signoff"
      subtitle="Live execution boundary final signoff reviews live execution boundaries in plain English without signing off automatically. Live execution boundary final signoff does not sign off live execution automatically. Live execution requires explicit operator approval at every boundary, and unresolved live boundary blockers stay blocked."
      primaryLabel="Review boundaries"
      anchor="live-execution-boundary-final-signoff"
      plainEnglishTitle="Plain-English live execution boundary final signoff"
      plainEnglishCopy="This page reviews live execution boundary final signoff identity, boundary signoff groups, provider/local/connector/automation checklist, file/test execution checklist, audit/evidence/logging checklist, rollback stop checklist, denied signoff actions, unresolved boundary signoff blockers, Daily Beta candidate route, operator handoff route, and next recommended action. It is review-only, approval required, and it does not sign off automatically, go live, execute workflows, run rollout, call providers, call local models, call connectors, create automations, mutate files, run tests, store outputs, store credentials, or persist approval decisions."
      language={model.language}
      markers={[...LIVE_EXECUTION_BOUNDARY_FINAL_SIGNOFF_MARKERS]}
      links={[
        { href: "/end-to-end-rollout-hardening-pass", label: "Hardening" },
        { href: "/codexforge-end-to-end-daily-beta-candidate", label: "Daily Beta" },
        { href: "/end-to-end-daily-beta-operator-handoff", label: "Handoff" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
      ]}
      cards={cards}
      advancedSummary="Advanced live execution boundary final signoff details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.signoffs.map((signoff) => signoff.advancedLiveExecutionBoundaryFinalSignoffDetails)}
      advancedCopy="advanced live execution boundary final signoff details collapsed/secondary. This route remains review-only and approval required. It never signs off live execution automatically, goes live, executes workflows, runs rollout, calls providers, calls local models, calls connectors, creates automations, mutates files, runs tests, stores outputs, stores credentials, persists approval decisions, or creates an MCP runtime."
      dataScope="live-execution-boundary-final-signoff buildLiveExecutionBoundaryFinalSignoffStableKey LiveExecutionBoundaryFinalSignoffPanel"
    />
  );
}
