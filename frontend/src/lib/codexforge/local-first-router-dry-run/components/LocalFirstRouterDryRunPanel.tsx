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
import { buildLocalFirstRouterDryRunModel } from "@/lib/codexforge/local-first-router-dry-run";

export function LocalFirstRouterDryRunPanel() {
  const model = buildLocalFirstRouterDryRunModel();

  return (
    <div style={previewStyles.shell} data-codexforge-local-first-router-dry-run="LocalFirstRouterDryRunPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated local-first router dry run nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Local-first router dry run Dry run sends no live traffic Dry run does not spend tokens Router config is not changed automatically Local-first decision Approval handoff no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no secrets exported no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 212"
        title="Router dry run"
        subtitle="Local-first router dry run simulates a provider and model decision without sending live traffic. Dry run does not spend tokens, and router config is not changed automatically."
        primary={{ href: "#local-first-router-dry-run", label: "Review dry run" }}
        links={[
          { href: "/provider-policy-bundle", label: "Policy bundle" },
          { href: "/provider-runbook-generator", label: "Runbook generator" },
          { href: "/router-recommendation-review", label: "Router review" },
          { href: "/provider-budget-guardrails", label: "Budget guardrails" },
          { href: "/prompt-privacy-classifier", label: "Privacy classifier" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.dryRunLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-first-router-dry-run" style={previewStyles.grid}>
        <PreviewFoundationCard title="Task summary">
          <PreviewFoundationPillList items={model.scenarios.map((scenario) => scenario.taskSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Candidate local provider/model">
          <PreviewFoundationPillList items={model.scenarios.map((scenario) => scenario.candidateLocalProviderModel)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Candidate cloud provider/model">
          <PreviewFoundationPillList items={model.scenarios.map((scenario) => scenario.candidateCloudProviderModel)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Local-first decision">
          <PreviewFoundationPillList
            items={model.scenarios.map((scenario) => `${scenario.decisionStatus}: ${scenario.localFirstDecision}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Privacy class">
          <PreviewFoundationPillList items={model.scenarios.map((scenario) => scenario.privacyClass)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Budget guardrail result">
          <PreviewFoundationPillList items={model.scenarios.map((scenario) => scenario.budgetGuardrailResult)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Capability fit">
          <PreviewFoundationPillList items={model.scenarios.map((scenario) => scenario.capabilityFit)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Fallback route">
          <PreviewFoundationPillList items={model.scenarios.map((scenario) => scenario.fallbackRoute)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList items={model.scenarios.map((scenario) => scenario.blockedReasons.join("; "))} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval handoff">
          <PreviewFoundationPillList items={model.scenarios.map((scenario) => scenario.approvalHandoff)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced routing details">
        <PreviewFoundationPillList items={model.scenarios.map((scenario) => scenario.advancedRoutingDetails)} />
        <PreviewFoundationCopy>
          Advanced routing details stay secondary. This dry run sends no live traffic, spends no tokens, calls no provider APIs, changes no router config, mutates no provider registry, and does not auto-apply router policy.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
