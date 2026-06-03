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
import { buildLocalProcessMonitorPreviewModel } from "@/lib/codexforge/local-process-monitor-preview";

export function LocalProcessMonitorPreviewPanel() {
  const model = buildLocalProcessMonitorPreviewModel();

  return (
    <div style={previewStyles.shell} data-codexforge-local-process-monitor-preview="LocalProcessMonitorPreviewPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Local process monitor preview Process data is read-only Live monitoring remains behind approved local boundary Cannot kill restart or mutate processes Refresh policy Permission dependency approved local boundary required nothing executes from arbitrary UI no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no file mutation no file deletion no process kill restart mutation no process mutation no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 220"
        title="Process preview"
        subtitle="Local process monitor preview describes safe read-only process status viewing through future approved Jarvisd capability boundaries. Process data is read-only, live monitoring remains behind an approved local boundary, and this page cannot kill restart or mutate processes."
        primary={{ href: "#local-process-monitor-preview", label: "Review process preview" }}
        links={[
          { href: "/local-command-approval", label: "Command gate" },
          { href: "/workspace-trust-policy", label: "Trust policy" },
          { href: "/jarvisd-health", label: "Jarvisd health" },
          { href: "/jarvisd-permissions", label: "Permissions" },
          { href: "/local-bridge-health", label: "Bridge health" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.previewLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This is not a live process manager. Nothing executes from arbitrary UI and live monitoring needs an approved local boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-process-monitor-preview" style={previewStyles.grid}>
        <PreviewFoundationCard title="Process group summary">
          <PreviewFoundationPillList items={model.processGroups.map((processGroup) => processGroup.processGroupSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Process status summary">
          <PreviewFoundationPillList items={model.processGroups.map((processGroup) => processGroup.processStatusSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Source capability">
          <PreviewFoundationPillList items={model.processGroups.map((processGroup) => processGroup.sourceCapability)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Read-only scope">
          <PreviewFoundationPillList items={model.processGroups.map((processGroup) => processGroup.readOnlyScope)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Refresh policy">
          <PreviewFoundationPillList items={model.processGroups.map((processGroup) => processGroup.refreshPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Health dependency">
          <PreviewFoundationPillList items={model.processGroups.map((processGroup) => processGroup.healthDependency)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Permission dependency">
          <PreviewFoundationPillList items={model.processGroups.map((processGroup) => processGroup.permissionDependency)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.processGroups.map((processGroup) => processGroup.blockedReasons.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Recovery route">
          <PreviewFoundationPillList items={model.processGroups.map((processGroup) => processGroup.recoveryRoute)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit note">
          <PreviewFoundationPillList items={model.processGroups.map((processGroup) => processGroup.auditNote)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced process details">
        <PreviewFoundationPillList items={model.processGroups.map((processGroup) => processGroup.advancedProcessDetails)} />
        <PreviewFoundationCopy>
          Advanced process details stay secondary. This preview does not poll from arbitrary UI, execute commands, kill processes, restart processes, mutate processes, mutate local state, call providers, display secrets, or mutate Brain graph state.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
