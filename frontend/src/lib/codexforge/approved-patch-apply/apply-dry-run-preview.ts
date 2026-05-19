import {
  buildApprovedPatchApplyStableId,
  hasApprovedPatchApplyPathTraversal,
  normalizeApprovedPatchApplyPath,
  uniqueApprovedPatchApplyStrings,
  type ApprovedPatchApplyDryRunItem,
  type ApprovedPatchApplyDryRunItemStatus,
  type ApprovedPatchApplyDryRunPreview,
  type ApprovedPatchApplyRequest,
} from "./approved-patch-apply-types";

function extractHeaderFiles(diff: string): string[] {
  const files: string[] = [];
  for (const line of diff.replace(/\r\n/g, "\n").split("\n")) {
    if (line.startsWith("--- ") || line.startsWith("+++ ")) {
      const value = line.slice(4).trim();
      if (value && value !== "/dev/null") {
        files.push(normalizeApprovedPatchApplyPath(value.replace(/^a\//, "").replace(/^b\//, "")));
      }
    }
  }
  return uniqueApprovedPatchApplyStrings(files);
}

function diffLines(diff: string): string[] {
  return diff.replace(/\r\n/g, "\n").split("\n");
}

function selectStatus(items: readonly ApprovedPatchApplyDryRunItem[]): ApprovedPatchApplyDryRunItemStatus {
  if (items.some((item) => item.status === "blocker")) return "blocker";
  if (items.some((item) => item.status === "warning")) return "warning";
  if (items.some((item) => item.status === "unknown")) return "unknown";
  return "pass";
}

export function buildApprovedPatchApplyDryRunItem(args: {
  requestId: string;
  label: string;
  filePath?: string | null;
  status: ApprovedPatchApplyDryRunItemStatus;
  detail: string;
  blocksApply?: boolean | null;
}): ApprovedPatchApplyDryRunItem {
  return {
    id: buildApprovedPatchApplyStableId("approved-patch-apply-dry-run-item", args.requestId, args.label, args.filePath ?? "none"),
    label: args.label,
    filePath: args.filePath ?? null,
    status: args.status,
    detail: args.detail,
    blocksApply: args.blocksApply ?? args.status === "blocker",
  };
}

export function buildApprovedPatchApplyDryRunPreview(
  request: ApprovedPatchApplyRequest
): ApprovedPatchApplyDryRunPreview {
  const lines = diffLines(request.previewDiff);
  const headerFiles = extractHeaderFiles(request.previewDiff);
  const hunkCount = lines.filter((line) => line.startsWith("@@ ")).length;
  const removalCount = lines.filter((line) => line.startsWith("-") && !line.startsWith("--- ")).length;
  const contextCount = lines.filter((line) => line.startsWith(" ")).length;
  const additionCount = lines.filter((line) => line.startsWith("+") && !line.startsWith("+++ ")).length;
  const missingBeforeTextDetected = removalCount === 0 && contextCount === 0;
  const ambiguousHunksDetected = hunkCount === 0 || (additionCount > 0 && removalCount === 0 && contextCount === 0);
  const multiFileMismatchDetected =
    headerFiles.length > 1 &&
    !headerFiles.every((filePath) => request.expectedTouchedFiles.includes(filePath));
  const riskyPathDetected = [request.selectedFilePath, ...request.expectedTouchedFiles, ...headerFiles].some((filePath) =>
    hasApprovedPatchApplyPathTraversal(filePath)
  );
  const items: ApprovedPatchApplyDryRunItem[] = [
    buildApprovedPatchApplyDryRunItem({
      requestId: request.requestId,
      label: "does not write files",
      status: "pass",
      detail: "Dry-run preview inspects diff shape only and does not write files.",
      blocksApply: false,
    }),
    buildApprovedPatchApplyDryRunItem({
      requestId: request.requestId,
      label: "diff shape present",
      filePath: request.selectedFilePath,
      status: request.previewDiff && hunkCount > 0 ? "pass" : "blocker",
      detail: request.previewDiff && hunkCount > 0 ? `${hunkCount} hunk(s) found.` : "Unified diff hunk not found.",
    }),
    buildApprovedPatchApplyDryRunItem({
      requestId: request.requestId,
      label: "before text detectable",
      filePath: request.selectedFilePath,
      status: missingBeforeTextDetected ? "warning" : "pass",
      detail: missingBeforeTextDetected ? "Missing before-text detected; apply may be ambiguous." : "Before-text or context appears present.",
      blocksApply: false,
    }),
    buildApprovedPatchApplyDryRunItem({
      requestId: request.requestId,
      label: "ambiguous hunks absent",
      filePath: request.selectedFilePath,
      status: ambiguousHunksDetected ? "warning" : "pass",
      detail: ambiguousHunksDetected ? "Ambiguous hunks detected." : "Hunks include enough shape for preview.",
      blocksApply: false,
    }),
    buildApprovedPatchApplyDryRunItem({
      requestId: request.requestId,
      label: "multi-file mismatch absent",
      filePath: request.selectedFilePath,
      status: multiFileMismatchDetected ? "blocker" : "pass",
      detail: multiFileMismatchDetected ? "Diff headers do not match approved touched files." : "Diff headers match approved touched file boundary.",
    }),
    buildApprovedPatchApplyDryRunItem({
      requestId: request.requestId,
      label: "risky path absent",
      filePath: request.selectedFilePath,
      status: riskyPathDetected ? "blocker" : "pass",
      detail: riskyPathDetected ? "Risky path detected." : "No risky path detected.",
    }),
  ];
  const status = selectStatus(items);
  const expectedFileChangesSummary = [
    `${request.selectedFilePath || "Selected file"} expects +${additionCount}/-${removalCount} line-level changes from preview diff shape.`,
    `${headerFiles.length || request.expectedTouchedFiles.length} file header/touched file reference(s) inspected.`,
  ];

  return {
    id: buildApprovedPatchApplyStableId("approved-patch-apply-dry-run-preview", request.requestId, status),
    requestId: request.requestId,
    doesNotWriteFiles: true,
    shapeAppearsApplicable: status === "pass" || status === "warning",
    missingBeforeTextDetected,
    ambiguousHunksDetected,
    multiFileMismatchDetected,
    riskyPathDetected,
    expectedFileChangesSummary,
    items,
    status,
    summary: summarizeApprovedPatchApplyDryRunPreview({
      status,
      doesNotWriteFiles: true,
      shapeAppearsApplicable: status === "pass" || status === "warning",
      missingBeforeTextDetected,
      ambiguousHunksDetected,
      multiFileMismatchDetected,
      riskyPathDetected,
      expectedFileChangesSummary,
      items,
      id: "",
      requestId: request.requestId,
      summary: [],
    }),
  };
}

export function summarizeApprovedPatchApplyDryRunPreview(
  preview: ApprovedPatchApplyDryRunPreview
): string[] {
  return [
    `Dry-run preview status ${preview.status}; does not write files=${preview.doesNotWriteFiles}.`,
    preview.shapeAppearsApplicable
      ? "Diff shape appears applicable for review, subject to guarded API preflight."
      : "Diff shape is blocked before any apply request.",
    `Missing before-text=${preview.missingBeforeTextDetected}; ambiguous hunks=${preview.ambiguousHunksDetected}; multi-file mismatch=${preview.multiFileMismatchDetected}; risky path=${preview.riskyPathDetected}.`,
    ...preview.expectedFileChangesSummary,
  ];
}
