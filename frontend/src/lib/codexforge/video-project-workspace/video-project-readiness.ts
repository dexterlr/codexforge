import type { VideoProject, VideoProjectReadiness } from "./video-project-workspace-types";

export function buildVideoProjectReadiness(project: VideoProject): VideoProjectReadiness {
  const checks = [
    {
      id: "brief-supplied",
      label: "Brief supplied",
      ready: true,
      plainEnglish: "The project has a plain-English brief.",
    },
    {
      id: "creative-inputs-linked",
      label: "Prompts, styles, and shots linked",
      ready: project.sections.some((section) => section.kind === "prompt" && section.status === "supplied"),
      plainEnglish: "Prompt, style, consistency, and shot sections are grouped in one workspace.",
    },
    {
      id: "keyframes-supplied",
      label: "Keyframes supplied",
      ready: project.sections.some((section) => section.kind === "keyframes" && section.status === "supplied"),
      plainEnglish: "Keyframe images are still manual or missing in this preview.",
    },
    {
      id: "draft-reviewed",
      label: "Draft reviewed",
      ready: project.sections.some((section) => section.kind === "review" && section.status === "supplied"),
      plainEnglish: "A supplied draft needs review before finishing or export handoff.",
    },
    {
      id: "export-not-executed",
      label: "No export executed",
      ready: true,
      plainEnglish: "Export stays manual/future-approved; this page only prepares handoff notes.",
    },
  ];
  const readyForExportHandoff = checks.every((check) => check.ready);

  return {
    id: "video-project-readiness",
    checks,
    readyForExportHandoff,
    plainEnglish: readyForExportHandoff
      ? "This project has enough review context for export handoff notes."
      : "This project is not ready for export handoff because required assets or reviews are still missing.",
  };
}
