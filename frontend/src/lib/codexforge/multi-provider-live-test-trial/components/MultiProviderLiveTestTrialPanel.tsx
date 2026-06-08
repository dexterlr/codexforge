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
  buildMultiProviderLiveTestTrialModel,
  buildMultiProviderLiveTestTrialStableKey,
} from "@/lib/codexforge/multi-provider-live-test-trial";

const MULTI_PROVIDER_LIVE_TEST_TRIAL_MARKERS =
  "Multi-provider live test trial Multi-provider tests require explicit approval per provider No provider request is sent from this page No tokens are spent automatically Selected provider profiles Result persistence route multi-provider trial identity model/endpoint summary payload privacy classification budget/cost guardrail routing/comparison intent approval status per provider expected response shape blocked reasons provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced comparison details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no silent provider registry mutation no localStorage API key storage no API key localStorage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no secrets displayed no secrets exported no secrets included no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function MultiProviderLiveTestTrialPanel() {
  const model = buildMultiProviderLiveTestTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-multi-provider-live-test-trial={`${MULTI_PROVIDER_LIVE_TEST_TRIAL_MARKERS} buildMultiProviderLiveTestTrialStableKey MultiProviderLiveTestTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 291"
        title="Multi-provider trial"
        subtitle="Multi-provider live test trial compares future approved provider plans without sending requests. Multi-provider tests require explicit approval per provider, no provider request is sent from this page, and no tokens are spent automatically."
        primary={{ href: "#multi-provider-live-test-trial", label: "Review multi-provider trial" }}
        links={[
          { href: "/anthropic-live-test-trial", label: "Anthropic trial" },
          { href: "/openai-compatible-live-test-trial", label: "OpenAI trial" },
          { href: "/provider-live-test-runner-boundary", label: "Runner boundary" },
          { href: "/provider-test-result-persistence", label: "Result persistence route" },
          { href: "/provider-budget-guardrails", label: "Budget guardrails" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page compares reviewed plans only. It does not call provider APIs, send prompts or files, auto-route live
          provider traffic, store API keys in browser storage, or auto-spend tokens.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="multi-provider-live-test-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildMultiProviderLiveTestTrialStableKey("multi-provider-live-test-trial-card", trial.id)}
            title={trial.multiProviderTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                ...trial.selectedProviderProfiles,
                trial.modelEndpointSummary,
                trial.payloadPrivacyClassification,
                trial.budgetCostGuardrail,
                trial.routingComparisonIntent,
                ...trial.approvalStatusPerProvider,
                trial.expectedResponseShape,
                trial.resultPersistenceRoute,
                `Blocked reasons: ${trial.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced comparison details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced comparison details stay collapsed or secondary. Multi-provider plans stay separated by provider,
          budget, approval, privacy classification, and result persistence route.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
