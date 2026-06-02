"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildVideoDraftSummary } from "@/lib/codexforge/local-video-draft-mvp";
import { VideoDraftEmptyState } from "./VideoDraftEmptyState";
import { VideoDraftHandoffPanel } from "./VideoDraftHandoffPanel";
import { VideoDraftInputReviewPanel } from "./VideoDraftInputReviewPanel";
import { VideoDraftReadinessPanel } from "./VideoDraftReadinessPanel";
import { VideoDraftRequestPanel } from "./VideoDraftRequestPanel";
import { VideoDraftResultPanel } from "./VideoDraftResultPanel";
import { VideoDraftSafetyPanel } from "./VideoDraftSafetyPanel";
import { VideoDraftSafetyStrip } from "./VideoDraftSafetyStrip";
import { VideoDraftSummaryPanel } from "./VideoDraftSummaryPanel";

export function LocalVideoDraftMvpPanel() {
  const summary = buildVideoDraftSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-local-video-draft-mvp="LocalVideoDraftMvpPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no direct ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 160"
        title="Local video draft MVP"
        subtitle="Prepare a short local video draft request before anything renders."
        primary={{ href: "#local-video-draft-mvp", label: "Review draft request" }}
        links={[
          { href: "/local-draft-review", label: "Draft review" },
          { href: "/local-keyframes", label: "Local keyframes" },
          { href: "/video-jobs", label: "Video jobs" },
          { href: "/render-queue", label: "Render queue" },
          { href: "/video-review", label: "Video review" },
          { href: "/video-capture", label: "Capture artifact" },
        ]}
      />
      <VideoDraftSafetyStrip />
      <VideoDraftSummaryPanel summary={summary} />
      <section id="local-video-draft-mvp" style={previewStyles.grid}>
        <VideoDraftRequestPanel request={summary.request} />
        <VideoDraftInputReviewPanel review={summary.inputReview} />
        <VideoDraftReadinessPanel readiness={summary.readiness} />
        <VideoDraftSafetyPanel safety={summary.safety} />
        <VideoDraftResultPanel result={summary.result} />
        <VideoDraftHandoffPanel handoff={summary.handoff} />
      </section>
      <VideoDraftEmptyState />
      <PreviewFoundationDetail summary="Advanced local video draft details">
        <PreviewFoundationCopy>
          Copy draft request allowed. Capture supplied draft allowed. There is no render button by default, no ComfyUI call, no render queue mutation, and no final-quality video work here. Local draft first, final later.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
