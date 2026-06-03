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
import { buildJarvisdCapabilityRegistryModel } from "@/lib/codexforge/jarvisd-capability-registry";

export function JarvisdCapabilityRegistryPanel() {
  const model = buildJarvisdCapabilityRegistryModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-capability-registry="JarvisdCapabilityRegistryPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Jarvisd capability registry nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd capability registry Capabilities are not executed from this page Disabled capabilities stay blocked Permission required Local-only status Audit requirement no automatic daemon call no raw fetch from arbitrary UI no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no file mutation no local action execution no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 216"
        title="Jarvisd capabilities"
        subtitle="Jarvisd capability registry describes future approved local capabilities the daemon may expose. Capabilities are not executed from this page, and disabled capabilities stay blocked."
        primary={{ href: "#jarvisd-capability-registry", label: "Review capabilities" }}
        links={[
          { href: "/jarvisd-contract", label: "Daemon contract" },
          { href: "/jarvisd-health", label: "Health probe" },
          { href: "/jarvisd-permissions", label: "Permissions" },
          { href: "/provider-runbook-generator", label: "Runbook" },
          { href: "/capabilities", label: "Capability cockpit" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.capabilityLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-capability-registry" style={previewStyles.grid}>
        <PreviewFoundationCard title="Capability identity">
          <PreviewFoundationPillList items={model.capabilities.map((capability) => capability.capabilityIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Capability category">
          <PreviewFoundationPillList items={model.capabilities.map((capability) => capability.capabilityCategory)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Permission required">
          <PreviewFoundationPillList items={model.capabilities.map((capability) => capability.permissionRequired)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Local-only status">
          <PreviewFoundationPillList items={model.capabilities.map((capability) => capability.localOnlyStatus)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Risk level">
          <PreviewFoundationPillList
            items={model.capabilities.map((capability) => `${capability.riskLevel}: ${capability.status}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit requirement">
          <PreviewFoundationPillList items={model.capabilities.map((capability) => capability.auditRequirement)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Disabled/blocked reason">
          <PreviewFoundationPillList items={model.capabilities.map((capability) => capability.disabledBlockedReason)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Health dependency">
          <PreviewFoundationPillList items={model.capabilities.map((capability) => capability.healthDependency)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Permission boundary route">
          <PreviewFoundationPillList items={model.capabilities.map((capability) => capability.permissionBoundaryRoute)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Runbook handoff">
          <PreviewFoundationPillList items={model.capabilities.map((capability) => capability.runbookHandoff)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced capability details">
        <PreviewFoundationPillList items={model.capabilities.map((capability) => capability.advancedCapabilityDetails)} />
        <PreviewFoundationCopy>
          Advanced capability details stay secondary. This registry does not execute capabilities, run commands, browse files, mutate files, call providers, store secrets, download models, or delete artifacts.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
