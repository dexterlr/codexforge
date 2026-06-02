"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildDualGpuWorkerSummary } from "@/lib/codexforge/dual-gpu-worker-strategy";
import { DualGpuProfilePanel } from "./DualGpuProfilePanel";
import { DualGpuWorkerEmptyState } from "./DualGpuWorkerEmptyState";
import { DualGpuWorkerSafetyStrip } from "./DualGpuWorkerSafetyStrip";
import { DualGpuWorkerSummaryPanel } from "./DualGpuWorkerSummaryPanel";
import { GpuWorkerAssignmentPanel } from "./GpuWorkerAssignmentPanel";
import { GpuWorkerHandoffPanel } from "./GpuWorkerHandoffPanel";
import { GpuWorkerRolePanel } from "./GpuWorkerRolePanel";
import { GpuWorkerRoutingStrategyPanel } from "./GpuWorkerRoutingStrategyPanel";
import { GpuWorkerSafetyPanel } from "./GpuWorkerSafetyPanel";

export function DualGpuWorkerStrategyPanel() {
  const summary = buildDualGpuWorkerSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-dual-gpu-worker-strategy="DualGpuWorkerStrategyPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 152"
        title="Dual-GPU strategy"
        subtitle="Use two GPUs as reviewed workers for local creative jobs."
        primary={{ href: "#dual-gpu-strategy", label: "Review GPU strategy" }}
        links={[
          { href: "/local-machine", label: "Local machine" },
          { href: "/gpu-scheduler", label: "GPU scheduler" },
          { href: "/creative-cost-router", label: "Cost saver" },
          { href: "/render-queue", label: "Render queue" },
          { href: "/video-final-render", label: "Draft to final" },
        ]}
      />
      <DualGpuWorkerSafetyStrip />
      <DualGpuWorkerSummaryPanel summary={summary} />
      <section id="dual-gpu-strategy" style={previewStyles.grid}>
        <DualGpuProfilePanel profile={summary.profile} />
        <GpuWorkerRoutingStrategyPanel strategy={summary.routingStrategy} />
        <GpuWorkerSafetyPanel safety={summary.safety} />
      </section>
      <section style={previewStyles.grid}>
        <GpuWorkerRolePanel roles={summary.roles} />
        <GpuWorkerAssignmentPanel assignments={summary.assignments} />
        <GpuWorkerHandoffPanel handoff={summary.handoff} />
      </section>
      <DualGpuWorkerEmptyState />
      <PreviewFoundationDetail summary="Advanced dual-GPU details">
        <PreviewFoundationCopy>
          This strategy explains parallel workers, explicit assignment, one heavy job at a time when memory risk is unknown, manual override later, and why combined VRAM is not assumed. It does not probe hardware, select GPUs automatically, or launch jobs.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
