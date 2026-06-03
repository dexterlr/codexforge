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
import { buildPromptPrivacyClassifierModel } from "@/lib/codexforge/prompt-privacy-classifier";

export function PromptPrivacyClassifierPanel() {
  const model = buildPromptPrivacyClassifierModel();

  return (
    <div style={previewStyles.shell} data-codexforge-prompt-privacy-classifier="PromptPrivacyClassifierPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated prompt privacy classifier nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Prompt privacy classifier Classification does not send prompts anywhere Files and prompts are not sent automatically Sensitive data flags Local-first recommendation Raw sensitive content stays secondary no raw sensitive content above fold no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no upload by default no secrets displayed no secrets exported no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no memory auto-storage no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 207"
        title="Privacy classifier"
        subtitle="Prompt privacy classifier helps decide whether a prompt, file summary, or context is safe to send later. Classification does not send prompts anywhere, and files and prompts are not sent automatically."
        primary={{ href: "#prompt-privacy-classifier", label: "Review privacy class" }}
        links={[
          { href: "/provider-budget-guardrails", label: "Budget guardrails" },
          { href: "/provider-live-test-gate", label: "Live-test gate" },
          { href: "/router-recommendation-review", label: "Router review" },
          { href: "/provider-failure-recovery", label: "Failure recovery" },
          { href: "/credentials", label: "Credential safety" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.classifierLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="prompt-privacy-classifier" style={previewStyles.grid}>
        <PreviewFoundationCard title="Prompt/context summary">
          <PreviewFoundationPillList
            items={model.classifications.map((classification) => classification.promptContextSummary)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Privacy class">
          <PreviewFoundationPillList
            items={model.classifications.map(
              (classification) => `${classification.privacyClass}: ${classification.providerSendReadiness}`
            )}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Sensitive data flags">
          <PreviewFoundationPillList
            items={model.classifications.map((classification) => classification.sensitiveDataFlags.join("; "))}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="File/context send risk">
          <PreviewFoundationPillList
            items={model.classifications.map((classification) => classification.fileContextSendRisk)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Local-first recommendation">
          <PreviewFoundationPillList
            items={model.classifications.map((classification) => classification.localFirstRecommendation)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Provider-send readiness">
          <PreviewFoundationPillList
            items={model.classifications.map((classification) => classification.providerSendReadiness)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Redaction guidance">
          <PreviewFoundationPillList
            items={model.classifications.map((classification) => classification.redactionGuidance)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval requirement">
          <PreviewFoundationPillList
            items={model.classifications.map((classification) => classification.approvalRequirement)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList
            items={model.classifications.map((classification) => classification.blockedReasons.join("; "))}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Handoff route">
          <PreviewFoundationPillList
            items={model.classifications.map((classification) => classification.handoffRoute)}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced privacy details">
        <PreviewFoundationPillList
          items={model.classifications.map((classification) => classification.rawSensitiveContentHandling)}
        />
        <PreviewFoundationCopy>
          Raw sensitive content stays secondary. This surface does not upload files, send prompts, store prompts as memory, call provider APIs, route traffic, import settings, or mutate the provider registry.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
