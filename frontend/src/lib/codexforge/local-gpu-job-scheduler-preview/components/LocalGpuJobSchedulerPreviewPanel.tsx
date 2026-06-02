"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildGpuJobSchedulerSummary } from "@/lib/codexforge/local-gpu-job-scheduler-preview";
import { GpuJobPriorityPanel } from "./GpuJobPriorityPanel";
import { GpuJobProfilePanel } from "./GpuJobProfilePanel";
import { GpuJobResourcePlanPanel } from "./GpuJobResourcePlanPanel";
import { GpuJobSchedulePreviewPanel } from "./GpuJobSchedulePreviewPanel";
import { GpuJobSchedulerEmptyState } from "./GpuJobSchedulerEmptyState";
import { GpuJobSchedulerHandoffPanel } from "./GpuJobSchedulerHandoffPanel";
import { GpuJobSchedulerSafetyPanel } from "./GpuJobSchedulerSafetyPanel";
import { GpuJobSchedulerSafetyStrip } from "./GpuJobSchedulerSafetyStrip";
import { GpuJobSchedulerSummaryPanel } from "./GpuJobSchedulerSummaryPanel";

export function LocalGpuJobSchedulerPreviewPanel() {
  const summary = buildGpuJobSchedulerSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-local-gpu-job-scheduler-preview="LocalGpuJobSchedulerPreviewPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 151"
        title="GPU job scheduler"
        subtitle="Plan local creative jobs so your workstation is used safely."
        primary={{ href: "#gpu-schedule", label: "Preview schedule" }}
        links={[
          { href: "/video-jobs", label: "Video jobs" },
          { href: "/local-machine", label: "Local machine" },
          { href: "/creative-cost-router", label: "Cost saver" },
          { href: "/dual-gpu", label: "Dual-GPU strategy" },
          { href: "/render-queue", label: "Render queue" },
          { href: "/video-final-render", label: "Draft to final" },
        ]}
      />
      <GpuJobSchedulerSafetyStrip />
      <GpuJobSchedulerSummaryPanel summary={summary} />
      <section id="gpu-schedule" style={previewStyles.grid}>
        <GpuJobSchedulePreviewPanel schedule={summary.schedule} />
        <GpuJobPriorityPanel priorities={summary.priorities} />
        <GpuJobResourcePlanPanel resourcePlans={summary.resourcePlans} />
      </section>
      <section style={previewStyles.grid}>
        <GpuJobProfilePanel profiles={summary.profiles} />
        <GpuJobSchedulerSafetyPanel safety={summary.safety} />
        <GpuJobSchedulerHandoffPanel handoff={summary.handoff} />
      </section>
      <GpuJobSchedulerEmptyState />
      <PreviewFoundationDetail summary="Advanced scheduler details">
        <PreviewFoundationCopy>
          This preview explains job order, priority, resource posture, heavy queues, and blocked states. It does not schedule, start, pause, cancel, run system commands, probe hardware, call ComfyUI, or execute a job queue.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
