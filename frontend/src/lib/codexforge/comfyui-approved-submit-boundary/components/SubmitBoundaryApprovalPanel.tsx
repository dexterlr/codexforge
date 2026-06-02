"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { SubmitBoundaryApproval } from "../comfyui-submit-boundary-types";

export function SubmitBoundaryApprovalPanel({ approval }: { approval: SubmitBoundaryApproval }) {
  return (
    <PreviewFoundationCard title="Approval posture">
      <PreviewFoundationCopy>{approval.approvalNote}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          approval.boundaryReviewApproved ? "boundary review approved" : "boundary review missing",
          "future execution approval required",
          approval.futureExecutionApprovalGranted ? "future execution approval granted" : "future execution approval not granted",
        ]}
      />
    </PreviewFoundationCard>
  );
}
