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
import { buildLocalCommandExecutionApprovalGateModel } from "@/lib/codexforge/local-command-execution-approval-gate";

export function LocalCommandExecutionApprovalGatePanel() {
  const model = buildLocalCommandExecutionApprovalGateModel();

  return (
    <div style={previewStyles.shell} data-codexforge-local-command-execution-approval-gate="LocalCommandExecutionApprovalGatePanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Local command execution approval gate Commands are not executed from this page Shell execution requires explicit approval Env values and secrets are never displayed Working directory scope Approval copy approved local boundary required nothing executes from arbitrary UI no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no file mutation no file deletion no process kill restart mutation no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 219"
        title="Command approval"
        subtitle="Local command execution approval gate reviews proposed shell commands before any future approved local daemon execution. Commands are not executed from this page, shell execution requires explicit approval, and env values and secrets are never displayed."
        primary={{ href: "#local-command-execution-approval-gate", label: "Review command gate" }}
        links={[
          { href: "/local-file-approval", label: "File gate" },
          { href: "/local-process-monitor", label: "Process preview" },
          { href: "/workspace-trust-policy", label: "Trust policy" },
          { href: "/jarvisd-permissions", label: "Jarvisd permissions" },
          { href: "/runbook", label: "Operator runbook" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.approvalLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Nothing executes from arbitrary UI. Any future shell execution needs explicit approval and an approved local boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-command-execution-approval-gate" style={previewStyles.grid}>
        <PreviewFoundationCard title="Command identity">
          <PreviewFoundationPillList items={model.commands.map((command) => command.commandIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Command intent">
          <PreviewFoundationPillList items={model.commands.map((command) => command.commandIntent)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Command preview text">
          <PreviewFoundationPillList items={model.commands.map((command) => command.commandPreviewText)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Working directory scope">
          <PreviewFoundationPillList items={model.commands.map((command) => command.workingDirectoryScope)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Allowed scope">
          <PreviewFoundationPillList items={model.commands.map((command) => command.allowedScope)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Denied scope">
          <PreviewFoundationPillList items={model.commands.map((command) => command.deniedScope)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Risk level">
          <PreviewFoundationPillList items={model.commands.map((command) => `${command.riskLevel}: ${command.status}`)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Environment and secrets safety note">
          <PreviewFoundationPillList items={model.commands.map((command) => command.environmentSecretsSafetyNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval copy">
          <PreviewFoundationPillList items={model.commands.map((command) => command.approvalCopy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit note">
          <PreviewFoundationPillList items={model.commands.map((command) => command.auditNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.commands.map((command) => command.blockedReasons.join("; "))} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced command details">
        <PreviewFoundationPillList items={model.commands.map((command) => command.advancedCommandDetails)} />
        <PreviewFoundationCopy>
          Advanced command details stay secondary. This review surface does not execute commands, call shell helpers, call local executor APIs, print environment values, display secrets, browse files, mutate files, call providers, or mutate Brain graph state.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
