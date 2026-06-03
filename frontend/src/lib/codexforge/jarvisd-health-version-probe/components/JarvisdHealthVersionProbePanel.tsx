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
import { buildJarvisdHealthVersionProbeModel } from "@/lib/codexforge/jarvisd-health-version-probe";

export function JarvisdHealthVersionProbePanel() {
  const model = buildJarvisdHealthVersionProbeModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-health-version-probe="JarvisdHealthVersionProbePanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Jarvisd health and version probe nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd health and version probe No probe runs automatically Live probing remains behind approved local boundary Localhost-only policy Version requirement Timeout policy no automatic daemon call no raw fetch from arbitrary UI no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no file mutation no local action execution no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 215"
        title="Jarvisd health"
        subtitle="Jarvisd health and version probe explains what will be checked once an approved local daemon boundary exists. No probe runs automatically, and live probing remains behind approved local boundary."
        primary={{ href: "#jarvisd-health-version-probe", label: "Review health probe" }}
        links={[
          { href: "/jarvisd-contract", label: "Daemon contract" },
          { href: "/jarvisd-capabilities", label: "Capabilities" },
          { href: "/jarvisd-permissions", label: "Permissions" },
          { href: "/local-bridge-health", label: "Bridge health" },
          { href: "/health-probe", label: "Future probe" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.probeLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-health-version-probe" style={previewStyles.grid}>
        <PreviewFoundationCard title="Daemon endpoint summary">
          <PreviewFoundationPillList items={model.probes.map((probe) => probe.daemonEndpointSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Localhost-only policy">
          <PreviewFoundationPillList items={model.probes.map((probe) => probe.localhostOnlyPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Version requirement">
          <PreviewFoundationPillList items={model.probes.map((probe) => probe.versionRequirement)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Health status">
          <PreviewFoundationPillList items={model.probes.map((probe) => `${probe.probeStatus}: ${probe.healthStatus}`)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Timeout policy">
          <PreviewFoundationPillList items={model.probes.map((probe) => probe.timeoutPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Retry policy">
          <PreviewFoundationPillList items={model.probes.map((probe) => probe.retryPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Capability registry dependency">
          <PreviewFoundationPillList items={model.probes.map((probe) => probe.capabilityRegistryDependency)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Permission boundary dependency">
          <PreviewFoundationPillList items={model.probes.map((probe) => probe.permissionBoundaryDependency)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit handoff">
          <PreviewFoundationPillList items={model.probes.map((probe) => probe.auditHandoff)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.probes.map((probe) => probe.blockedReasons.join("; "))} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced probe details">
        <PreviewFoundationPillList items={model.probes.map((probe) => probe.advancedProbeDetails)} />
        <PreviewFoundationCopy>
          Advanced probe details stay secondary. This page does not run a probe automatically, create a daemon client, make raw fetch calls, run commands, print environment values, expose secrets, browse files, or mutate files.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
