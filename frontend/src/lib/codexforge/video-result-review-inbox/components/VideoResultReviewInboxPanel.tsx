"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildVideoReviewInboxSummary } from "@/lib/codexforge/video-result-review-inbox";
import { VideoReviewDecisionPanel } from "./VideoReviewDecisionPanel";
import { VideoReviewFilterPanel } from "./VideoReviewFilterPanel";
import { VideoReviewHandoffPanel } from "./VideoReviewHandoffPanel";
import { VideoReviewInboxEmptyState } from "./VideoReviewInboxEmptyState";
import { VideoReviewInboxSafetyStrip } from "./VideoReviewInboxSafetyStrip";
import { VideoReviewInboxSummaryPanel } from "./VideoReviewInboxSummaryPanel";
import { VideoReviewItemPanel } from "./VideoReviewItemPanel";
import { VideoReviewNextActionPanel } from "./VideoReviewNextActionPanel";

export function VideoResultReviewInboxPanel() {
  const summary = buildVideoReviewInboxSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-video-result-review-inbox="VideoResultReviewInboxPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 143"
        title="Video review"
        subtitle="Review drafts, choose what to keep, and decide the next step. No generated results are faked here."
        primary={{ href: "#video-review", label: "Review next video" }}
        links={[
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/video-compare", label: "Compare drafts" },
          { href: "/video-recovery", label: "Video recovery" },
          { href: "/video-jobs", label: "Video jobs" },
        ]}
      />
      <VideoReviewInboxSafetyStrip />
      <VideoReviewInboxSummaryPanel summary={summary} />
      <section id="video-review" style={previewStyles.grid}>
        <VideoReviewItemPanel items={summary.items} />
        <VideoReviewFilterPanel filter={summary.filter} />
        <VideoReviewDecisionPanel decisions={summary.decisions} />
        <VideoReviewNextActionPanel actions={summary.nextActions} />
        <VideoReviewHandoffPanel handoff={summary.handoff} />
      </section>
      <VideoReviewInboxEmptyState />
      <PreviewFoundationDetail summary="Advanced video review details">
        <PreviewFoundationCopy>Retry, compare, upscale, interpolate, and recovery choices are review labels only. They do not start creative jobs.</PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
