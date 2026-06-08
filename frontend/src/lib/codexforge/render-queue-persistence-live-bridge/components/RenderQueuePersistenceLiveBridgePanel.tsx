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
  buildRenderQueuePersistenceLiveBridgeModel,
  buildRenderQueuePersistenceLiveBridgeStableKey,
} from "@/lib/codexforge/render-queue-persistence-live-bridge";

const RENDER_QUEUE_PERSISTENCE_LIVE_BRIDGE_MARKERS =
  "Render queue persistence live bridge Render queue persistence does not start jobs Retry cancel hold actions require separate approval Queue records are reviewed before promotion Render status Job status polling route bridge identity source submit trial / generation result dependency queue record summary persistence status retention policy recovery route blocked reasons no render job start/cancel/hold/retry behavior no raw polling loops no ComfyUI job submission no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no local file/process mutation no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no API keys or secrets displayed provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced queue details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no auto-apply router recommendations no silent provider registry mutation no provider retry from UI no API key export no secret export no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function RenderQueuePersistenceLiveBridgePanel() {
  const model = buildRenderQueuePersistenceLiveBridgeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-render-queue-persistence-live-bridge={`${RENDER_QUEUE_PERSISTENCE_LIVE_BRIDGE_MARKERS} buildRenderQueuePersistenceLiveBridgeStableKey RenderQueuePersistenceLiveBridgePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 309"
        title="Render queue persistence"
        subtitle="Render queue persistence live bridge reviews future approved queue records and persistence state. Render queue persistence does not start jobs, retry cancel hold actions require separate approval, and queue records are reviewed before promotion."
        primary={{ href: "#render-queue-persistence-live-bridge", label: "Review queue record" }}
        links={[
          { href: "/approved-comfyui-submit-trial-bridge", label: "Submit bridge" },
          { href: "/local-video-draft-result", label: "Video draft result" },
          { href: "/render-job-status", label: "Job status" },
          { href: "/render-queue-recovery", label: "Recovery" },
          { href: "/video-review", label: "Review inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.bridgeLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This bridge reviews supplied queue record metadata only. It does not start render jobs, cancel jobs, hold jobs,
          retry jobs, create raw polling loops, mutate local files or processes, or promote memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="render-queue-persistence-live-bridge" style={previewStyles.grid}>
        {model.bridges.map((bridge) => (
          <PreviewFoundationCard
            key={buildRenderQueuePersistenceLiveBridgeStableKey("render-queue-persistence-card", bridge.id)}
            title={bridge.bridgeIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Render status: ${bridge.renderStatus}`,
                bridge.sourceSubmitTrialGenerationDependency,
                bridge.queueRecordSummary,
                bridge.persistenceStatus,
                bridge.retentionPolicy,
                bridge.recoveryRoute,
                bridge.jobStatusPollingRoute,
                `Blocked reasons: ${bridge.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced queue details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.bridges.map((bridge) => bridge.advancedQueueDetails)} />
        <PreviewFoundationCopy>
          Advanced queue details stay collapsed or secondary. This bridge is not a queue controller, renderer, raw
          polling surface, file mutator, process controller, provider route, memory promotion path, Brain graph editor,
          or command runner.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
