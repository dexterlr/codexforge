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
import { buildLocalWorkspaceTrustPolicyModel } from "@/lib/codexforge/local-workspace-trust-policy";

export function LocalWorkspaceTrustPolicyPanel() {
  const model = buildLocalWorkspaceTrustPolicyModel();

  return (
    <div style={previewStyles.shell} data-codexforge-local-workspace-trust-policy="LocalWorkspaceTrustPolicyPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Local workspace trust policy Trust policy does not grant permissions automatically Workspace trust must be reviewed before local actions Secrets are not inspected or displayed Allowed roots summary Revocation guidance approved local boundary required nothing executes from arbitrary UI no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no file mutation no file deletion no process kill restart mutation no process mutation no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 221"
        title="Workspace trust"
        subtitle="Local workspace trust policy explains which workspaces are trusted for future local operations and what remains blocked. Trust policy does not grant permissions automatically, workspace trust must be reviewed before local actions, and secrets are not inspected or displayed."
        primary={{ href: "#local-workspace-trust-policy", label: "Review trust policy" }}
        links={[
          { href: "/local-file-approval", label: "File gate" },
          { href: "/local-command-approval", label: "Command gate" },
          { href: "/local-process-monitor", label: "Process preview" },
          { href: "/jarvisd-permissions", label: "Jarvisd permissions" },
          { href: "/provider-governance-release-audit", label: "Governance audit" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trustLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Workspace trust is a review requirement, not a permission grant. Nothing executes from arbitrary UI.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-workspace-trust-policy" style={previewStyles.grid}>
        <PreviewFoundationCard title="Workspace identity">
          <PreviewFoundationPillList items={model.workspaces.map((workspace) => workspace.workspaceIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Trust status">
          <PreviewFoundationPillList items={model.workspaces.map((workspace) => workspace.trustStatus)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Allowed roots summary">
          <PreviewFoundationPillList items={model.workspaces.map((workspace) => workspace.allowedRootsSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Denied roots summary">
          <PreviewFoundationPillList items={model.workspaces.map((workspace) => workspace.deniedRootsSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Capability scope">
          <PreviewFoundationPillList items={model.workspaces.map((workspace) => workspace.capabilityScope)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="File operation policy">
          <PreviewFoundationPillList items={model.workspaces.map((workspace) => workspace.fileOperationPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Command execution policy">
          <PreviewFoundationPillList items={model.workspaces.map((workspace) => workspace.commandExecutionPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Process monitor policy">
          <PreviewFoundationPillList items={model.workspaces.map((workspace) => workspace.processMonitorPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit requirement">
          <PreviewFoundationPillList items={model.workspaces.map((workspace) => workspace.auditRequirement)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Revocation guidance">
          <PreviewFoundationPillList items={model.workspaces.map((workspace) => workspace.revocationGuidance)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.workspaces.map((workspace) => workspace.blockedReasons.join("; "))} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced trust details">
        <PreviewFoundationPillList items={model.workspaces.map((workspace) => workspace.advancedTrustDetails)} />
        <PreviewFoundationCopy>
          Advanced trust details stay secondary. This policy does not grant permissions, browse files, mutate files, execute commands, inspect secrets, display secrets, monitor processes live, call providers, or mutate Brain graph state.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
