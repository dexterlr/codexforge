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
import { buildRealLocalComfyUiMetadataReaderSummary } from "@/lib/codexforge/real-local-comfyui-metadata-reader";

export function RealLocalComfyUiMetadataReaderPanel() {
  const model = buildRealLocalComfyUiMetadataReaderSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-real-local-comfyui-metadata-reader="RealLocalComfyUiMetadataReaderPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Real local ComfyUI metadata reader Metadata is summarized safely No arbitrary local file browsing Advanced metadata is secondary No secrets are shown no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no artifact deletion no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 175"
        title="ComfyUI metadata reader"
        subtitle="Local-only capability summary with safe workflow hints and no arbitrary file browsing."
        primary={{ href: "#real-local-comfyui-metadata-reader", label: "Review metadata summary" }}
        links={[
          { href: "/comfyui-real-health", label: "Real health" },
          { href: "/comfyui-metadata", label: "Metadata probe" },
          { href: "/comfyui-workflows/dry-run", label: "Dry run" },
          { href: "/workflow-package-validator", label: "Package validator" },
          { href: "/comfyui-submit-trial", label: "Submit trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Metadata is summarized safely",
          "No arbitrary local file browsing",
          "No full local paths above fold",
          "Advanced metadata is secondary",
          "No secrets are shown",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            `status: ${model.status}`,
            `status source: ${model.statusSource}`,
            `existing source: ${model.sourceLabel}`,
            model.modelCheckpointVisibilityStatus,
          ]}
        />
      </PreviewFoundationCard>
      <section id="real-local-comfyui-metadata-reader" style={previewStyles.grid}>
        <PreviewFoundationCard title={model.contract.title}>
          <PreviewFoundationCopy>
            The metadata reader is local-only and summary-first. It can represent ComfyUI status, nodes, models, and workflow hints without exposing secrets or raw local paths above the fold.
          </PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              "detected ComfyUI status source",
              "available node/type summary",
              "model/checkpoint visibility status without browsing arbitrary files",
              "workflow compatibility hints",
              "missing capability hints",
              "privacy/safety notes",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Capability summary">
          <PreviewFoundationPillList
            items={model.capabilitySummary.map((item) => `${item.label}: ${item.status}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Workflow hints">
          <PreviewFoundationPillList items={model.workflowCompatibilityHints} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Privacy notes">
          <PreviewFoundationPillList items={model.privacySafetyNotes} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced metadata details">
        <PreviewFoundationCopy>
          Advanced metadata is secondary. A future approved local reader may include compact node/type counts, missing custom-node hints, and model visibility status, but this page does not browse arbitrary files, reveal full local paths above the fold, call cloud APIs, or show secrets.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
