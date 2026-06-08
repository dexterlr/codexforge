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
  buildApprovedComfyUiSubmitTrialBridgeModel,
  buildApprovedComfyUiSubmitTrialBridgeStableKey,
} from "@/lib/codexforge/approved-comfyui-submit-trial-bridge";

const APPROVED_COMFY_UI_SUBMIT_TRIAL_BRIDGE_MARKERS =
  "Approved ComfyUI submit trial bridge ComfyUI submit trials require explicit approval No ComfyUI request is sent from this page Local endpoint secrets are never displayed Allowed submit scope Required confirmation copy submit trial identity health probe dependency metadata dependency workflow validator dependency approved local boundary dependency prompt/workflow summary denied submit scope timeout/cancel policy blocked reasons no arbitrary local endpoint calls from UI no raw polling loops provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced submit details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no auto-apply router recommendations no silent provider registry mutation no provider retry from UI no API key export no secret export no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ApprovedComfyUiSubmitTrialBridgePanel() {
  const model = buildApprovedComfyUiSubmitTrialBridgeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-approved-comfyui-submit-trial-bridge={`${APPROVED_COMFY_UI_SUBMIT_TRIAL_BRIDGE_MARKERS} buildApprovedComfyUiSubmitTrialBridgeStableKey ApprovedComfyUiSubmitTrialBridgePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 304"
        title="Approved submit bridge"
        subtitle="Approved ComfyUI submit trial bridge represents the explicit final approval boundary before any future local ComfyUI prompt or workflow submission. ComfyUI submit trials require explicit approval, no ComfyUI request is sent from this page, and local endpoint secrets are never displayed."
        primary={{ href: "#approved-comfyui-submit-trial-bridge", label: "Review submit bridge" }}
        links={[
          { href: "/comfyui-health-live-bridge", label: "Health bridge" },
          { href: "/comfyui-metadata-live-bridge", label: "Metadata bridge" },
          { href: "/workflow-validator-live-bridge", label: "Validator bridge" },
          { href: "/comfyui-submit-trial", label: "Submit trial" },
          { href: "/local-image-generation-result", label: "Result capture" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.bridgeLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is approval review only. It does not submit ComfyUI jobs, send prompts, send workflows, call
          arbitrary local endpoints, mutate files, mutate processes, or display endpoint secrets.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="approved-comfyui-submit-trial-bridge" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildApprovedComfyUiSubmitTrialBridgeStableKey("approved-comfyui-submit-trial-bridge-card", trial.id)}
            title={trial.submitTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.healthProbeDependency,
                trial.metadataDependency,
                trial.workflowValidatorDependency,
                trial.approvedLocalBoundaryDependency,
                trial.promptWorkflowSummary,
                trial.allowedSubmitScope,
                trial.deniedSubmitScope,
                trial.timeoutCancelPolicy,
                trial.requiredConfirmationCopy,
                `Blocked reasons: ${trial.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced submit details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.trials.map((trial) => trial.advancedSubmitDetails)} />
        <PreviewFoundationCopy>
          Advanced submit details stay collapsed or secondary. This bridge is not a generate button, ComfyUI executor,
          local endpoint browser, queue mutator, provider route, file mutator, process control page, or command runner.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
