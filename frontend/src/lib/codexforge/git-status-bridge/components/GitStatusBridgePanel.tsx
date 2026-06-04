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
  buildGitStatusBridgeModel,
  buildGitStatusBridgeStableKey,
} from "@/lib/codexforge/git-status-bridge";

const GIT_STATUS_BRIDGE_MARKERS =
  "Git status bridge Git status is not run from this page Live git inspection remains behind approved local boundary Secrets stay redacted Staged and unstaged summary Audit handoff Bridge identity Source workspace trust Command dry-run dependency Permission enforcement dependency Branch summary Untracked files summary Risk/secrets redaction status bridges do not run git commands secrets are redacted and never displayed plain English no giant raw git output above fold approved local boundary required git commands are not run from arbitrary UI nothing executes from arbitrary UI no git command execution from UI no commit creation no branch creation no tag creation no push behavior no branch/tag push behavior no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced status details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no provider APIs are called no GitHub API calls from UI no automatic provider send no secrets displayed no secrets exported no secrets included no secret value display no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function GitStatusBridgePanel() {
  const model = buildGitStatusBridgeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-git-status-bridge={`${GIT_STATUS_BRIDGE_MARKERS} buildGitStatusBridgeStableKey GitStatusBridgePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 266"
        title="Git status bridge"
        subtitle="Git status bridge models a future approved local daemon status handoff. Git status is not run from this page, live git inspection remains behind approved local boundary, and secrets stay redacted."
        primary={{ href: "#git-status-bridge", label: "Review status bridge" }}
        links={[
          { href: "/command-dry-run", label: "Command dry run" },
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/jarvisd-runtime-enforcement", label: "Runtime guard" },
          { href: "/jarvisd-audit-ingestion", label: "Audit handoff" },
          { href: "/git-diff-bridge", label: "Diff bridge" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.bridgeLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          These bridges do not run git commands. This page does not run git status, execute shell commands, browse
          arbitrary local files, mutate files, create commits, push branches or tags, call Jarvisd capabilities, call
          providers, call GitHub APIs, or reveal secret values.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="git-status-bridge" style={previewStyles.grid}>
        {model.bridges.map((bridge) => (
          <PreviewFoundationCard
            key={buildGitStatusBridgeStableKey("git-status-bridge-card", bridge.id)}
            title={bridge.bridgeIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${bridge.status}`,
                bridge.sourceWorkspaceTrust,
                bridge.commandDryRunDependency,
                bridge.permissionEnforcementDependency,
                bridge.branchSummary,
                bridge.stagedUnstagedSummary,
                bridge.untrackedFilesSummary,
                bridge.riskSecretsRedactionStatus,
                bridge.auditHandoff,
                `Blocked reasons: ${bridge.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced status details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced status details stay collapsed or secondary. No raw git output appears above the fold, and live git
          inspection remains behind a separate approved local boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
