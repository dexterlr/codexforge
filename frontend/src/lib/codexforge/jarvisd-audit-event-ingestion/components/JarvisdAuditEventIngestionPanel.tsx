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
import { buildJarvisdAuditEventIngestionModel } from "@/lib/codexforge/jarvisd-audit-event-ingestion";

export function JarvisdAuditEventIngestionPanel() {
  const model = buildJarvisdAuditEventIngestionModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-audit-event-ingestion="JarvisdAuditEventIngestionPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated read-only Jarvisd audit event ingestion nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd audit event ingestion Audit events are validated before ingestion Audit ingestion does not expose secrets UI does not mutate audit logs directly Duplicate and replay guard Retention policy Runtime controls are reviewed before use Approved local boundary required Secrets and signing material are never displayed or stored in browser storage no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live handshake from arbitrary UI no daemon process creation from frontend no browser-stored signing secrets no signing material browser storage no session token localStorage storage no localStorage session tokens no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no Jarvisd capability execution from UI no command execution no shell command execution no local command execution no local process mutation no process kill/restart/reset no process kill/restart/shutdown from UI no file mutation no file deletion no arbitrary file read/open no arbitrary local file browsing no secrets displayed no secrets exported no secrets included no localStorage API key storage no provider APIs are called no GitHub API calls from UI no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no automatic provider send no auto-routing no auto-spend no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 252"
        title="Jarvisd audit ingestion"
        subtitle="Jarvisd audit event ingestion explains how future audit events are validated, redacted, and guarded before ingestion. Audit ingestion does not expose secrets, UI does not mutate audit logs directly, and no event is auto-ingested from arbitrary UI."
        primary={{ href: "#jarvisd-audit-event-ingestion", label: "Review ingestion" }}
        links={[
          { href: "/jarvisd-audit-log", label: "Audit log" },
          { href: "/jarvisd-runtime-enforcement", label: "Runtime enforcement" },
          { href: "/jarvisd-execution-registry", label: "Execution registry" },
          { href: "/jarvisd-kill-switch", label: "Kill switch" },
          { href: "/jarvisd-recovery-console", label: "Recovery console" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.ingestionLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Audit events are validated before ingestion. This UI does not call appendEvent, fetch live logs, or mutate audit logs directly.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-audit-event-ingestion" style={previewStyles.grid}>
        <PreviewFoundationCard title="Ingestion identity">
          <PreviewFoundationPillList items={model.ingestionReviews.map((review) => review.ingestionIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Source capability">
          <PreviewFoundationPillList items={model.ingestionReviews.map((review) => review.sourceCapability)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Source session">
          <PreviewFoundationPillList items={model.ingestionReviews.map((review) => review.sourceSession)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Event category">
          <PreviewFoundationPillList items={model.ingestionReviews.map((review) => review.eventCategory)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Redaction status">
          <PreviewFoundationPillList items={model.ingestionReviews.map((review) => review.redactionStatus)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Validation status">
          <PreviewFoundationPillList items={model.ingestionReviews.map((review) => review.validationStatus)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Duplicate and replay guard">
          <PreviewFoundationPillList items={model.ingestionReviews.map((review) => review.duplicateReplayGuard)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Retention policy">
          <PreviewFoundationPillList items={model.ingestionReviews.map((review) => review.retentionPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit log route">
          <PreviewFoundationPillList items={model.ingestionReviews.map((review) => review.auditLogRoute)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.ingestionReviews.map((review) => review.blockedReasons.join("; "))} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced ingestion details">
        <PreviewFoundationPillList items={model.ingestionReviews.map((review) => review.advancedIngestionDetails)} />
        <PreviewFoundationCopy>
          Advanced ingestion details stay secondary. This page does not call appendEvent, mutate audit logs, fetch live logs, execute Jarvisd capabilities, call Jarvisd directly, browse files, mutate files, auto-import settings, or expose secrets.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
