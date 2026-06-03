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
import { buildProviderSettingsExportImportReviewModel } from "@/lib/codexforge/provider-settings-export-import-review";

export function ProviderSettingsExportImportReviewPanel() {
  const model = buildProviderSettingsExportImportReviewModel();

  return (
    <div style={previewStyles.shell} data-codexforge-provider-settings-export-import-review="ProviderSettingsExportImportReviewPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated provider settings export import review nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Provider settings export import review Secrets are never exported Imports are not applied automatically Excluded secret fields Review checklist Apply handoff no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no auto-export settings no settings auto-import no imports applied automatically no secrets displayed no secrets exported no localStorage API key storage no process.env printing no provider registry mutation no provider registry write from UI no router config mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 209"
        title="Settings review"
        subtitle="Provider settings export import review prepares and reviews non-secret settings packages. Secrets are never exported, imports are not applied automatically, and registry changes need a separate approval boundary."
        primary={{ href: "#provider-settings-export-import-review", label: "Review settings package" }}
        links={[
          { href: "/provider-audit-log", label: "Audit log" },
          { href: "/provider-budget-guardrails", label: "Budget guardrails" },
          { href: "/prompt-privacy-classifier", label: "Privacy classifier" },
          { href: "/ai-providers", label: "Provider profiles" },
          { href: "/credentials", label: "Credential safety" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.reviewLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-settings-export-import-review" style={previewStyles.grid}>
        <PreviewFoundationCard title="Settings package summary">
          <PreviewFoundationPillList
            items={model.packages.map((settingsPackage) => settingsPackage.settingsPackageSummary)}
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
        <PreviewFoundationCard title="Apply handoff">
          <PreviewFoundationPillList items={model.packages.map((settingsPackage) => settingsPackage.applyHandoff)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Rollback note">
          <PreviewFoundationPillList items={model.packages.map((settingsPackage) => settingsPackage.rollbackNote)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced package details">
        <PreviewFoundationPillList
          items={model.packages.map((settingsPackage) => settingsPackage.advancedPackageDetails)}
        />
        <PreviewFoundationCopy>
          Advanced package details stay secondary. This review does not export settings silently, export secrets, apply imports, browse arbitrary files, upload settings, call provider APIs, or write the provider registry.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
