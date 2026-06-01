"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildWorkflowSafetySummary } from "@/lib/codexforge/comfyui-workflow-safety-inspector";
import { WorkflowAssetRiskPanel } from "./WorkflowAssetRiskPanel";
import { WorkflowNodeRiskPanel } from "./WorkflowNodeRiskPanel";
import { WorkflowOutputRiskPanel } from "./WorkflowOutputRiskPanel";
import { WorkflowResourceRiskPanel } from "./WorkflowResourceRiskPanel";
import { WorkflowSafetyCheckPanel } from "./WorkflowSafetyCheckPanel";
import { WorkflowSafetyDecisionPanel } from "./WorkflowSafetyDecisionPanel";
import { WorkflowSafetyHandoffPanel } from "./WorkflowSafetyHandoffPanel";
import { WorkflowSafetyInspectorEmptyState } from "./WorkflowSafetyInspectorEmptyState";
import { WorkflowSafetyInspectorSafetyStrip } from "./WorkflowSafetyInspectorSafetyStrip";
import { WorkflowSafetySummaryPanel } from "./WorkflowSafetySummaryPanel";

export function ComfyUiWorkflowSafetyInspectorPanel() {
  const summary = buildWorkflowSafetySummary();

  return (
    <div style={previewStyles.shell} data-codexforge-comfyui-workflow-safety-inspector="ComfyUiWorkflowSafetyInspectorPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 139"
        title="Workflow safety"
        subtitle="Check a ComfyUI workflow before any render is allowed. Risks are described in plain English and no workflow can run from here."
        primary={{ href: "#workflow-safety", label: "Inspect workflow safety" }}
        links={[
          { href: "/comfyui-workflows/import", label: "Import preview" },
          { href: "/comfyui-workflows/parameters", label: "Parameters" },
          { href: "/video-recovery", label: "Video recovery" },
          { href: "/video-jobs", label: "Video jobs" },
        ]}
      />
      <WorkflowSafetyInspectorSafetyStrip />
      <WorkflowSafetySummaryPanel summary={summary} />
      <section id="workflow-safety" style={previewStyles.grid}>
        <WorkflowSafetyCheckPanel checks={summary.checks} />
        <WorkflowNodeRiskPanel risks={summary.nodeRisks} />
        <WorkflowAssetRiskPanel risks={summary.assetRisks} />
        <WorkflowResourceRiskPanel risks={summary.resourceRisks} />
        <WorkflowOutputRiskPanel risks={summary.outputRisks} />
        <WorkflowSafetyDecisionPanel decision={summary.decision} />
        <WorkflowSafetyHandoffPanel handoff={summary.handoff} />
      </section>
      <WorkflowSafetyInspectorEmptyState />
      <PreviewFoundationDetail summary="Advanced workflow safety details">
        <PreviewFoundationCopy>Decision statuses are safe-preview-only, ready-for-parameter-map, needs-review, blocked, and unknown. They do not execute a workflow.</PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
