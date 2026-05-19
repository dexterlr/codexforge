import type {
  LocalProjectReaderSummary,
  ProjectFilePreview,
  ProjectFileRiskReport,
  ProjectTreeModel,
} from "./local-project-reader-types";

export function buildLocalProjectReaderSummary(input: {
  tree: ProjectTreeModel;
  selectedFile?: string | null;
  searchResultCount?: number;
  riskReports?: ProjectFileRiskReport[];
  preview?: ProjectFilePreview | null;
}): LocalProjectReaderSummary {
  const riskReports = input.riskReports ?? [];
  const highRiskFileCount =
    riskReports.length > 0
      ? riskReports.filter((report) => report.level === "high" || report.level === "critical").length
      : input.tree.summary.highRiskCount;
  const blockedFileCount =
    riskReports.length > 0
      ? riskReports.filter((report) => report.level === "blocked").length
      : input.tree.summary.blockedCount;
  const previewReadiness =
    input.preview?.binaryBlocked || input.preview?.sizeBlocked
      ? "blocked"
      : input.preview?.contentExcerpt
        ? "ready"
        : "unavailable";
  const selectedFile = input.selectedFile ?? "";
  const nextSafeAction = selectedFile
    ? previewReadiness === "ready"
      ? "Inspect preview evidence, then copy Safe Patch Preview prompt if edits are needed."
      : "Read the selected file through the read-only API before handoff."
    : "Select a file from the local project tree.";

  return {
    fileCount: input.tree.summary.fileCount,
    directoryCount: input.tree.summary.directoryCount,
    selectedFile,
    searchResultCount: input.searchResultCount ?? 0,
    highRiskFileCount,
    blockedFileCount,
    previewReadiness,
    nextSafeAction,
    summary: `${input.tree.summary.fileCount} files, ${input.tree.summary.directoryCount} directories, selected file ${selectedFile || "none"}.`,
  };
}

export function summarizeLocalProjectReaderSession(summary: LocalProjectReaderSummary): string {
  return `${summary.summary} Search results: ${summary.searchResultCount}. High risk: ${summary.highRiskFileCount}. Blocked: ${summary.blockedFileCount}. Next safe action: ${summary.nextSafeAction}`;
}

