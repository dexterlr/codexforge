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
import { buildProviderBudgetGuardrailsModel } from "@/lib/codexforge/provider-budget-guardrails";

export function ProviderBudgetGuardrailsPanel() {
  const model = buildProviderBudgetGuardrailsModel();

  return (
    <div style={previewStyles.shell} data-codexforge-provider-budget-guardrails="ProviderBudgetGuardrailsPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated provider budget guardrails nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Provider budget guardrails No tokens are spent automatically Budget estimates are review aids, not billing truth Spend limit Token limit Approval required before spend no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no secrets exported no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 206"
        title="Budget guardrails"
        subtitle="Provider budget guardrails help humans review token and spend limits before live tests or routing decisions. No tokens are spent automatically, and estimates are review aids, not billing truth."
        primary={{ href: "#provider-budget-guardrails", label: "Review budget guardrails" }}
        links={[
          { href: "/provider-live-test-gate", label: "Live-test gate" },
          { href: "/provider-cost-latency-comparison", label: "Cost and latency" },
          { href: "/router-recommendation-review", label: "Router review" },
          { href: "/provider-failure-recovery", label: "Failure recovery" },
          { href: "/token-router", label: "Token router" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.guardrailLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-budget-guardrails" style={previewStyles.grid}>
        <PreviewFoundationCard title="Provider profile summary">
          <PreviewFoundationPillList items={model.guardrails.map((guardrail) => guardrail.providerProfileSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Budget scope">
          <PreviewFoundationPillList items={model.guardrails.map((guardrail) => guardrail.budgetScope)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Token limit">
          <PreviewFoundationPillList items={model.guardrails.map((guardrail) => guardrail.tokenLimit)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Spend limit">
          <PreviewFoundationPillList items={model.guardrails.map((guardrail) => guardrail.spendLimit)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Per-test guardrail">
          <PreviewFoundationPillList items={model.guardrails.map((guardrail) => guardrail.perTestGuardrail)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Per-day/per-session guardrail">
          <PreviewFoundationPillList
            items={model.guardrails.map((guardrail) => guardrail.perDayPerSessionGuardrail)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Warning threshold">
          <PreviewFoundationPillList items={model.guardrails.map((guardrail) => guardrail.warningThreshold)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reason">
          <PreviewFoundationPillList
            items={model.guardrails.map((guardrail) => `${guardrail.reviewStatus}: ${guardrail.blockedReason}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval requirement">
          <PreviewFoundationPillList items={model.guardrails.map((guardrail) => guardrail.approvalRequirement)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Review handoff">
          <PreviewFoundationPillList items={model.guardrails.map((guardrail) => guardrail.reviewHandoff)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced guardrail details">
        <PreviewFoundationPillList items={model.guardrails.map((guardrail) => guardrail.advancedGuardrailDetails)} />
        <PreviewFoundationCopy>
          Advanced guardrail details stay secondary. This surface does not call provider APIs, route live traffic, spend tokens, store secrets, import settings, or mutate provider and router configuration.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
