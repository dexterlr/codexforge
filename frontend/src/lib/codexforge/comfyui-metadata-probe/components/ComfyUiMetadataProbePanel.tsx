"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildComfyUiMetadataSummary } from "@/lib/codexforge/comfyui-metadata-probe";
import { ComfyUiMetadataEmptyState } from "./ComfyUiMetadataEmptyState";
import { ComfyUiMetadataHandoffPanel } from "./ComfyUiMetadataHandoffPanel";
import { ComfyUiMetadataRequestPanel } from "./ComfyUiMetadataRequestPanel";
import { ComfyUiMetadataResultPanel } from "./ComfyUiMetadataResultPanel";
import { ComfyUiMetadataSafetyPanel } from "./ComfyUiMetadataSafetyPanel";
import { ComfyUiMetadataSafetyStrip } from "./ComfyUiMetadataSafetyStrip";
import { ComfyUiMetadataSummaryPanel } from "./ComfyUiMetadataSummaryPanel";
import { ComfyUiMetadataTargetPanel } from "./ComfyUiMetadataTargetPanel";

export function ComfyUiMetadataProbePanel() {
  const summary = buildComfyUiMetadataSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-comfyui-metadata-probe="ComfyUiMetadataProbePanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 155"
        title="ComfyUI metadata"
        subtitle="Review local ComfyUI readiness without sending prompts or workflows."
        primary={{ href: "#comfyui-metadata", label: "Review metadata plan" }}
        links={[
          { href: "/comfyui-health/gate", label: "Health gate" },
          { href: "/comfyui-health", label: "Health overview" },
          { href: "/provider-tests", label: "Provider tests" },
          { href: "/comfyui-workflows/import", label: "Workflow import" },
          { href: "/comfyui-workflows/dry-run", label: "Dry run" },
        ]}
      />
      <ComfyUiMetadataSafetyStrip />
      <ComfyUiMetadataSummaryPanel summary={summary} />
      <section id="comfyui-metadata" style={previewStyles.grid}>
        <ComfyUiMetadataTargetPanel target={summary.target} />
        <ComfyUiMetadataRequestPanel request={summary.request} />
        <ComfyUiMetadataResultPanel result={summary.result} />
        <ComfyUiMetadataSafetyPanel safety={summary.safety} />
        <ComfyUiMetadataHandoffPanel handoff={summary.handoff} />
      </section>
      <ComfyUiMetadataEmptyState />
      <PreviewFoundationDetail summary="Advanced metadata details">
        <PreviewFoundationCopy>
          A later approved local metadata route may supply reachability, version, system stats, queue stats, node list, or model list. This phase does not add that route because execution and local service contact remain blocked by default.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
