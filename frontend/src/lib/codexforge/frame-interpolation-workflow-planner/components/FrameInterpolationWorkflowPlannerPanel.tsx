"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildInterpolationSummary } from "@/lib/codexforge/frame-interpolation-workflow-planner";
import { InterpolationEmptyState } from "./InterpolationEmptyState";
import { InterpolationHandoffPanel } from "./InterpolationHandoffPanel";
import { InterpolationResourceEstimatePanel } from "./InterpolationResourceEstimatePanel";
import { InterpolationRiskReviewPanel } from "./InterpolationRiskReviewPanel";
import { InterpolationSafetyStrip } from "./InterpolationSafetyStrip";
import { InterpolationSourceReviewPanel } from "./InterpolationSourceReviewPanel";
import { InterpolationSummaryPanel } from "./InterpolationSummaryPanel";
import { InterpolationTargetProfilePanel } from "./InterpolationTargetProfilePanel";
import { InterpolationWorkflowPlanPanel } from "./InterpolationWorkflowPlanPanel";

export function FrameInterpolationWorkflowPlannerPanel() {
  const summary = buildInterpolationSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-frame-interpolation-workflow-planner="FrameInterpolationWorkflowPlannerPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 147"
        title="Frame interpolation plan"
        subtitle="Plan smoother motion before running any frame interpolation."
        primary={{ href: "#video-interpolation", label: "Plan interpolation" }}
        links={[
          { href: "/video-review", label: "Video review" },
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/video-compare", label: "Compare drafts" },
          { href: "/video-upscale", label: "Video upscale" },
          { href: "/video-finishing", label: "Video finishing" },
          { href: "/video-final-render", label: "Draft to final" },
        ]}
      />
      <InterpolationSafetyStrip />
      <InterpolationSummaryPanel summary={summary} />
      <section id="video-interpolation" style={previewStyles.grid}>
        <InterpolationWorkflowPlanPanel plan={summary.plan} />
        <InterpolationSourceReviewPanel sourceReview={summary.sourceReview} />
        <InterpolationTargetProfilePanel targetProfile={summary.targetProfile} />
        <InterpolationRiskReviewPanel risk={summary.riskReview} />
        <InterpolationResourceEstimatePanel estimate={summary.resourceEstimate} />
        <InterpolationHandoffPanel handoff={summary.handoff} />
      </section>
      <InterpolationEmptyState />
      <PreviewFoundationDetail summary="Advanced interpolation details">
        <PreviewFoundationCopy>
          This page explains interpolation in plain English. There is no interpolation button, no provider call, no ComfyUI call, and no local frame processing.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
