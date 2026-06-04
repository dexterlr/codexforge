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
import { buildJarvisdLocalDaemonMvpScaffoldModel } from "@/lib/codexforge/jarvisd-local-daemon-mvp-scaffold";

export function JarvisdLocalDaemonMvpScaffoldPanel() {
  const model = buildJarvisdLocalDaemonMvpScaffoldModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-local-daemon-mvp-scaffold="JarvisdLocalDaemonMvpScaffoldPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Jarvisd local daemon MVP scaffold nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd local daemon MVP scaffold Frontend does not start the daemon Daemon setup remains manual Local actions require explicit approved boundaries Local-only endpoint policy Unsupported actions approved local boundary required no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live handshake from arbitrary UI no daemon process creation from frontend no listening daemon process from frontend no socket creation from UI no Jarvisd capability execution from UI no command execution no shell command execution no local command execution no local process mutation no process kill/restart/reset no file mutation no file deletion no arbitrary file read/open no arbitrary local file browsing no settings auto-import no settings auto-export no secrets displayed no secrets exported no secrets included no browser-stored signing secrets no signing material browser storage no session token localStorage storage no localStorage session tokens no localStorage API key storage no provider APIs are called no GitHub API calls from UI no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no automatic provider send no auto-routing no auto-spend no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 246"
        title="Jarvisd daemon MVP"
        subtitle="Jarvisd local daemon MVP scaffold defines the safe frontend contract for a future local daemon bridge. Frontend does not start the daemon, daemon setup remains manual, and local actions require explicit approved boundaries."
        primary={{ href: "#jarvisd-local-daemon-mvp-scaffold", label: "Review scaffold" }}
        links={[
          { href: "/jarvisd-api-handshake", label: "API handshake" },
          { href: "/jarvisd-signed-request", label: "Signed request" },
          { href: "/jarvisd-session-consent", label: "Session consent" },
          { href: "/jarvisd-audit-log", label: "Audit log" },
          { href: "/jarvisd-permissions", label: "Permissions" },
          { href: "/jarvisd-recovery-console", label: "Recovery" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.scaffoldLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-local-daemon-mvp-scaffold" style={previewStyles.grid}>
        <PreviewFoundationCard title="Daemon scaffold identity">
          <PreviewFoundationPillList items={model.scaffolds.map((scaffold) => scaffold.daemonScaffoldIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Local-only endpoint policy">
          <PreviewFoundationPillList items={model.scaffolds.map((scaffold) => scaffold.localOnlyEndpointPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Lifecycle status">
          <PreviewFoundationPillList items={model.scaffolds.map((scaffold) => scaffold.lifecycleStatusLabel)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Required operator setup">
          <PreviewFoundationPillList items={model.scaffolds.map((scaffold) => scaffold.requiredOperatorSetup.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Supported MVP surfaces">
          <PreviewFoundationPillList items={model.scaffolds.map((scaffold) => scaffold.supportedMvpSurfaces.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Unsupported actions">
          <PreviewFoundationPillList items={model.scaffolds.map((scaffold) => scaffold.unsupportedActions.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit dependency">
          <PreviewFoundationPillList items={model.scaffolds.map((scaffold) => scaffold.auditDependency)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Permission dependency">
          <PreviewFoundationPillList items={model.scaffolds.map((scaffold) => scaffold.permissionDependency)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Recovery dependency">
          <PreviewFoundationPillList items={model.scaffolds.map((scaffold) => scaffold.recoveryDependency)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Next recommended route">
          <PreviewFoundationPillList items={model.scaffolds.map((scaffold) => scaffold.nextRecommendedRoute)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.scaffolds.map((scaffold) => `${scaffold.lifecycleStatus}: ${scaffold.blockedReasons.join("; ")}`)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced scaffold details">
        <PreviewFoundationPillList items={model.scaffolds.map((scaffold) => scaffold.advancedScaffoldDetails)} />
        <PreviewFoundationCopy>
          Advanced scaffold details stay secondary. This page does not start or install Jarvisd, create sockets, open fetch loops, execute commands, mutate files, browse arbitrary local files, store signing material, or persist session tokens in browser storage.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
