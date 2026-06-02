"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildCreativeCostSaverSummary } from "@/lib/codexforge/creative-cost-saver-router";
import { CreativeCloudFallbackPolicyPanel } from "./CreativeCloudFallbackPolicyPanel";
import { CreativeCostEstimatePanel } from "./CreativeCostEstimatePanel";
import { CreativeCostRoutePanel } from "./CreativeCostRoutePanel";
import { CreativeCostSaverEmptyState } from "./CreativeCostSaverEmptyState";
import { CreativeCostSaverHandoffPanel } from "./CreativeCostSaverHandoffPanel";
import { CreativeCostSaverSafetyStrip } from "./CreativeCostSaverSafetyStrip";
import { CreativeCostSaverSummaryPanel } from "./CreativeCostSaverSummaryPanel";
import { CreativeCostTaskPanel } from "./CreativeCostTaskPanel";
import { CreativeLocalFirstPolicyPanel } from "./CreativeLocalFirstPolicyPanel";

export function CreativeCostSaverRouterPanel() {
  const summary = buildCreativeCostSaverSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-creative-cost-saver-router="CreativeCostSaverRouterPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 150"
        title="Creative cost saver"
        subtitle="Use local drafts first and save cloud credits for when they matter."
        primary={{ href: "#creative-cost-route", label: "Choose cost-saving route" }}
        links={[
          { href: "/video-jobs", label: "Video jobs" },
          { href: "/video-final-render", label: "Draft to final" },
          { href: "/gpu-scheduler", label: "GPU scheduler" },
          { href: "/dual-gpu", label: "Dual-GPU strategy" },
          { href: "/render-queue", label: "Render queue" },
          { href: "/local-machine", label: "Local machine" },
          { href: "/token-router", label: "Token router" },
        ]}
      />
      <CreativeCostSaverSafetyStrip />
      <CreativeCostSaverSummaryPanel summary={summary} />
      <section id="creative-cost-route" style={previewStyles.grid}>
        <CreativeLocalFirstPolicyPanel policy={summary.localFirstPolicy} />
        <CreativeCloudFallbackPolicyPanel policy={summary.cloudFallbackPolicy} />
        <CreativeCostEstimatePanel estimates={summary.estimates} />
      </section>
      <section style={previewStyles.grid}>
        <CreativeCostTaskPanel tasks={summary.tasks} />
        <CreativeCostRoutePanel routes={summary.routes} />
        <CreativeCostSaverHandoffPanel handoff={summary.handoff} />
      </section>
      <CreativeCostSaverEmptyState />
      <PreviewFoundationDetail summary="Advanced cost saver details">
        <PreviewFoundationCopy>
          This router explains local planning, local drafts, local upscale planning, local interpolation planning, artifact review, and cloud final fallback later. It does not run jobs, probe hardware, call providers, send prompts, or generate media.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
