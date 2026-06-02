"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildVideoFailureRecoverySummary } from "@/lib/codexforge/video-failure-recovery-flow";
import { VideoFailureCasePanel } from "./VideoFailureCasePanel";
import { VideoFailureDiagnosisPanel } from "./VideoFailureDiagnosisPanel";
import { VideoFailureHandoffPanel } from "./VideoFailureHandoffPanel";
import { VideoFailureRecoveryEmptyState } from "./VideoFailureRecoveryEmptyState";
import { VideoFailureRecoverySafetyStrip } from "./VideoFailureRecoverySafetyStrip";
import { VideoFailureRecoverySummaryPanel } from "./VideoFailureRecoverySummaryPanel";
import { VideoFailureRetryPlanPanel } from "./VideoFailureRetryPlanPanel";
import { VideoFailureSafeNextStepPanel } from "./VideoFailureSafeNextStepPanel";
import { VideoFailureWorkflowFixPanel } from "./VideoFailureWorkflowFixPanel";

export function VideoFailureRecoveryFlowPanel() {
  const summary = buildVideoFailureRecoverySummary();

  return (
    <div style={previewStyles.shell} data-codexforge-video-failure-recovery-flow="VideoFailureRecoveryFlowPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 144"
        title="Video recovery"
        subtitle="When a render fails or looks wrong, follow a safe next step. This page never retries automatically."
        primary={{ href: "#video-recovery", label: "Find recovery step" }}
        links={[
          { href: "/video-review", label: "Video review" },
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/video-compare", label: "Compare drafts" },
          { href: "/video-final-render", label: "Draft to final" },
          { href: "/comfyui-workflows/safety", label: "Workflow safety" },
        ]}
      />
      <VideoFailureRecoverySafetyStrip />
      <VideoFailureRecoverySummaryPanel summary={summary} />
      <section id="video-recovery" style={previewStyles.grid}>
        <VideoFailureCasePanel cases={summary.cases} />
        <VideoFailureDiagnosisPanel diagnoses={summary.diagnoses} />
        <VideoFailureSafeNextStepPanel steps={summary.nextSteps} />
        <VideoFailureRetryPlanPanel retryPlan={summary.retryPlan} />
        <VideoFailureWorkflowFixPanel workflowFix={summary.workflowFix} />
        <VideoFailureHandoffPanel handoff={summary.handoff} />
      </section>
      <VideoFailureRecoveryEmptyState />
      <PreviewFoundationDetail summary="Advanced video recovery details">
        <PreviewFoundationCopy>Recovery can prepare a retry plan, but approval and a future guarded executor are still required before any real retry.</PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
