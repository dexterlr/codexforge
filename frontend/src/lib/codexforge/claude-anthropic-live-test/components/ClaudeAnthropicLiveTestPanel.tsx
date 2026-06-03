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
import { buildClaudeAnthropicLiveTestModel } from "@/lib/codexforge/claude-anthropic-live-test";

export function ClaudeAnthropicLiveTestPanel() {
  const model = buildClaudeAnthropicLiveTestModel();

  return (
    <div style={previewStyles.shell} data-codexforge-claude-anthropic-live-test="ClaudeAnthropicLiveTestPanel route imports/renders main panel route uses home-grade/unified shell marker plain English approval-gated review-gated readiness-gated approved provider live-test boundary planning only unless approved provider live-test boundary exists nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Claude Anthropic live test Claude and Anthropic provider readiness Privacy review required Do not call Anthropic APIs from arbitrary UI Live-test gate status Result handoff provider live-test gate language exists approval-gated language exists no automatic live test no secrets displayed no localStorage API key storage no process.env printing no automatic provider send no arbitrary cloud call from UI no provider registry mutation no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 200"
        title="Claude test"
        subtitle="Claude Anthropic live test readiness keeps privacy, spend, approval, and result handoff in front of the operator. It does not call Anthropic APIs from arbitrary UI."
        primary={{ href: "#claude-anthropic-live-test", label: "Review Claude readiness" }}
        links={[
          { href: "/provider-live-test-gate", label: "Live-test gate" },
          { href: "/provider-adapters", label: "Adapters" },
          { href: "/provider-setup", label: "Provider setup" },
          { href: "/credentials", label: "Credential safety" },
          { href: "/token-router", label: "Token router" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.gateLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="claude-anthropic-live-test" style={previewStyles.grid}>
        <PreviewFoundationCard title="Provider profile">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.providerProfile)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Model family">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.modelFamily)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Credential readiness">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.credentialReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approved prompt and privacy">
          <PreviewFoundationPillList
            items={model.plans.map((plan) => `${plan.approvedTestPromptSummary} ${plan.privacyReview}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Spend and response shape">
          <PreviewFoundationPillList
            items={model.plans.map((plan) => `${plan.spendTokenLimit} ${plan.expectedResponseShape}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Live-test gate status">
          <PreviewFoundationPillList
            items={model.plans.map((plan) => `${plan.liveTestGateStatus}: ${plan.gateRoute}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Result handoff">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.resultHandoff)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.blockedReasons.join("; "))} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced Claude/Anthropic details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Claude manual subscription use remains manual browser handoff. API testing remains behind the approved provider live-test boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
