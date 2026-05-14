import type { ArtifactExportRequest } from "./artifact-workspace-types";
import { validateArtifactWorkspacePath } from "./artifact-path-guard";
import { buildArtifactExportPolicy } from "./artifact-export-policy";
import { validateArtifactExportContent } from "./artifact-export-validation";

type RequestInput = Partial<ArtifactExportRequest>;

export function buildArtifactExportRequest(input: RequestInput = {}): ArtifactExportRequest {
  return {
    artifactId: input.artifactId?.trim() || "artifact-preview-request",
    type: input.type || "generic-artifact-preview",
    title: input.title?.trim() || "Review export request",
    content: input.content ?? "preview-only artifact export content\n",
    targetRelativePath: input.targetRelativePath?.trim() || "review/export-request.preview.txt",
    approved: input.approved === true,
    overwrite: input.overwrite === true,
    sourceSurface: input.sourceSurface || "Operator Run Center",
    sourceRunId: input.sourceRunId?.trim() || "preview-run-export-review",
    approvalNote:
      input.approvalNote?.trim() ||
      "Export approval is required before writing to the artifact workspace.",
  };
}

export function validateArtifactExportRequest(request: ArtifactExportRequest): string[] {
  const policy = buildArtifactExportPolicy();
  const pathValidation = validateArtifactWorkspacePath(request.targetRelativePath);
  const contentValidation = validateArtifactExportContent(request);
  const issues: string[] = [];

  if (!policy.requiresApproval) issues.push("policy must require approval");
  if (request.approved !== true) issues.push("missing approval");
  if (!request.artifactId.trim()) issues.push("missing artifact id");
  if (!request.title.trim()) issues.push("missing title");
  if (!request.sourceRunId.trim()) issues.push("missing source run id");
  if (!request.approvalNote.trim()) issues.push("missing approval note");
  if (!pathValidation.allowed) issues.push(pathValidation.reason);
  issues.push(
    ...contentValidation.issues
      .filter((issue) => issue.severity === "blocked")
      .map((issue) => issue.label)
  );

  return Array.from(new Set(issues));
}

export function summarizeArtifactExportRequest(request: ArtifactExportRequest): string[] {
  return [
    `artifact id: ${request.artifactId}`,
    `target: ${request.targetRelativePath}`,
    `approved: ${request.approved ? "true" : "false"}`,
    `overwrite: ${request.overwrite ? "true" : "false"}`,
    `source: ${request.sourceSurface} / ${request.sourceRunId}`,
    `validation notes: ${validateArtifactExportRequest(request).join(", ") || "ready for guarded export"}`,
  ];
}
