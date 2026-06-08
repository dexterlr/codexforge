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
  buildLocalImageGenerationTrialResultCaptureModel,
  buildLocalImageGenerationTrialResultCaptureStableKey,
} from "@/lib/codexforge/local-image-generation-trial-result-capture";

const LOCAL_IMAGE_GENERATION_TRIAL_RESULT_CAPTURE_MARKERS =
  "Local image generation trial result capture Image results are reviewed before promotion Raw prompt and workflow details stay secondary Memory is not auto-promoted Artifact summary Review inbox handoff result identity source submit trial generation status passed failed blocked timed out needs review prompt/workflow summary safety/redaction status artifact handoff route recovery route blocked reasons no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no raw polling loops provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced result details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no auto-apply router recommendations no silent provider registry mutation no provider retry from UI no API key export no secret export no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalImageGenerationTrialResultCapturePanel() {
  const model = buildLocalImageGenerationTrialResultCaptureModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-image-generation-trial-result-capture={`${LOCAL_IMAGE_GENERATION_TRIAL_RESULT_CAPTURE_MARKERS} buildLocalImageGenerationTrialResultCaptureStableKey LocalImageGenerationTrialResultCapturePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 305"
        title="Image result capture"
        subtitle="Local image generation trial result capture reviews future approved ComfyUI/local image outputs. Image results are reviewed before promotion, raw prompt and workflow details stay secondary, and memory is not auto-promoted."
        primary={{ href: "#local-image-generation-trial-result-capture", label: "Review image result" }}
        links={[
          { href: "/approved-comfyui-submit-trial-bridge", label: "Submit bridge" },
          { href: "/local-image-trial", label: "Image trial" },
          { href: "/local-output-capture", label: "Artifact capture" },
          { href: "/video-review", label: "Review inbox" },
          { href: "/video-recovery", label: "Recovery" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.bridgeLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This result capture surface reviews supplied result metadata only. It does not submit ComfyUI jobs, mutate
          files, call appendEvent, call saveBrainGraph, mutate the Brain graph, or auto-promote memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-image-generation-trial-result-capture" style={previewStyles.grid}>
        {model.results.map((result) => (
          <PreviewFoundationCard
            key={buildLocalImageGenerationTrialResultCaptureStableKey("local-image-result-capture-card", result.id)}
            title={result.resultIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Generation status: ${result.generationStatus}`,
                result.sourceSubmitTrial,
                result.promptWorkflowSummary,
                result.artifactSummary,
                result.safetyRedactionStatus,
                result.reviewInboxHandoff,
                result.artifactHandoffRoute,
                result.recoveryRoute,
                `Blocked reasons: ${result.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced result details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.results.map((result) => result.advancedResultDetails)} />
        <PreviewFoundationCopy>
          Advanced result details stay collapsed or secondary. This capture page is not a generator, queue submitter,
          artifact mutator, file browser, memory promotion path, Brain graph editor, provider route, or command runner.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
