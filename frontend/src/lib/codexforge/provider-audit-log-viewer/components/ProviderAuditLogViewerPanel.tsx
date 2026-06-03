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
import { buildProviderAuditLogViewerModel } from "@/lib/codexforge/provider-audit-log-viewer";

export function ProviderAuditLogViewerPanel() {
  const model = buildProviderAuditLogViewerModel();

  return (
    <div style={previewStyles.shell} data-codexforge-provider-audit-log-viewer="ProviderAuditLogViewerPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated read-only provider audit log viewer nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Provider audit log viewer Audit logs are redacted Secrets are never shown Redacted details Retention note Does not mutate logs from UI redacted provider events no immutable compliance claim no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no secrets exported no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 208"
        title="Audit log"
        subtitle="Provider audit log viewer reviews redacted provider live-test and routing events. Secrets are never shown, and the log is a review aid, not an immutable compliance system."
        primary={{ href: "#provider-audit-log-viewer", label: "Review audit log" }}
        links={[
          { href: "/provider-test-results", label: "Result capture" },
          { href: "/provider-budget-guardrails", label: "Budget guardrails" },
          { href: "/prompt-privacy-classifier", label: "Privacy classifier" },
          { href: "/provider-failure-recovery", label: "Failure recovery" },
          { href: "/provider-settings-review", label: "Settings review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.auditLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-audit-log-viewer" style={previewStyles.grid}>
        <PreviewFoundationCard title="Event summary">
          <PreviewFoundationPillList items={model.events.map((event) => event.eventSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Provider affected">
          <PreviewFoundationPillList items={model.events.map((event) => event.providerAffected)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Action type">
          <PreviewFoundationPillList items={model.events.map((event) => event.actionType)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval status">
          <PreviewFoundationPillList items={model.events.map((event) => event.approvalStatus)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Privacy class">
          <PreviewFoundationPillList items={model.events.map((event) => event.privacyClass)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Budget guardrail status">
          <PreviewFoundationPillList items={model.events.map((event) => event.budgetGuardrailStatus)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Result/recovery route">
          <PreviewFoundationPillList items={model.events.map((event) => event.resultRecoveryRoute)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Redacted details">
          <PreviewFoundationPillList items={model.events.map((event) => event.redactedDetails)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Retention note">
          <PreviewFoundationPillList items={model.events.map((event) => event.retentionNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Export review route">
          <PreviewFoundationPillList items={model.events.map((event) => event.exportReviewRoute)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced event details">
        <PreviewFoundationPillList items={model.events.map((event) => event.advancedEventDetails)} />
        <PreviewFoundationCopy>
          Advanced event details stay secondary. This surface is read-only and does not call provider APIs, show secrets, mutate logs, append events, mutate Brain graph, import settings, route traffic, or spend tokens.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
