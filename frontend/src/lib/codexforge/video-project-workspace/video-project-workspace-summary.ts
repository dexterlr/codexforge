import type { VideoProjectWorkspaceSummary } from "./video-project-workspace-types";
import { buildDefaultVideoProject } from "./video-project";
import { buildVideoProjectHandoff } from "./video-project-handoff";
import { buildVideoProjectNextAction } from "./video-project-next-action";
import { buildVideoProjectReadiness } from "./video-project-readiness";
import { buildVideoProjectStatus } from "./video-project-status";

export function buildVideoProjectWorkspaceSummary(): VideoProjectWorkspaceSummary {
  const project = buildDefaultVideoProject();
  const status = buildVideoProjectStatus(project);
  const readiness = buildVideoProjectReadiness(project);
  const nextAction = buildVideoProjectNextAction(status, readiness);
  const handoff = buildVideoProjectHandoff(project, status, readiness);

  return {
    project,
    status,
    readiness,
    nextAction,
    handoff,
    summary: summarizeVideoProjectWorkspace({ project, status, readiness, nextAction, handoff, summary: "" }),
  };
}

export function summarizeVideoProjectWorkspace(summary: VideoProjectWorkspaceSummary): string {
  const sectionCount = summary.project.sections.length;
  const missingCount = summary.project.sections.filter((section) => section.status === "missing" || section.status === "blocked").length;
  return `${summary.project.title} groups ${sectionCount} project sections; ${missingCount} section(s) still block finishing or export handoff.`;
}
