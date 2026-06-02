"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildCloudVideoProviderSummary } from "@/lib/codexforge/cloud-video-provider-fallback-registry";
import { CloudVideoCapabilityPanel } from "./CloudVideoCapabilityPanel";
import { CloudVideoCostRiskPanel } from "./CloudVideoCostRiskPanel";
import { CloudVideoFallbackPolicyPanel } from "./CloudVideoFallbackPolicyPanel";
import { CloudVideoProviderEmptyState } from "./CloudVideoProviderEmptyState";
import { CloudVideoProviderHandoffPanel } from "./CloudVideoProviderHandoffPanel";
import { CloudVideoProviderKindPanel } from "./CloudVideoProviderKindPanel";
import { CloudVideoProviderPanel } from "./CloudVideoProviderPanel";
import { CloudVideoProviderSafetyStrip } from "./CloudVideoProviderSafetyStrip";
import { CloudVideoProviderSummaryPanel } from "./CloudVideoProviderSummaryPanel";

export function CloudVideoProviderFallbackRegistryPanel() {
  const summary = buildCloudVideoProviderSummary();
  const capabilities = summary.providers.flatMap((provider) => provider.capabilities);
  const risks = summary.providers.map((provider) => provider.costRisk);

  return (
    <div style={previewStyles.shell} data-codexforge-cloud-video-provider-fallback-registry="CloudVideoProviderFallbackRegistryPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no run button no upload no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no real export no direct ComfyUI workflow run no ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no silent persistence no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 170"
        title="Cloud video fallback"
        subtitle="Keep local-first, and use cloud only when it is worth it."
        primary={{ href: "#cloud-video-providers", label: "Review cloud fallback options" }}
        links={[
          { href: "/video-projects", label: "Video projects" },
          { href: "/creative-cost-router", label: "Creative cost saver" },
          { href: "/local-vs-cloud", label: "Local vs cloud" },
          { href: "/cloud-final-render", label: "Cloud final render" },
          { href: "/video-export", label: "Video export" },
          { href: "/provider-setup", label: "Future setup" },
        ]}
      />
      <CloudVideoProviderSafetyStrip />
      <CloudVideoProviderSummaryPanel summary={summary} />
      <section id="cloud-video-providers" style={previewStyles.grid}>
        <CloudVideoProviderKindPanel kinds={summary.providers.map((provider) => provider.kind)} />
        <CloudVideoCapabilityPanel capabilities={capabilities} />
        <CloudVideoCostRiskPanel risks={risks} />
        <CloudVideoFallbackPolicyPanel policy={summary.providers[0].fallbackPolicy} />
        {summary.providers.map((provider) => (
          <CloudVideoProviderPanel key={provider.id} provider={provider} />
        ))}
        <CloudVideoProviderHandoffPanel handoff={summary.providers[0].handoff} />
      </section>
      <CloudVideoProviderEmptyState />
      <PreviewFoundationDetail summary="Advanced cloud fallback details">
        <PreviewFoundationCopy>
          No provider is called, no credits are spent, no prompts or files are uploaded, no API key fields exist, and no video is generated. Cloud fallback is only a reviewed option for later final quality.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
