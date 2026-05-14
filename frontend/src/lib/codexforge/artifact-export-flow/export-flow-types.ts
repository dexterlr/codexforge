import type { ArtifactExportRequest } from "@/lib/codexforge/artifact-workspace";
import { CODEXFORGE_ARTIFACT_WORKSPACE_ROOT } from "@/lib/codexforge/artifact-workspace";

export type ArtifactExportFlowStateName =
  | "draft"
  | "review-required"
  | "approval-required"
  | "ready-to-export"
  | "exporting"
  | "exported"
  | "partially-exported"
  | "blocked"
  | "failed";

export type ExportApprovalChecklist = {
  id: string;
  userApprovedExport: boolean;
  safeWorkspaceTarget: boolean;
  extensionAllowed: boolean;
  noTraversal: boolean;
  noSourceMutationPath: boolean;
  noCommandExecutionIntent: boolean;
  previewOnlyLanguage: boolean;
  approved: boolean;
  summary: string[];
};

export type ExportRequestRiskGroup = "blocked" | "review" | "ready";

export type ExportRequestReviewItem = {
  id: string;
  artifactId: string;
  title: string;
  targetRelativePath: string;
  extension: string;
  contentSizeBytes: number;
  sourceSurface: string;
  overwrite: boolean;
  approved: boolean;
  pathSafetyState: "safe" | "blocked";
  validationWarnings: string[];
  riskGroup: ExportRequestRiskGroup;
};

export type ExportRequestReview = {
  id: string;
  sourcePackId: string;
  items: ExportRequestReviewItem[];
  groups: Record<ExportRequestRiskGroup, ExportRequestReviewItem[]>;
  summary: string[];
};

export type ExportApiPayload = ArtifactExportRequest & {
  mode: "artifact-export-only";
};

export type ExportApiResult = {
  ok: boolean;
  artifactId: string;
  targetRelativePath: string;
  exportedPath: string;
  error: string;
  safetyNote: string;
};

export type ExportResultLedgerItem = {
  id: string;
  artifactId: string;
  targetPath: string;
  status: "pending" | "exported" | "blocked" | "failed";
  exportedPath: string;
  error: string;
  sourcePackId: string;
  sourceSurface: string;
  safetyNote: string;
};

export type ExportResultLedger = {
  id: string;
  sourcePackId: string;
  workspaceRoot: typeof CODEXFORGE_ARTIFACT_WORKSPACE_ROOT;
  items: ExportResultLedgerItem[];
  summary: string[];
};

export type ArtifactExportFlowStep = {
  id: string;
  label: string;
  state: "pending" | "active" | "complete" | "blocked";
  detail: string;
};

export type ArtifactExportFlow = {
  id: string;
  sourcePackId: string;
  exportRequests: ArtifactExportRequest[];
  approvalChecklist: ExportApprovalChecklist;
  guardedWorkspaceRoot: typeof CODEXFORGE_ARTIFACT_WORKSPACE_ROOT;
  progressState: ArtifactExportFlowStateName;
  resultsLedger: ExportResultLedger;
  review: ExportRequestReview;
  blockedReasons: string[];
  nextAction: string;
  steps: ArtifactExportFlowStep[];
  summary: string[];
};

export type ExportFlowReducerState = {
  flow: ArtifactExportFlow;
  preparedPayloads: ExportApiPayload[];
  workspaceRefreshCount: number;
  statusMessage: string;
};

export type ExportFlowReducerAction =
  | { type: "review.created"; requests: ArtifactExportRequest[] }
  | { type: "approval.toggled"; approved: boolean }
  | { type: "export.started" }
  | { type: "export.item.completed"; item: ExportResultLedgerItem }
  | { type: "export.item.failed"; item: ExportResultLedgerItem }
  | { type: "export.completed" }
  | { type: "workspace.refreshed" };

export function buildArtifactExportFlowReactKey(
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
