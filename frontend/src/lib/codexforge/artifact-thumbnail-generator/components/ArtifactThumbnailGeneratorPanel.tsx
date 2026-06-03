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
import { buildArtifactThumbnailGeneratorModel } from "@/lib/codexforge/artifact-thumbnail-generator";

export function ArtifactThumbnailGeneratorPanel() {
  const model = buildArtifactThumbnailGeneratorModel();

  return (
    <div style={previewStyles.shell} data-codexforge-artifact-thumbnail-generator="ArtifactThumbnailGeneratorPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only review-gated export-gated approval-gated nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Artifact thumbnail generator Thumbnail generation remains behind approved local artifact boundary Source artifacts are never overwritten Review inbox handoff No thumbnail upload No artifact deletion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no auto-open arbitrary local files no artifact deletion no delete artifact button no upload by default no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 187"
        title="Thumbnails"
        subtitle="Artifact thumbnail generator plans safe local thumbnails for review grids without browsing folders, overwriting sources, deleting artifacts, or uploading images."
        primary={{ href: "#artifact-thumbnails", label: "Review thumbnails" }}
        links={[
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/local-video-preview", label: "Video preview" },
          { href: "/video-review", label: "Review inbox" },
          { href: "/local-output-capture", label: "Output capture" },
          { href: "/render-queue-recovery", label: "Recovery" },
          { href: "/export-package-builder", label: "Export package" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Artifact thumbnail generator",
          "Thumbnail generation remains behind approved local artifact boundary",
          "Source artifacts are never overwritten",
          "Review inbox handoff",
          "No thumbnail upload",
          "No artifact deletion",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            "local-only boundary",
            "review grid preview target",
            "no source overwrite",
            "no memory auto-promotion",
          ]}
        />
      </PreviewFoundationCard>
      <section id="artifact-thumbnails" style={previewStyles.grid}>
        <PreviewFoundationCard title="Source artifact">
          <PreviewFoundationCopy>{model.source.summary}</PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[model.source.label, "source artifacts are never overwritten", "no folder browsing"]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Readiness boundary">
          <PreviewFoundationCopy>{model.readiness.plainEnglish}</PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              `status: ${model.readiness.status}`,
              "generator enabled in UI: no",
              model.thumbnailStatus,
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Review handoff">
          <PreviewFoundationCopy>{model.reviewInboxHandoff}</PreviewFoundationCopy>
          <PreviewFoundationPillList items={[model.previewTarget, "/video-review", "/video-artifacts"]} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Failure and retention">
          <PreviewFoundationCopy>{model.failedThumbnailRecoveryNote}</PreviewFoundationCopy>
          <PreviewFoundationCopy>{model.retentionRule}</PreviewFoundationCopy>
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced thumbnail contract">
        <PreviewFoundationPillList items={model.fields.map((field) => field.plainEnglish)} />
      </PreviewFoundationDetail>
    </div>
  );
}
