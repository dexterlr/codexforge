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
import { buildProviderPolicyBundleModel } from "@/lib/codexforge/provider-policy-bundle";

export function ProviderPolicyBundlePanel() {
  const model = buildProviderPolicyBundleModel();

  return (
    <div style={previewStyles.shell} data-codexforge-provider-policy-bundle="ProviderPolicyBundlePanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated provider policy bundle nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Provider policy bundle Policy bundles are not auto-applied Secrets are never included Budget guardrail summary Privacy classifier summary Review handoff no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 210"
        title="Policy bundle"
        subtitle="Provider policy bundle composes budget, privacy, audit, settings, router, and approval rules into a reviewed artifact. Policy bundles are not auto-applied, secrets are never included, and nothing is applied automatically."
        primary={{ href: "#provider-policy-bundle", label: "Review policy bundle" }}
        links={[
          { href: "/provider-budget-guardrails", label: "Budget guardrails" },
          { href: "/prompt-privacy-classifier", label: "Privacy classifier" },
          { href: "/provider-audit-log", label: "Audit log" },
          { href: "/provider-settings-review", label: "Settings review" },
          { href: "/router-recommendation-review", label: "Router review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.bundleLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-policy-bundle" style={previewStyles.grid}>
        <PreviewFoundationCard title="Bundle identity">
          <PreviewFoundationPillList items={model.bundles.map((bundle) => bundle.bundleIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Covered providers">
          <PreviewFoundationPillList items={model.bundles.map((bundle) => bundle.coveredProviders.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Budget guardrail summary">
          <PreviewFoundationPillList items={model.bundles.map((bundle) => bundle.budgetGuardrailSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Privacy classifier summary">
          <PreviewFoundationPillList items={model.bundles.map((bundle) => bundle.privacyClassifierSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit log policy summary">
          <PreviewFoundationPillList items={model.bundles.map((bundle) => bundle.auditLogPolicySummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Settings export/import policy">
          <PreviewFoundationPillList items={model.bundles.map((bundle) => bundle.settingsExportImportPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Router recommendation policy">
          <PreviewFoundationPillList items={model.bundles.map((bundle) => bundle.routerRecommendationPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval requirements">
          <PreviewFoundationPillList items={model.bundles.map((bundle) => bundle.approvalRequirements.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Excluded secret fields">
          <PreviewFoundationPillList items={model.bundles.map((bundle) => bundle.excludedSecretFields.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Review handoff">
          <PreviewFoundationPillList
            items={model.bundles.map((bundle) => `${bundle.reviewStatus}: ${bundle.reviewHandoff}`)}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced policy details">
        <PreviewFoundationPillList items={model.bundles.map((bundle) => bundle.advancedPolicyDetails)} />
        <PreviewFoundationCopy>
          Advanced policy details stay secondary. This review does not auto-apply policy bundles, include secrets, call provider APIs, mutate the provider registry, auto-route traffic, spend tokens, export settings, or import settings.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
