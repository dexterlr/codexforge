export type MissingModelNodeItemType =
  | "model"
  | "checkpoint"
  | "LoRA"
  | "VAE"
  | "custom node"
  | "unknown";

export type MissingModelNodeInventoryStatus =
  | "not-checked"
  | "missing"
  | "present"
  | "unknown";

export type MissingModelNodeResolutionItem = {
  id: string;
  missingItemSummary: string;
  itemType: MissingModelNodeItemType;
  workflowImpact: string;
  safeResolutionGuidance: string;
  installDownloadStatus: "manual only";
  localInventoryCheckStatus: MissingModelNodeInventoryStatus;
  compatibilityCheckerRoute: "/workflow-compatibility-checker";
  importShelfRoute: "/workflow-template-import-shelf";
  retryRecoveryRoute: "/render-queue-recovery";
};

export type MissingModelNodeResolverBoundary = {
  localOnly: true;
  downloadAllowed: false;
  installAllowed: false;
  arbitraryFileBrowsingAllowed: false;
  fullLocalPathsAboveFoldAllowed: false;
  externalUrlCallsAllowed: false;
  queueSubmissionAllowed: false;
};

export type MissingModelNodeResolverModel = {
  title: "Missing model and node resolver";
  summary: string;
  items: MissingModelNodeResolutionItem[];
  boundary: MissingModelNodeResolverBoundary;
  advancedDetails: string[];
};

export function buildMissingModelNodeResolverStableKey(
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
