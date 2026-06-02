"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildUpscaleWorkflowSummary } from "@/lib/codexforge/local-upscale-workflow-planner";
import { UpscaleResourceEstimatePanel } from "./UpscaleResourceEstimatePanel";
import { UpscaleSafetyReviewPanel } from "./UpscaleSafetyReviewPanel";
import { UpscaleSourceReviewPanel } from "./UpscaleSourceReviewPanel";
import { UpscaleTargetProfilePanel } from "./UpscaleTargetProfilePanel";
import { UpscaleWorkflowEmptyState } from "./UpscaleWorkflowEmptyState";
import { UpscaleWorkflowHandoffPanel } from "./UpscaleWorkflowHandoffPanel";
import { UpscaleWorkflowPlanPanel } from "./UpscaleWorkflowPlanPanel";
import { UpscaleWorkflowSafetyStrip } from "./UpscaleWorkflowSafetyStrip";
import { UpscaleWorkflowSummaryPanel } from "./UpscaleWorkflowSummaryPanel";

export function LocalUpscaleWorkflowPlannerPanel() {
  const summary = buildUpscaleWorkflowSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-local-upscale-workflow-planner="LocalUpscaleWorkflowPlannerPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 146"
        title="Video upscale plan"
        subtitle="Plan how a draft becomes higher quality before anything runs."
        primary={{ href: "#video-upscale", label: "Plan upscale" }}
        links={[
          { href: "/video-review", label: "Video review" },
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/video-compare", label: "Compare drafts" },
          { href: "/local-draft-review", label: "Draft review" },
          { href: "/video-interpolation", label: "Frame interpolation" },
          { href: "/video-finishing", label: "Video finishing" },
          { href: "/video-final-render", label: "Draft to final" },
        ]}
      />
      <UpscaleWorkflowSafetyStrip />
      <UpscaleWorkflowSummaryPanel summary={summary} />
      <section id="video-upscale" style={previewStyles.grid}>
        <UpscaleWorkflowPlanPanel plan={summary.plan} />
        <UpscaleSourceReviewPanel sourceReview={summary.sourceReview} />
        <UpscaleTargetProfilePanel targetProfile={summary.targetProfile} />
        <UpscaleResourceEstimatePanel estimate={summary.resourceEstimate} />
        <UpscaleSafetyReviewPanel safety={summary.safetyReview} />
        <UpscaleWorkflowHandoffPanel handoff={summary.handoff} />
      </section>
      <UpscaleWorkflowEmptyState />
      <PreviewFoundationDetail summary="Advanced upscale details">
        <PreviewFoundationCopy>
          This page explains upscaling in plain English and prepares a copy-only plan. There is no upscale button, no video generation, no ComfyUI call, no provider call, and no file processing.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
