export type ArtifactType =
  | "patch-plan-markdown"
  | "storyboard-markdown"
  | "blender-script-preview"
  | "blender-python-preview"
  | "blender-scene-plan"
  | "comfyui-workflow-json"
  | "unreal-command-preview"
  | "unreal-level-plan"
  | "unreal-sequence"
  | "render-queue-manifest"
  | "run-summary-markdown"
  | "research-summary"
  | "generic-artifact-preview";

export type ArtifactSourceSurface =
  | "Creative Production Studio"
  | "Safe Patch Preview"
  | "Operator Run Center"
  | "Local Bridge"
  | "Brain runtime"
  | "Files command center";

export type ArtifactApprovalState =
  | "preview-only"
  | "approval-required-before-future-write"
  | "approval-required-before-future-execution"
  | "blocked";

export type ArtifactValidationState = "valid-preview" | "needs-review" | "blocked";

export type ArtifactPlanItem = {
  id: string;
  type: ArtifactType;
  title: string;
  targetPlaceholderPath: string;
  sourceSurface: ArtifactSourceSurface;
  previewLanguage: "markdown" | "json" | "text";
  intent: string;
  blockedActions: string[];
};

export type ArtifactPlan = {
  id: string;
  title: string;
  mode: "preview-only";
  items: ArtifactPlanItem[];
  summary: string[];
  nextAction: string;
};

export type ArtifactPolicyRule = {
  id: string;
  label: string;
  blocked: boolean;
  detail: string;
  futureRequirement: string;
};

export type ArtifactPolicyBoundary = {
  id: string;
  mode: "preview-only";
  previewGenerationAllowed: true;
  futureArtifactWriteRequiresApproval: true;
  futureExecutionRequiresRunAndBridgeConsent: true;
  rules: ArtifactPolicyRule[];
  blockedActions: string[];
  summary: string[];
};

export type ArtifactRenderedPreview = {
  format: "markdown" | "json" | "text";
  content: string;
  json?: Record<string, unknown>;
};

export type ArtifactPreview = {
  artifactId: string;
  type: ArtifactType;
  title: string;
  targetPlaceholderPath: string;
  sourceSurface: ArtifactSourceSurface;
  contentPreview: string;
  rendered: ArtifactRenderedPreview;
  policyBoundary: ArtifactPolicyBoundary;
  validationNotes: string[];
  previewOnly: true;
};

export type ArtifactPreviewSet = {
  id: string;
  previews: ArtifactPreview[];
  summary: string[];
};

export type ArtifactLedgerItem = {
  artifactId: string;
  sourceSurface: ArtifactSourceSurface;
  sourceRunId: string;
  type: ArtifactType;
  status: "preview-generated" | "blocked" | "waiting-review";
  approvalState: ArtifactApprovalState;
  validationState: ArtifactValidationState;
  reviewAction: string;
};

export type ArtifactLedger = {
  id: string;
  items: ArtifactLedgerItem[];
  summary: string[];
};

export type ArtifactValidationIssue = {
  id: string;
  artifactId: string;
  severity: "info" | "warning" | "blocked";
  label: string;
  detail: string;
};

export type ArtifactValidationReport = {
  id: string;
  state: ArtifactValidationState;
  issues: ArtifactValidationIssue[];
  summary: string[];
};

export type ArtifactRunHandoff = {
  id: string;
  connectedSurfaces: ArtifactSourceSurface[];
  previewRunPayload: {
    mode: "preview-only";
    artifactCount: number;
    action: string;
  };
  validationChecklist: string[];
  blocked: boolean;
  approvalState: "not-requested" | "required-before-future-writes-or-execution";
  reviewPrompt: string;
};

export type ArtifactExecutorModel = {
  plan: ArtifactPlan;
  policyBoundary: ArtifactPolicyBoundary;
  previewSet: ArtifactPreviewSet;
  ledger: ArtifactLedger;
  validation: ArtifactValidationReport;
  runHandoff: ArtifactRunHandoff;
  summary: string[];
};

export function buildArtifactReactKey(
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

export const SUPPORTED_ARTIFACT_TYPES: ArtifactType[] = [
  "patch-plan-markdown",
  "storyboard-markdown",
  "blender-script-preview",
  "comfyui-workflow-json",
  "unreal-command-preview",
  "unreal-level-plan",
  "unreal-sequence",
  "render-queue-manifest",
  "run-summary-markdown",
  "research-summary",
  "generic-artifact-preview",
];
