"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoFailureWorkflowFix } from "../video-failure-recovery-types";

export function VideoFailureWorkflowFixPanel({ workflowFix }: { workflowFix: VideoFailureWorkflowFix }) {
  return (
    <PreviewFoundationCard title="Workflow fix">
      <PreviewFoundationCopy>{workflowFix.label}: {workflowFix.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={["No workflow mutation", "Review before edit", "Use safety inspector first"]} />
    </PreviewFoundationCard>
  );
}
