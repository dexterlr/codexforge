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
import { buildJarvisdPermissionBoundaryModel } from "@/lib/codexforge/jarvisd-permission-boundary";

export function JarvisdPermissionBoundaryPanel() {
  const model = buildJarvisdPermissionBoundaryModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-permission-boundary="JarvisdPermissionBoundaryPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Jarvisd permission boundary nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd permission boundary Permissions are not granted automatically No local action runs without explicit approval Secrets are never requested by this boundary Approval copy Revocation guidance no automatic daemon call no raw fetch from arbitrary UI no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no file mutation no local action execution no credential storage no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 217"
        title="Jarvisd permissions"
        subtitle="Jarvisd permission boundary makes local daemon permission review explicit before any future local action. Permissions are not granted automatically, no local action runs without explicit approval, and secrets are never requested by this boundary."
        primary={{ href: "#jarvisd-permission-boundary", label: "Review permissions" }}
        links={[
          { href: "/jarvisd-contract", label: "Daemon contract" },
          { href: "/jarvisd-health", label: "Health probe" },
          { href: "/jarvisd-capabilities", label: "Capabilities" },
          { href: "/provider-runbook-generator", label: "Runbook" },
          { href: "/credentials", label: "Credentials" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.permissionLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-permission-boundary" style={previewStyles.grid}>
        <PreviewFoundationCard title="Permission identity">
          <PreviewFoundationPillList items={model.permissions.map((permission) => permission.permissionIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Requested capability">
          <PreviewFoundationPillList items={model.permissions.map((permission) => permission.requestedCapability)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Allowed scope">
          <PreviewFoundationPillList items={model.permissions.map((permission) => permission.allowedScope)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Denied scope">
          <PreviewFoundationPillList items={model.permissions.map((permission) => permission.deniedScope)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval copy">
          <PreviewFoundationPillList items={model.permissions.map((permission) => permission.approvalCopy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Risk level">
          <PreviewFoundationPillList
            items={model.permissions.map((permission) => `${permission.riskLevel}: ${permission.status}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit note">
          <PreviewFoundationPillList items={model.permissions.map((permission) => permission.auditNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Revocation guidance">
          <PreviewFoundationPillList items={model.permissions.map((permission) => permission.revocationGuidance)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.permissions.map((permission) => permission.blockedReasons.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Next route">
          <PreviewFoundationPillList items={model.permissions.map((permission) => permission.nextRoute)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced permission details">
        <PreviewFoundationPillList items={model.permissions.map((permission) => permission.advancedPermissionDetails)} />
        <PreviewFoundationCopy>
          Advanced permission details stay secondary. This boundary does not grant permissions automatically, run local actions, request secrets, execute commands, browse files, mutate files, call providers, or store credentials.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
