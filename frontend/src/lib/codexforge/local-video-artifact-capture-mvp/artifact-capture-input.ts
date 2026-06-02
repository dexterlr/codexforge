import type { ArtifactCaptureInput } from "./local-video-artifact-capture-types";

export function buildArtifactCaptureInput(
  input: Partial<ArtifactCaptureInput> = {}
): ArtifactCaptureInput {
  return {
    id: input.id ?? "local-video-artifact-capture-001",
    artifactKind: input.artifactKind ?? "local-image",
    sourceRequestId: input.sourceRequestId ?? "local-image-request-001",
    sourceWorkflowPackageId: input.sourceWorkflowPackageId ?? "reviewed-workflow-package-001",
    sourceProvider: input.sourceProvider ?? "local provider, supplied metadata only",
    fileLabel: input.fileLabel ?? "supplied artifact label, no file opened",
    safeRelativeArtifactPath: input.safeRelativeArtifactPath ?? "artifacts/review/supplied-local-image.png",
    thumbnailSupplied: input.thumbnailSupplied ?? "thumbnail metadata supplied by operator",
    durationSupplied: input.durationSupplied,
    resolutionSupplied: input.resolutionSupplied ?? "1024x1024 supplied",
    status: input.status ?? "supplied-metadata",
    reviewNotes: input.reviewNotes ?? "Supplied metadata clearly marked supplied. No hidden persistence occurs here.",
    noFileMutationGuarantee: true,
  };
}

export function buildDefaultArtifactCaptureInput(): ArtifactCaptureInput {
  return buildArtifactCaptureInput();
}
