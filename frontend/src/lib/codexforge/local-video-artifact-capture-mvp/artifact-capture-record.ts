import type {
  ArtifactCaptureInput,
  ArtifactCaptureRecord,
} from "./local-video-artifact-capture-types";

export function buildArtifactCaptureRecord(input: ArtifactCaptureInput): ArtifactCaptureRecord {
  const suppliedMetadata = [
    `source request id: ${input.sourceRequestId}`,
    `workflow package id: ${input.sourceWorkflowPackageId}`,
    `source provider: ${input.sourceProvider}`,
    `safe relative path optional: ${input.safeRelativeArtifactPath ?? "not supplied"}`,
    `thumbnail supplied optional: ${input.thumbnailSupplied ?? "not supplied"}`,
    `duration supplied optional: ${input.durationSupplied ?? "not supplied"}`,
    `resolution supplied optional: ${input.resolutionSupplied ?? "not supplied"}`,
    `status: ${input.status}`,
  ];

  return {
    id: `${input.id}-record`,
    artifactKind: input.artifactKind,
    label: input.fileLabel,
    provenance: "supplied/manual/approved-boundary result capture only",
    suppliedMetadata,
    fakeArtifact: false,
  };
}
