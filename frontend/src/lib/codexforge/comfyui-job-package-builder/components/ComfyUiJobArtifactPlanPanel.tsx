"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ComfyUiJobArtifactPlan } from "../comfyui-job-package-types";

export function ComfyUiJobArtifactPlanPanel({ artifactPlan }: { artifactPlan: ComfyUiJobArtifactPlan }) {
  return (
    <PreviewFoundationCard title="Artifact destination">
      <PreviewFoundationCopy>Future outputs will be reviewed in a local artifact surface before any final decision.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[artifactPlan.destination, artifactPlan.reviewSurface, "No deletion from this package"]} />
    </PreviewFoundationCard>
  );
}
