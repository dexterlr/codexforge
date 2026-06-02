"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoDraftRequest } from "../local-video-draft-types";

export function VideoDraftRequestPanel({ request }: { request: VideoDraftRequest }) {
  return (
    <PreviewFoundationCard title="Draft request">
      <PreviewFoundationCopy>local draft first, final later. This is the request packet, not a render command.</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          `prompt: ${request.prompt}`,
          `storyboard: ${request.storyboard}`,
          `keyframes: ${request.keyframes.join("; ")}`,
          `workflow package: ${request.workflowPackage}`,
          `target duration: ${request.targetDuration}`,
          `target resolution: ${request.targetResolution}`,
          `local provider: ${request.localProvider}`,
          `artifact destination: ${request.artifactDestination}`,
          `render queue posture: ${request.renderQueuePosture}`,
          `approval status: ${request.approvalStatus}`,
          `execution posture: ${request.executionPosture}`,
          "no-auto-run guarantee",
        ]}
      />
    </PreviewFoundationCard>
  );
}
