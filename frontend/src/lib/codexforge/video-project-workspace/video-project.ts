import type { VideoProject, VideoProjectStatusKind } from "./video-project-workspace-types";
import { buildDefaultVideoProjectSections } from "./video-project-section";

export function buildVideoProject(input: Partial<VideoProject> = {}): VideoProject {
  const sections = input.sections ?? buildDefaultVideoProjectSections();
  return {
    id: input.id ?? "video-project-preview-record",
    title: input.title ?? "Novice video project preview",
    ownerNote:
      input.ownerNote ??
      "Supplied/manual project metadata only. Nothing is secretly rendering, exporting, or being saved.",
    status: input.status ?? selectVideoProjectStatus(sections),
    sections,
    previewOnly: true,
    persistenceNote:
      input.persistenceNote ??
      "This is a deterministic preview project record unless an approved project persistence boundary is added later.",
  };
}

export function buildDefaultVideoProject(): VideoProject {
  return buildVideoProject();
}

function selectVideoProjectStatus(sections: VideoProject["sections"]): VideoProjectStatusKind {
  const requiredSections = sections.filter((section) => section.requiredForProject);
  if (requiredSections.some((section) => section.status === "blocked")) return "blocked";
  if (requiredSections.some((section) => section.status === "missing")) return "assets-needed";
  if (requiredSections.some((section) => section.status === "needs review")) return "review-needed";
  return "export-ready";
}
