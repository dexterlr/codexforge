import type { VideoProject, VideoProjectStatus, VideoProjectStatusKind } from "./video-project-workspace-types";

const STATUS_LABELS: Record<VideoProjectStatusKind, string> = {
  idea: "Idea",
  planning: "Planning",
  "assets-needed": "Assets needed",
  "draft-ready": "Draft ready",
  "review-needed": "Review needed",
  "finishing-ready": "Finishing ready",
  "export-ready": "Export ready",
  blocked: "Blocked",
  "archived-preview": "Archived preview",
};

export function buildVideoProjectStatus(project: VideoProject): VideoProjectStatus {
  const blockingSections = project.sections
    .filter((section) => section.requiredForProject && (section.status === "missing" || section.status === "blocked"))
    .map((section) => section.title);
  const status = project.status;
  const plainEnglish =
    blockingSections.length > 0
      ? `Project is ${STATUS_LABELS[status].toLowerCase()} because ${blockingSections.join(", ")} still need attention.`
      : `Project is ${STATUS_LABELS[status].toLowerCase()} for review.`;

  return {
    id: "video-project-status",
    status,
    label: STATUS_LABELS[status],
    plainEnglish,
    blockingSections,
  };
}
