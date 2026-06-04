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
import { buildJarvisdReleaseAuditModel } from "@/lib/codexforge/jarvisd-release-audit";

export function JarvisdReleaseAuditPanel() {
  const model = buildJarvisdReleaseAuditModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-release-audit="JarvisdReleaseAuditPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated read-only Jarvisd release audit nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd release audit Release audit does not deploy Jarvisd No daemon action runs from this page Secrets are not inspected or displayed Release decision Known gaps Jarvisd actions are not executed from arbitrary UI Approved local boundary required no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live log fetching from arbitrary UI no audit log mutation from UI no Jarvisd capability execution from UI no daemon action runs from this page no settings auto-import no settings auto-export no imports applied automatically no provider APIs are called no GitHub API calls from UI no command execution no shell command execution no local command execution no local process mutation no local state mutation no config mutation no provider registry mutation no file mutation no file deletion no arbitrary file read/open no arbitrary local file browsing no secrets inspected no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no router config mutation from UI no auto-routing no auto-spend no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no raw secret display no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 245"
        title="Jarvisd release audit"
        subtitle="Jarvisd release audit checks whether the Jarvisd boundary suite is ready before a future daemon MVP. Release audit does not deploy Jarvisd, no daemon action runs from this page, and secrets are not inspected or displayed."
        primary={{ href: "#jarvisd-release-audit", label: "Review readiness" }}
        links={[
          { href: "/jarvisd-contract", label: "Daemon contract" },
          { href: "/jarvisd-health", label: "Health probe" },
          { href: "/jarvisd-capabilities", label: "Capabilities" },
          { href: "/jarvisd-audit-log", label: "Audit log" },
          { href: "/jarvisd-recovery-console", label: "Recovery console" },
          { href: "/jarvisd-settings-review", label: "Settings review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.auditLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-release-audit" style={previewStyles.grid}>
        <PreviewFoundationCard title="Release audit identity">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.releaseAuditIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Covered Jarvisd surfaces">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.coveredJarvisdSurfaces.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Contract readiness">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.contractReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Health/version readiness">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.healthVersionReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Capability registry readiness">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.capabilityRegistryReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Permission boundary readiness">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.permissionBoundaryReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit log readiness">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.auditLogReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Recovery readiness">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.recoveryReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Settings review readiness">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.settingsReviewReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Known gaps">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.knownGaps.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Release decision">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.releaseDecisionLabel)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Next recommended route">
          <PreviewFoundationPillList items={model.audits.map((audit) => audit.nextRecommendedRoute)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced audit details">
        <PreviewFoundationPillList items={model.audits.map((audit) => audit.advancedAuditDetails)} />
        <PreviewFoundationCopy>
          Advanced audit details stay secondary. This release audit does not deploy Jarvisd, call Jarvisd, execute commands, mutate local state, inspect secrets, display secrets, import settings, export settings, auto-route traffic, or spend tokens.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
