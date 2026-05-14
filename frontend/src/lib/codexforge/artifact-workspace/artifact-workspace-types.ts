import type { ArtifactSourceSurface, ArtifactType } from "@/lib/codexforge/artifact-executor";

export const CODEXFORGE_ARTIFACT_WORKSPACE_ROOT = ".codexforge/artifacts";

export const CODEXFORGE_ARTIFACT_ALLOWED_EXTENSIONS = [
  ".md",
  ".txt",
  ".json",
  ".preview.json",
  ".preview.py",
  ".preview.txt",
] as const;

export type ArtifactWorkspaceAllowedExtension =
  (typeof CODEXFORGE_ARTIFACT_ALLOWED_EXTENSIONS)[number];

export type ArtifactExportValidationState = "valid-export" | "needs-review" | "blocked";

export type ArtifactExportValidationIssue = {
  id: string;
  severity: "info" | "warning" | "blocked";
  label: string;
  detail: string;
};

export type ArtifactWorkspacePathValidation = {
  inputPath: string;
  normalizedPath: string | null;
  workspaceRoot: typeof CODEXFORGE_ARTIFACT_WORKSPACE_ROOT;
  allowed: boolean;
  extensionAllowed: boolean;
  traversal: boolean;
  absolutePath: boolean;
  sourceMutationAttempt: boolean;
  reason: string;
};

export type ArtifactExportPolicy = {
  id: string;
  requiresApproval: true;
  safeWorkspaceOnly: true;
  sourceMutationBlocked: true;
  overwriteRequiresExplicitTrue: true;
  auditMetadataRequired: true;
  workspaceRoot: typeof CODEXFORGE_ARTIFACT_WORKSPACE_ROOT;
  allowedExtensions: readonly ArtifactWorkspaceAllowedExtension[];
  blockedSourceSegments: string[];
  summary: string[];
};

export type ArtifactExportRequest = {
  artifactId: string;
  type: ArtifactType | string;
  title: string;
  content: string;
  targetRelativePath: string;
  approved: boolean;
  overwrite: boolean;
  sourceSurface: ArtifactSourceSurface | string;
  sourceRunId: string;
  approvalNote: string;
};

export type ArtifactExportLedgerItem = {
  artifactId: string;
  targetPath: string;
  status: "exported" | "blocked" | "pending-approval";
  approvalNote: string;
  validationState: ArtifactExportValidationState;
  sourceSurface: string;
  sourceRunId: string;
  createdLabel: string;
  safetyNote: string;
};

export type ArtifactExportLedger = {
  id: string;
  workspaceRoot: typeof CODEXFORGE_ARTIFACT_WORKSPACE_ROOT;
  items: ArtifactExportLedgerItem[];
  summary: string[];
};

export type ArtifactExportValidationReport = {
  id: string;
  state: ArtifactExportValidationState;
  issues: ArtifactExportValidationIssue[];
  pathValidation: ArtifactWorkspacePathValidation;
  summary: string[];
};

export type ArtifactWorkspaceContext = {
  id: string;
  workspaceRoot: typeof CODEXFORGE_ARTIFACT_WORKSPACE_ROOT;
  allowedExtensions: readonly ArtifactWorkspaceAllowedExtension[];
  policy: ArtifactExportPolicy;
  sampleRequest: ArtifactExportRequest;
  validation: ArtifactExportValidationReport;
  ledger: ArtifactExportLedger;
  summary: string[];
};

export function buildArtifactWorkspaceReactKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
