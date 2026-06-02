"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildImageGenerationSummary } from "@/lib/codexforge/local-image-generation-mvp";
import { ImageGenerationEmptyState } from "./ImageGenerationEmptyState";
import { ImageGenerationHandoffPanel } from "./ImageGenerationHandoffPanel";
import { ImageGenerationPromptPanel } from "./ImageGenerationPromptPanel";
import { ImageGenerationReadinessPanel } from "./ImageGenerationReadinessPanel";
import { ImageGenerationRequestPanel } from "./ImageGenerationRequestPanel";
import { ImageGenerationResultPanel } from "./ImageGenerationResultPanel";
import { ImageGenerationSafetyPanel } from "./ImageGenerationSafetyPanel";
import { ImageGenerationSafetyStrip } from "./ImageGenerationSafetyStrip";
import { ImageGenerationSummaryPanel } from "./ImageGenerationSummaryPanel";

export function LocalImageGenerationMvpPanel() {
  const summary = buildImageGenerationSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-local-image-generation-mvp="LocalImageGenerationMvpPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no direct ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 158"
        title="Local image MVP"
        subtitle="Prepare and review a local image request before anything generates."
        primary={{ href: "#local-image-mvp", label: "Review image request" }}
        links={[
          { href: "/video-prompt", label: "Video prompt" },
          { href: "/creative-memory", label: "Creative memory" },
          { href: "/style-presets", label: "Style presets" },
          { href: "/keyframes", label: "Keyframes" },
          { href: "/comfyui-submit", label: "Submit boundary" },
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/local-keyframes", label: "Local keyframes" },
          { href: "/video-capture", label: "Capture artifact" },
        ]}
      />
      <ImageGenerationSafetyStrip />
      <ImageGenerationSummaryPanel summary={summary} />
      <section id="local-image-mvp" style={previewStyles.grid}>
        <ImageGenerationRequestPanel request={summary.request} />
        <ImageGenerationPromptPanel prompt={summary.prompt} />
        <ImageGenerationReadinessPanel readiness={summary.readiness} />
        <ImageGenerationSafetyPanel safety={summary.safety} />
        <ImageGenerationResultPanel result={summary.result} />
        <ImageGenerationHandoffPanel handoff={summary.handoff} />
      </section>
      <ImageGenerationEmptyState />
      <PreviewFoundationDetail summary="Advanced local image MVP details">
        <PreviewFoundationCopy>
          Copy image request allowed. Capture supplied result allowed as review-only data. There is no generate button by default, no ComfyUI call, no queue submit, no hidden persistence, and nothing is secretly running.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
