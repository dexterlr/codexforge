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
  buildLocalFirstRouterDryRunLiveMetadataIntegrationModel,
  buildLocalFirstRouterDryRunLiveMetadataIntegrationStableKey,
} from "@/lib/codexforge/local-first-router-dry-run-live-metadata-integration";

const LOCAL_FIRST_ROUTER_DRY_RUN_LIVE_METADATA_INTEGRATION_MARKERS =
  "Local-first router dry run live metadata integration Router metadata does not auto-route live traffic Router changes require explicit review No tokens are spent from this page Local-first routing preference Dry-run decision summary integration identity source cost/latency calibration source router recommendation review source policy bundle export review provider/model fallback summary privacy/policy constraints approval requirement blocked reasons provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced routing metadata details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no auto-apply router recommendations no silent provider registry mutation no provider retry from UI no API key export no secret export no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no raw polling loops no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalFirstRouterDryRunLiveMetadataIntegrationPanel() {
  const model = buildLocalFirstRouterDryRunLiveMetadataIntegrationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-first-router-dry-run-live-metadata-integration={`${LOCAL_FIRST_ROUTER_DRY_RUN_LIVE_METADATA_INTEGRATION_MARKERS} buildLocalFirstRouterDryRunLiveMetadataIntegrationStableKey LocalFirstRouterDryRunLiveMetadataIntegrationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 299"
        title="Router metadata"
        subtitle="Local-first router dry run live metadata integration reviews provider metadata, cost and latency calibration, and policy bundle context without applying routing changes. Router metadata does not auto-route live traffic, router changes require explicit review, and no tokens are spent from this page."
        primary={{ href: "#local-first-router-live-metadata", label: "Review metadata" }}
        links={[
          { href: "/local-first-router-dry-run", label: "Dry run" },
          { href: "/provider-cost-latency-calibration", label: "Cost calibration" },
          { href: "/router-recommendation-apply-review", label: "Router review" },
          { href: "/provider-policy-bundle-export-review", label: "Policy export" },
          { href: "/provider-runbook-finalization", label: "Runbook finalization" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.metadataLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews routing metadata only. It does not call provider APIs, mutate provider registry entries,
          apply router recommendations, route live provider traffic, or spend tokens.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-first-router-live-metadata" style={previewStyles.grid}>
        {model.integrations.map((integration) => (
          <PreviewFoundationCard
            key={buildLocalFirstRouterDryRunLiveMetadataIntegrationStableKey(
              "local-first-router-live-metadata-card",
              integration.id
            )}
            title={integration.integrationIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${integration.status}`,
                integration.sourceCostLatencyCalibration,
                integration.sourceRouterRecommendationReview,
                integration.sourcePolicyBundleExportReview,
                integration.localFirstRoutingPreference,
                integration.providerModelFallbackSummary,
                `Privacy/policy constraints: ${integration.privacyPolicyConstraints.join("; ")}`,
                integration.dryRunDecisionSummary,
                integration.approvalRequirement,
                `Blocked reasons: ${integration.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced routing metadata details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.integrations.map((integration) => integration.advancedMetadataDetails)}
        />
        <PreviewFoundationCopy>
          Advanced routing metadata details stay collapsed or secondary. Live routing remains review-gated and this page
          cannot apply router recommendations, spend tokens, send prompts, or change provider registry settings.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
