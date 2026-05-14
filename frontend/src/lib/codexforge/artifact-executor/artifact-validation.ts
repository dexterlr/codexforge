import type {
  ArtifactPreview,
  ArtifactPreviewSet,
  ArtifactValidationIssue,
  ArtifactValidationReport,
  ArtifactValidationState,
} from "./artifact-types";
import { SUPPORTED_ARTIFACT_TYPES } from "./artifact-types";

const EXECUTABLE_WORDS = [
  "execute",
  "launch",
  "spawn",
  "render video",
  "place order",
  "trade",
];

const MUTATION_WORDS = [
  "write to src",
  "modify source",
  "mutate source",
  "overwrite file",
  "delete file",
];

export function validateArtifactPreview(
  preview: ArtifactPreview
): ArtifactValidationReport {
  const issues: ArtifactValidationIssue[] = [];
  const content = preview.contentPreview.trim();
  const normalized = content.toLowerCase();

  if (!content) {
    issues.push(buildIssue(preview.artifactId, "blocked", "empty content", "Artifact preview content is empty."));
  }

  if (!SUPPORTED_ARTIFACT_TYPES.includes(preview.type)) {
    issues.push(buildIssue(preview.artifactId, "blocked", "unsupported artifact type", "Artifact type is not in the supported preview list."));
  }

  if (EXECUTABLE_WORDS.some((word) => normalized.includes(word))) {
    issues.push(buildIssue(preview.artifactId, "warning", "suspicious executable content", "Preview contains execution wording and must remain inert."));
  }

  if (MUTATION_WORDS.some((word) => normalized.includes(word))) {
    issues.push(buildIssue(preview.artifactId, "blocked", "direct mutation instruction", "Preview appears to instruct direct source mutation."));
  }

  if (!preview.policyBoundary || preview.policyBoundary.mode !== "preview-only") {
    issues.push(buildIssue(preview.artifactId, "blocked", "missing approval boundary", "Preview is missing the preview-only policy boundary."));
  }

  if (!normalized.includes("preview-only")) {
    issues.push(buildIssue(preview.artifactId, "warning", "missing preview-only language", "Preview should explicitly say preview-only."));
  }

  if (
    normalized.includes("blender") ||
    normalized.includes("unreal") ||
    normalized.includes("comfyui") ||
    normalized.includes("external app")
  ) {
    issues.push(buildIssue(preview.artifactId, "warning", "external execution wording", "Preview references external execution surfaces; policy must keep them blocked."));
  }

  const report: ArtifactValidationReport = {
    id: `artifact-validation-${preview.artifactId}`,
    state: inferState(issues),
    issues,
    summary: [],
  };

  return {
    ...report,
    summary: summarizeArtifactValidation(report),
  };
}

export function validateArtifactSet(set: ArtifactPreviewSet): ArtifactValidationReport {
  const issues = set.previews.flatMap((preview) => validateArtifactPreview(preview).issues);
  const report: ArtifactValidationReport = {
    id: "artifact-validation-set-phase-10",
    state: inferState(issues),
    issues,
    summary: [],
  };

  return {
    ...report,
    summary: summarizeArtifactValidation(report),
  };
}

export function summarizeArtifactValidation(
  report: ArtifactValidationReport
): string[] {
  if (report.issues.length === 0) {
    return ["valid-preview: preview-only language and approval boundary are present."];
  }

  return [
    `${report.state}: ${report.issues.length} validation notes detected.`,
    ...report.issues.map((issue) => `${issue.label}: ${issue.detail}`),
  ];
}

function buildIssue(
  artifactId: string,
  severity: ArtifactValidationIssue["severity"],
  label: string,
  detail: string
): ArtifactValidationIssue {
  return {
    id: `${artifactId}-${label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
    artifactId,
    severity,
    label,
    detail,
  };
}

function inferState(issues: ArtifactValidationIssue[]): ArtifactValidationState {
  if (issues.some((issue) => issue.severity === "blocked")) return "blocked";
  if (issues.length > 0) return "needs-review";
  return "valid-preview";
}
