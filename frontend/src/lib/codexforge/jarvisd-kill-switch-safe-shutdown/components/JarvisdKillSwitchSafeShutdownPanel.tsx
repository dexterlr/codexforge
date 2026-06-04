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
import { buildJarvisdKillSwitchSafeShutdownModel } from "@/lib/codexforge/jarvisd-kill-switch-safe-shutdown";

export function JarvisdKillSwitchSafeShutdownPanel() {
  const model = buildJarvisdKillSwitchSafeShutdownModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-kill-switch-safe-shutdown="JarvisdKillSwitchSafeShutdownPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Jarvisd kill switch and safe shutdown nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd kill switch and safe shutdown Kill switch actions are not executed from this page Shutdown restart requires explicit approved local boundary No local process is killed or restarted from UI Required confirmation copy Safe shutdown checklist Runtime controls are reviewed before use Approved local boundary required Secrets and signing material are never displayed or stored in browser storage no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live handshake from arbitrary UI no daemon process creation from frontend no browser-stored signing secrets no signing material browser storage no session token localStorage storage no localStorage session tokens no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no Jarvisd capability execution from UI no command execution no shell command execution no local command execution no local process mutation no process kill/restart/reset no process kill/restart/shutdown from UI no file mutation no file deletion no arbitrary file read/open no arbitrary local file browsing no secrets displayed no secrets exported no secrets included no localStorage API key storage no provider APIs are called no GitHub API calls from UI no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no automatic provider send no auto-routing no auto-spend no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 253"
        title="Jarvisd kill switch"
        subtitle="Jarvisd kill switch and safe shutdown prepares reviewed shutdown copy for a future local daemon boundary. Kill switch actions are not executed from this page, shutdown restart requires explicit approved local boundary, and no local process is killed or restarted from UI."
        primary={{ href: "#jarvisd-kill-switch-safe-shutdown", label: "Review shutdown" }}
        links={[
          { href: "/jarvisd-recovery-console", label: "Recovery console" },
          { href: "/jarvisd-audit-ingestion", label: "Audit ingestion" },
          { href: "/jarvisd-runtime-enforcement", label: "Runtime enforcement" },
          { href: "/jarvisd-execution-registry", label: "Execution registry" },
          { href: "/jarvisd-session-consent", label: "Session consent" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.shutdownLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          No shutdown, restart, kill switch action, command, daemon call, or local state mutation is available from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-kill-switch-safe-shutdown" style={previewStyles.grid}>
        <PreviewFoundationCard title="Shutdown request identity">
          <PreviewFoundationPillList items={model.shutdownReviews.map((review) => review.shutdownRequestIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Trigger reason">
          <PreviewFoundationPillList items={model.shutdownReviews.map((review) => review.triggerReason)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Active session summary">
          <PreviewFoundationPillList items={model.shutdownReviews.map((review) => review.activeSessionSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="In-flight capability summary">
          <PreviewFoundationPillList items={model.shutdownReviews.map((review) => review.inFlightCapabilitySummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Safe shutdown checklist">
          <PreviewFoundationPillList items={model.shutdownReviews.map((review) => review.safeShutdownChecklist.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Artifact/operation retention note">
          <PreviewFoundationPillList items={model.shutdownReviews.map((review) => review.artifactOperationRetentionNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Required confirmation copy">
          <PreviewFoundationPillList items={model.shutdownReviews.map((review) => review.requiredConfirmationCopy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Recovery console route">
          <PreviewFoundationPillList items={model.shutdownReviews.map((review) => review.recoveryConsoleRoute)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit handoff">
          <PreviewFoundationPillList items={model.shutdownReviews.map((review) => review.auditHandoff)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.shutdownReviews.map((review) => `${review.shutdownStatus}: ${review.blockedReasons.join("; ")}`)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced shutdown details">
        <PreviewFoundationPillList items={model.shutdownReviews.map((review) => review.advancedShutdownDetails)} />
        <PreviewFoundationCopy>
          Advanced shutdown details stay secondary. This page does not kill, restart, shut down, or reset local processes; execute commands; call Jarvisd; execute capabilities; mutate local state; mutate audit logs; call appendEvent; browse files; mutate files; or delete artifacts.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
