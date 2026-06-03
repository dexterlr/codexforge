export type ComfyUiWorkflowLibraryCompatibilityStatus =
  | "ready"
  | "needs-review"
  | "blocked"
  | "unknown";

export type ComfyUiWorkflowLibrarySafetyStatus =
  | "safe-preview"
  | "needs-review"
  | "blocked";

export type ComfyUiWorkflowLibraryEntry = {
  id: string;
  workflowIdentity: string;
  workflowCategory: string;
  supportedOutputType: string;
  localOnlyReadiness: string;
  requiredModelsNodesSummary: string;
  compatibilityStatus: ComfyUiWorkflowLibraryCompatibilityStatus;
  safetyStatus: ComfyUiWorkflowLibrarySafetyStatus;
  packageValidatorRoute: "/workflow-package-validator";
  importShelfRoute: "/workflow-template-import-shelf";
  approvedSubmitRoute: "/comfyui-submit-trial";
};

export type ComfyUiWorkflowLibraryBoundary = {
  localOnly: true;
  libraryExecutesWorkflows: false;
  arbitraryFileBrowsingAllowed: false;
  rawWorkflowJsonAboveFoldAllowed: false;
  queueSubmissionAllowed: false;
  silentQueueMutationAllowed: false;
  cloudCallsAllowed: false;
  secretsAllowed: false;
};

export type ComfyUiWorkflowLibraryModel = {
  title: "ComfyUI workflow library";
  summary: string;
  entries: ComfyUiWorkflowLibraryEntry[];
  boundary: ComfyUiWorkflowLibraryBoundary;
  operatorNote: string;
  advancedDetails: string[];
};

export function buildComfyUiWorkflowLibraryStableKey(
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
