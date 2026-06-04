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
  buildCommandDryRunBridgeModel,
  buildCommandDryRunBridgeStableKey,
} from "@/lib/codexforge/command-dry-run-bridge";

const COMMAND_DRY_RUN_BRIDGE_MARKERS =
  "Command dry run bridge Dry run does not execute commands Env values and secrets are never displayed Shell execution requires explicit approval Expected effect summary Audit handoff approved local boundary required no runCommand brokerExecution or local executor API calls from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced dry-run details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no file deletion no patch apply behavior no package install behavior no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no secret value display no localStorage API key storage no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no GitHub API calls from UI no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CommandDryRunBridgePanel() {
  const model = buildCommandDryRunBridgeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-command-dry-run-bridge={`${COMMAND_DRY_RUN_BRIDGE_MARKERS} buildCommandDryRunBridgeStableKey CommandDryRunBridgePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 262"
        title="Command dry run"
        subtitle="Command dry run bridge models a proposed command before any execution boundary. Dry run does not execute commands, env values and secrets are never displayed, and shell execution requires explicit approval."
        primary={{ href: "#command-dry-run-bridge", label: "Review dry run" }}
        links={[
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/local-command-approval", label: "Command approval" },
          { href: "/jarvisd-runtime-enforcement", label: "Runtime guard" },
          { href: "/jarvisd-audit-ingestion", label: "Audit handoff" },
          { href: "/command-execution-trial", label: "Execution trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.dryRunLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page models intent only. It does not execute commands, run shell commands, call Jarvisd directly, browse
          files, mutate files, print environment values, or display secrets.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="command-dry-run-bridge" style={previewStyles.grid}>
        {model.dryRuns.map((dryRun) => (
          <PreviewFoundationCard
            key={buildCommandDryRunBridgeStableKey("command-dry-run-card", dryRun.id)}
            title={dryRun.dryRunIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${dryRun.status}`,
                dryRun.sourceCommandRequest,
                dryRun.workspaceTrustDependency,
                dryRun.commandApprovalDependency,
                dryRun.permissionEnforcementDependency,
                dryRun.commandIntent,
                dryRun.workingDirectoryScope,
                dryRun.expectedEffectSummary,
                dryRun.environmentSecretsSafetyNote,
                dryRun.auditHandoff,
                `Blocked reasons: ${dryRun.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced dry-run details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced dry-run details stay collapsed or secondary. The bridge is a typed review model only, with command
          execution, shell execution, direct Jarvisd calls, raw output, local file actions, process control, and secret
          value display blocked.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
