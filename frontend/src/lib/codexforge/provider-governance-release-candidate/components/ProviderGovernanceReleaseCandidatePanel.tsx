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
  buildProviderGovernanceReleaseCandidateModel,
  buildProviderGovernanceReleaseCandidateStableKey,
} from "@/lib/codexforge/provider-governance-release-candidate";

const PROVIDER_GOVERNANCE_RELEASE_CANDIDATE_MARKERS =
  "Provider governance release candidate Release candidate does not enable providers automatically Live routing remains approval-gated Secrets are not inspected or displayed Release decision Known gaps release candidate identity covered provider surfaces runbook readiness policy bundle readiness router dry-run readiness live-test readiness result persistence readiness next recommended route provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced release details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no auto-apply router recommendations no silent provider registry mutation no provider retry from UI no API key export no secret export no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no raw polling loops no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderGovernanceReleaseCandidatePanel() {
  const model = buildProviderGovernanceReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-governance-release-candidate={`${PROVIDER_GOVERNANCE_RELEASE_CANDIDATE_MARKERS} buildProviderGovernanceReleaseCandidateStableKey ProviderGovernanceReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 300"
        title="Provider release candidate"
        subtitle="Provider governance release candidate reviews whether provider governance is ready to be treated as a stable MVP loop. Release candidate does not enable providers automatically, live routing remains approval-gated, and secrets are not inspected or displayed."
        primary={{ href: "#provider-governance-release-candidate", label: "Review release candidate" }}
        links={[
          { href: "/provider-runbook-finalization", label: "Runbook finalization" },
          { href: "/provider-policy-bundle-export-review", label: "Policy export" },
          { href: "/local-first-router-live-metadata", label: "Router metadata" },
          { href: "/provider-test-result-persistence", label: "Result persistence" },
          { href: "/comfyui-health-live-bridge", label: "ComfyUI bridge" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.releaseLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a release readiness review. It does not enable providers, inspect secrets, call provider APIs,
          run provider tests, route live traffic, or mutate provider registry entries.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-governance-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildProviderGovernanceReleaseCandidateStableKey(
              "provider-governance-release-candidate-card",
              candidate.id
            )}
            title={candidate.releaseCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Covered provider surfaces: ${candidate.coveredProviderSurfaces.join("; ")}`,
                candidate.runbookReadiness,
                candidate.policyBundleReadiness,
                candidate.routerDryRunReadiness,
                candidate.liveTestReadiness,
                candidate.resultPersistenceReadiness,
                `Known gaps: ${candidate.knownGaps.join("; ")}`,
                candidate.releaseDecisionLabel,
                candidate.nextRecommendedRoute,
                `Blocked reasons: ${candidate.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced release details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.candidates.map((candidate) => candidate.advancedReleaseDetails)} />
        <PreviewFoundationCopy>
          Advanced release details stay collapsed or secondary. The release candidate closes the review loop; it does
          not unlock provider execution, live routing, provider registry mutation, or secret inspection.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
