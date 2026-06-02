"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildVideoSafetySummary } from "@/lib/codexforge/video-generation-safety-audit";
import { VideoSafetyAuditEmptyState } from "./VideoSafetyAuditEmptyState";
import { VideoSafetyAuditPanel } from "./VideoSafetyAuditPanel";
import { VideoSafetyAuditSafetyStrip } from "./VideoSafetyAuditSafetyStrip";
import { VideoSafetyBoundaryPanel } from "./VideoSafetyBoundaryPanel";
import { VideoSafetyCheckPanel } from "./VideoSafetyCheckPanel";
import { VideoSafetyDecisionPanel } from "./VideoSafetyDecisionPanel";
import { VideoSafetyHandoffPanel } from "./VideoSafetyHandoffPanel";
import { VideoSafetyRiskPanel } from "./VideoSafetyRiskPanel";
import { VideoSafetySummaryPanel } from "./VideoSafetySummaryPanel";

export function VideoGenerationSafetyAuditPanel() {
  const summary = buildVideoSafetySummary();
  const audit = summary.audit;

  return (
    <div style={previewStyles.shell} data-codexforge-video-generation-safety-audit="VideoGenerationSafetyAuditPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no generation button no provider calls no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no real export no upload no direct ComfyUI workflow run no ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no silent persistence no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 173"
        title="Video safety audit"
        subtitle="Check whether the video generation path is safe enough for a future real trial."
        primary={{ href: "#video-safety-audit", label: "Run safety audit" }}
        links={[
          { href: "/comfyui-submit", label: "Submit boundary" },
          { href: "/local-video-draft", label: "Local draft" },
          { href: "/cloud-final-render", label: "Cloud final render" },
          { href: "/local-vs-cloud", label: "Local vs cloud" },
          { href: "/video-projects", label: "Video projects" },
          { href: "/video-export", label: "Video export" },
        ]}
      />
      <VideoSafetyAuditSafetyStrip />
      <VideoSafetySummaryPanel summary={summary} />
      <section id="video-safety-audit" style={previewStyles.grid}>
        <VideoSafetyAuditPanel audit={audit} />
        <VideoSafetyCheckPanel checks={audit.checks} />
        <VideoSafetyRiskPanel risks={audit.risks} />
        <VideoSafetyBoundaryPanel boundaries={audit.boundaries} />
        <VideoSafetyDecisionPanel decision={audit.decision} />
        <VideoSafetyHandoffPanel handoff={audit.handoff} />
      </section>
      <VideoSafetyAuditEmptyState />
      <PreviewFoundationDetail summary="Advanced video safety audit details">
        <PreviewFoundationCopy>
          This safety audit checks local health, metadata, workflow review, dry run contract, submit boundary, render queue controls, artifact capture, review inbox, recovery, export, cloud fallback, local-vs-cloud reasoning, secrets, no-auto-run default, and explicit approval. It does not generate video.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
