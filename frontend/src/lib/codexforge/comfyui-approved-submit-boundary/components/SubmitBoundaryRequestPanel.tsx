"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { SubmitBoundaryRequest } from "../comfyui-submit-boundary-types";

export function SubmitBoundaryRequestPanel({ request }: { request: SubmitBoundaryRequest }) {
  return (
    <PreviewFoundationCard title="Submit packet readiness">
      <PreviewFoundationCopy>Required readiness is prepared for review, but guarded executor availability is still false.</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          request.liveHealthGateReviewed ? "live health gate reviewed" : "needs health gate",
          request.metadataReviewed ? "metadata reviewed" : "needs metadata",
          request.workflowImported ? "workflow imported" : "needs workflow import",
          request.safetyInspected ? "safety inspected" : "needs safety inspection",
          request.parametersMapped ? "parameters mapped" : "needs parameter map",
          request.jobPackageBuilt ? "job package built" : "needs job package",
          request.dryRunContractPassed ? "dry run contract passed" : "needs dry run",
          request.renderQueuePreviewReady ? "render queue preview ready" : "needs render queue preview",
        ]}
      />
    </PreviewFoundationCard>
  );
}
