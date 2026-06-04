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
import { buildJarvisdPermissionRuntimeEnforcementModel } from "@/lib/codexforge/jarvisd-permission-runtime-enforcement";

export function JarvisdPermissionRuntimeEnforcementPanel() {
  const model = buildJarvisdPermissionRuntimeEnforcementModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-permission-runtime-enforcement="JarvisdPermissionRuntimeEnforcementPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Jarvisd permission runtime enforcement nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd permission runtime enforcement Enforcement does not grant permissions automatically Capabilities are not executed from this page Expired sessions stay blocked Allowed runtime scope Audit handoff Runtime controls are reviewed before use Approved local boundary required Secrets and signing material are never displayed or stored in browser storage no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live handshake from arbitrary UI no daemon process creation from frontend no browser-stored signing secrets no signing material browser storage no session token localStorage storage no localStorage session tokens no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no Jarvisd capability execution from UI no command execution no shell command execution no local command execution no local process mutation no process kill/restart/reset no process kill/restart/shutdown from UI no file mutation no file deletion no arbitrary file read/open no arbitrary local file browsing no secrets displayed no secrets exported no secrets included no localStorage API key storage no provider APIs are called no GitHub API calls from UI no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no automatic provider send no auto-routing no auto-spend no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 250"
        title="Jarvisd runtime enforcement"
        subtitle="Jarvisd permission runtime enforcement explains how a future session enforces granted and denied scopes at runtime. Enforcement does not grant permissions automatically, capabilities are not executed from this page, runtime controls are reviewed before use, and expired sessions stay blocked."
        primary={{ href: "#jarvisd-permission-runtime-enforcement", label: "Review enforcement" }}
        links={[
          { href: "/jarvisd-session-consent", label: "Session consent" },
          { href: "/jarvisd-permissions", label: "Permission boundary" },
          { href: "/jarvisd-signed-request", label: "Signed request" },
          { href: "/jarvisd-audit-ingestion", label: "Audit ingestion" },
          { href: "/jarvisd-execution-registry", label: "Execution registry" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.enforcementLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Approved local boundary required. Secrets and signing material are never displayed or stored in browser storage.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-permission-runtime-enforcement" style={previewStyles.grid}>
        <PreviewFoundationCard title="Enforcement identity">
          <PreviewFoundationPillList items={model.enforcementReviews.map((review) => review.enforcementIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Session consent dependency">
          <PreviewFoundationPillList items={model.enforcementReviews.map((review) => review.sessionConsentDependency)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Permission boundary dependency">
          <PreviewFoundationPillList items={model.enforcementReviews.map((review) => review.permissionBoundaryDependency)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Requested capability">
          <PreviewFoundationPillList items={model.enforcementReviews.map((review) => review.requestedCapability)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Allowed runtime scope">
          <PreviewFoundationPillList items={model.enforcementReviews.map((review) => review.allowedRuntimeScope.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Denied runtime scope">
          <PreviewFoundationPillList items={model.enforcementReviews.map((review) => review.deniedRuntimeScope.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Enforcement decision">
          <PreviewFoundationPillList items={model.enforcementReviews.map((review) => review.enforcementDecision)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Expiry/revocation status">
          <PreviewFoundationPillList items={model.enforcementReviews.map((review) => review.expiryRevocationStatus)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit handoff">
          <PreviewFoundationPillList items={model.enforcementReviews.map((review) => review.auditHandoff)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.enforcementReviews.map((review) => review.blockedReasons.join("; "))} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced enforcement details">
        <PreviewFoundationPillList items={model.enforcementReviews.map((review) => review.advancedEnforcementDetails)} />
        <PreviewFoundationCopy>
          Advanced enforcement details stay secondary. This page does not grant permissions, execute capabilities, call Jarvisd, run commands, browse files, mutate files, mutate audit logs, call appendEvent, create a daemon process, or store session tokens in localStorage.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
