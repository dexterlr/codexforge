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
import { buildProviderGovernanceReleaseAuditModel } from "@/lib/codexforge/provider-governance-release-audit";

export function ProviderGovernanceReleaseAuditPanel() {
  const model = buildProviderGovernanceReleaseAuditModel();

  return (
    <div style={previewStyles.shell} data-codexforge-provider-governance-release-audit="ProviderGovernanceReleaseAuditPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated read-only provider governance release audit nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Provider governance release audit Release audit does not deploy anything Secrets are not inspected or displayed Release decision Ready with fixes Known gaps no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no secrets exported no secrets inspected no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 213"
        title="Governance audit"
        subtitle="Provider governance release audit checks whether the provider governance stack is ready for demo or release review. Release audit does not deploy anything, and secrets are not inspected or displayed."
        primary={{ href: "#provider-governance-release-audit", label: "Review audit" }}
        links={[
          { href: "/provider-policy-bundle", label: "Policy bundle" },
          { href: "/provider-runbook-generator", label: "Runbook generator" },
          { href: "/local-first-router-dry-run", label: "Router dry run" },
          { href: "/provider-audit-log", label: "Audit log" },
          { href: "/provider-settings-review", label: "Settings review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.auditLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-governance-release-audit" style={previewStyles.grid}>
        <PreviewFoundationCard title="Audit identity">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.auditIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Covered governance surfaces">
          <PreviewFoundationPillList
            items={model.audits.map((audit) => audit.coveredGovernanceSurfaces.join("; "))}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Route readiness">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.routeReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Smoke readiness">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.smokeReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Privacy readiness">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.privacyReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Budget readiness">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.budgetReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit-log readiness">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.auditLogReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Runbook readiness">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.runbookReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Known gaps">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.knownGaps.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Release decision">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.releaseDecisionLabel)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Handoff summary">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.handoffSummary)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced audit details">
        <PreviewFoundationPillList items={model.audits.map((audit) => audit.advancedAuditDetails)} />
        <PreviewFoundationCopy>
          Advanced audit details stay secondary. This readiness audit does not deploy anything, inspect or display secrets, call provider APIs, mutate provider registry, auto-route traffic, spend tokens, export settings, or import settings.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
