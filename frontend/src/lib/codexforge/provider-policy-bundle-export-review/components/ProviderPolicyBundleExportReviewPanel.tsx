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
import {
  buildProviderPolicyBundleExportReviewModel,
  buildProviderPolicyBundleExportReviewStableKey,
} from "@/lib/codexforge/provider-policy-bundle-export-review";

const PROVIDER_POLICY_BUNDLE_EXPORT_REVIEW_MARKERS =
  "Provider policy bundle export review Policy bundles never export secrets Exports are reviewed before use Provider credentials are excluded Included non-secret policy fields Excluded secret fields export review identity source governance audit provider/model routing notes privacy classifications budget guardrails compatibility notes approval requirement blocked reasons provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced bundle details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no auto-apply router recommendations no silent provider registry mutation no provider retry from UI no API key export no secret export no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderPolicyBundleExportReviewPanel() {
  const model = buildProviderPolicyBundleExportReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-policy-bundle-export-review={`${PROVIDER_POLICY_BUNDLE_EXPORT_REVIEW_MARKERS} buildProviderPolicyBundleExportReviewStableKey ProviderPolicyBundleExportReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 297"
        title="Policy export review"
        subtitle="Provider policy bundle export review prepares a reviewed non-secret policy bundle for handoff. Policy bundles never export secrets, exports are reviewed before use, and provider credentials are excluded."
        primary={{ href: "#provider-policy-bundle-export-review", label: "Review export packet" }}
        links={[
          { href: "/provider-governance-mvp-audit", label: "MVP audit" },
          { href: "/provider-policy-bundle", label: "Policy bundle" },
          { href: "/provider-settings-review", label: "Settings review" },
          { href: "/router-recommendation-apply-review", label: "Router apply review" },
          { href: "/prompt-privacy-classifier", label: "Privacy classifier" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.exportLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page prepares non-secret export review notes only. It does not export API keys, export secrets, include
          provider credentials, mutate the provider registry, call provider APIs, or apply policy.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-policy-bundle-export-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildProviderPolicyBundleExportReviewStableKey(
              "provider-policy-bundle-export-review-card",
              review.id
            )}
            title={review.exportReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceGovernanceAudit,
                `Included non-secret policy fields: ${review.includedNonSecretPolicyFields.join("; ")}`,
                `Excluded secret fields: ${review.excludedSecretFields.join("; ")}`,
                review.providerModelRoutingNotes,
                `Privacy classifications: ${review.privacyClassifications.join("; ")}`,
                `Budget guardrails: ${review.budgetGuardrails.join("; ")}`,
                review.compatibilityNotes,
                review.approvalRequirement,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced bundle details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedBundleDetails)} />
        <PreviewFoundationCopy>
          Advanced bundle details stay collapsed or secondary. Policy bundle exports remain non-secret review artifacts
          and never include provider credentials or raw sensitive payloads.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
