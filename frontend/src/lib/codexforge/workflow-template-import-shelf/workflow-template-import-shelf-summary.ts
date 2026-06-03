import type {
  WorkflowTemplateImportCandidate,
  WorkflowTemplateImportShelfBoundary,
  WorkflowTemplateImportShelfModel,
  WorkflowTemplateReviewStatus,
  WorkflowTemplateSourceTrustLevel,
} from "./workflow-template-import-shelf-types";
import { buildWorkflowTemplateImportShelfStableKey } from "./workflow-template-import-shelf-types";

export function buildWorkflowTemplateImportCandidate(args: {
  incomingTemplateSummary: string;
  sourceTrustLevel: WorkflowTemplateSourceTrustLevel;
  safetyInspectionStatus: WorkflowTemplateReviewStatus;
  parameterMappingStatus: WorkflowTemplateReviewStatus;
  approvalNote: string;
  rejectQuarantineGuidance: string;
}): WorkflowTemplateImportCandidate {
  return {
    id: buildWorkflowTemplateImportShelfStableKey("import-shelf", args.incomingTemplateSummary),
    incomingTemplateSummary: args.incomingTemplateSummary,
    sourceTrustLevel: args.sourceTrustLevel,
    localOnlyPolicy:
      "Local-only policy: review metadata and handoff copy locally; import does not execute workflows.",
    safetyInspectionStatus: args.safetyInspectionStatus,
    parameterMappingStatus: args.parameterMappingStatus,
    compatibilityCheckRoute: "/workflow-compatibility-checker",
    missingModelNodeRoute: "/missing-model-node-resolver",
    approvalNote: args.approvalNote,
    rejectQuarantineGuidance: args.rejectQuarantineGuidance,
  };
}

export function buildWorkflowTemplateImportCandidates(): WorkflowTemplateImportCandidate[] {
  return [
    buildWorkflowTemplateImportCandidate({
      incomingTemplateSummary: "incoming local draft template: checkpoint, sampler, image output, and optional LoRA slot",
      sourceTrustLevel: "review-required",
      safetyInspectionStatus: "needs-review",
      parameterMappingStatus: "needs-review",
      approvalNote:
        "Review before library promotion. The template cannot become a library item without explicit operator review.",
      rejectQuarantineGuidance:
        "Reject or quarantine guidance: keep questionable templates staged, do not run them, and record why they are blocked.",
    }),
    buildWorkflowTemplateImportCandidate({
      incomingTemplateSummary: "incoming keyframe refinement template: control nodes, image output, and manual seed policy",
      sourceTrustLevel: "unknown",
      safetyInspectionStatus: "unknown",
      parameterMappingStatus: "unknown",
      approvalNote:
        "Templates are not auto-trusted. Missing source notes keep this candidate in review.",
      rejectQuarantineGuidance:
        "Reject or quarantine guidance: if node or model identity is unclear, route to compatibility and missing item review first.",
    }),
  ];
}

export function buildWorkflowTemplateImportShelfBoundary(): WorkflowTemplateImportShelfBoundary {
  return {
    localOnly: true,
    importExecutesWorkflows: false,
    autoTrustTemplates: false,
    templateUploadAllowed: false,
    silentLibraryMutationAllowed: false,
    arbitraryFileBrowsingAllowed: false,
    rawTemplateAboveFoldAllowed: false,
    cloudCallsAllowed: false,
  };
}

export function summarizeWorkflowTemplateImportShelf(
  model: WorkflowTemplateImportShelfModel
): string {
  return `${model.title}: Import does not execute workflows. Templates are not auto-trusted, Review before library promotion is required, and No template upload happens from this UI.`;
}

export function buildWorkflowTemplateImportShelfModel(): WorkflowTemplateImportShelfModel {
  const model: WorkflowTemplateImportShelfModel = {
    title: "Workflow template import shelf",
    summary: "",
    candidates: buildWorkflowTemplateImportCandidates(),
    boundary: buildWorkflowTemplateImportShelfBoundary(),
    advancedDetails: [
      "Advanced/raw template details stay secondary.",
      "Compatibility check route: /workflow-compatibility-checker.",
      "Missing model/node route: /missing-model-node-resolver.",
      "Reject or quarantine guidance stays visible before any library promotion.",
    ],
  };

  return { ...model, summary: summarizeWorkflowTemplateImportShelf(model) };
}
