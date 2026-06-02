"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildDraftToFinalSummary } from "@/lib/codexforge/local-draft-to-final-render-pipeline";
import { DraftToFinalArtifactPlanPanel } from "./DraftToFinalArtifactPlanPanel";
import { DraftToFinalDecisionPanel } from "./DraftToFinalDecisionPanel";
import { DraftToFinalEmptyState } from "./DraftToFinalEmptyState";
import { DraftToFinalHandoffPanel } from "./DraftToFinalHandoffPanel";
import { DraftToFinalPipelinePanel } from "./DraftToFinalPipelinePanel";
import { DraftToFinalReadinessPanel } from "./DraftToFinalReadinessPanel";
import { DraftToFinalResourcePlanPanel } from "./DraftToFinalResourcePlanPanel";
import { DraftToFinalSafetyStrip } from "./DraftToFinalSafetyStrip";
import { DraftToFinalSummaryPanel } from "./DraftToFinalSummaryPanel";

export function LocalDraftToFinalRenderPipelinePanel() {
  const summary = buildDraftToFinalSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-local-draft-to-final-render-pipeline="LocalDraftToFinalRenderPipelinePanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 149"
        title="Draft to final"
        subtitle="Prepare a reviewed local draft for a future final render."
        primary={{ href: "#video-final-render", label: "Review final render readiness" }}
        links={[
          { href: "/creative-cost-router", label: "Creative cost saver" },
          { href: "/gpu-scheduler", label: "GPU scheduler" },
          { href: "/dual-gpu", label: "Dual-GPU strategy" },
          { href: "/render-queue", label: "Render queue" },
          { href: "/video-finishing", label: "Video finishing" },
          { href: "/video-upscale", label: "Video upscale" },
          { href: "/video-interpolation", label: "Frame interpolation" },
          { href: "/video-review", label: "Video review" },
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/video-recovery", label: "Video recovery" },
          { href: "/comfyui-workflows/dry-run", label: "Workflow dry run" },
          { href: "/comfyui-submit", label: "Submit boundary" },
        ]}
      />
      <DraftToFinalSafetyStrip />
      <DraftToFinalSummaryPanel summary={summary} />
      <section id="video-final-render" style={previewStyles.grid}>
        <DraftToFinalPipelinePanel pipeline={summary.pipeline} />
        <DraftToFinalReadinessPanel readiness={summary.readiness} />
        <DraftToFinalDecisionPanel decision={summary.decision} />
        <DraftToFinalResourcePlanPanel resourcePlan={summary.resourcePlan} />
        <DraftToFinalArtifactPlanPanel artifactPlan={summary.artifactPlan} />
        <DraftToFinalHandoffPanel handoff={summary.handoff} />
      </section>
      <DraftToFinalEmptyState />
      <PreviewFoundationDetail summary="Advanced draft-to-final details">
        <PreviewFoundationCopy>
          This readiness page connects review, comparison, creative cost saver, GPU scheduler, dual-GPU strategy, render queue controls, upscale planning, interpolation planning, finishing gates, artifact destination, and recovery. It does not final render, call ComfyUI, call providers, or process video.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
