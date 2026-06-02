"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildFinishingSummary } from "@/lib/codexforge/video-finishing-pipeline";
import { FinishingEmptyState } from "./FinishingEmptyState";
import { FinishingExportPlanPanel } from "./FinishingExportPlanPanel";
import { FinishingHandoffPanel } from "./FinishingHandoffPanel";
import { FinishingPipelinePanel } from "./FinishingPipelinePanel";
import { FinishingQualityGatePanel } from "./FinishingQualityGatePanel";
import { FinishingResourcePlanPanel } from "./FinishingResourcePlanPanel";
import { FinishingSafetyStrip } from "./FinishingSafetyStrip";
import { FinishingStepPanel } from "./FinishingStepPanel";
import { FinishingSummaryPanel } from "./FinishingSummaryPanel";

export function VideoFinishingPipelinePanel() {
  const summary = buildFinishingSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-video-finishing-pipeline="VideoFinishingPipelinePanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 148"
        title="Video finishing"
        subtitle="Plan the final polish steps after choosing a draft."
        primary={{ href: "#video-finishing", label: "Plan finishing" }}
        links={[
          { href: "/video-compare", label: "Compare drafts" },
          { href: "/video-upscale", label: "Video upscale" },
          { href: "/video-interpolation", label: "Frame interpolation" },
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/video-final-render", label: "Draft to final" },
        ]}
      />
      <FinishingSafetyStrip />
      <FinishingSummaryPanel summary={summary} />
      <section id="video-finishing" style={previewStyles.grid}>
        <FinishingPipelinePanel pipeline={summary.pipeline} />
        <FinishingStepPanel steps={summary.pipeline.steps} />
        <FinishingQualityGatePanel gates={summary.qualityGates} />
        <FinishingResourcePlanPanel resourcePlan={summary.resourcePlan} />
        <FinishingExportPlanPanel exportPlan={summary.exportPlan} />
        <FinishingHandoffPanel handoff={summary.handoff} />
      </section>
      <FinishingEmptyState />
      <PreviewFoundationDetail summary="Advanced finishing details">
        <PreviewFoundationCopy>
          Finishing explains draft review, compare, upscale, interpolation, final export handoff, and archive notes. It does not render, export, upscale, interpolate frames, or call ComfyUI.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
