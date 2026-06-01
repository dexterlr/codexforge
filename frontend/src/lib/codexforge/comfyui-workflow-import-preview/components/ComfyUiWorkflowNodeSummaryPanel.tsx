"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ComfyUiWorkflowNodeSummary } from "../comfyui-workflow-import-types";

export function ComfyUiWorkflowNodeSummaryPanel({ nodes }: { nodes: ComfyUiWorkflowNodeSummary[] }) {
  return (
    <PreviewFoundationCard title="Node summary">
      <PreviewFoundationCopy>Nodes are workflow blocks. This summary names the block types in plain English before any safety decision.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={nodes.map((node) => `${node.nodeKind}: ${node.plainEnglish}`)} />
    </PreviewFoundationCard>
  );
}
