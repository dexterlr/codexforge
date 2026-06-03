export type WorkflowTemplateSourceTrustLevel =
  | "trusted-local-template"
  | "review-required"
  | "unknown";

export type WorkflowTemplateReviewStatus =
  | "passed"
  | "needs-review"
  | "blocked"
  | "unknown";

export type WorkflowTemplateImportCandidate = {
  id: string;
  incomingTemplateSummary: string;
  sourceTrustLevel: WorkflowTemplateSourceTrustLevel;
  localOnlyPolicy: string;
  safetyInspectionStatus: WorkflowTemplateReviewStatus;
  parameterMappingStatus: WorkflowTemplateReviewStatus;
  compatibilityCheckRoute: "/workflow-compatibility-checker";
  missingModelNodeRoute: "/missing-model-node-resolver";
  approvalNote: string;
  rejectQuarantineGuidance: string;
};

export type WorkflowTemplateImportShelfBoundary = {
  localOnly: true;
  importExecutesWorkflows: false;
  autoTrustTemplates: false;
  templateUploadAllowed: false;
  silentLibraryMutationAllowed: false;
  arbitraryFileBrowsingAllowed: false;
  rawTemplateAboveFoldAllowed: false;
  cloudCallsAllowed: false;
};

export type WorkflowTemplateImportShelfModel = {
  title: "Workflow template import shelf";
  summary: string;
  candidates: WorkflowTemplateImportCandidate[];
  boundary: WorkflowTemplateImportShelfBoundary;
  advancedDetails: string[];
};

export function buildWorkflowTemplateImportShelfStableKey(
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
