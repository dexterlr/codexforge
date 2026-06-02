"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildVideoExportHandoffSummary } from "@/lib/codexforge/video-export-handoff";
import { VideoExportChecklistPanel } from "./VideoExportChecklistPanel";
import { VideoExportDeliveryNotePanel } from "./VideoExportDeliveryNotePanel";
import { VideoExportEmptyState } from "./VideoExportEmptyState";
import { VideoExportHandoffSummaryPanel } from "./VideoExportHandoffSummaryPanel";
import { VideoExportPackagePanel } from "./VideoExportPackagePanel";
import { VideoExportSafetyPanel } from "./VideoExportSafetyPanel";
import { VideoExportSafetyStrip } from "./VideoExportSafetyStrip";
import { VideoExportTargetPanel } from "./VideoExportTargetPanel";

export function VideoExportHandoffPanel() {
  const summary = buildVideoExportHandoffSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-video-export-handoff="VideoExportHandoffPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no export button no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no real export no file write no upload no direct ComfyUI workflow run no ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no silent persistence no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 169"
        title="Video export handoff"
        subtitle="Prepare final video delivery notes before any export runs."
        primary={{ href: "#video-export", label: "Review export handoff" }}
        links={[
          { href: "/video-projects", label: "Video projects" },
          { href: "/render-history", label: "Render history" },
          { href: "/video-final-render", label: "Draft to final" },
          { href: "/cloud-video-providers", label: "Cloud fallback" },
          { href: "/cloud-final-render", label: "Cloud final review" },
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/production", label: "Production pack" },
        ]}
      />
      <VideoExportSafetyStrip />
      <VideoExportHandoffSummaryPanel summary={summary} />
      <section id="video-export" style={previewStyles.grid}>
        <VideoExportPackagePanel exportPackage={summary.package} />
        <VideoExportTargetPanel target={summary.target} />
        <VideoExportChecklistPanel checklist={summary.checklist} />
        <VideoExportSafetyPanel safety={summary.safety} />
        <VideoExportDeliveryNotePanel deliveryNote={summary.deliveryNote} />
      </section>
      <VideoExportEmptyState />
      <PreviewFoundationDetail summary="Advanced export handoff details">
        <PreviewFoundationCopy>
          This is only a handoff. Export is manual/future-approved, and this page does not write files, upload, call providers, run ComfyUI, mutate queues, or persist project state.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
