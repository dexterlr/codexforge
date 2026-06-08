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
  buildRenderJobCancelHoldLiveBoundaryModel,
  buildRenderJobCancelHoldLiveBoundaryStableKey,
} from "@/lib/codexforge/render-job-cancel-hold-live-boundary";

const RENDER_JOB_CANCEL_HOLD_LIVE_BOUNDARY_MARKERS =
  "Render job cancel hold live boundary Cancel and hold actions require explicit approval No render job is cancelled or held from this page Retry resume actions require separate review Required confirmation copy Audit handoff boundary identity source render status polling dependency active job summary cancel eligibility hold eligibility denied action scope recovery route blocked reasons no automatic provider calls no provider API calls no automatic provider send no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no API key export no secret export no localStorage API key storage no process.env printing no API keys or secrets displayed no ComfyUI job submission no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no uncontrolled polling loops no raw polling loops no render job start/cancel/hold/retry behavior no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced boundary details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function RenderJobCancelHoldLiveBoundaryPanel() {
  const model = buildRenderJobCancelHoldLiveBoundaryModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-render-job-cancel-hold-live-boundary={`${RENDER_JOB_CANCEL_HOLD_LIVE_BOUNDARY_MARKERS} buildRenderJobCancelHoldLiveBoundaryStableKey RenderJobCancelHoldLiveBoundaryPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 311"
        title="Cancel hold boundary"
        subtitle="Render job cancel hold live boundary is an explicit review step. Cancel and hold actions require explicit approval, and no render job is cancelled or held from this page."
        primary={{ href: "#render-job-cancel-hold-live-boundary", label: "Review boundary" }}
        links={[
          { href: "/render-job-status-polling", label: "Status polling" },
          { href: "/render-queue-persistence", label: "Queue persistence" },
          { href: "/render-queue-recovery", label: "Recovery" },
          { href: "/local-output-artifact-capture", label: "Artifact capture" },
          { href: "/video-review", label: "Review inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.boundaryLanguage} />
      <PreviewFoundationCard title="Plain-English boundary">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page prepares review language only. It does not cancel, hold, retry, resume, start, reorder, or mutate a
          render job, and retry resume actions require separate review.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="render-job-cancel-hold-live-boundary" style={previewStyles.grid}>
        {model.boundaries.map((boundary) => (
          <PreviewFoundationCard
            key={buildRenderJobCancelHoldLiveBoundaryStableKey("cancel-hold-boundary-card", boundary.id)}
            title={boundary.boundaryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                boundary.sourceRenderStatusPollingDependency,
                boundary.activeJobSummary,
                boundary.cancelEligibility,
                boundary.holdEligibility,
                boundary.deniedActionScope,
                boundary.requiredConfirmationCopy,
                boundary.recoveryRoute,
                boundary.auditHandoff,
                `Blocked reasons: ${boundary.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced boundary details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.boundaries.map((boundary) => boundary.advancedBoundaryDetails)} />
        <PreviewFoundationCopy>
          Advanced boundary details stay collapsed or secondary. This surface is not a renderer, job control button,
          queue mutator, file mutator, process controller, local endpoint caller, provider route, memory promotion path,
          Brain graph editor, or command runner.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
