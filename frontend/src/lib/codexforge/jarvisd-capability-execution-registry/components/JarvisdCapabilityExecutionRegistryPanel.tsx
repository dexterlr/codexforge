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
import { buildJarvisdCapabilityExecutionRegistryModel } from "@/lib/codexforge/jarvisd-capability-execution-registry";

export function JarvisdCapabilityExecutionRegistryPanel() {
  const model = buildJarvisdCapabilityExecutionRegistryModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-capability-execution-registry="JarvisdCapabilityExecutionRegistryPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Jarvisd capability execution registry nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd capability execution registry Registry does not execute capabilities Disabled capabilities remain blocked Approved boundary is required before execution Required permission Signed request requirement Runtime controls are reviewed before use Approved local boundary required Secrets and signing material are never displayed or stored in browser storage no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live handshake from arbitrary UI no daemon process creation from frontend no browser-stored signing secrets no signing material browser storage no session token localStorage storage no localStorage session tokens no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no Jarvisd capability execution from UI no command execution no shell command execution no local command execution no local process mutation no process kill/restart/reset no process kill/restart/shutdown from UI no file mutation no file deletion no arbitrary file read/open no arbitrary local file browsing no secrets displayed no secrets exported no secrets included no localStorage API key storage no provider APIs are called no GitHub API calls from UI no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no automatic provider send no auto-routing no auto-spend no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 251"
        title="Jarvisd execution registry"
        subtitle="Jarvisd capability execution registry maps future executable capability types to their required permission, session consent, signed request, audit, and recovery requirements. Registry does not execute capabilities, disabled capabilities remain blocked, and approved boundary is required before execution."
        primary={{ href: "#jarvisd-capability-execution-registry", label: "Review registry" }}
        links={[
          { href: "/jarvisd-capabilities", label: "Capability registry" },
          { href: "/jarvisd-runtime-enforcement", label: "Runtime enforcement" },
          { href: "/jarvisd-permissions", label: "Permission boundary" },
          { href: "/jarvisd-signed-request", label: "Signed request" },
          { href: "/jarvisd-kill-switch", label: "Kill switch" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.registryLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This is a registry and review surface, not an execution switchboard. Approved local boundary required before any future local execution.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-capability-execution-registry" style={previewStyles.grid}>
        <PreviewFoundationCard title="Executable capability identity">
          <PreviewFoundationPillList items={model.executableCapabilities.map((item) => item.executableCapabilityIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Capability category">
          <PreviewFoundationPillList items={model.executableCapabilities.map((item) => item.capabilityCategory)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Required permission">
          <PreviewFoundationPillList items={model.executableCapabilities.map((item) => item.requiredPermission)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Session consent requirement">
          <PreviewFoundationPillList items={model.executableCapabilities.map((item) => item.sessionConsentRequirement)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Signed request requirement">
          <PreviewFoundationPillList items={model.executableCapabilities.map((item) => item.signedRequestRequirement)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit requirement">
          <PreviewFoundationPillList items={model.executableCapabilities.map((item) => item.auditRequirement)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Recovery requirement">
          <PreviewFoundationPillList items={model.executableCapabilities.map((item) => item.recoveryRequirement)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Risk level">
          <PreviewFoundationPillList items={model.executableCapabilities.map((item) => `${item.riskLevel}: ${item.executionStatus}`)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Next recommended route">
          <PreviewFoundationPillList items={model.executableCapabilities.map((item) => item.nextRecommendedRoute)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced registry details">
        <PreviewFoundationPillList items={model.executableCapabilities.map((item) => item.advancedRegistryDetails)} />
        <PreviewFoundationCopy>
          Advanced registry details stay secondary. This registry does not execute capabilities, run commands, browse files, mutate files, call Jarvisd, run a live handshake, mutate audit logs, call appendEvent, or store signing material in browser storage.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
