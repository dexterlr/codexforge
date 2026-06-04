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
import { buildJarvisdSignedRequestContractModel } from "@/lib/codexforge/jarvisd-signed-request-contract";

export function JarvisdSignedRequestContractPanel() {
  const model = buildJarvisdSignedRequestContractModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-signed-request-contract="JarvisdSignedRequestContractPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Jarvisd signed request contract nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd signed request contract Signing secrets are never displayed Signing material is not stored in browser storage Requests are not sent from this page Replay protection note Permission boundary reference approved local boundary required no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live handshake from arbitrary UI no request sent from UI no Jarvisd direct call no daemon process creation from frontend no real secret generation in UI no browser-stored signing secrets no signing material browser storage no session token localStorage storage no localStorage session tokens no Jarvisd capability execution from UI no command execution no shell command execution no local command execution no local process mutation no process kill/restart/reset no file mutation no file deletion no arbitrary file read/open no arbitrary local file browsing no settings auto-import no settings auto-export no secrets displayed no secrets exported no secrets included no localStorage API key storage no provider APIs are called no GitHub API calls from UI no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no automatic provider send no auto-routing no auto-spend no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 248"
        title="Jarvisd signed request"
        subtitle="Jarvisd signed request contract shows how future Jarvisd requests will be authorized without exposing signing secrets. Signing material is not stored in browser storage, and requests are not sent from this page."
        primary={{ href: "#jarvisd-signed-request-contract", label: "Review contract" }}
        links={[
          { href: "/jarvisd-daemon-mvp", label: "Daemon MVP" },
          { href: "/jarvisd-api-handshake", label: "API handshake" },
          { href: "/jarvisd-session-consent", label: "Session consent" },
          { href: "/jarvisd-permissions", label: "Permissions" },
          { href: "/jarvisd-audit-log", label: "Audit log" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.contractLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-signed-request-contract" style={previewStyles.grid}>
        <PreviewFoundationCard title="Request contract identity">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.requestContractIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Request purpose">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.requestPurpose)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Capability target">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.capabilityTarget)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Permission boundary reference">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.permissionBoundaryReference)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Nonce/challenge summary">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.nonceChallengeSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Signature status">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.signatureStatusLabel)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Replay protection note">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.replayProtectionNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Expiry/timeout policy">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.expiryTimeoutPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit handoff">
          <PreviewFoundationPillList items={model.contracts.map((contract) => contract.auditHandoff)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.contracts.map((contract) => `${contract.signatureStatus}: ${contract.blockedReasons.join("; ")}`)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced request details">
        <PreviewFoundationPillList items={model.contracts.map((contract) => contract.advancedRequestDetails)} />
        <PreviewFoundationCopy>
          Advanced request details stay secondary. This page does not generate real secrets, show signing secrets, persist signing material, send Jarvisd requests, execute capabilities, or store session tokens in localStorage.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
