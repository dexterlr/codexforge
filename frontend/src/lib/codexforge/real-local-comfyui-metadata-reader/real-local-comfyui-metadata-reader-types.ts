export type RealLocalComfyUiMetadataReaderStatus =
  | "acceptable"
  | "needs-review"
  | "blocked";

export type RealLocalComfyUiMetadataStatusSource =
  | "existing-preview"
  | "future-approved-local-probe"
  | "operator-supplied";

export type RealLocalComfyUiMetadataCapabilityStatus =
  | "available"
  | "missing"
  | "unknown"
  | "not-read";

export type RealLocalComfyUiMetadataReaderContract = {
  id: "real-local-comfyui-metadata-reader-contract";
  title: "Real local ComfyUI metadata reader";
  localOnly: true;
  metadataIsSummarizedSafely: true;
  arbitraryLocalFileBrowsingAllowed: false;
  fullLocalPathsAboveFoldAllowed: false;
  rawMetadataAboveFoldAllowed: false;
  cloudCallsAllowed: false;
  secretsShown: false;
};

export type RealLocalComfyUiMetadataCapabilitySummary = {
  id: string;
  label: string;
  status: RealLocalComfyUiMetadataCapabilityStatus;
  plainEnglish: string;
};

export type RealLocalComfyUiMetadataReaderSummary = {
  contract: RealLocalComfyUiMetadataReaderContract;
  status: RealLocalComfyUiMetadataReaderStatus;
  statusSource: RealLocalComfyUiMetadataStatusSource;
  sourceLabel: string;
  capabilitySummary: RealLocalComfyUiMetadataCapabilitySummary[];
  modelCheckpointVisibilityStatus: string;
  workflowCompatibilityHints: string[];
  missingCapabilityHints: string[];
  privacySafetyNotes: string[];
  advancedMetadataSecondary: true;
  summary: string;
};

export function buildRealLocalComfyUiMetadataReaderStableKey(
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
