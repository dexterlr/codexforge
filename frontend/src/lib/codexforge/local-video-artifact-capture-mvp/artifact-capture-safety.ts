import type {
  ArtifactCaptureInput,
  ArtifactCaptureSafety,
} from "./local-video-artifact-capture-types";

export function buildArtifactCaptureSafety(input: ArtifactCaptureInput): ArtifactCaptureSafety {
  return {
    id: `${input.id}-safety`,
    noArbitraryFilesystemBrowsing: true,
    noDeletion: true,
    noMutation: true,
    noFakeArtifact: true,
    suppliedMetadataMarked: true,
    safeWorkspaceOnly: true,
    plainEnglish:
      "Capture uses supplied metadata and safe relative artifact labels only. It does not browse arbitrary paths, delete files, mutate artifacts, or fake success.",
  };
}
