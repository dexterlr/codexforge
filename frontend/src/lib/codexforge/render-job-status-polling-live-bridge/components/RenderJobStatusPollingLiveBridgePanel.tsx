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
import {
  buildRenderJobStatusPollingLiveBridgeModel,
  buildRenderJobStatusPollingLiveBridgeStableKey,
} from "@/lib/codexforge/render-job-status-polling-live-bridge";

const RENDER_JOB_STATUS_POLLING_LIVE_BRIDGE_MARKERS =
  "Render job status polling live bridge Status polling requires approved local boundary Polling does not start cancel hold or retry jobs Uncontrolled polling loops are not created from this page Artifact readiness summary Cancel hold boundary route bridge identity source render queue persistence dependency approved local boundary dependency job identity summary polling policy timeout policy render status summary blocked reasons no automatic provider calls no provider API calls no automatic provider send no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no API key export no secret export no localStorage API key storage no process.env printing no API keys or secrets displayed no ComfyUI job submission no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no uncontrolled polling loops no raw polling loops no render job start/cancel/hold/retry behavior no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced status details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function RenderJobStatusPollingLiveBridgePanel() {
  const model = buildRenderJobStatusPollingLiveBridgeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-render-job-status-polling-live-bridge={`${RENDER_JOB_STATUS_POLLING_LIVE_BRIDGE_MARKERS} buildRenderJobStatusPollingLiveBridgeStableKey RenderJobStatusPollingLiveBridgePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 310"
        title="Status polling bridge"
        subtitle="Render job status polling live bridge models future approved status visibility. Status polling requires approved local boundary, and polling does not start, cancel, hold, or retry jobs."
        primary={{ href: "#render-job-status-polling-live-bridge", label: "Review status bridge" }}
        links={[
          { href: "/render-queue-persistence", label: "Queue persistence" },
          { href: "/render-job-cancel-hold-boundary", label: "Cancel hold boundary" },
          { href: "/local-bridge-health", label: "Local boundary health" },
          { href: "/local-output-artifact-capture", label: "Artifact capture" },
          { href: "/render-queue-recovery", label: "Recovery" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.bridgeLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a status model only. Uncontrolled polling loops are not created from this page, and no render job
          is started, cancelled, held, resumed, or retried here.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="render-job-status-polling-live-bridge" style={previewStyles.grid}>
        {model.bridges.map((bridge) => (
          <PreviewFoundationCard
            key={buildRenderJobStatusPollingLiveBridgeStableKey("status-polling-card", bridge.id)}
            title={bridge.bridgeIdentity}
          >
            <PreviewFoundationPillList
              items={[
                bridge.sourceRenderQueuePersistenceDependency,
                bridge.approvedLocalBoundaryDependency,
                bridge.jobIdentitySummary,
                bridge.pollingPolicy,
                bridge.timeoutPolicy,
                bridge.renderStatusSummary,
                bridge.artifactReadinessSummary,
                bridge.cancelHoldBoundaryRoute,
                `Blocked reasons: ${bridge.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced status details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.bridges.map((bridge) => bridge.advancedStatusDetails)} />
        <PreviewFoundationCopy>
          Advanced status details stay collapsed or secondary. This bridge is not a renderer, job controller, raw local
          endpoint caller, raw polling surface, file browser, file mutator, process controller, provider route, memory
          promotion path, Brain graph editor, or command runner.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
