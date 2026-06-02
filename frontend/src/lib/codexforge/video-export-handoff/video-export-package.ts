import type { VideoExportPackage } from "./video-export-handoff-types";

export function buildVideoExportPackage(input: Partial<VideoExportPackage> = {}): VideoExportPackage {
  return {
    id: input.id ?? "video-export-package-preview",
    title: input.title ?? "Video export handoff packet",
    finalCandidateId: input.finalCandidateId ?? "render-version-final-candidate-v5",
    packageMode: "handoff-only",
    noFileWrite: true,
    noUpload: true,
  };
}

export function buildDefaultVideoExportPackage(): VideoExportPackage {
  return buildVideoExportPackage();
}
