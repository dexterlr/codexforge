"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFirstApprovedFilePatchDryRunModel, buildFirstApprovedFilePatchDryRunStableKey } from "@/lib/codexforge/first-approved-file-patch-dry-run";

const FIRST_APPROVED_FILE_PATCH_DRY_RUN_MARKERS = [
  "First approved file patch dry-run",
  "First approved file patch dry-run does not apply patches from UI",
  "File patch dry-runs require explicit operator approval at the boundary",
  "Unapproved patch dry-run paths remain blocked",
  "Patch dry-run groups",
  "Approved root checklist",
] as const;

export function FirstApprovedFilePatchDryRunPanel() {
  const model = buildFirstApprovedFilePatchDryRunModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.filePatchDryRuns.map((dryRun) => ({
    id: buildFirstApprovedFilePatchDryRunStableKey("first-approved-file-patch-dry-run-card", dryRun.id),
    title: dryRun.firstApprovedFilePatchDryRunIdentity,
    status: dryRun.status,
    sections: [
      { label: "Patch dry-run groups", items: dryRun.patchDryRunGroups },
      { label: "Approved root checklist", items: dryRun.approvedRootChecklist },
      { label: "Diff/patch checklist", items: dryRun.diffPatchChecklist },
      { label: "Rollback checklist", items: dryRun.rollbackChecklist },
      { label: "Test readiness checklist", items: dryRun.testReadinessChecklist },
      { label: "Denied patch dry-run actions", items: dryRun.deniedPatchDryRunActions },
      { label: "Unresolved patch dry-run blockers", items: dryRun.unresolvedPatchDryRunBlockers },
    ],
    routes: [dryRun.testExecutionBoundaryRoute, dryRun.unifiedExecutionGapReportRoute],
    nextRecommendedAction: dryRun.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 545"
      title="File patch dry-run"
      subtitle="First approved file patch dry-run prepares patch dry-run review in plain English. First approved file patch dry-run does not apply patches from UI. File patch dry-runs require explicit operator approval at the boundary, and unapproved patch dry-run paths remain blocked."
      primaryLabel="Review patch dry-run"
      anchor="first-approved-file-patch-dry-run"
      plainEnglishTitle="Plain-English first approved file patch dry-run"
      plainEnglishCopy="This page reviews first approved file patch dry-run identity, Patch dry-run groups, Approved root checklist, Diff/patch checklist, Rollback checklist, Test readiness checklist, Denied patch dry-run actions, Unresolved patch dry-run blockers, Test execution boundary route, Unified execution gap report route, and next recommended action. It is review-only, approval required, and it does not apply patches from UI, write files, delete files, export files, run tests, run commands, browse arbitrary local files, persist approvals, store outputs, call providers, call local models, call connectors, create automations, or mutate memory."
      language={model.language}
      markers={[...FIRST_APPROVED_FILE_PATCH_DRY_RUN_MARKERS]}
      links={[
        { href: "/test-execution-boundary-readiness-review", label: "Test boundary" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
        { href: "/file-mutation-boundary-readiness-review", label: "File boundary" },
        { href: "/patch-apply-approval", label: "Patch approval" },
      ]}
      cards={cards}
      advancedSummary="Advanced file patch dry-run details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.filePatchDryRuns.map((dryRun) => dryRun.advancedFilePatchDryRunDetails)}
      advancedCopy="advanced file patch dry-run details collapsed/secondary. This route remains review-only and approval required. It never applies patches, writes files, deletes files, exports files, runs tests, runs commands, browses arbitrary local files, persists approvals, stores outputs, calls providers, calls local models, calls connectors, creates automations, mutates memory, or creates an MCP runtime."
      dataScope="first-approved-file-patch-dry-run buildFirstApprovedFilePatchDryRunStableKey FirstApprovedFilePatchDryRunPanel"
    />
  );
}
