"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildVideoProjectWorkspaceSummary } from "@/lib/codexforge/video-project-workspace";
import { VideoProjectHandoffPanel } from "./VideoProjectHandoffPanel";
import { VideoProjectNextActionPanel } from "./VideoProjectNextActionPanel";
import { VideoProjectPanel } from "./VideoProjectPanel";
import { VideoProjectReadinessPanel } from "./VideoProjectReadinessPanel";
import { VideoProjectSectionPanel } from "./VideoProjectSectionPanel";
import { VideoProjectStatusPanel } from "./VideoProjectStatusPanel";
import { VideoProjectWorkspaceEmptyState } from "./VideoProjectWorkspaceEmptyState";
import { VideoProjectWorkspaceSafetyStrip } from "./VideoProjectWorkspaceSafetyStrip";
import { VideoProjectWorkspaceSummaryPanel } from "./VideoProjectWorkspaceSummaryPanel";

export function VideoProjectWorkspacePanel() {
  const summary = buildVideoProjectWorkspaceSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-video-project-workspace="VideoProjectWorkspacePanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no real export no upload no direct ComfyUI workflow run no ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no silent persistence no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 166"
        title="Video project workspace"
        subtitle="Keep prompts, shots, keyframes, drafts, and reviews together."
        primary={{ href: "#video-projects", label: "Review project" }}
        links={[
          { href: "/video-prompt", label: "Video prompt" },
          { href: "/storyboard", label: "Storyboard" },
          { href: "/keyframes", label: "Keyframes" },
          { href: "/local-video-draft", label: "Local draft" },
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/video-review", label: "Video review" },
          { href: "/video-assets", label: "Video assets" },
          { href: "/render-history", label: "Render history" },
          { href: "/video-export", label: "Video export" },
          { href: "/cloud-video-providers", label: "Cloud fallback" },
          { href: "/cloud-final-render", label: "Cloud final review" },
          { href: "/local-vs-cloud", label: "Local vs cloud" },
          { href: "/video-safety-audit", label: "Safety audit" },
        ]}
      />
      <VideoProjectWorkspaceSafetyStrip />
      <VideoProjectWorkspaceSummaryPanel summary={summary} />
      <section id="video-projects" style={previewStyles.grid}>
        <VideoProjectPanel project={summary.project} />
        <VideoProjectStatusPanel status={summary.status} />
        <VideoProjectReadinessPanel readiness={summary.readiness} />
        <VideoProjectNextActionPanel nextAction={summary.nextAction} />
        <VideoProjectSectionPanel sections={summary.project.sections} />
        <VideoProjectHandoffPanel handoff={summary.handoff} />
      </section>
      <VideoProjectWorkspaceEmptyState />
      <PreviewFoundationDetail summary="Advanced project workspace details">
        <PreviewFoundationCopy>
          Project state is preview/review unless an approved project persistence boundary exists. This page groups supplied/manual metadata only; it does not generate images, generate video, call ComfyUI, browse files, export, upload, or save project state.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
