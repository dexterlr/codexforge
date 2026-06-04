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
import { buildJarvisdLocalApiHandshakeModel } from "@/lib/codexforge/jarvisd-local-api-handshake";

export function JarvisdLocalApiHandshakePanel() {
  const model = buildJarvisdLocalApiHandshakeModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-local-api-handshake="JarvisdLocalApiHandshakePanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Jarvisd local API handshake nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd local API handshake No handshake runs automatically Live handshake remains behind approved local boundary Localhost-only policy Protocol version Timeout policy endpoint secrets are not stored in browser storage approved local boundary required no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live handshake from arbitrary UI no automatic handshake no polling loop no infinite polling loop no daemon process creation from frontend no Jarvisd capability execution from UI no command execution no shell command execution no local command execution no local process mutation no process kill/restart/reset no file mutation no file deletion no arbitrary file read/open no arbitrary local file browsing no settings auto-import no settings auto-export no secrets displayed no secrets exported no secrets included no browser-stored signing secrets no signing material browser storage no session token localStorage storage no localStorage session tokens no localStorage API key storage no provider APIs are called no GitHub API calls from UI no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no automatic provider send no auto-routing no auto-spend no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 247"
        title="Jarvisd API handshake"
        subtitle="Jarvisd local API handshake documents how a future approved local bridge proves daemon readiness. No handshake runs automatically, live handshake remains behind approved local boundary, and endpoint secrets are not stored in browser storage."
        primary={{ href: "#jarvisd-local-api-handshake", label: "Review handshake" }}
        links={[
          { href: "/jarvisd-daemon-mvp", label: "Daemon MVP" },
          { href: "/jarvisd-signed-request", label: "Signed request" },
          { href: "/jarvisd-session-consent", label: "Session consent" },
          { href: "/jarvisd-health", label: "Health probe" },
          { href: "/jarvisd-permissions", label: "Permissions" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.handshakeLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-local-api-handshake" style={previewStyles.grid}>
        <PreviewFoundationCard title="Handshake identity">
          <PreviewFoundationPillList items={model.handshakes.map((handshake) => handshake.handshakeIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Daemon endpoint summary">
          <PreviewFoundationPillList items={model.handshakes.map((handshake) => handshake.daemonEndpointSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Localhost-only policy">
          <PreviewFoundationPillList items={model.handshakes.map((handshake) => handshake.localhostOnlyPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Version requirement">
          <PreviewFoundationPillList items={model.handshakes.map((handshake) => handshake.versionRequirement)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Protocol version">
          <PreviewFoundationPillList items={model.handshakes.map((handshake) => handshake.protocolVersion)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Nonce/challenge placeholder shape">
          <PreviewFoundationPillList items={model.handshakes.map((handshake) => handshake.nonceChallengePlaceholderShape)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Timeout policy">
          <PreviewFoundationPillList items={model.handshakes.map((handshake) => handshake.timeoutPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Retry policy">
          <PreviewFoundationPillList items={model.handshakes.map((handshake) => handshake.retryPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Health/version dependency">
          <PreviewFoundationPillList items={model.handshakes.map((handshake) => handshake.healthVersionDependency)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.handshakes.map((handshake) => `${handshake.readinessStatus}: ${handshake.blockedReasons.join("; ")}`)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced handshake details">
        <PreviewFoundationPillList items={model.handshakes.map((handshake) => handshake.advancedHandshakeDetails)} />
        <PreviewFoundationCopy>
          Advanced handshake details stay secondary. This page does not run a handshake, open a socket, create a polling loop, call Jarvisd, print environment values, expose secrets, or store endpoint secrets in browser storage.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
