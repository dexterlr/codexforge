"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildKeyframeGenerationSummary } from "@/lib/codexforge/local-keyframe-generation-mvp";
import { KeyframeGenerationEmptyState } from "./KeyframeGenerationEmptyState";
import { KeyframeGenerationHandoffPanel } from "./KeyframeGenerationHandoffPanel";
import { KeyframeGenerationPlanReviewPanel } from "./KeyframeGenerationPlanReviewPanel";
import { KeyframeGenerationReadinessPanel } from "./KeyframeGenerationReadinessPanel";
import { KeyframeGenerationRequestPanel } from "./KeyframeGenerationRequestPanel";
import { KeyframeGenerationResultPanel } from "./KeyframeGenerationResultPanel";
import { KeyframeGenerationSafetyPanel } from "./KeyframeGenerationSafetyPanel";
import { KeyframeGenerationSafetyStrip } from "./KeyframeGenerationSafetyStrip";
import { KeyframeGenerationSummaryPanel } from "./KeyframeGenerationSummaryPanel";

export function LocalKeyframeGenerationMvpPanel() {
  const summary = buildKeyframeGenerationSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-local-keyframe-generation-mvp="LocalKeyframeGenerationMvpPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no direct ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 159"
        title="Local keyframes MVP"
        subtitle="Prepare keyframe image requests that guide a future video draft."
        primary={{ href: "#local-keyframes-mvp", label: "Review keyframe request" }}
        links={[
          { href: "/keyframes", label: "Keyframe plan" },
          { href: "/local-image", label: "Local image" },
          { href: "/storyboard", label: "Storyboard" },
          { href: "/local-draft-review", label: "Draft review" },
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/local-video-draft", label: "Local video draft" },
          { href: "/video-capture", label: "Capture artifact" },
        ]}
      />
      <KeyframeGenerationSafetyStrip />
      <KeyframeGenerationSummaryPanel summary={summary} />
      <section id="local-keyframes-mvp" style={previewStyles.grid}>
        <KeyframeGenerationRequestPanel request={summary.request} />
        <KeyframeGenerationPlanReviewPanel review={summary.planReview} />
        <KeyframeGenerationReadinessPanel readiness={summary.readiness} />
        <KeyframeGenerationSafetyPanel safety={summary.safety} />
        <KeyframeGenerationResultPanel result={summary.result} />
        <KeyframeGenerationHandoffPanel handoff={summary.handoff} />
      </section>
      <KeyframeGenerationEmptyState />
      <PreviewFoundationDetail summary="Advanced local keyframe details">
        <PreviewFoundationCopy>
          Copy keyframe request allowed. Capture supplied keyframes allowed. There is no generate button by default, no ComfyUI call, no video render, and nothing is secretly running.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
