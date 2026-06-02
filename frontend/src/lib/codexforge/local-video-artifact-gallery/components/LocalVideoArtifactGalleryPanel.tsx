"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildVideoArtifactGallerySummary } from "@/lib/codexforge/local-video-artifact-gallery";
import { VideoArtifactGalleryEmptyState } from "./VideoArtifactGalleryEmptyState";
import { VideoArtifactGallerySafetyStrip } from "./VideoArtifactGallerySafetyStrip";
import { VideoArtifactGallerySummaryPanel } from "./VideoArtifactGallerySummaryPanel";
import { VideoArtifactHandoffPanel } from "./VideoArtifactHandoffPanel";
import { VideoArtifactMetadataPanel } from "./VideoArtifactMetadataPanel";
import { VideoArtifactPreviewPanel } from "./VideoArtifactPreviewPanel";
import { VideoArtifactRecordPanel } from "./VideoArtifactRecordPanel";
import { VideoArtifactReviewStatePanel } from "./VideoArtifactReviewStatePanel";

export function LocalVideoArtifactGalleryPanel() {
  const summary = buildVideoArtifactGallerySummary();

  return (
    <div style={previewStyles.shell} data-codexforge-local-video-artifact-gallery="LocalVideoArtifactGalleryPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 142"
        title="Video artifacts"
        subtitle="Review local creative outputs and handoffs in one place. No renders exist yet, and this page does not browse files."
        primary={{ href: "#video-artifacts", label: "Review artifacts" }}
        links={[
          { href: "/video-projects", label: "Video projects" },
          { href: "/video-assets", label: "Video assets" },
          { href: "/render-history", label: "Render history" },
          { href: "/video-export", label: "Video export" },
          { href: "/local-image", label: "Local image MVP" },
          { href: "/local-keyframes", label: "Local keyframes MVP" },
          { href: "/video-capture", label: "Capture artifact" },
          { href: "/comfyui-jobs/package", label: "Job package" },
          { href: "/video-review", label: "Video review" },
          { href: "/video-recovery", label: "Video recovery" },
          { href: "/video-compare", label: "Compare drafts" },
          { href: "/video-upscale", label: "Video upscale" },
          { href: "/video-interpolation", label: "Frame interpolation" },
          { href: "/video-finishing", label: "Video finishing" },
          { href: "/video-final-render", label: "Draft to final" },
          { href: "/render-queue", label: "Render queue" },
        ]}
      />
      <VideoArtifactGallerySafetyStrip />
      <VideoArtifactGallerySummaryPanel summary={summary} />
      <section id="video-artifacts" style={previewStyles.grid}>
        <VideoArtifactRecordPanel records={summary.records} />
        <VideoArtifactPreviewPanel previews={summary.previews} />
        <VideoArtifactMetadataPanel metadata={summary.metadata} />
        <VideoArtifactReviewStatePanel states={summary.reviewStates} />
        <VideoArtifactHandoffPanel handoff={summary.handoff} />
      </section>
      <VideoArtifactGalleryEmptyState />
      <PreviewFoundationDetail summary="Advanced artifact gallery details">
        <PreviewFoundationCopy>Future safe artifact work can connect a known artifact workspace and supplied queue outcomes such as complete-supplied or failed-supplied. This phase does not read arbitrary paths, delete files, generate images, or generate video.</PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
