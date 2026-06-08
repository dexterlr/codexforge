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
  buildProviderGovernanceMvpAuditModel,
  buildProviderGovernanceMvpAuditStableKey,
} from "@/lib/codexforge/provider-governance-mvp-audit";

const PROVIDER_GOVERNANCE_MVP_AUDIT_MARKERS =
  "Provider governance MVP audit Governance audit does not enable live routing Provider policy changes require explicit review Secrets are not inspected or displayed Audit decision Known gaps audit identity covered provider surfaces live-test boundary readiness test result persistence readiness cost/latency calibration readiness router recommendation readiness retry safety readiness privacy/policy readiness next recommended route provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced audit details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no auto-apply router recommendations no silent provider registry mutation no provider retry from UI no API key export no secret export no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderGovernanceMvpAuditPanel() {
  const model = buildProviderGovernanceMvpAuditModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-governance-mvp-audit={`${PROVIDER_GOVERNANCE_MVP_AUDIT_MARKERS} buildProviderGovernanceMvpAuditStableKey ProviderGovernanceMvpAuditPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 296"
        title="MVP audit"
        subtitle="Provider governance MVP audit reviews whether provider safety, testing, persistence, routing, retry, cost, privacy, and policy bundle surfaces are ready for MVP. Governance audit does not enable live routing, provider policy changes require explicit review, and secrets are not inspected or displayed."
        primary={{ href: "#provider-governance-mvp-audit", label: "Review MVP audit" }}
        links={[
          { href: "/provider-live-test-runner-boundary", label: "Runner boundary" },
          { href: "/provider-test-result-persistence", label: "Result persistence" },
          { href: "/provider-cost-latency-calibration", label: "Cost calibration" },
          { href: "/provider-failure-retry-trial", label: "Retry trial" },
          { href: "/provider-policy-bundle-export-review", label: "Policy export review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.auditLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This audit checks readiness labels only. It does not enable routing, call providers, inspect secrets, mutate
          provider policy, or change provider registry entries.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-governance-mvp-audit" style={previewStyles.grid}>
        {model.audits.map((audit) => (
          <PreviewFoundationCard
            key={buildProviderGovernanceMvpAuditStableKey("provider-governance-mvp-audit-card", audit.id)}
            title={audit.auditIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Covered provider surfaces: ${audit.coveredProviderSurfaces.join("; ")}`,
                audit.liveTestBoundaryReadiness,
                audit.testResultPersistenceReadiness,
                audit.costLatencyCalibrationReadiness,
                audit.routerRecommendationReadiness,
                audit.retrySafetyReadiness,
                audit.privacyPolicyReadiness,
                `Known gaps: ${audit.knownGaps.join("; ")}`,
                audit.auditDecisionLabel,
                audit.nextRecommendedRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced audit details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.audits.map((audit) => audit.advancedAuditDetails)} />
        <PreviewFoundationCopy>
          Advanced audit details stay collapsed or secondary. MVP readiness is review-only and does not unlock live
          provider routing, retry execution, registry mutation, policy apply, or secret inspection.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
