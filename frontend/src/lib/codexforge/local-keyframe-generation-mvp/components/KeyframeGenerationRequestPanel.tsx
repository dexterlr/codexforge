"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { KeyframeGenerationRequest } from "../local-keyframe-generation-types";

export function KeyframeGenerationRequestPanel({ request }: { request: KeyframeGenerationRequest }) {
  return (
    <PreviewFoundationCard title="Keyframe request">
      <PreviewFoundationCopy>What will be generated later is a set of still frames. No image or video generation starts here.</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          `keyframe plan id: ${request.keyframePlanId}`,
          `selected shots: ${request.selectedShots.join("; ")}`,
          `prompt set: ${request.promptSet.join("; ")}`,
          `consistency notes: ${request.consistencyNotes.join("; ")}`,
          `local image workflow package: ${request.localImageWorkflowPackage}`,
          `artifact destination: ${request.artifactDestination}`,
          `approval status: ${request.approvalStatus}`,
          `execution posture: ${request.executionPosture}`,
          "no-auto-run guarantee",
        ]}
      />
    </PreviewFoundationCard>
  );
}
