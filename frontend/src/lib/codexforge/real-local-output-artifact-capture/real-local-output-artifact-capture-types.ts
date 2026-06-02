export type RealLocalOutputArtifactCaptureCheckId =
  | "local output reference summary"
  | "artifact type"
  | "source trial"
  | "checksum status placeholder"
  | "review inbox handoff"
  | "recovery path"
  | "export handoff"
  | "retention note"
  | "no artifact deletion"
  | "no memory auto-promotion"
  | "full local paths stay secondary";

export type RealLocalOutputArtifactCaptureCheckStatus =
  | "ready"
  | "needs-review"
  | "blocked";

export type RealLocalOutputArtifactCaptureStatus =
  | "capture-ready"
  | "needs-review"
  | "blocked";

export type RealLocalOutputArtifactCaptureRecord = {
  id: "real-local-output-artifact-capture-record";
  localOutputReferenceSummary: string;
  artifactType: string;
  sourceTrial: string;
  checksumStatusPlaceholder: string;
  reviewInboxHandoff: string;
  recoveryPath: string;
  exportHandoff: string;
  retentionNote: string;
  noDeleteBehavior: true;
  noMemoryAutoPromotion: true;
  fullLocalPathsStaySecondary: true;
};

export type RealLocalOutputArtifactCaptureCheck = {
  id: RealLocalOutputArtifactCaptureCheckId;
  status: RealLocalOutputArtifactCaptureCheckStatus;
  label: string;
  plainEnglish: string;
  blocksCapture: boolean;
};

export type RealLocalOutputArtifactCaptureBoundary = {
  id: "real-local-output-artifact-capture-boundary";
  capturesLocalOutputReferenceSummary: true;
  reviewInboxHandoff: true;
  recoveryPath: true;
  exportHandoff: true;
  retentionNote: true;
  artifactDeletionAllowed: false;
  arbitraryFileBrowsingAllowed: false;
  fullLocalPathsAboveFoldAllowed: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  automaticRunAllowed: false;
};

export type RealLocalOutputArtifactCaptureSummary = {
  record: RealLocalOutputArtifactCaptureRecord;
  checks: RealLocalOutputArtifactCaptureCheck[];
  boundary: RealLocalOutputArtifactCaptureBoundary;
  status: RealLocalOutputArtifactCaptureStatus;
  summary: string;
};

export function buildRealLocalOutputArtifactCaptureStableKey(
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
