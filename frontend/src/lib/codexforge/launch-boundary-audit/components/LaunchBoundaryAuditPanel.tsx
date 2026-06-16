"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildLaunchBoundaryAuditModel, buildLaunchBoundaryAuditStableKey } from "@/lib/codexforge/launch-boundary-audit";

const LAUNCH_BOUNDARY_AUDIT_MARKERS = [
  "Launch boundary audit",
  "Launch boundary audit does not run boundary probes",
  "Launch boundary approval requires explicit operator approval",
  "Unresolved launch boundary blockers stay blocked",
  "Boundary audit groups",
  "File test project execution checklist",
] as const;

export function LaunchBoundaryAuditPanel() {
  const model = buildLaunchBoundaryAuditModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.launchBoundaryAudits.map((audit) => ({
    id: buildLaunchBoundaryAuditStableKey("launch-boundary-audit-card", audit.id),
    title: audit.launchBoundaryAuditIdentity,
    status: audit.status,
    sections: [
      { label: "Boundary audit groups", items: audit.boundaryAuditGroups },
      { label: "Provider local connector automation boundary checklist", items: audit.providerLocalConnectorAutomationBoundaryChecklist },
      { label: "File test project execution checklist", items: audit.fileTestProjectExecutionChecklist },
      { label: "Evidence logging audit checklist", items: audit.evidenceLoggingAuditChecklist },
      { label: "Rollback stop checklist", items: audit.rollbackStopChecklist },
      { label: "Denied audit actions", items: audit.deniedAuditActions },
      { label: "Unresolved launch boundary blockers", items: audit.unresolvedBoundaryAuditBlockers },
    ],
    routes: [audit.launchApprovalPacketRoute, audit.launchGoNoGoRoute],
    nextRecommendedAction: audit.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 602"
      title="Launch boundary audit"
      subtitle="Launch boundary audit reviews launch-time execution boundaries in plain English without running probes. Launch boundary audit does not run boundary probes. Launch boundary approval requires explicit operator approval, and unresolved launch boundary blockers stay blocked."
      primaryLabel="Review launch boundaries"
      anchor="launch-boundary-audit"
      plainEnglishTitle="Plain-English launch boundary audit"
      plainEnglishCopy="This page audits launch boundary identity, boundary audit groups, provider/local/connector/automation boundaries, file/test/project execution, evidence/logging/audit needs, rollback/stop paths, denied audit actions, unresolved blockers, approval packet route, go/no-go route, and next recommended action. It is review-only and approval required. It does not launch Daily Beta 1, run boundary probes, approve launch boundaries, call providers, call local models, call connectors, create automations, mutate files, run commands, store outputs, store credentials, or claim actual server/build/project execution works."
      language={model.language}
      markers={[...LAUNCH_BOUNDARY_AUDIT_MARKERS]}
      links={[
        { href: "/launch-approval-packet", label: "Approval packet" },
        { href: "/launch-go-no-go-review", label: "Go/no-go review" },
        { href: "/daily-beta-1-launch-readiness-lock", label: "Launch lock" },
        { href: "/codexforge-daily-beta-1-launch-candidate", label: "Launch candidate" },
      ]}
      cards={cards}
      advancedSummary="Advanced launch boundary audit details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.launchBoundaryAudits.map((audit) => audit.advancedLaunchBoundaryAuditDetails)}
      advancedCopy="advanced launch boundary audit details collapsed/secondary. This route remains review-only and approval required. It never runs launch boundary probes, launches Daily Beta 1, approves go/no-go, sends launch approval packets, triggers rollback, starts monitoring jobs, publishes support runbooks, executes controlled launch plans, calls providers, calls local models, calls connectors, creates automations, mutates files, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="launch-boundary-audit buildLaunchBoundaryAuditStableKey LaunchBoundaryAuditPanel"
    />
  );
}
