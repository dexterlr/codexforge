import type { FinishingExportPlan } from "./video-finishing-types";

export function buildFinishingExportPlan(input: Partial<FinishingExportPlan> = {}): FinishingExportPlan {
  return {
    id: input.id ?? "finishing-export-plan",
    targetFormat: input.targetFormat ?? "final video format not chosen yet",
    artifactDestination: input.artifactDestination ?? "planned local artifact destination",
    plainEnglish:
      input.plainEnglish ??
      "The export plan names where the finished candidate should go. It does not render, export, upload, or move files.",
  };
}
