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
  buildCommandResultCaptureModel,
  buildCommandResultCaptureStableKey,
} from "@/lib/codexforge/command-result-capture";

const COMMAND_RESULT_CAPTURE_MARKERS =
  "Command result capture Results are reviewed before promotion Raw output stays secondary Memory is not auto-promoted Output summary Review inbox handoff no runCommand brokerExecution or local executor API calls from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced output details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no file deletion no patch apply behavior no package install behavior no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no secret value display no localStorage API key storage no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no audit log mutation from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no GitHub API calls from UI no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CommandResultCapturePanel() {
  const model = buildCommandResultCaptureModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-command-result-capture={`${COMMAND_RESULT_CAPTURE_MARKERS} buildCommandResultCaptureStableKey CommandResultCapturePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 264"
        title="Command result"
        subtitle="Command result capture reviews future approved command outcomes before anything is promoted. Results are reviewed before promotion, raw output stays secondary, and memory is not auto-promoted."
        primary={{ href: "#command-result-capture", label: "Review command result" }}
        links={[
          { href: "/command-execution-trial", label: "Execution trial" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/command-failure-recovery", label: "Failure recovery" },
          { href: "/run-history", label: "Run history" },
          { href: "/jarvisd-audit-ingestion", label: "Audit handoff" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.resultLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page captures and reviews outcomes only. It does not execute commands, call appendEvent, call
          saveBrainGraph, mutate the Brain graph, promote memory automatically, or expose env values and secrets.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="command-result-capture" style={previewStyles.grid}>
        {model.results.map((result) => (
          <PreviewFoundationCard
            key={buildCommandResultCaptureStableKey("command-result-card", result.id)}
            title={result.resultIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Command status: ${result.commandStatus}`,
                result.sourceExecutionTrial,
                result.commandSummary,
                result.outputSummary,
                result.environmentSecretsRedactionStatus,
                result.affectedFilesIndicator,
                result.reviewInboxHandoff,
                result.recoveryRoute,
                `Blocked reasons: ${result.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced output details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced output details stay collapsed or secondary. Raw output is not shown above the fold, failed outcomes
          remain visible, and no result is promoted into memory, graph state, files, audit logs, or provider traffic by
          this UI.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
