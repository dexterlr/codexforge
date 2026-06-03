import type {
  ComfyUiWorkflowLibraryBoundary,
  ComfyUiWorkflowLibraryCompatibilityStatus,
  ComfyUiWorkflowLibraryEntry,
  ComfyUiWorkflowLibraryModel,
  ComfyUiWorkflowLibrarySafetyStatus,
} from "./comfyui-workflow-library-types";
import { buildComfyUiWorkflowLibraryStableKey } from "./comfyui-workflow-library-types";

export function buildComfyUiWorkflowLibraryEntry(args: {
  workflowIdentity: string;
  workflowCategory: string;
  supportedOutputType: string;
  localOnlyReadiness: string;
  requiredModelsNodesSummary: string;
  compatibilityStatus: ComfyUiWorkflowLibraryCompatibilityStatus;
  safetyStatus: ComfyUiWorkflowLibrarySafetyStatus;
}): ComfyUiWorkflowLibraryEntry {
  return {
    id: buildComfyUiWorkflowLibraryStableKey(
      "workflow-library",
      args.workflowCategory,
      args.workflowIdentity
    ),
    workflowIdentity: args.workflowIdentity,
    workflowCategory: args.workflowCategory,
    supportedOutputType: args.supportedOutputType,
    localOnlyReadiness: args.localOnlyReadiness,
    requiredModelsNodesSummary: args.requiredModelsNodesSummary,
    compatibilityStatus: args.compatibilityStatus,
    safetyStatus: args.safetyStatus,
    packageValidatorRoute: "/workflow-package-validator",
    importShelfRoute: "/workflow-template-import-shelf",
    approvedSubmitRoute: "/comfyui-submit-trial",
  };
}

export function buildComfyUiWorkflowLibraryEntries(): ComfyUiWorkflowLibraryEntry[] {
  return [
    buildComfyUiWorkflowLibraryEntry({
      workflowIdentity: "local draft image workflow template",
      workflowCategory: "Image draft",
      supportedOutputType: "still image",
      localOnlyReadiness:
        "Local-only workflow readiness: reviewed template, local metadata summary, and manual approval still required.",
      requiredModelsNodesSummary:
        "Required models and nodes summary: checkpoint, VAE, LoRA slot, sampler nodes, and one custom node family need review.",
      compatibilityStatus: "needs-review",
      safetyStatus: "safe-preview",
    }),
    buildComfyUiWorkflowLibraryEntry({
      workflowIdentity: "keyframe refinement workflow package",
      workflowCategory: "Keyframe",
      supportedOutputType: "image sequence",
      localOnlyReadiness:
        "Local-only workflow readiness: prepared package is ready for package validation, not execution.",
      requiredModelsNodesSummary:
        "Required models and nodes summary: checkpoint and control nodes are summarized without full local paths.",
      compatibilityStatus: "ready",
      safetyStatus: "safe-preview",
    }),
    buildComfyUiWorkflowLibraryEntry({
      workflowIdentity: "video draft prepared package",
      workflowCategory: "Video draft",
      supportedOutputType: "short local video draft",
      localOnlyReadiness:
        "Local-only workflow readiness: dual GPUs are treated as parallel workers unless the workflow explicitly supports memory sharing.",
      requiredModelsNodesSummary:
        "Required models and nodes summary: video node family, checkpoint, VAE, and temporal adapter stay compatibility-gated.",
      compatibilityStatus: "unknown",
      safetyStatus: "needs-review",
    }),
  ];
}

export function buildComfyUiWorkflowLibraryBoundary(): ComfyUiWorkflowLibraryBoundary {
  return {
    localOnly: true,
    libraryExecutesWorkflows: false,
    arbitraryFileBrowsingAllowed: false,
    rawWorkflowJsonAboveFoldAllowed: false,
    queueSubmissionAllowed: false,
    silentQueueMutationAllowed: false,
    cloudCallsAllowed: false,
    secretsAllowed: false,
  };
}

export function summarizeComfyUiWorkflowLibrary(model: ComfyUiWorkflowLibraryModel): string {
  return `${model.title}: Library does not execute workflows. It organizes approved workflow templates and prepared packages with Local-only workflow readiness, Required models and nodes summary, safety status, compatibility status, Package validator route, import shelf route, and approved submit route.`;
}

export function buildComfyUiWorkflowLibraryModel(): ComfyUiWorkflowLibraryModel {
  const model: ComfyUiWorkflowLibraryModel = {
    title: "ComfyUI workflow library",
    summary: "",
    entries: buildComfyUiWorkflowLibraryEntries(),
    boundary: buildComfyUiWorkflowLibraryBoundary(),
    operatorNote:
      "Library does not execute workflows. It is a local-first readiness shelf for reviewed workflow templates and prepared workflow packages.",
    advancedDetails: [
      "Raw workflow details stay secondary and collapsed.",
      "Package validator route: /workflow-package-validator.",
      "Import shelf route: /workflow-template-import-shelf.",
      "Approved submit route: /comfyui-submit-trial.",
    ],
  };

  return { ...model, summary: summarizeComfyUiWorkflowLibrary(model) };
}
