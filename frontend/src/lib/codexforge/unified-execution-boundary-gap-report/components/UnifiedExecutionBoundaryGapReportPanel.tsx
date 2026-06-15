"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildUnifiedExecutionBoundaryGapReportModel, buildUnifiedExecutionBoundaryGapReportStableKey } from "@/lib/codexforge/unified-execution-boundary-gap-report";

const UNIFIED_EXECUTION_BOUNDARY_GAP_REPORT_MARKERS = [
  "Unified execution boundary gap report",
  "Unified execution boundary gap report does not run probes",
  "Execution gaps require implementation and explicit approval before use",
  "Review UI is not proof of live execution",
  "Execution boundary groups",
  "Highest-risk gaps",
] as const;

export function UnifiedExecutionBoundaryGapReportPanel() {
  const model = buildUnifiedExecutionBoundaryGapReportModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.gapReports.map((report) => ({
    id: buildUnifiedExecutionBoundaryGapReportStableKey("unified-execution-boundary-gap-report-card", report.id),
    title: report.unifiedExecutionGapIdentity,
    status: report.status,
    sections: [
      { label: "Execution boundary groups", items: report.executionBoundaryGroups },
      { label: "Provider/local/connector/automation status", items: report.providerLocalConnectorAutomationStatus },
      { label: "File/test execution status", items: report.fileTestExecutionStatus },
      { label: "Evidence/logging/audit status", items: report.evidenceLoggingAuditStatus },
      { label: "Highest-risk gaps", items: report.highestRiskGaps },
      { label: "Denied gap report actions", items: report.deniedGapReportActions },
      { label: "Unresolved execution gaps", items: report.unresolvedExecutionGaps },
    ],
    routes: [report.firstApprovedProviderTrialRoute, report.firstApprovedLocalModelTrialRoute],
    nextRecommendedAction: report.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 540"
      title="Execution gap report"
      subtitle="Unified execution boundary gap report summarizes missing execution pieces in plain English. Unified execution boundary gap report does not run probes. Execution gaps require implementation and explicit approval before use, and review UI is not proof of live execution."
      primaryLabel="Review gaps"
      anchor="unified-execution-boundary-gap-report"
      plainEnglishTitle="Plain-English unified execution boundary gap report"
      plainEnglishCopy="This page reviews unified execution gap identity, Execution boundary groups, Provider/local/connector/automation status, File/test execution status, Evidence/logging/audit status, Highest-risk gaps, Denied gap report actions, Unresolved execution gaps, First approved provider trial route, First approved local model trial route, and next recommended action. It is review-only, approval required, and it does not run probes, call backends, persist settings, store outputs, call providers, call local models, call connectors, create automations, mutate files, run tests, or claim actual execution works."
      language={model.language}
      markers={[...UNIFIED_EXECUTION_BOUNDARY_GAP_REPORT_MARKERS]}
      links={[
        { href: "/first-approved-provider-execution-trial", label: "Provider trial" },
        { href: "/first-approved-local-model-execution-trial", label: "Local model trial" },
        { href: "/file-mutation-boundary-readiness-review", label: "File boundary" },
        { href: "/test-execution-boundary-readiness-review", label: "Test boundary" },
      ]}
      cards={cards}
      advancedSummary="Advanced unified execution gap details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.gapReports.map((report) => report.advancedUnifiedExecutionGapDetails)}
      advancedCopy="advanced unified execution gap details collapsed/secondary. This route remains review-only and approval required. It never runs probes, calls backends, calls providers, calls local models, calls connectors, creates automations, mutates files, runs tests, persists settings, stores outputs, persists approvals, mutates memory, or creates an MCP runtime."
      dataScope="unified-execution-boundary-gap-report buildUnifiedExecutionBoundaryGapReportStableKey UnifiedExecutionBoundaryGapReportPanel"
    />
  );
}
