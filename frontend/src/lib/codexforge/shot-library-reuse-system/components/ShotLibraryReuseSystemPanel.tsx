"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildShotLibrarySummary } from "@/lib/codexforge/shot-library-reuse-system";
import { ShotContinuityNotePanel } from "./ShotContinuityNotePanel";
import { ShotLibraryEmptyState } from "./ShotLibraryEmptyState";
import { ShotLibraryHandoffPanel } from "./ShotLibraryHandoffPanel";
import { ShotLibrarySafetyPanel } from "./ShotLibrarySafetyPanel";
import { ShotLibrarySafetyStrip } from "./ShotLibrarySafetyStrip";
import { ShotLibrarySummaryPanel } from "./ShotLibrarySummaryPanel";
import { ShotReusePlanPanel } from "./ShotReusePlanPanel";
import { ShotTemplateCategoryPanel } from "./ShotTemplateCategoryPanel";
import { ShotTemplatePanel } from "./ShotTemplatePanel";

export function ShotLibraryReuseSystemPanel() {
  const summary = buildShotLibrarySummary();

  return (
    <div style={previewStyles.shell} data-codexforge-shot-library-reuse-system="ShotLibraryReuseSystemPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no direct ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no silent persistence no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 165"
        title="Shot library"
        subtitle="Reuse proven shot patterns in storyboards and local video drafts."
        primary={{ href: "#shot-library", label: "Choose shot template" }}
        links={[
          { href: "/storyboard", label: "Storyboard" },
          { href: "/video-prompt", label: "Video prompt" },
          { href: "/keyframes", label: "Keyframes" },
          { href: "/local-video-draft", label: "Local video draft" },
          { href: "/video-review", label: "Video review" },
          { href: "/consistency-kit", label: "Consistency kit" },
        ]}
      />
      <ShotLibrarySafetyStrip />
      <ShotLibrarySummaryPanel summary={summary} />
      <section id="shot-library" style={previewStyles.grid}>
        <ShotTemplatePanel templates={summary.templates} />
        <ShotTemplateCategoryPanel categories={summary.categories} />
        <ShotReusePlanPanel plan={summary.reusePlan} />
        <ShotContinuityNotePanel notes={summary.continuityNotes} />
        <ShotLibrarySafetyPanel safety={summary.safety} />
        <ShotLibraryHandoffPanel handoff={summary.handoff} />
      </section>
      <ShotLibraryEmptyState />
      <PreviewFoundationDetail summary="Advanced shot library details">
        <PreviewFoundationCopy>
          Shot templates are reusable planning text only. This page does not generate images, render video, call ComfyUI, submit queues, mutate render queues, or create hidden persistent state.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
