"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildFileWriteApprovalBoundaryModel } from "@/lib/codexforge/file-write-approval-boundary";

const FILE_WRITE_APPROVAL_BOUNDARY_MARKERS = [
  "File write approval boundary",
  "File write approval boundary does not write files",
  "File writes require explicit operator approval",
  "Unsafe file writes stay blocked",
  "File operation groups",
  "Diff preview checklist",
] as const;

export function FileWriteApprovalBoundaryPanel() {
  const model = buildFileWriteApprovalBoundaryModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 619"
      title="File write approval boundary"
      subtitle="File write approval boundary reviews proposed file operations without writing files. File writes require explicit operator approval, and unsafe file writes stay blocked."
      primaryLabel="Review file write boundary"
      anchor="file-write-approval-boundary"
      plainEnglishTitle="Plain-English file write approval boundary"
      plainEnglishCopy="This page enables future project scaffolds, patches, templates, game server files, chatbot exports, creative packages, and research reports only after a real file boundary exists. It does not mutate, delete, move, rename, export, or apply files from UI."
      language={model.language}
      markers={[...FILE_WRITE_APPROVAL_BOUNDARY_MARKERS]}
      links={[
        { href: "/evidence-capture-boundary", label: "Evidence boundary" },
        { href: "/recovery-retry-boundary", label: "Recovery boundary" },
        { href: "/universal-execution-boundary-inventory", label: "Universal inventory" },
      ]}
      packets={model.fileWriteApprovalBoundaries}
      advancedSummary="Advanced file write approval boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced file write approval boundary details collapsed/secondary. This route does not write files, apply patches, persist approval decisions, browse arbitrary local files, or auto-open local files."
      dataScope="file-write-approval-boundary buildFileWriteApprovalBoundaryStableKey FileWriteApprovalBoundaryPanel"
    />
  );
}
