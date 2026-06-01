"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { WorkflowParameterGroup } from "../workflow-parameter-types";

export function WorkflowParameterGroupPanel({ groups }: { groups: WorkflowParameterGroup[] }) {
  return (
    <PreviewFoundationCard title="Parameter groups">
      <PreviewFoundationCopy>Groups turn node settings into familiar form sections like prompt, seed, resolution, frames, and output path.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={groups.map((group) => `${group.group}: ${group.explanation}`)} />
    </PreviewFoundationCard>
  );
}
