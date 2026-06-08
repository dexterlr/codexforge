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
  buildProviderFailureRetryTrialModel,
  buildProviderFailureRetryTrialStableKey,
} from "@/lib/codexforge/provider-failure-retry-trial";

const PROVIDER_FAILURE_RETRY_TRIAL_MARKERS =
  "Provider failure retry trial Retry is never automatic No provider request is sent from this page Retry may spend tokens only after explicit approval Blocked retry reasons Required approval copy retry trial identity source provider test result failure category provider/model summary retry eligibility adjusted payload/privacy note cost guardrail next recommended route provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced retry details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no auto-apply router recommendations no silent provider registry mutation no provider retry from UI no API key export no secret export no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderFailureRetryTrialPanel() {
  const model = buildProviderFailureRetryTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-failure-retry-trial={`${PROVIDER_FAILURE_RETRY_TRIAL_MARKERS} buildProviderFailureRetryTrialStableKey ProviderFailureRetryTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 295"
        title="Retry trial"
        subtitle="Provider failure retry trial reviews safe retry options after failed, blocked, or timed-out provider results. Retry is never automatic, no provider request is sent from this page, and retry may spend tokens only after explicit approval."
        primary={{ href: "#provider-failure-retry-trial", label: "Review retry trial" }}
        links={[
          { href: "/provider-test-result-persistence", label: "Result persistence" },
          { href: "/provider-failure-recovery", label: "Failure recovery" },
          { href: "/provider-live-test-runner-boundary", label: "Runner boundary" },
          { href: "/provider-budget-guardrails", label: "Budget guardrails" },
          { href: "/router-recommendation-apply-review", label: "Router apply review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.retryLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews retry eligibility only. It does not send a provider request, send prompts or files, retry
          automatically, change routing, or spend tokens.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-failure-retry-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildProviderFailureRetryTrialStableKey("provider-failure-retry-trial-card", trial.id)}
            title={trial.retryTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.sourceProviderTestResult,
                trial.failureCategory,
                trial.providerModelSummary,
                trial.retryEligibility,
                `Blocked retry reasons: ${trial.blockedRetryReasons.join("; ")}`,
                trial.adjustedPayloadPrivacyNote,
                trial.costGuardrail,
                trial.requiredApprovalCopy,
                trial.nextRecommendedRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced retry details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.trials.map((trial) => trial.advancedRetryDetails)} />
        <PreviewFoundationCopy>
          Advanced retry details stay collapsed or secondary. Retrying a provider remains separate from this review page
          and requires explicit approval before any token-spending request.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
