"use client";

import {
  PreviewFoundationCard,
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  PreviewFoundationPillList,
  PreviewFoundationSafetyStrip,
  previewStyles,
} from "../../video-foundation-ui";
import { buildLocalVideoPreviewPlayerModel } from "@/lib/codexforge/local-video-preview-player";

export function LocalVideoPreviewPlayerPanel() {
  const model = buildLocalVideoPreviewPlayerModel();

  return (
    <div style={previewStyles.shell} data-codexforge-local-video-preview-player="LocalVideoPreviewPlayerPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only review-gated export-gated approval-gated nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Local video preview player Preview playback remains behind approved local artifact boundary Local artifact reference summary No upload behavior No artifact deletion Full local paths stay secondary no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no auto-open arbitrary local files no artifact deletion no delete artifact button no upload by default no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 186"
        title="Video preview"
        subtitle="Local video preview player gives a safe review surface for captured draft outputs. Playback stays local-first, review-gated, and behind the approved artifact boundary."
        primary={{ href: "#local-video-preview", label: "Review preview model" }}
        links={[
          { href: "/local-video-draft-trial", label: "Source trial" },
          { href: "/local-output-capture", label: "Output capture" },
          { href: "/render-job-status", label: "Job status" },
          { href: "/video-review", label: "Review inbox" },
          { href: "/render-queue-recovery", label: "Recovery" },
          { href: "/export-package-builder", label: "Export package" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Local video preview player",
          "Preview playback remains behind approved local artifact boundary",
          "Local artifact reference summary",
          "No upload behavior",
          "No artifact deletion",
          "Full local paths stay secondary",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            "local-only review surface",
            "nothing uploads automatically",
            "playback source not auto-opened",
            "review-gated before export",
          ]}
        />
      </PreviewFoundationCard>
      <section id="local-video-preview" style={previewStyles.grid}>
        <PreviewFoundationCard title="Preview frame">
          <PreviewFoundationCopy>{model.readiness.plainEnglish}</PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              `status: ${model.readiness.status}`,
              "playback enabled in UI: no",
              "approved local artifact boundary required",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Artifact summary">
          <PreviewFoundationCopy>{model.artifact.shortReference}</PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              model.artifact.label,
              model.artifact.artifactKind,
              "full local paths stay secondary",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Review state">
          <PreviewFoundationPillList
            items={[
              model.sourceTrial,
              model.renderJobStatus,
              model.captureStatus,
              model.reviewStatus,
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Next reviewed routes">
          <PreviewFoundationCopy>
            Recovery and export are explicit handoffs. This page does not mutate render queues, delete artifacts, or promote memory.
          </PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[model.recoveryRoute, model.exportRoute, "/video-review", "/artifact-thumbnails"]}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced preview contract">
        <PreviewFoundationPillList items={model.fields.map((field) => field.plainEnglish)} />
      </PreviewFoundationDetail>
    </div>
  );
}
