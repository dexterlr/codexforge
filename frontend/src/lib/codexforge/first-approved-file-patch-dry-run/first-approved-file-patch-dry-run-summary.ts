import type { FirstApprovedFilePatchDryRun, FirstApprovedFilePatchDryRunBoundary, FirstApprovedFilePatchDryRunModel } from "./first-approved-file-patch-dry-run-types";
import { buildFirstApprovedFilePatchDryRunStableKey } from "./first-approved-file-patch-dry-run-types";

export const FIRST_APPROVED_FILE_PATCH_DRY_RUN_LANGUAGE = [
  "First approved file patch dry-run",
  "First approved file patch dry-run does not apply patches from UI",
  "File patch dry-runs require explicit operator approval at the boundary",
  "Unapproved patch dry-run paths remain blocked",
  "Patch dry-run groups",
  "Approved root checklist",
] as const;

export function buildFirstApprovedFilePatchDryRun(input: Omit<FirstApprovedFilePatchDryRun, "id"> & { idHint: string }): FirstApprovedFilePatchDryRun {
  const { idHint, ...dryRun } = input;
  return { id: buildFirstApprovedFilePatchDryRunStableKey("first-approved-file-patch-dry-run", idHint, input.status), ...dryRun };
}

export function buildFirstApprovedFilePatchDryRuns(): FirstApprovedFilePatchDryRun[] {
  return [
    buildFirstApprovedFilePatchDryRun({
      idHint: "file-patch-dry-run-review-packet",
      status: "blocked",
      firstApprovedFilePatchDryRunIdentity: "First approved file patch dry-run identity: first-approved-file-patch-dry-run-file-patch-dry-run-review-packet.",
      patchDryRunGroups: [
        "Patch dry-run groups: approved root, file target scope, diff/patch preview, rollback, test readiness, audit evidence, denied apply paths, and explicit operator approval gate.",
      ],
      approvedRootChecklist: [
        "Approved root checklist: a future patch dry-run must name the canonical workspace root, allowed relative paths, denied roots, and explicit operator approval outside this page.",
      ],
      diffPatchChecklist: [
        "Diff/patch checklist: proposed patch hunks must be previewed, scoped, reviewed, and approved before any separate local boundary can dry-run or apply patches.",
      ],
      rollbackChecklist: [
        "Rollback checklist: restore path, failed-hunk handling, rejected patch handling, and stop condition must be documented before patch dry-run claims.",
      ],
      testReadinessChecklist: [
        "Test readiness checklist: test command scope, timeout, expected evidence, and blocked auto-run behavior must be reviewed before any separate approved test execution.",
      ],
      deniedPatchDryRunActions: [
        "Denied patch dry-run actions: apply patches, write files, delete files, run tests, run commands, browse arbitrary local files, persist approvals, or export files.",
      ],
      unresolvedPatchDryRunBlockers: [
        "Unresolved patch dry-run blockers: missing approved root, missing diff preview, missing rollback plan, missing test readiness, missing audit evidence, and missing explicit operator approval.",
      ],
      testExecutionBoundaryRoute: "Test execution boundary route: /test-execution-boundary-readiness-review reviews test execution readiness without running tests.",
      unifiedExecutionGapReportRoute: "Unified execution gap report route: /unified-execution-boundary-gap-report summarizes remaining execution gaps without running probes.",
      nextRecommendedAction: "Next recommended action: keep unapproved patch dry-run paths blocked until approved roots, diff preview, rollback, test readiness, audit evidence, and explicit approval are implemented outside this page.",
      advancedFilePatchDryRunDetails: "Advanced file patch dry-run details: First approved file patch dry-run is review-only. First approved file patch dry-run does not apply patches from UI, file patch dry-runs require explicit operator approval at the boundary, and unapproved patch dry-run paths remain blocked. It does not apply patches, write files, delete files, export files, run tests, run commands, browse arbitrary local files, persist approvals, store outputs, call providers, call local models, call connectors, create automations, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildFirstApprovedFilePatchDryRunBoundary(): FirstApprovedFilePatchDryRunBoundary {
  return { reviewOnly: true, approvalRequired: true, patchApplyAllowedFromUi: false, fileMutationAllowedFromUi: false, fileWriteAllowedFromUi: false, fileDeletionAllowedFromUi: false, testBuildSmokeExecutionAllowedFromUi: false, commandExecutionAllowedFromUi: false, shellExecutionAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, arbitraryLocalFileBrowsingAllowed: false, arbitraryFileReadOpenAllowed: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeFirstApprovedFilePatchDryRun(model: Pick<FirstApprovedFilePatchDryRunModel, "filePatchDryRuns">): string {
  return "First approved file patch dry-run summarizes " + model.filePatchDryRuns.length + " file patch dry-run review packet. First approved file patch dry-run does not apply patches from UI, file patch dry-runs require explicit operator approval at the boundary, and unapproved patch dry-run paths remain blocked.";
}

export function buildFirstApprovedFilePatchDryRunModel(): FirstApprovedFilePatchDryRunModel {
  const filePatchDryRuns = buildFirstApprovedFilePatchDryRuns();
  const model: FirstApprovedFilePatchDryRunModel = {
    title: "First approved file patch dry-run",
    summary: "",
    filePatchDryRuns,
    boundary: buildFirstApprovedFilePatchDryRunBoundary(),
    language: [...FIRST_APPROVED_FILE_PATCH_DRY_RUN_LANGUAGE],
    advancedDetails: [
      "First approved file patch dry-run",
      "First approved file patch dry-run identity",
      "Patch dry-run groups",
      "Approved root checklist",
      "Diff/patch checklist",
      "Rollback checklist",
      "Test readiness checklist",
      "Denied patch dry-run actions",
      "Unresolved patch dry-run blockers",
      "Test execution boundary route",
      "Unified execution gap report route",
      "Next recommended action",
      "First approved file patch dry-run does not apply patches from UI",
      "File patch dry-runs require explicit operator approval at the boundary",
      "Unapproved patch dry-run paths remain blocked",
      "advanced file patch dry-run details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstApprovedFilePatchDryRun(model) };
}
