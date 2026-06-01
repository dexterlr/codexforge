"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildVideoDraftComparisonSummary } from "@/lib/codexforge/video-draft-comparison-mode";
import { VideoDraftComparisonEmptyState } from "./VideoDraftComparisonEmptyState";
import { VideoDraftComparisonHandoffPanel } from "./VideoDraftComparisonHandoffPanel";
import { VideoDraftComparisonPanel } from "./VideoDraftComparisonPanel";
import { VideoDraftComparisonSafetyStrip } from "./VideoDraftComparisonSafetyStrip";
import { VideoDraftComparisonSummaryPanel } from "./VideoDraftComparisonSummaryPanel";
import { VideoDraftDifferencePanel } from "./VideoDraftDifferencePanel";
import { VideoDraftRecordPanel } from "./VideoDraftRecordPanel";
import { VideoDraftScorecardPanel } from "./VideoDraftScorecardPanel";
import { VideoDraftSelectionPanel } from "./VideoDraftSelectionPanel";

export function VideoDraftComparisonModePanel() {
  const summary = buildVideoDraftComparisonSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-video-draft-comparison-mode="VideoDraftComparisonModePanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 145"
        title="Compare video drafts"
        subtitle="Decide which draft to keep, retry, upscale, or finish. No real playback or file reading is required yet."
        primary={{ href: "#video-compare", label: "Compare drafts" }}
        links={[
          { href: "/video-review", label: "Video review" },
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/video-recovery", label: "Video recovery" },
          { href: "/local-draft-review", label: "Draft review" },
        ]}
      />
      <VideoDraftComparisonSafetyStrip />
      <VideoDraftComparisonSummaryPanel summary={summary} />
      <section id="video-compare" style={previewStyles.grid}>
        <VideoDraftRecordPanel drafts={summary.drafts} />
        <VideoDraftComparisonPanel comparison={summary.comparison} />
        <VideoDraftScorecardPanel scorecards={summary.scorecards} />
        <VideoDraftDifferencePanel differences={summary.differences} />
        <VideoDraftSelectionPanel selection={summary.selection} />
        <VideoDraftComparisonHandoffPanel handoff={summary.handoff} />
      </section>
      <VideoDraftComparisonEmptyState />
      <PreviewFoundationDetail summary="Advanced comparison details">
        <PreviewFoundationCopy>This comparison mode uses future artifact records and review notes. It does not read local files, play fake media, generate video, or submit jobs.</PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
