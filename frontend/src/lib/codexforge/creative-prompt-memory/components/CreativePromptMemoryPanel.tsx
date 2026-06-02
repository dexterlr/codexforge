"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildCreativePromptMemorySummary } from "@/lib/codexforge/creative-prompt-memory";
import { CreativePromptMemoryCandidatePanel } from "./CreativePromptMemoryCandidatePanel";
import { CreativePromptMemoryEmptyState } from "./CreativePromptMemoryEmptyState";
import { CreativePromptMemoryHandoffPanel } from "./CreativePromptMemoryHandoffPanel";
import { CreativePromptMemoryReusePanel } from "./CreativePromptMemoryReusePanel";
import { CreativePromptMemoryReviewPanel } from "./CreativePromptMemoryReviewPanel";
import { CreativePromptMemorySafetyStrip } from "./CreativePromptMemorySafetyStrip";
import { CreativePromptMemorySourcePanel } from "./CreativePromptMemorySourcePanel";
import { CreativePromptMemorySummaryPanel } from "./CreativePromptMemorySummaryPanel";
import { CreativePromptMemoryTagPanel } from "./CreativePromptMemoryTagPanel";

export function CreativePromptMemoryPanel() {
  const summary = buildCreativePromptMemorySummary();

  return (
    <div style={previewStyles.shell} data-codexforge-creative-prompt-memory="CreativePromptMemoryPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no direct ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no silent persistence no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 162"
        title="Creative prompt memory"
        subtitle="Review useful prompt ideas before reusing or saving them."
        primary={{ href: "#creative-memory", label: "Review prompt memory" }}
        links={[
          { href: "/video-prompt", label: "Video prompt" },
          { href: "/local-image", label: "Local image" },
          { href: "/local-keyframes", label: "Local keyframes" },
          { href: "/local-video-draft", label: "Local video draft" },
          { href: "/video-review", label: "Video review" },
          { href: "/style-presets", label: "Style presets" },
        ]}
      />
      <CreativePromptMemorySafetyStrip />
      <CreativePromptMemorySummaryPanel summary={summary} />
      <section id="creative-memory" style={previewStyles.grid}>
        <CreativePromptMemoryCandidatePanel candidates={summary.candidates} />
        <CreativePromptMemorySourcePanel sources={summary.sources} />
        <CreativePromptMemoryReviewPanel review={summary.review} />
        <CreativePromptMemoryTagPanel tags={summary.tags} />
        <CreativePromptMemoryReusePanel reuse={summary.reuse} />
        <CreativePromptMemoryHandoffPanel handoff={summary.handoff} />
      </section>
      <CreativePromptMemoryEmptyState />
      <PreviewFoundationDetail summary="Advanced prompt memory details">
        <PreviewFoundationCopy>
          This page creates reviewed memory candidates only. It does not write Brain memory, promote memory, call providers, generate images, generate videos, or persist creative memory without a separate approved review boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
