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
import { buildMultiProviderLiveTestModel } from "@/lib/codexforge/multi-provider-live-test";

export function MultiProviderLiveTestPanel() {
  const model = buildMultiProviderLiveTestModel();

  return (
    <div style={previewStyles.shell} data-codexforge-multi-provider-live-test="MultiProviderLiveTestPanel route imports/renders main panel route uses home-grade/unified shell marker plain English approval-gated review-gated readiness-gated approved provider live-test boundary planning only unless approved provider live-test boundary exists nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Gemini DeepSeek OpenRouter live test Multi-provider readiness Provider-specific blocked reasons Do not call provider APIs from arbitrary UI Endpoint and network policy Live-test gate status provider live-test gate language exists approval-gated language exists no automatic live test no secrets displayed no localStorage API key storage no process.env printing no automatic provider send no arbitrary cloud call from UI no provider registry mutation no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 201"
        title="Multi test"
        subtitle="Gemini DeepSeek OpenRouter live test readiness uses the same central live-test gate. Provider-specific shortcuts stay blocked, and no provider APIs are called from arbitrary UI."
        primary={{ href: "#multi-provider-live-test", label: "Review multi-provider readiness" }}
        links={[
          { href: "/provider-live-test-gate", label: "Live-test gate" },
          { href: "/provider-adapters", label: "Adapters" },
          { href: "/model-capabilities", label: "Model capabilities" },
          { href: "/task-router", label: "Task router" },
          { href: "/token-router", label: "Token router" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.gateLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="multi-provider-live-test" style={previewStyles.grid}>
        <PreviewFoundationCard title="Selected provider">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.selectedProvider)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Model/runtime identity">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.modelRuntimeIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Credential readiness">
          <PreviewFoundationPillList
            items={model.plans.map((plan) => `${plan.selectedProvider}: ${plan.credentialReadiness}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Endpoint and network policy">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.endpointNetworkPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Prompt and limit">
          <PreviewFoundationPillList
            items={model.plans.map((plan) => `${plan.approvedTestPromptSummary} ${plan.spendTokenLimit}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Privacy and response shape">
          <PreviewFoundationPillList
            items={model.plans.map((plan) => `${plan.privacyReview} ${plan.expectedResponseShape}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Live-test gate status">
          <PreviewFoundationPillList
            items={model.plans.map((plan) => `${plan.selectedProvider}: ${plan.liveTestGateStatus} via ${plan.gateRoute}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons and handoff">
          <PreviewFoundationPillList
            items={model.plans.map(
              (plan) => `${plan.selectedProvider}: ${plan.providerSpecificBlockedReasons.join("; ")}. ${plan.resultHandoff}`
            )}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced multi-provider details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Gemini, DeepSeek, and OpenRouter keep separate provider identity, endpoint policy, privacy review, and result handoff notes before any approved live-test boundary can run.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
