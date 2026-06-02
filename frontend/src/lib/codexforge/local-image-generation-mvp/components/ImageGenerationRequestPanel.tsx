"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ImageGenerationRequest } from "../local-image-generation-types";

export function ImageGenerationRequestPanel({ request }: { request: ImageGenerationRequest }) {
  return (
    <PreviewFoundationCard title="Image request">
      <PreviewFoundationCopy>What will be generated later is a single local image draft. This page only prepares the request.</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          `prompt: ${request.prompt}`,
          `negative prompt: ${request.negativePrompt}`,
          `style: ${request.style}`,
          `size target: ${request.sizeTarget}`,
          `local provider: ${request.localProvider}`,
          `workflow package: ${request.workflowPackage}`,
          `artifact destination: ${request.artifactDestination}`,
          `approval status: ${request.approvalStatus}`,
          `execution posture: ${request.executionPosture}`,
          "no-auto-run guarantee",
        ]}
      />
    </PreviewFoundationCard>
  );
}
