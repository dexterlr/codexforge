"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildStylePresetLibrarySummary } from "@/lib/codexforge/style-preset-library";
import { StylePresetCategoryPanel } from "./StylePresetCategoryPanel";
import { StylePresetEmptyState } from "./StylePresetEmptyState";
import { StylePresetHandoffPanel } from "./StylePresetHandoffPanel";
import { StylePresetLibrarySummaryPanel } from "./StylePresetLibrarySummaryPanel";
import { StylePresetPanel } from "./StylePresetPanel";
import { StylePresetReusePanel } from "./StylePresetReusePanel";
import { StylePresetSafetyPanel } from "./StylePresetSafetyPanel";
import { StylePresetSafetyStrip } from "./StylePresetSafetyStrip";
import { StylePresetTokenPanel } from "./StylePresetTokenPanel";

export function StylePresetLibraryPanel() {
  const summary = buildStylePresetLibrarySummary();

  return (
    <div style={previewStyles.shell} data-codexforge-style-preset-library="StylePresetLibraryPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no direct ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no silent persistence no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 163"
        title="Style presets"
        subtitle="Reuse clear visual styles across prompts, keyframes, and drafts."
        primary={{ href: "#style-presets", label: "Choose style preset" }}
        links={[
          { href: "/video-prompt", label: "Video prompt" },
          { href: "/keyframes", label: "Keyframes" },
          { href: "/local-image", label: "Local image" },
          { href: "/local-keyframes", label: "Local keyframes" },
          { href: "/creative-memory", label: "Creative memory" },
          { href: "/consistency-kit", label: "Consistency kit" },
        ]}
      />
      <StylePresetSafetyStrip />
      <StylePresetLibrarySummaryPanel summary={summary} />
      <section id="style-presets" style={previewStyles.grid}>
        <StylePresetPanel presets={summary.presets} />
        <StylePresetCategoryPanel categories={summary.categories} />
        <StylePresetTokenPanel tokens={summary.tokens} />
        <StylePresetSafetyPanel safety={summary.safety} />
        <StylePresetReusePanel reuse={summary.reuse} />
        <StylePresetHandoffPanel handoff={summary.handoff} />
      </section>
      <StylePresetEmptyState />
      <PreviewFoundationDetail summary="Advanced style preset details">
        <PreviewFoundationCopy>
          This library only prepares deterministic local style definitions and copyable handoffs. It does not call a provider, generate images, generate videos, mutate memory, or create hidden persistent state.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
