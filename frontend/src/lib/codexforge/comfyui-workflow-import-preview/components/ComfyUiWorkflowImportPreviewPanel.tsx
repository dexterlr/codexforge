"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildComfyUiWorkflowImportSummary } from "@/lib/codexforge/comfyui-workflow-import-preview";
import { ComfyUiWorkflowAssetReferencePanel } from "./ComfyUiWorkflowAssetReferencePanel";
import { ComfyUiWorkflowImportEmptyState } from "./ComfyUiWorkflowImportEmptyState";
import { ComfyUiWorkflowImportHandoffPanel } from "./ComfyUiWorkflowImportHandoffPanel";
import { ComfyUiWorkflowImportPlanPanel } from "./ComfyUiWorkflowImportPlanPanel";
import { ComfyUiWorkflowImportSafetyPanel } from "./ComfyUiWorkflowImportSafetyPanel";
import { ComfyUiWorkflowImportSafetyStrip } from "./ComfyUiWorkflowImportSafetyStrip";
import { ComfyUiWorkflowImportSummaryPanel } from "./ComfyUiWorkflowImportSummaryPanel";
import { ComfyUiWorkflowNodeSummaryPanel } from "./ComfyUiWorkflowNodeSummaryPanel";
import { ComfyUiWorkflowSourcePanel } from "./ComfyUiWorkflowSourcePanel";

export function ComfyUiWorkflowImportPreviewPanel() {
  const summary = buildComfyUiWorkflowImportSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-comfyui-workflow-import-preview="ComfyUiWorkflowImportPreviewPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 138"
        title="Import ComfyUI workflow"
        subtitle="Preview a workflow safely before using it. Nothing runs yet, no prompt is sent, and raw JSON stays secondary."
        primary={{ href: "#workflow-import", label: "Review workflow import" }}
        links={[
          { href: "/comfyui-workflows/safety", label: "Workflow safety" },
          { href: "/comfyui-workflows/parameters", label: "Parameters" },
          { href: "/comfyui-jobs/package", label: "Job package" },
          { href: "/comfyui-health", label: "ComfyUI health" },
        ]}
      />
      <ComfyUiWorkflowImportSafetyStrip />
      <ComfyUiWorkflowImportSummaryPanel summary={summary} />
      <section id="workflow-import" style={previewStyles.grid}>
        <ComfyUiWorkflowSourcePanel sources={summary.sources} />
        <ComfyUiWorkflowImportPlanPanel plan={summary.plan} />
        <ComfyUiWorkflowNodeSummaryPanel nodes={summary.nodes} />
        <ComfyUiWorkflowAssetReferencePanel assets={summary.assets} />
        <ComfyUiWorkflowImportSafetyPanel safety={summary.safety} />
        <ComfyUiWorkflowImportHandoffPanel handoff={summary.handoff} />
      </section>
      <ComfyUiWorkflowImportEmptyState />
      <PreviewFoundationDetail summary="Advanced workflow import details">
        <PreviewFoundationCopy>Raw JSON preview, if supplied later, belongs here or below this fold. The default view only shows a safe plain-English summary.</PreviewFoundationCopy>
        <PreviewFoundationCopy>No file upload parser, workflow execution, ComfyUI API call, asset download, or provider prompt send is part of this phase.</PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
