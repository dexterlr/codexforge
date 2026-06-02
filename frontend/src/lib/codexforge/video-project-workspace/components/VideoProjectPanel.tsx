"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoProject } from "../video-project-workspace-types";

export function VideoProjectPanel({ project }: { project: VideoProject }) {
  return (
    <PreviewFoundationCard title="Project record">
      <PreviewFoundationCopy>{project.title}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{project.ownerNote}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{project.persistenceNote}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={["preview record", "manual metadata", `status: ${project.status}`]} />
    </PreviewFoundationCard>
  );
}
