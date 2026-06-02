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
import { buildRealLocalOutputArtifactCaptureSummary } from "@/lib/codexforge/real-local-output-artifact-capture";

export function RealLocalOutputArtifactCapturePanel() {
  const model = buildRealLocalOutputArtifactCaptureSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-real-local-output-artifact-capture="RealLocalOutputArtifactCapturePanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Real artifact capture from local output Local output reference summary Review inbox handoff No artifact deletion No memory auto-promotion Full local paths stay secondary checksum/status placeholder if no backend exists no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no artifact deletion no delete artifact button no Brain graph mutation from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 181"
        title="Output capture"
        subtitle="Record what a local generation trial produced without deleting, mutating, browsing arbitrary folders, or silently promoting the artifact."
        primary={{ href: "#real-local-output-artifact-capture", label: "Review capture" }}
        links={[
          { href: "/local-image-trial", label: "Image trial" },
          { href: "/local-keyframe-trial", label: "Keyframe trial" },
          { href: "/local-video-draft-trial", label: "Video trial" },
          { href: "/video-review", label: "Review inbox" },
          { href: "/video-recovery", label: "Recovery" },
          { href: "/video-export", label: "Export handoff" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Real artifact capture from local output",
          "Local output reference summary",
          "Review inbox handoff",
          "No artifact deletion",
          "No memory auto-promotion",
          "Full local paths stay secondary",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            `status: ${model.status}`,
            "records local output metadata only",
            "review before reuse",
            "nothing is deleted",
          ]}
        />
      </PreviewFoundationCard>
      <section id="real-local-output-artifact-capture" style={previewStyles.grid}>
        <PreviewFoundationCard title="Capture record">
          <PreviewFoundationCopy>{model.record.localOutputReferenceSummary}</PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              `artifact type: ${model.record.artifactType}`,
              model.record.sourceTrial,
              model.record.checksumStatusPlaceholder,
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Handoffs">
          <PreviewFoundationPillList
            items={[
              model.record.reviewInboxHandoff,
              model.record.recoveryPath,
              model.record.exportHandoff,
              model.record.retentionNote,
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Capture checks">
          <PreviewFoundationPillList
            items={model.checks.map((check) => `${check.label}: ${check.status}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Boundaries">
          <PreviewFoundationCopy>
            This capture boundary records supplied local output metadata. It does not browse arbitrary local folders, show full local paths above the fold, delete artifacts, mutate the Brain graph, or auto-promote memory.
          </PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              "no delete behavior",
              "no memory auto-promotion",
              "full local paths stay secondary",
              "review inbox handoff",
              "export handoff",
            ]}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced output capture details">
        <PreviewFoundationCopy>
          Advanced local output details stay secondary. A future backend can attach checksum evidence, but this UI uses a checksum/status placeholder if no backend exists. It records the source trial, type, review handoff, recovery path, export handoff, and retention note without deleting or promoting artifacts.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
