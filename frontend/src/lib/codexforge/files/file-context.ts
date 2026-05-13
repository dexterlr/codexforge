import { calculateFileRisk } from "./file-risk";
import type {
  CodexForgeFileKind,
  CodexForgeFileRiskLevel,
  CodexForgeFilesApiResponse,
} from "./file-types";
import {
  CODEXFORGE_FILES_GENERATED_AT,
  CODEXFORGE_FILES_MAX_FILE_COUNT,
  CODEXFORGE_FILES_MAX_PREVIEW_LENGTH,
  buildDependencyTrace,
  buildFilePreviews,
  buildPredictiveFileContextSummary,
  buildRuntimeFileContextSignals,
  collectCodexForgeProjectFiles,
  relateFilesDeterministically,
} from "./server";

export type CodexForgeFilesContextOptions = {
  q?: string;
  path?: string;
  risk?: CodexForgeFileRiskLevel | "all";
  kind?: CodexForgeFileKind | "all";
  limit?: number;
};

const VALID_RISKS = new Set(["all", "low", "medium", "high", "critical"]);
const VALID_KINDS = new Set([
  "all",
  "route",
  "component",
  "runtime",
  "memory",
  "tool",
  "smoke",
  "library",
  "style",
  "config",
  "docs",
]);

export function normalizeCodexForgeFilesContextOptions(
  options: CodexForgeFilesContextOptions = {}
): CodexForgeFilesContextOptions {
  return {
    q: options.q,
    path: options.path,
    risk: VALID_RISKS.has(options.risk ?? "all") ? options.risk : "all",
    kind: VALID_KINDS.has(options.kind ?? "all") ? options.kind : "all",
    limit: options.limit,
  };
}

export async function buildCodexForgeFilesContext(
  rawOptions: CodexForgeFilesContextOptions = {}
): Promise<CodexForgeFilesApiResponse> {
  const options = normalizeCodexForgeFilesContextOptions(rawOptions);
  const result = await collectCodexForgeProjectFiles(options);
  const risks = Object.fromEntries(
    result.files.map((file) => [file.path, calculateFileRisk(file)])
  );
  const files =
    options.risk && options.risk !== "all"
      ? result.files.filter((file) => risks[file.path]?.level === options.risk)
      : result.files;
  const selectedFile =
    files.find((file) => file.path === options.path) ??
    files.find((file) => options.path && file.path.endsWith(options.path)) ??
    files[0] ??
    result.files[0] ??
    null;

  if (!selectedFile) {
    return {
      files: [],
      selectedFile: null,
      summary: {
        source: "live",
        root: result.root,
        totalFiles: 0,
        returnedFiles: 0,
        scannedFiles: result.scannedFiles,
        truncated: result.truncated,
        maxFileCount: CODEXFORGE_FILES_MAX_FILE_COUNT,
        maxPreviewLength: CODEXFORGE_FILES_MAX_PREVIEW_LENGTH,
      },
      risks: {},
      dependencies: [],
      relatedFiles: [],
      timeline: [],
      executionHistory: [],
      runtimeContextSignals: [],
      previews: {},
      dependencyTrace: {
        filePath: "",
        imports: [],
        exports: [],
        internalTargets: [],
        dependencies: [],
        summary: "No files available in bounded read-only scan.",
      },
      generatedAt: CODEXFORGE_FILES_GENERATED_AT,
    };
  }

  const dependencyTrace = await buildDependencyTrace(selectedFile, files);
  const dependencies = dependencyTrace.dependencies;
  const relatedFiles = relateFilesDeterministically(selectedFile, files, dependencies);
  const previews = await buildFilePreviews(
    [selectedFile, ...relatedFiles],
    CODEXFORGE_FILES_MAX_PREVIEW_LENGTH
  );
  const runtimeContextSignals = buildRuntimeFileContextSignals(selectedFile);
  const predictiveContext = buildPredictiveFileContextSummary({
    selectedFile,
    relatedFiles,
    risks,
  });

  return {
    files,
    selectedFile,
    summary: {
      source: "live",
      root: result.root,
      totalFiles: result.scannedFiles,
      returnedFiles: files.length,
      scannedFiles: result.scannedFiles,
      truncated: result.truncated,
      maxFileCount: CODEXFORGE_FILES_MAX_FILE_COUNT,
      maxPreviewLength: CODEXFORGE_FILES_MAX_PREVIEW_LENGTH,
    },
    risks,
    dependencies,
    relatedFiles,
    timeline: selectedFile.timeline,
    executionHistory: selectedFile.executionHistory,
    runtimeContextSignals,
    previews,
    dependencyTrace,
    predictiveContext,
    generatedAt: CODEXFORGE_FILES_GENERATED_AT,
  };
}
