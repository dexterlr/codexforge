import type { VideoProject, VideoProjectHandoff, VideoProjectReadiness, VideoProjectStatus } from "./video-project-workspace-types";

export function buildVideoProjectHandoff(
  project: VideoProject,
  status: VideoProjectStatus,
  readiness: VideoProjectReadiness
): VideoProjectHandoff {
  return {
    id: "video-project-handoff",
    copyLabel: "Copy project handoff allowed",
    packet: [
      `Project: ${project.title}`,
      `Status: ${status.label}`,
      `Readiness: ${readiness.plainEnglish}`,
      `Sections: ${project.sections.map((section) => `${section.kind} is ${section.status}`).join("; ")}`,
      "Manual next step: review missing assets before draft, finishing, or export.",
    ],
    safetyNote:
      "Handoff is copy-only. No generation, no ComfyUI call, no arbitrary file browsing, no upload, and no real export happens here.",
  };
}
