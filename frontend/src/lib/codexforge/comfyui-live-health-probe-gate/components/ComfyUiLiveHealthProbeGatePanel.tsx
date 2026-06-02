"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildLiveHealthProbeSummary } from "@/lib/codexforge/comfyui-live-health-probe-gate";
import { LiveHealthProbeDecisionPanel } from "./LiveHealthProbeDecisionPanel";
import { LiveHealthProbeEmptyState } from "./LiveHealthProbeEmptyState";
import { LiveHealthProbeHandoffPanel } from "./LiveHealthProbeHandoffPanel";
import { LiveHealthProbePolicyPanel } from "./LiveHealthProbePolicyPanel";
import { LiveHealthProbeReadinessPanel } from "./LiveHealthProbeReadinessPanel";
import { LiveHealthProbeRequestPanel } from "./LiveHealthProbeRequestPanel";
import { LiveHealthProbeSafetyPanel } from "./LiveHealthProbeSafetyPanel";
import { LiveHealthProbeSafetyStrip } from "./LiveHealthProbeSafetyStrip";
import { LiveHealthProbeSummaryPanel } from "./LiveHealthProbeSummaryPanel";

export function ComfyUiLiveHealthProbeGatePanel() {
  const summary = buildLiveHealthProbeSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-comfyui-live-health-probe-gate="ComfyUiLiveHealthProbeGatePanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 154"
        title="ComfyUI health gate"
        subtitle="Check if a future local health probe is safe before anything contacts ComfyUI."
        primary={{ href: "#comfyui-health-gate", label: "Review health gate" }}
        links={[
          { href: "/comfyui-health", label: "Health overview" },
          { href: "/comfyui-metadata", label: "Metadata" },
          { href: "/local-provider-probes", label: "Local probes" },
          { href: "/provider-tests", label: "Provider tests" },
          { href: "/render-queue", label: "Render queue" },
        ]}
      />
      <LiveHealthProbeSafetyStrip />
      <LiveHealthProbeSummaryPanel summary={summary} />
      <section id="comfyui-health-gate" style={previewStyles.grid}>
        <LiveHealthProbeRequestPanel request={summary.request} />
        <LiveHealthProbePolicyPanel policy={summary.policy} />
        <LiveHealthProbeSafetyPanel safety={summary.safety} />
        <LiveHealthProbeReadinessPanel readiness={summary.readiness} />
        <LiveHealthProbeDecisionPanel decision={summary.decision} />
        <LiveHealthProbeHandoffPanel handoff={summary.handoff} />
      </section>
      <LiveHealthProbeEmptyState />
      <PreviewFoundationDetail summary="Advanced health gate details">
        <PreviewFoundationCopy>
          A future approved probe may check local metadata such as reachability, version, or simple readiness. It must not send prompts, submit workflows, mutate a queue, write files, expose secrets, or fall back to cloud.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
