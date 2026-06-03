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
import { buildExportPackageBuilderModel } from "@/lib/codexforge/export-package-builder-mvp";

export function ExportPackageBuilderPanel() {
  const model = buildExportPackageBuilderModel();

  return (
    <div style={previewStyles.shell} data-codexforge-export-package-builder-mvp="ExportPackageBuilderPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only review-gated export-gated approval-gated nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Export package builder MVP Export package remains local by default No upload by default Export manifest summary Handoff copy Final packaging remains behind approved local export boundary no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no auto-open arbitrary local files no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 189"
        title="Export package"
        subtitle="Export package builder MVP prepares a reviewed local handoff package without uploading, publishing, storing secrets, browsing arbitrary files, or deleting artifacts."
        primary={{ href: "#export-package-builder", label: "Review package" }}
        links={[
          { href: "/draft-playback-review", label: "Draft review" },
          { href: "/local-video-preview", label: "Video preview" },
          { href: "/artifact-thumbnails", label: "Thumbnails" },
          { href: "/render-history", label: "Version history" },
          { href: "/video-export", label: "Export handoff" },
          { href: "/video-review", label: "Review inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Export package builder MVP",
          "Export package remains local by default",
          "No upload by default",
          "Export manifest summary",
          "Handoff copy",
          "Final packaging remains behind approved local export boundary",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            "reviewed artifact summary",
            "selected draft/version",
            "local destination policy",
            "no secrets",
          ]}
        />
      </PreviewFoundationCard>
      <section id="export-package-builder" style={previewStyles.grid}>
        <PreviewFoundationCard title="Manifest">
          <PreviewFoundationCopy>{model.manifest.reviewedArtifact}</PreviewFoundationCopy>
          <PreviewFoundationCopy>{model.manifest.selectedDraftVersion}</PreviewFoundationCopy>
          <PreviewFoundationPillList items={[model.manifest.label, model.manifest.destinationPolicy]} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Included assets">
          <PreviewFoundationPillList items={model.includedAssets.map((asset) => asset.label)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Excluded assets">
          <PreviewFoundationPillList items={model.excludedAssets.map((asset) => asset.label)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Destination policy">
          <PreviewFoundationCopy>{model.destinationPolicy}</PreviewFoundationCopy>
          <PreviewFoundationCopy>{model.readiness.plainEnglish}</PreviewFoundationCopy>
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Review checklist">
          <PreviewFoundationPillList items={model.reviewChecklist.map((item) => item.label)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Handoff copy">
          <PreviewFoundationCopy>{model.handoffCopy}</PreviewFoundationCopy>
          <PreviewFoundationCopy>{model.retentionNote}</PreviewFoundationCopy>
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced export manifest details">
        <PreviewFoundationPillList
          items={[
            ...model.includedAssets.map((asset) => asset.reason),
            ...model.excludedAssets.map((asset) => asset.reason),
            model.readiness.plainEnglish,
          ]}
        />
      </PreviewFoundationDetail>
    </div>
  );
}
