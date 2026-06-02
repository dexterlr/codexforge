"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { DraftToFinalArtifactPlan } from "../draft-to-final-types";

export function DraftToFinalArtifactPlanPanel({ artifactPlan }: { artifactPlan: DraftToFinalArtifactPlan }) {
  return (
    <PreviewFoundationCard title="Artifact plan">
      <PreviewFoundationCopy>The final candidate needs a destination, version note, and recovery path before future approved execution.</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[artifactPlan.artifactDestination, artifactPlan.versionNote, artifactPlan.recoveryPath]}
      />
    </PreviewFoundationCard>
  );
}
