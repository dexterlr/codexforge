import type { FileWriteApprovalBoundary, FileWriteApprovalBoundaryBoundary, FileWriteApprovalBoundaryModel } from "./file-write-approval-boundary-types";
import { buildFileWriteApprovalBoundaryStableKey } from "./file-write-approval-boundary-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const FILE_WRITE_APPROVAL_BOUNDARY_LANGUAGE = [
  "File write approval boundary",
  "File write approval boundary does not write files",
  "File writes require explicit operator approval",
  "Unsafe file writes stay blocked",
  "File operation groups",
  "Diff preview checklist",
] as const;

export function buildFileWriteApprovalBoundary(input: Omit<FileWriteApprovalBoundary, "id"> & { idHint: string }): FileWriteApprovalBoundary {
  const { idHint, ...boundary } = input;
  return { id: buildFileWriteApprovalBoundaryStableKey("file-write-approval-boundary", idHint, input.status), ...boundary };
}

export function buildFileWriteApprovalBoundaries(): FileWriteApprovalBoundary[] {
  return [
    buildFileWriteApprovalBoundary({
      idHint: "file-write-approval-boundary",
      status: "blocked",
      identity: "File write boundary identity: file-write-approval-boundary reviews file operations without writing, deleting, moving, renaming, mutating, exporting, or applying patches.",
      sections: [
        { label: "File operation groups", items: ["File operation groups: create, update, delete, rename, move, template generation, project scaffolding, patch apply, rollback, and packaging writes remain review-only."] },
        { label: "Create/update/delete/rename/move preview checklist", items: ["Create/update/delete/rename/move preview checklist: proposed path, operation type, owner, reason, risk, affected files, and blocked status must be visible before approval."] },
        { label: "Path allowlist/denylist checklist", items: ["Path allowlist/denylist checklist: allowed workspace roots, denied secrets, denied generated directories, denied arbitrary paths, denied parent traversal, and denied absolute path surprises must be reviewed."] },
        { label: "Diff preview checklist", items: ["Diff preview checklist: readable before/after summary, file count, changed sections, rollback note, and operator review status must exist before any future write boundary can run."] },
        { label: "Rollback checklist", items: ["Rollback checklist: rollback owner, backup strategy, restore command review, failure handling, and evidence route must be defined before writes are considered."] },
        { label: "Denied file actions", items: ["Denied file actions: write files, delete files, rename files, move files, apply patches, scaffold projects, export artifacts, browse arbitrary paths, read arbitrary files, or persist approval decisions from this UI."] },
        { label: "Unresolved file write blockers", items: ["Unresolved file write blockers: missing approved write implementation, missing path boundary, missing diff preview, missing rollback plan, missing evidence route, and missing recovery route keep unsafe file writes blocked."] },
      ],
      routes: ["/evidence-capture-boundary", "/recovery-retry-boundary", "/universal-execution-boundary-inventory"],
      nextRecommendedAction: "Next recommended action: keep file writes blocked, review the diff and path requirements, then route evidence and recovery expectations before seeking explicit operator approval.",
      advancedDetails: `Advanced file write approval boundary details: File write approval boundary does not write files. File writes require explicit operator approval. Unsafe file writes stay blocked. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildFileWriteApprovalBoundaryBoundary(): FileWriteApprovalBoundaryBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeFileWriteApprovalBoundary(model: Pick<FileWriteApprovalBoundaryModel, "fileWriteApprovalBoundaries">): string {
  return "File write approval boundary reviews " + model.fileWriteApprovalBoundaries.length + " file write boundary packet without writing files. File writes require explicit operator approval, and unsafe file writes stay blocked.";
}

export function buildFileWriteApprovalBoundaryModel(): FileWriteApprovalBoundaryModel {
  const fileWriteApprovalBoundaries = buildFileWriteApprovalBoundaries();
  const model: FileWriteApprovalBoundaryModel = {
    title: "File write approval boundary",
    summary: "",
    reviewPackets: fileWriteApprovalBoundaries,
    fileWriteApprovalBoundaries,
    boundary: buildFileWriteApprovalBoundaryBoundary(),
    language: [...FILE_WRITE_APPROVAL_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "File write boundary identity",
      "File operation groups",
      "Create/update/delete/rename/move preview checklist",
      "Path allowlist/denylist checklist",
      "Diff preview checklist",
      "Rollback checklist",
      "Denied file actions",
      "Unresolved file write blockers",
      "Evidence boundary route",
      "Recovery boundary route",
      "Next recommended action",
      "advanced file write approval boundary details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeFileWriteApprovalBoundary(model) };
}
