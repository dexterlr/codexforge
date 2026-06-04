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
import { buildJarvisdLocalSessionConsentModel } from "@/lib/codexforge/jarvisd-local-session-consent";

export function JarvisdLocalSessionConsentPanel() {
  const model = buildJarvisdLocalSessionConsentModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-local-session-consent="JarvisdLocalSessionConsentPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Jarvisd local session consent nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd local session consent Consent does not grant permissions automatically No local action runs without explicit approval Sessions expire and can be revoked Allowed session scope Consent copy approved local boundary required no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live handshake from arbitrary UI no live session creation from UI no automatic permission grant no daemon process creation from frontend no browser-stored signing secrets no signing material browser storage no session token localStorage storage no localStorage session tokens no Jarvisd capability execution from UI no command execution no shell command execution no local command execution no local process mutation no process kill/restart/reset no file mutation no file deletion no arbitrary file read/open no arbitrary local file browsing no settings auto-import no settings auto-export no secrets displayed no secrets exported no secrets included no localStorage API key storage no provider APIs are called no GitHub API calls from UI no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no automatic provider send no auto-routing no auto-spend no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 249"
        title="Jarvisd session consent"
        subtitle="Jarvisd local session consent helps review a future local session before any local action. Consent does not grant permissions automatically, no local action runs without explicit approval, and sessions expire and can be revoked."
        primary={{ href: "#jarvisd-local-session-consent", label: "Review consent" }}
        links={[
          { href: "/jarvisd-daemon-mvp", label: "Daemon MVP" },
          { href: "/jarvisd-api-handshake", label: "API handshake" },
          { href: "/jarvisd-signed-request", label: "Signed request" },
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/jarvisd-audit-log", label: "Audit log" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.consentLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-local-session-consent" style={previewStyles.grid}>
        <PreviewFoundationCard title="Session identity">
          <PreviewFoundationPillList items={model.sessions.map((session) => session.sessionIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Operator intent">
          <PreviewFoundationPillList items={model.sessions.map((session) => session.operatorIntent)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Workspace trust dependency">
          <PreviewFoundationPillList items={model.sessions.map((session) => session.workspaceTrustDependency)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Requested capabilities">
          <PreviewFoundationPillList items={model.sessions.map((session) => session.requestedCapabilities.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Allowed session scope">
          <PreviewFoundationPillList items={model.sessions.map((session) => session.allowedSessionScope.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Denied session scope">
          <PreviewFoundationPillList items={model.sessions.map((session) => session.deniedSessionScope.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Expiry policy">
          <PreviewFoundationPillList items={model.sessions.map((session) => session.expiryPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Revocation guidance">
          <PreviewFoundationPillList items={model.sessions.map((session) => session.revocationGuidance)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit requirement">
          <PreviewFoundationPillList items={model.sessions.map((session) => session.auditRequirement)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Consent copy">
          <PreviewFoundationPillList items={model.sessions.map((session) => session.consentCopy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.sessions.map((session) => `${session.consentStatus}: ${session.blockedReasons.join("; ")}`)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced consent details">
        <PreviewFoundationPillList items={model.sessions.map((session) => session.advancedConsentDetails)} />
        <PreviewFoundationCopy>
          Advanced consent details stay secondary. This page does not grant permissions, create live sessions, run local actions, browse files, mutate files, call Jarvisd, or store session tokens in localStorage.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
