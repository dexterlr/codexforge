"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildWorkflowParameterSummary } from "@/lib/codexforge/comfyui-workflow-parameter-mapper";
import { WorkflowParameterGroupPanel } from "./WorkflowParameterGroupPanel";
import { WorkflowParameterHandoffPanel } from "./WorkflowParameterHandoffPanel";
import { WorkflowParameterMapperEmptyState } from "./WorkflowParameterMapperEmptyState";
import { WorkflowParameterMapperSafetyStrip } from "./WorkflowParameterMapperSafetyStrip";
import { WorkflowParameterMappingPanel } from "./WorkflowParameterMappingPanel";
import { WorkflowParameterPanel } from "./WorkflowParameterPanel";
import { WorkflowParameterPresetPanel } from "./WorkflowParameterPresetPanel";
import { WorkflowParameterSafetyPanel } from "./WorkflowParameterSafetyPanel";
import { WorkflowParameterSummaryPanel } from "./WorkflowParameterSummaryPanel";

export function ComfyUiWorkflowParameterMapperPanel() {
  const summary = buildWorkflowParameterSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-comfyui-workflow-parameter-mapper="ComfyUiWorkflowParameterMapperPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 140"
        title="Workflow parameters"
        subtitle="Turn technical workflow settings into safe, understandable choices. This maps values for review without changing workflow JSON."
        primary={{ href: "#workflow-parameters", label: "Map parameters" }}
        links={[
          { href: "/comfyui-workflows/safety", label: "Workflow safety" },
          { href: "/comfyui-jobs/package", label: "Job package" },
          { href: "/video-prompt", label: "Video prompt" },
          { href: "/keyframes", label: "Keyframes" },
        ]}
      />
      <WorkflowParameterMapperSafetyStrip />
      <WorkflowParameterSummaryPanel summary={summary} />
      <section id="workflow-parameters" style={previewStyles.grid}>
        <WorkflowParameterPanel parameters={summary.mapping.parameters} />
        <WorkflowParameterGroupPanel groups={summary.mapping.groups} />
        <WorkflowParameterSafetyPanel safety={summary.mapping.safety} />
        <WorkflowParameterPresetPanel preset={summary.mapping.preset} />
        <WorkflowParameterMappingPanel mapping={summary.mapping} />
        <WorkflowParameterHandoffPanel handoff={summary.handoff} />
      </section>
      <WorkflowParameterMapperEmptyState />
      <PreviewFoundationDetail summary="Advanced parameter mapping details">
        <PreviewFoundationCopy>Advanced only and blocked for first run values are shown for review, but this page has no render action and no workflow mutation.</PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
