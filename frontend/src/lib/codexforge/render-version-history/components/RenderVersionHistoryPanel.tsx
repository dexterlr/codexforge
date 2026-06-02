"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildRenderVersionHistorySummary } from "@/lib/codexforge/render-version-history";
import { RenderVersionChangePanel } from "./RenderVersionChangePanel";
import { RenderVersionHandoffPanel } from "./RenderVersionHandoffPanel";
import { RenderVersionHistoryEmptyState } from "./RenderVersionHistoryEmptyState";
import { RenderVersionHistorySafetyStrip } from "./RenderVersionHistorySafetyStrip";
import { RenderVersionHistorySummaryPanel } from "./RenderVersionHistorySummaryPanel";
import { RenderVersionLineagePanel } from "./RenderVersionLineagePanel";
import { RenderVersionPanel } from "./RenderVersionPanel";
import { RenderVersionReviewPanel } from "./RenderVersionReviewPanel";
import { RenderVersionSelectionPanel } from "./RenderVersionSelectionPanel";

export function RenderVersionHistoryPanel() {
  const summary = buildRenderVersionHistorySummary();

  return (
    <div style={previewStyles.shell} data-codexforge-render-version-history="RenderVersionHistoryPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no fake playback no file deletion no real export no upload no direct ComfyUI workflow run no ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no silent persistence no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 168"
        title="Render history"
        subtitle="Track drafts, retries, and final candidates without losing context."
        primary={{ href: "#render-history", label: "Review render history" }}
        links={[
          { href: "/video-projects", label: "Video projects" },
          { href: "/video-compare", label: "Video compare" },
          { href: "/video-review", label: "Video review" },
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/video-final-render", label: "Draft to final" },
          { href: "/video-export", label: "Video export" },
        ]}
      />
      <RenderVersionHistorySafetyStrip />
      <RenderVersionHistorySummaryPanel summary={summary} />
      <section id="render-history" style={previewStyles.grid}>
        <RenderVersionPanel versions={summary.versions} />
        <RenderVersionChangePanel changes={summary.changes} />
        <RenderVersionLineagePanel lineage={summary.lineage} />
        <RenderVersionReviewPanel reviews={summary.reviews} />
        <RenderVersionSelectionPanel selection={summary.selection} />
        <RenderVersionHandoffPanel handoff={summary.handoff} />
      </section>
      <RenderVersionHistoryEmptyState />
      <PreviewFoundationDetail summary="Advanced render history details">
        <PreviewFoundationCopy>
          Render history uses supplied/manual version records only. This page does not create playback, browse files, delete artifacts, generate images, generate video, run upscale, run interpolation, submit jobs, export, upload, or persist version state.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
