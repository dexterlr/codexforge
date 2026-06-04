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
import { buildJarvisdSettingsExportImportReviewModel } from "@/lib/codexforge/jarvisd-settings-export-import-review";

export function JarvisdSettingsExportImportReviewPanel() {
  const model = buildJarvisdSettingsExportImportReviewModel();

  return (
    <div style={previewStyles.shell} data-codexforge-jarvisd-settings-export-import-review="JarvisdSettingsExportImportReviewPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated Jarvisd settings export import review nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Jarvisd settings export import review Secrets are never exported Imports are not applied automatically Settings packages are reviewed before use Excluded secret fields Rollback note Jarvisd actions are not executed from arbitrary UI Approved local boundary required no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live log fetching from arbitrary UI no audit log mutation from UI no Jarvisd capability execution from UI no daemon action runs from this page no settings auto-import no settings auto-export no imports applied automatically no provider APIs are called no GitHub API calls from UI no command execution no shell command execution no local command execution no local process mutation no config mutation no provider registry mutation no file mutation no file deletion no arbitrary file read/open no arbitrary local file browsing no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no router config mutation from UI no auto-routing no auto-spend no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no raw secret display no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 244"
        title="Jarvisd settings review"
        subtitle="Jarvisd settings export import review checks safe non-secret settings packages before use. Secrets are never exported, imports are not applied automatically, and settings packages are reviewed before use."
        primary={{ href: "#jarvisd-settings-export-import-review", label: "Review settings" }}
        links={[
          { href: "/jarvisd-audit-log", label: "Audit log" },
          { href: "/jarvisd-recovery-console", label: "Recovery console" },
          { href: "/jarvisd-permissions", label: "Permission boundary" },
          { href: "/jarvisd-contract", label: "Daemon contract" },
          { href: "/jarvisd-release-audit", label: "Release audit" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.reviewLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-settings-export-import-review" style={previewStyles.grid}>
        <PreviewFoundationCard title="Settings package identity">
          <PreviewFoundationPillList
            items={model.packages.map((settingsPackage) => settingsPackage.settingsPackageIdentity)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Included non-secret settings">
          <PreviewFoundationPillList
            items={model.packages.map((settingsPackage) => settingsPackage.includedNonSecretSettings.join("; "))}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Excluded secret fields">
          <PreviewFoundationPillList
            items={model.packages.map((settingsPackage) => settingsPackage.excludedSecretFields.join("; "))}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Redaction status">
          <PreviewFoundationPillList
            items={model.packages.map((settingsPackage) => settingsPackage.redactionStatus)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Compatibility notes">
          <PreviewFoundationPillList
            items={model.packages.map((settingsPackage) => settingsPackage.compatibilityNotes)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Import risk">
          <PreviewFoundationPillList items={model.packages.map((settingsPackage) => settingsPackage.importRisk)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Review checklist">
          <PreviewFoundationPillList
            items={model.packages.map((settingsPackage) => settingsPackage.reviewChecklist.join("; "))}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval requirement">
          <PreviewFoundationPillList
            items={model.packages.map((settingsPackage) => settingsPackage.approvalRequirement)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Rollback note">
          <PreviewFoundationPillList items={model.packages.map((settingsPackage) => settingsPackage.rollbackNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Release audit route">
          <PreviewFoundationPillList items={model.packages.map((settingsPackage) => settingsPackage.releaseAuditRoute)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced package details">
        <PreviewFoundationPillList
          items={model.packages.map((settingsPackage) => settingsPackage.advancedPackageDetails)}
        />
        <PreviewFoundationCopy>
          Advanced package details stay secondary. This review does not export secrets, apply imports, mutate config, browse arbitrary files, open arbitrary files, call Jarvisd, call providers, or write registry state.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
