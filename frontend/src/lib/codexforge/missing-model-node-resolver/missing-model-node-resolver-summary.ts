import type {
  MissingModelNodeInventoryStatus,
  MissingModelNodeItemType,
  MissingModelNodeResolutionItem,
  MissingModelNodeResolverBoundary,
  MissingModelNodeResolverModel,
} from "./missing-model-node-resolver-types";
import { buildMissingModelNodeResolverStableKey } from "./missing-model-node-resolver-types";

export function buildMissingModelNodeResolutionItem(args: {
  missingItemSummary: string;
  itemType: MissingModelNodeItemType;
  workflowImpact: string;
  safeResolutionGuidance: string;
  localInventoryCheckStatus: MissingModelNodeInventoryStatus;
}): MissingModelNodeResolutionItem {
  return {
    id: buildMissingModelNodeResolverStableKey("missing-item", args.itemType, args.missingItemSummary),
    missingItemSummary: args.missingItemSummary,
    itemType: args.itemType,
    workflowImpact: args.workflowImpact,
    safeResolutionGuidance: args.safeResolutionGuidance,
    installDownloadStatus: "manual only",
    localInventoryCheckStatus: args.localInventoryCheckStatus,
    compatibilityCheckerRoute: "/workflow-compatibility-checker",
    importShelfRoute: "/workflow-template-import-shelf",
    retryRecoveryRoute: "/render-queue-recovery",
  };
}

export function buildMissingModelNodeResolutionItems(): MissingModelNodeResolutionItem[] {
  return [
    buildMissingModelNodeResolutionItem({
      missingItemSummary: "Missing item summary: checkpoint required by the staged image draft template.",
      itemType: "checkpoint",
      workflowImpact:
        "Workflow impact: package validation cannot move to approved submit trial until the checkpoint is reviewed locally.",
      safeResolutionGuidance:
        "Safe resolution guidance: record the expected model name, verify source and license manually, and re-run compatibility review after the operator resolves it.",
      localInventoryCheckStatus: "unknown",
    }),
    buildMissingModelNodeResolutionItem({
      missingItemSummary: "Missing item summary: custom node family referenced by the imported keyframe template.",
      itemType: "custom node",
      workflowImpact:
        "Workflow impact: node compatibility remains blocked because the template cannot be trusted to run without local review.",
      safeResolutionGuidance:
        "Safe resolution guidance: inspect trusted project notes manually, do not install nodes from this UI, and keep the template quarantined if the node source is unclear.",
      localInventoryCheckStatus: "missing",
    }),
    buildMissingModelNodeResolutionItem({
      missingItemSummary: "Missing item summary: optional LoRA slot is unknown.",
      itemType: "LoRA",
      workflowImpact:
        "Workflow impact: optional style behavior stays needs-review and should not block safety inspection by itself.",
      safeResolutionGuidance:
        "Safe resolution guidance: leave optional entries disabled or manually resolved before package validation.",
      localInventoryCheckStatus: "not-checked",
    }),
  ];
}

export function buildMissingModelNodeResolverBoundary(): MissingModelNodeResolverBoundary {
  return {
    localOnly: true,
    downloadAllowed: false,
    installAllowed: false,
    arbitraryFileBrowsingAllowed: false,
    fullLocalPathsAboveFoldAllowed: false,
    externalUrlCallsAllowed: false,
    queueSubmissionAllowed: false,
  };
}

export function summarizeMissingModelNodeResolver(model: MissingModelNodeResolverModel): string {
  return `${model.title}: Manual resolution only. Do not download models, Do not install nodes, Missing item summary, local inventory check status, compatibility checker route, import shelf route, retry/recovery route, and Full local paths stay secondary.`;
}

export function buildMissingModelNodeResolverModel(): MissingModelNodeResolverModel {
  const model: MissingModelNodeResolverModel = {
    title: "Missing model and node resolver",
    summary: "",
    items: buildMissingModelNodeResolutionItems(),
    boundary: buildMissingModelNodeResolverBoundary(),
    advancedDetails: [
      "Manual resolution only.",
      "Do not download models.",
      "Do not install nodes.",
      "Full local paths stay secondary.",
      "No external URLs are called.",
    ],
  };

  return { ...model, summary: summarizeMissingModelNodeResolver(model) };
}
