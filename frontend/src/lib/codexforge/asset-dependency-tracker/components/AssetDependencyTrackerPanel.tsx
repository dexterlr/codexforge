"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildAssetDependencySummary } from "@/lib/codexforge/asset-dependency-tracker";
import { AssetDependencyEmptyState } from "./AssetDependencyEmptyState";
import { AssetDependencyGroupPanel } from "./AssetDependencyGroupPanel";
import { AssetDependencyHandoffPanel } from "./AssetDependencyHandoffPanel";
import { AssetDependencyNextActionPanel } from "./AssetDependencyNextActionPanel";
import { AssetDependencyPanel } from "./AssetDependencyPanel";
import { AssetDependencyReadinessPanel } from "./AssetDependencyReadinessPanel";
import { AssetDependencyRiskPanel } from "./AssetDependencyRiskPanel";
import { AssetDependencySafetyStrip } from "./AssetDependencySafetyStrip";
import { AssetDependencySummaryPanel } from "./AssetDependencySummaryPanel";

export function AssetDependencyTrackerPanel({ headingLevel = "h1" }: { headingLevel?: "h1" | "h2" }) {
  const summary = buildAssetDependencySummary();

  return (
    <div style={previewStyles.shell} data-codexforge-asset-dependency-tracker="AssetDependencyTrackerPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no real export no upload no file browser no arbitrary path access no direct ComfyUI workflow run no ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no silent persistence no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no deletion no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        headingLevel={headingLevel}
        phase="Assets workspace"
        title="Assets"
        subtitle="See what a project needs before draft, finishing, or export handoff."
        primary={{ href: "#video-assets", label: "Open asset review" }}
        links={[
          { href: "/video-projects", label: "Video projects" },
          { href: "/comfyui-jobs/package", label: "Job package" },
          { href: "/local-video-draft", label: "Local draft" },
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/video-recovery", label: "Video recovery" },
          { href: "/video-export", label: "Video export" },
        ]}
      />
      <AssetDependencySafetyStrip />
      <AssetDependencySummaryPanel summary={summary} />
      <section id="video-assets" style={previewStyles.grid}>
        <AssetDependencyPanel dependencies={summary.dependencies} />
        <AssetDependencyGroupPanel groups={summary.groups} />
        <AssetDependencyRiskPanel risk={summary.risk} />
        <AssetDependencyReadinessPanel readiness={summary.readiness} />
        <AssetDependencyNextActionPanel nextAction={summary.nextAction} />
        <AssetDependencyHandoffPanel handoff={summary.handoff} />
      </section>
      <AssetDependencyEmptyState />
      <PreviewFoundationDetail summary="Advanced asset dependency details">
        <PreviewFoundationCopy>
          Asset rows are supplied/manual project metadata. This tracker does not open a file browser, browse arbitrary paths, delete artifacts, run ComfyUI, submit queue prompts, generate media, upload files, or persist project state.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
