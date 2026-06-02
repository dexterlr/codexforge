import type { VideoProjectNextAction, VideoProjectReadiness, VideoProjectStatus } from "./video-project-workspace-types";

export function buildVideoProjectNextAction(
  status: VideoProjectStatus,
  readiness: VideoProjectReadiness
): VideoProjectNextAction {
  if (status.blockingSections.length > 0) {
    return {
      id: "review-project-assets",
      label: "Review missing project assets",
      plainEnglish: `Start with ${status.blockingSections[0]} so the project is not blocked.`,
      route: "/video-assets",
      manualOnly: true,
    };
  }

  if (!readiness.readyForExportHandoff) {
    return {
      id: "review-project",
      label: "Review project",
      plainEnglish: "Check the grouped project sections and decide what should be supplied next.",
      route: "/video-projects",
      manualOnly: true,
    };
  }

  return {
    id: "prepare-video-export-handoff",
    label: "Prepare video export handoff",
    plainEnglish: "Copy the handoff packet for a future approved export step.",
    route: "/video-export",
    manualOnly: true,
  };
}
