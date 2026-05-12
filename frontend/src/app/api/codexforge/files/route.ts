import { NextResponse } from "next/server";
import { calculateFileRisk } from "@/lib/codexforge/files/file-risk";
import type {
  CodexForgeFilesApiResponse,
  CodexForgeFileKind,
  CodexForgeFileRiskLevel,
} from "@/lib/codexforge/files/types";
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
} from "@/lib/codexforge/files/server";

export const dynamic = "force-dynamic";

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

function optionalParam(url: URL, name: string): string | undefined {
  const value = url.searchParams.get(name)?.trim();
  return value ? value : undefined;
}

function parseLimit(url: URL): number | undefined {
  const raw = url.searchParams.get("limit");
  if (!raw) return undefined;
  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const risk = optionalParam(url, "risk");
  const kind = optionalParam(url, "kind");
  const result = await collectCodexForgeProjectFiles({
    q: optionalParam(url, "q"),
    path: optionalParam(url, "path"),
    risk: VALID_RISKS.has(risk ?? "all") ? (risk as CodexForgeFileRiskLevel | "all") : "all",
    kind: VALID_KINDS.has(kind ?? "all") ? (kind as CodexForgeFileKind | "all") : "all",
    limit: parseLimit(url),
  });
  const risks = Object.fromEntries(result.files.map((file) => [file.path, calculateFileRisk(file)]));
  const riskFilter = VALID_RISKS.has(risk ?? "all") ? risk : "all";
  const files =
    riskFilter && riskFilter !== "all"
      ? result.files.filter((file) => risks[file.path]?.level === riskFilter)
      : result.files;
  const selectedPath = optionalParam(url, "path");
  const selectedFile =
    files.find((file) => file.path === selectedPath) ??
    files.find((file) => selectedPath && file.path.endsWith(selectedPath)) ??
    files[0] ??
    result.files[0] ??
    null;

  if (!selectedFile) {
    return NextResponse.json(
      {
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
          summary: "No files available in bounded scan.",
        },
        generatedAt: CODEXFORGE_FILES_GENERATED_AT,
      },
      { status: 200 }
    );
  }

  const dependencyTrace = await buildDependencyTrace(selectedFile, files);
  const dependencies = dependencyTrace.dependencies;
  const relatedFiles = relateFilesDeterministically(selectedFile, files, dependencies);
  const previews = await buildFilePreviews([selectedFile, ...relatedFiles], CODEXFORGE_FILES_MAX_PREVIEW_LENGTH);
  const runtimeContextSignals = buildRuntimeFileContextSignals(selectedFile);
  const predictiveContext = buildPredictiveFileContextSummary({
    selectedFile,
    relatedFiles,
    risks,
  });
  const response: CodexForgeFilesApiResponse = {
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

  return NextResponse.json(response);
}
