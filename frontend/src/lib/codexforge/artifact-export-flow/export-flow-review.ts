import {
  validateArtifactExportContent,
  validateArtifactWorkspacePath,
  type ArtifactExportRequest,
} from "@/lib/codexforge/artifact-workspace";
import type {
  ExportRequestReview,
  ExportRequestReviewItem,
  ExportRequestRiskGroup,
} from "./export-flow-types";

export function buildExportRequestReview(args: {
  sourcePackId: string;
  requests: ArtifactExportRequest[];
}): ExportRequestReview {
  const items = args.requests.map(buildReviewItem);
  const groups = groupExportRequestsByRisk(items);
  const review: ExportRequestReview = {
    id: `artifact-export-review-${args.sourcePackId}`,
    sourcePackId: args.sourcePackId,
    items,
    groups,
    summary: [],
  };

  return { ...review, summary: summarizeExportRequestReview(review) };
}

export function summarizeExportRequestReview(review: ExportRequestReview): string[] {
  return [
    `${review.items.length} export request(s) ready for review.`,
    `${review.groups.ready.length} ready, ${review.groups.review.length} need review, ${review.groups.blocked.length} blocked.`,
    "Review confirms artifact export only; source mutation blocked; no command execution.",
  ];
}

export function groupExportRequestsByRisk(
  items: ExportRequestReviewItem[]
): Record<ExportRequestRiskGroup, ExportRequestReviewItem[]> {
  return {
    blocked: items.filter((item) => item.riskGroup === "blocked"),
    review: items.filter((item) => item.riskGroup === "review"),
    ready: items.filter((item) => item.riskGroup === "ready"),
  };
}

function buildReviewItem(request: ArtifactExportRequest): ExportRequestReviewItem {
  const pathValidation = validateArtifactWorkspacePath(request.targetRelativePath);
  const validation = validateArtifactExportContent(request);
  const warnings = validation.issues.map((issue) => `${issue.severity}: ${issue.label}`);
  const extension = inferExtension(request.targetRelativePath);
  const riskGroup: ExportRequestRiskGroup = !pathValidation.allowed
    ? "blocked"
    : request.approved
      ? "ready"
      : "review";

  return {
    id: `review-${request.artifactId}`,
    artifactId: request.artifactId,
    title: request.title,
    targetRelativePath: request.targetRelativePath,
    extension,
    contentSizeBytes: new TextEncoder().encode(request.content).length,
    sourceSurface: String(request.sourceSurface),
    overwrite: request.overwrite,
    approved: request.approved,
    pathSafetyState: pathValidation.allowed ? "safe" : "blocked",
    validationWarnings: warnings,
    riskGroup,
  };
}

function inferExtension(targetRelativePath: string): string {
  const lower = targetRelativePath.toLowerCase();
  for (const extension of [".preview.json", ".preview.py", ".preview.txt", ".json", ".txt", ".md"]) {
    if (lower.endsWith(extension)) return extension;
  }
  const match = lower.match(/\.[^/.]+$/);
  return match?.[0] ?? "none";
}
