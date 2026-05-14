import type { ArtifactExportRequest } from "@/lib/codexforge/artifact-workspace";
import type { ExportApiPayload, ExportApiResult } from "./export-flow-types";

export function buildExportApiPayload(request: ArtifactExportRequest): ExportApiPayload {
  return {
    ...request,
    approved: request.approved === true,
    overwrite: request.overwrite === true,
    mode: "artifact-export-only",
  };
}

export function parseExportApiResult(input: unknown, fallback: ArtifactExportRequest): ExportApiResult {
  if (!input || typeof input !== "object") {
    return buildFailureResult(fallback, "Artifact export API returned an invalid response.");
  }

  const data = input as {
    ok?: unknown;
    error?: unknown;
    targetRelativePath?: unknown;
    targetPath?: unknown;
    metadata?: { artifactId?: unknown; safetyNote?: unknown };
  };

  return {
    ok: data.ok === true,
    artifactId: String(data.metadata?.artifactId ?? fallback.artifactId),
    targetRelativePath: String(data.targetRelativePath ?? fallback.targetRelativePath),
    exportedPath: String(data.targetPath ?? ""),
    error: data.ok === true ? "" : String(data.error ?? "Artifact export blocked by guarded API."),
    safetyNote: String(
      data.metadata?.safetyNote ??
        "artifact export only; source mutation blocked; commands and external apps are not executed"
    ),
  };
}

export function summarizeExportApiResult(result: ExportApiResult): string[] {
  return [
    result.ok ? "Guarded artifact export completed." : "Guarded artifact export blocked.",
    `target: ${result.targetRelativePath}`,
    result.error || result.safetyNote,
  ];
}

function buildFailureResult(request: ArtifactExportRequest, error: string): ExportApiResult {
  return {
    ok: false,
    artifactId: request.artifactId,
    targetRelativePath: request.targetRelativePath,
    exportedPath: "",
    error,
    safetyNote: "artifact export only; source mutation blocked",
  };
}
