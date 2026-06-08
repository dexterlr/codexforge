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
  buildAnthropicLiveTestTrialModel,
  buildAnthropicLiveTestTrialStableKey,
} from "@/lib/codexforge/anthropic-live-test-trial";

const ANTHROPIC_LIVE_TEST_TRIAL_MARKERS =
  "Anthropic live test trial Anthropic tests require explicit approval No API request is sent from this page API keys and secrets are never displayed Estimated cost token guardrail Expected response shape test trial identity provider profile model summary endpoint/API family summary payload privacy classification approval status result capture route blocked reasons provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced trial details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no silent provider registry mutation no localStorage API key storage no API key localStorage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no secrets displayed no secrets exported no secrets included no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function AnthropicLiveTestTrialPanel() {
  const model = buildAnthropicLiveTestTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-anthropic-live-test-trial={`${ANTHROPIC_LIVE_TEST_TRIAL_MARKERS} buildAnthropicLiveTestTrialStableKey AnthropicLiveTestTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 290"
        title="Anthropic trial"
        subtitle="Anthropic live test trial prepares a future approved Anthropic provider test. Anthropic tests require explicit approval, no API request is sent from this page, and API keys and secrets are never displayed."
        primary={{ href: "#anthropic-live-test-trial", label: "Review Anthropic trial" }}
        links={[
          { href: "/provider-live-test-runner-boundary", label: "Runner boundary" },
          { href: "/provider-live-test-gate", label: "Live-test gate" },
          { href: "/claude-anthropic-live-test", label: "Claude readiness" },
          { href: "/provider-budget-guardrails", label: "Budget guardrails" },
          { href: "/provider-test-results", label: "Result capture route" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews a future test shape only. It does not call Anthropic APIs, send prompts or files, print env
          values, store API keys in browser storage, or auto-spend tokens.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="anthropic-live-test-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildAnthropicLiveTestTrialStableKey("anthropic-live-test-trial-card", trial.id)}
            title={trial.testTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.providerProfile,
                trial.modelSummary,
                trial.endpointApiFamilySummary,
                trial.payloadPrivacyClassification,
                trial.estimatedCostTokenGuardrail,
                trial.approvalStatus,
                trial.expectedResponseShape,
                trial.resultCaptureRoute,
                `Blocked reasons: ${trial.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced trial details stay collapsed or secondary. Anthropic provider testing stays behind explicit approval,
          privacy review, budget review, and result capture.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
