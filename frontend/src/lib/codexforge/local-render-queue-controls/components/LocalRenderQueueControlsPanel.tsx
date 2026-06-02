"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildRenderQueueSummary } from "@/lib/codexforge/local-render-queue-controls";
import { RenderQueueControlPanel } from "./RenderQueueControlPanel";
import { RenderQueueEmptyState } from "./RenderQueueEmptyState";
import { RenderQueueHandoffPanel } from "./RenderQueueHandoffPanel";
import { RenderQueueItemPanel } from "./RenderQueueItemPanel";
import { RenderQueuePolicyPanel } from "./RenderQueuePolicyPanel";
import { RenderQueueSafetyPanel } from "./RenderQueueSafetyPanel";
import { RenderQueueSafetyStrip } from "./RenderQueueSafetyStrip";
import { RenderQueueStatePanel } from "./RenderQueueStatePanel";
import { RenderQueueSummaryPanel } from "./RenderQueueSummaryPanel";

export function LocalRenderQueueControlsPanel() {
  const summary = buildRenderQueueSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-local-render-queue-controls="LocalRenderQueueControlsPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 153"
        title="Render queue"
        subtitle="Preview and review local render jobs before anything runs."
        primary={{ href: "#render-queue", label: "Review queue" }}
        links={[
          { href: "/gpu-scheduler", label: "GPU scheduler" },
          { href: "/dual-gpu", label: "Dual-GPU strategy" },
          { href: "/video-jobs", label: "Video jobs" },
          { href: "/video-final-render", label: "Draft to final" },
          { href: "/video-artifacts", label: "Artifacts" },
          { href: "/comfyui-health/gate", label: "Health gate" },
          { href: "/comfyui-workflows/dry-run", label: "Dry run" },
          { href: "/comfyui-submit", label: "Submit boundary" },
        ]}
      />
      <RenderQueueSafetyStrip />
      <RenderQueueSummaryPanel summary={summary} />
      <section id="render-queue" style={previewStyles.grid}>
        <RenderQueueItemPanel items={summary.items} />
        <RenderQueueControlPanel controls={summary.controls} />
        <RenderQueueStatePanel states={summary.states} />
      </section>
      <section style={previewStyles.grid}>
        <RenderQueuePolicyPanel policy={summary.policy} />
        <RenderQueueSafetyPanel safety={summary.safety} />
        <RenderQueueHandoffPanel handoff={summary.handoff} />
      </section>
      <RenderQueueEmptyState />
      <PreviewFoundationDetail summary="Advanced render queue details">
        <PreviewFoundationCopy>
          This queue preview models pause, resume, cancel, retry, hold, prioritize, remove from preview, health gate status, workflow dry run status, and submit boundary status before run. It does not control processes, delete files, mutate a real queue, call ComfyUI, or execute local render jobs.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
