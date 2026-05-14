import type {
  ArtifactExportRequest,
  ArtifactExportValidationIssue,
  ArtifactExportValidationReport,
  ArtifactExportValidationState,
} from "./artifact-workspace-types";
import {
  isArtifactExtensionAllowed,
  isArtifactPathTraversal,
  isArtifactSourceMutationPath,
  validateArtifactWorkspacePath,
} from "./artifact-path-guard";

const COMMAND_EXECUTION_TEXT = [
  "execute command",
  "run command",
  "shell command",
  "child_process",
  "spawn(",
  "exec(",
  "powershell",
  "bash ",
  "cmd.exe",
];

const BROKER_EXECUTION_TEXT = [
  "broker-execution",
  "place trade",
  "place order",
  "send order",
  "live trade",
  "buy shares",
  "sell shares",
];

const EXTERNAL_APP_TEXT = [
  "execute blender",
  "run blender",
  "launch blender",
  "execute unreal",
  "run unreal",
  "launch unreal",
  "execute comfyui",
  "run comfyui",
  "launch comfyui",
  "open external app",
];

export function validateArtifactExportContent(
  request: ArtifactExportRequest
): ArtifactExportValidationReport {
  const issues: ArtifactExportValidationIssue[] = [];
  const content = request.content.trim();
  const normalized = `${request.content}\n${request.targetRelativePath}\n${request.approvalNote}`.toLowerCase();
  const pathValidation = validateArtifactWorkspacePath(request.targetRelativePath);

  if (!content) {
    issues.push(buildIssue("empty content", "blocked", "Export content is empty."));
  }

  if (!isArtifactExtensionAllowed(request.targetRelativePath)) {
    issues.push(buildIssue("unsupported extension", "blocked", "Target extension is outside the artifact allowlist."));
  }

  if (isArtifactPathTraversal(request.targetRelativePath)) {
    issues.push(buildIssue("path traversal", "blocked", "Target path includes traversal."));
  }

  if (pathValidation.absolutePath) {
    issues.push(buildIssue("absolute path", "blocked", "Absolute artifact target paths are blocked."));
  }

  if (isArtifactSourceMutationPath(request.targetRelativePath)) {
    issues.push(buildIssue("source mutation attempt", "blocked", "Target path resembles a project source or config mutation."));
  }

  if (request.approved !== true) {
    issues.push(buildIssue("missing approval", "blocked", "Artifact export requires approved true."));
  }

  if (COMMAND_EXECUTION_TEXT.some((word) => normalized.includes(word))) {
    issues.push(buildIssue("suspicious command execution text", "warning", "Export text mentions command execution; export remains inert."));
  }

  if (BROKER_EXECUTION_TEXT.some((word) => normalized.includes(word))) {
    issues.push(buildIssue("broker trading execution wording", "blocked", "Broker or trading execution wording is blocked."));
  }

  if (EXTERNAL_APP_TEXT.some((word) => normalized.includes(word))) {
    issues.push(buildIssue("external app execution wording", "warning", "External app execution wording requires review and is not executed."));
  }

  const report: ArtifactExportValidationReport = {
    id: `artifact-export-validation-${request.artifactId}`,
    state: inferState(issues),
    issues,
    pathValidation,
    summary: [],
  };

  return {
    ...report,
    summary: summarizeArtifactExportValidation(report),
  };
}

export function validateArtifactExportSet(
  requests: ArtifactExportRequest[]
): ArtifactExportValidationReport {
  const reports = requests.map(validateArtifactExportContent);
  const issues = reports.flatMap((report) => report.issues);
  const report: ArtifactExportValidationReport = {
    id: "artifact-export-validation-set-phase-11",
    state: inferState(issues),
    issues,
    pathValidation:
      reports[0]?.pathValidation ?? validateArtifactWorkspacePath("review/export-request.preview.txt"),
    summary: [],
  };

  return {
    ...report,
    summary: summarizeArtifactExportValidation(report),
  };
}

export function summarizeArtifactExportValidation(
  report: ArtifactExportValidationReport
): string[] {
  if (report.issues.length === 0) {
    return [
      "valid-export: explicit approval, safe workspace path, and allowed extension are present.",
    ];
  }

  return [
    `${report.state}: ${report.issues.length} export validation note(s).`,
    ...report.issues.map((issue) => `${issue.label}: ${issue.detail}`),
  ];
}

function buildIssue(
  label: string,
  severity: ArtifactExportValidationIssue["severity"],
  detail: string
): ArtifactExportValidationIssue {
  return {
    id: `artifact-export-${label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
    severity,
    label,
    detail,
  };
}

function inferState(issues: ArtifactExportValidationIssue[]): ArtifactExportValidationState {
  if (issues.some((issue) => issue.severity === "blocked")) return "blocked";
  if (issues.length > 0) return "needs-review";
  return "valid-export";
}
