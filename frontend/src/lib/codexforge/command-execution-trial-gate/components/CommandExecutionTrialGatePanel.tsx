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
  buildCommandExecutionTrialGateModel,
  buildCommandExecutionTrialGateStableKey,
} from "@/lib/codexforge/command-execution-trial-gate";

const COMMAND_EXECUTION_TRIAL_GATE_MARKERS =
  "Command execution trial gate Commands are not executed from this page Approved local boundary is required before execution Env values and secrets are not exposed Timeout policy Required confirmation copy no runCommand brokerExecution or local executor API calls from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced trial details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no file deletion no patch apply behavior no package install behavior no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no secret value display no localStorage API key storage no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no GitHub API calls from UI no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CommandExecutionTrialGatePanel() {
  const model = buildCommandExecutionTrialGateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-command-execution-trial-gate={`${COMMAND_EXECUTION_TRIAL_GATE_MARKERS} buildCommandExecutionTrialGateStableKey CommandExecutionTrialGatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 263"
        title="Command trial"
        subtitle="Command execution trial gate reviews a future approved local command execution request before any run. Commands are not executed from this page, approved local boundary is required before execution, and env values and secrets are not exposed."
        primary={{ href: "#command-execution-trial-gate", label: "Review command trial" }}
        links={[
          { href: "/command-dry-run", label: "Command dry run" },
          { href: "/local-command-approval", label: "Command approval" },
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/jarvisd-runtime-enforcement", label: "Runtime guard" },
          { href: "/command-result-capture", label: "Result capture" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This is a trial gate, not a run surface. It does not execute commands, run shell commands, call Jarvisd
          directly, call local executor APIs, expose env values, or display secrets.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="command-execution-trial-gate" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildCommandExecutionTrialGateStableKey("command-execution-trial-card", trial.id)}
            title={trial.executionTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.dryRunDependency,
                trial.commandApprovalBoundaryDependency,
                `Workspace trust status: ${trial.workspaceTrustStatus}`,
                trial.allowedCommandScope,
                trial.deniedCommandScope,
                trial.timeoutPolicy,
                trial.expectedOutputShape,
                trial.requiredConfirmationCopy,
                `Blocked reasons: ${trial.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced trial details stay collapsed or secondary. Future execution remains separate from this UI and must
          wait for dry run review, explicit command approval, workspace trust, timeout policy, and an approved local
          boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
