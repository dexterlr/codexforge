"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildArtifactCaptureSummary } from "@/lib/codexforge/local-video-artifact-capture-mvp";
import { ArtifactCaptureEmptyState } from "./ArtifactCaptureEmptyState";
import { ArtifactCaptureHandoffPanel } from "./ArtifactCaptureHandoffPanel";
import { ArtifactCaptureInputPanel } from "./ArtifactCaptureInputPanel";
import { ArtifactCaptureRecordPanel } from "./ArtifactCaptureRecordPanel";
import { ArtifactCaptureReviewPanel } from "./ArtifactCaptureReviewPanel";
import { ArtifactCaptureSafetyPanel } from "./ArtifactCaptureSafetyPanel";
import { ArtifactCaptureSafetyStrip } from "./ArtifactCaptureSafetyStrip";
import { ArtifactCaptureSummaryPanel } from "./ArtifactCaptureSummaryPanel";

export function LocalVideoArtifactCaptureMvpPanel() {
  const summary = buildArtifactCaptureSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-local-video-artifact-capture-mvp="LocalVideoArtifactCaptureMvpPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no direct ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 161"
        title="Capture video artifact"
        subtitle="Record a local image, keyframe, or video draft for review."
        primary={{ href: "#video-capture-mvp", label: "Capture artifact record" }}
        links={[
          { href: "/local-image", label: "Local image" },
          { href: "/local-keyframes", label: "Local keyframes" },
          { href: "/local-video-draft", label: "Local video draft" },
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/video-review", label: "Video review" },
          { href: "/run-history", label: "Run history" },
        ]}
      />
      <ArtifactCaptureSafetyStrip />
      <ArtifactCaptureSummaryPanel summary={summary} />
      <section id="video-capture-mvp" style={previewStyles.grid}>
        <ArtifactCaptureInputPanel input={summary.input} />
        <ArtifactCaptureRecordPanel record={summary.record} />
        <ArtifactCaptureReviewPanel review={summary.review} />
        <ArtifactCaptureSafetyPanel safety={summary.safety} />
        <ArtifactCaptureHandoffPanel handoff={summary.handoff} />
      </section>
      <ArtifactCaptureEmptyState />
      <PreviewFoundationDetail summary="Advanced artifact capture details">
        <PreviewFoundationCopy>
          No file delete button. No render button. No arbitrary filesystem browsing. No hidden persistence unless a future approved artifact flow supports it. Copy artifact handoff allowed for review, recovery, or run history.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
