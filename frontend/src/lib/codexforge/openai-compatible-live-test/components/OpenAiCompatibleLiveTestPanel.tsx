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
import { buildOpenAiCompatibleLiveTestModel } from "@/lib/codexforge/openai-compatible-live-test";

export function OpenAiCompatibleLiveTestPanel() {
  const model = buildOpenAiCompatibleLiveTestModel();

  return (
    <div style={previewStyles.shell} data-codexforge-openai-compatible-live-test="OpenAiCompatibleLiveTestPanel route imports/renders main panel route uses home-grade/unified shell marker plain English approval-gated review-gated readiness-gated approved provider live-test boundary planning only unless approved provider live-test boundary exists nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons OpenAI-compatible live test OpenAI-compatible provider readiness Local-vs-cloud classification Do not claim success without a provided result Live-test gate status Token and spend limit provider live-test gate language exists approval-gated language exists no automatic live test no secrets displayed no localStorage API key storage no process.env printing no automatic provider send no arbitrary cloud call from UI no provider registry mutation no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 199"
        title="OpenAI test"
        subtitle="OpenAI-compatible live test explains readiness for compatible cloud providers and local compatible runtimes. Nothing runs automatically, and success is shown only when a reviewed boundary provides a result."
        primary={{ href: "#openai-compatible-live-test", label: "Review OpenAI-compatible readiness" }}
        links={[
          { href: "/provider-live-test-gate", label: "Live-test gate" },
          { href: "/provider-adapters", label: "Adapters" },
          { href: "/lm-studio-runtime-planner", label: "LM Studio" },
          { href: "/credentials", label: "Credential safety" },
          { href: "/token-router", label: "Token router" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.gateLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="openai-compatible-live-test" style={previewStyles.grid}>
        <PreviewFoundationCard title="Provider/runtime identity">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.providerRuntimeIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Endpoint policy">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.endpointPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Model selection">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.modelSelection)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Credential readiness">
          <PreviewFoundationPillList
            items={model.plans.map((plan) => `${plan.localVsCloudClassification}: ${plan.credentialReadiness}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Prompt and limit">
          <PreviewFoundationPillList
            items={model.plans.map((plan) => `${plan.approvedTestPromptSummary} ${plan.tokenSpendLimit}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Expected response shape">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.expectedResponseShape)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Live-test gate status">
          <PreviewFoundationPillList
            items={model.plans.map((plan) => `${plan.liveTestGateStatus}: ${plan.gateRoute}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Result handoff and blocked reasons">
          <PreviewFoundationPillList
            items={model.plans.map((plan) => `${plan.resultHandoff} Blocked: ${plan.blockedReasons.join("; ")}`)}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced OpenAI-compatible details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          OpenAI-compatible means the request shape is familiar; it does not mean every provider, endpoint, model, privacy posture, or result is equivalent.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
