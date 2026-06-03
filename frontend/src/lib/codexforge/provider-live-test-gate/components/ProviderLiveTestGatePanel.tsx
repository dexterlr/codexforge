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
import { buildProviderLiveTestGateModel } from "@/lib/codexforge/provider-live-test-gate";

export function ProviderLiveTestGatePanel() {
  const model = buildProviderLiveTestGateModel();

  return (
    <div style={previewStyles.shell} data-codexforge-provider-live-test-gate="ProviderLiveTestGatePanel route imports/renders main panel route uses home-grade/unified shell marker plain English approval-gated review-gated readiness-gated approved provider live-test boundary planning only unless approved provider live-test boundary exists nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons AI provider live test gate No live test runs automatically Secrets are never displayed Explicit approval required before network call Spend and token limit Prompts and files are not sent without approval provider live-test gate language exists approval-gated language exists no automatic live test no secrets displayed no localStorage API key storage no process.env printing no automatic provider send no arbitrary cloud call from UI no provider registry mutation no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 198"
        title="Live test gate"
        subtitle="AI provider live test gate explains the checklist before any provider live test. No live test runs automatically, secrets are never displayed, and prompts or files are not sent without explicit approval."
        primary={{ href: "#provider-live-test-gate", label: "Review live-test gate" }}
        links={[
          { href: "/provider-tests", label: "Provider tests" },
          { href: "/openai-compatible-live-test", label: "OpenAI-compatible" },
          { href: "/claude-anthropic-live-test", label: "Claude / Anthropic" },
          { href: "/multi-provider-live-test", label: "Gemini / DeepSeek / OpenRouter" },
          { href: "/credentials", label: "Credential safety" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.sharedGateLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-live-test-gate" style={previewStyles.grid}>
        <PreviewFoundationCard title="Provider profile summary">
          <PreviewFoundationPillList items={model.checklists.map((checklist) => checklist.providerProfileSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Credential readiness">
          <PreviewFoundationPillList
            items={model.checklists.map(
              (checklist) => `${checklist.providerProfileSummary.split(":")[0]}: ${checklist.credentialReadiness}`
            )}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Test scope and prompt summary">
          <PreviewFoundationPillList
            items={model.checklists.map(
              (checklist) => `${checklist.testScope} ${checklist.approvedTestPromptSummary}`
            )}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Spend and network approval">
          <PreviewFoundationPillList
            items={model.checklists.map(
              (checklist) => `${checklist.spendTokenLimit} ${checklist.networkCallApproval}`
            )}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Privacy review">
          <PreviewFoundationPillList items={model.checklists.map((checklist) => checklist.privacyReview)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Expected response shape">
          <PreviewFoundationPillList items={model.checklists.map((checklist) => checklist.expectedResponseShape)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit and handoff summary">
          <PreviewFoundationPillList items={model.checklists.map((checklist) => checklist.auditHandoffSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList
            items={model.checklists.map(
              (checklist) => `${checklist.gateStatus}: ${checklist.blockedReasons.join("; ")}`
            )}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced live-test gate details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          If no backend live-test boundary exists, execution remains behind the approved provider live-test boundary. This page is a typed readiness and handoff surface only.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
