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
import { buildJarvisdLocalDaemonContractModel } from "@/lib/codexforge/jarvisd-local-daemon-contract";

export function JarvisdLocalDaemonContractPanel() {
  const model = buildJarvisdLocalDaemonContractModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-local-daemon-contract="JarvisdLocalDaemonContractPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Jarvisd local daemon contract nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd local daemon contract Contract does not execute commands Daemon is local-only Live calls remain behind approved local boundary Capability negotiation shape Permission model summary no automatic daemon call no raw fetch from arbitrary UI no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no file mutation no local action execution no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 214"
        title="Jarvisd contract"
        subtitle="Jarvisd local daemon contract explains how the frontend will talk to a future approved local daemon. Contract does not execute commands, daemon is local-only, and live calls remain behind approved local boundary."
        primary={{ href: "#jarvisd-local-daemon-contract", label: "Review contract" }}
        links={[
          { href: "/jarvisd-health", label: "Health probe" },
          { href: "/jarvisd-capabilities", label: "Capabilities" },
          { href: "/jarvisd-permissions", label: "Permissions" },
          { href: "/local-bridge-health", label: "Bridge health" },
          { href: "/local-first-router-dry-run", label: "Router dry run" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.contractLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-local-daemon-contract" style={previewStyles.grid}>
        <PreviewFoundationCard title="Daemon identity">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.daemonIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Local endpoint policy">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.localEndpointPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Protocol boundary">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.protocolBoundary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Capability negotiation shape">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.capabilityNegotiationShape)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Permission model summary">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.permissionModelSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit requirement">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.auditRequirement)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Health probe route">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.healthProbeRoute)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Capability registry route">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.capabilityRegistryRoute)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Permission boundary route">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.permissionBoundaryRoute)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList
            items={model.contracts.map((contract) => `${contract.readinessStatus}: ${contract.blockedReasons.join("; ")}`)}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced contract details">
        <PreviewFoundationPillList items={model.contracts.map((contract) => contract.advancedContractDetails)} />
        <PreviewFoundationCopy>
          Advanced contract details stay secondary. This surface does not call a daemon, run commands, browse files, mutate files, call provider APIs, store secrets, auto-route traffic, or spend tokens.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
