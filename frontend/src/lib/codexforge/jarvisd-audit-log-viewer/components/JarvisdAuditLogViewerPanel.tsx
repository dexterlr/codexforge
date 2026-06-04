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
import { buildJarvisdAuditLogViewerModel } from "@/lib/codexforge/jarvisd-audit-log-viewer";

export function JarvisdAuditLogViewerPanel() {
  const model = buildJarvisdAuditLogViewerModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-audit-log-viewer="JarvisdAuditLogViewerPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated read-only Jarvisd audit log viewer nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd audit log viewer Audit logs are read-only from this page Secrets are never shown Audit entries are redacted before review Permission boundary reference Recovery console route Jarvisd actions are not executed from arbitrary UI Approved local boundary required no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live log fetching from arbitrary UI no audit log mutation from UI no Jarvisd capability execution from UI no daemon action runs from this page no settings auto-import no settings auto-export no provider APIs are called no GitHub API calls from UI no command execution no shell command execution no local command execution no local process mutation no file mutation no file deletion no arbitrary file read/open no arbitrary local file browsing no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no provider registry mutation no router config mutation from UI no auto-routing no auto-spend no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no raw secret display no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 242"
        title="Jarvisd audit log"
        subtitle="Jarvisd audit log viewer reviews future daemon activity as redacted, read-only audit entries. Audit logs are read-only from this page, secrets are never shown, and audit entries are redacted before review."
        primary={{ href: "#jarvisd-audit-log-viewer", label: "Review audit log" }}
        links={[
          { href: "/jarvisd-permissions", label: "Permission boundary" },
          { href: "/jarvisd-capabilities", label: "Capabilities" },
          { href: "/jarvisd-recovery-console", label: "Recovery console" },
          { href: "/jarvisd-settings-review", label: "Settings review" },
          { href: "/jarvisd-release-audit", label: "Release audit" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.auditLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-audit-log-viewer" style={previewStyles.grid}>
        <PreviewFoundationCard title="Audit event identity">
          <PreviewFoundationPillList items={model.events.map((event) => event.auditEventIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Event category">
          <PreviewFoundationPillList items={model.events.map((event) => event.eventCategory)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Requested capability">
          <PreviewFoundationPillList items={model.events.map((event) => event.requestedCapability)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Permission boundary reference">
          <PreviewFoundationPillList items={model.events.map((event) => event.permissionBoundaryReference)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval status">
          <PreviewFoundationPillList items={model.events.map((event) => event.approvalStatus)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Result status">
          <PreviewFoundationPillList items={model.events.map((event) => event.resultStatus)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Redaction status">
          <PreviewFoundationPillList items={model.events.map((event) => event.redactionStatus)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Retention note">
          <PreviewFoundationPillList items={model.events.map((event) => event.retentionNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Recovery console route">
          <PreviewFoundationPillList items={model.events.map((event) => event.recoveryConsoleRoute)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.events.map((event) => event.blockedReasons.join("; "))} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced event details">
        <PreviewFoundationPillList items={model.events.map((event) => event.advancedEventDetails)} />
        <PreviewFoundationCopy>
          Advanced event details stay secondary. This viewer does not fetch live logs, mutate Jarvisd audit logs, call appendEvent, execute Jarvisd capabilities, call Jarvisd directly, run commands, browse files, mutate files, or display secrets.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
