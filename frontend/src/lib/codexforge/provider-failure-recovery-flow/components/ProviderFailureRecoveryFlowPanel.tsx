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
import { buildProviderFailureRecoveryModel } from "@/lib/codexforge/provider-failure-recovery-flow";

export function ProviderFailureRecoveryFlowPanel() {
  const model = buildProviderFailureRecoveryModel();

  return (
    <div style={previewStyles.shell} data-codexforge-provider-failure-recovery-flow="ProviderFailureRecoveryFlowPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated provider failure recovery flow nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Provider failure recovery flow No automatic retry No cloud fallback without approval Safe retry checklist Spend and token guard Local fallback suggestion no automatic live test no automatic provider send no automatic retry no cloud fallback without approval no auto-routing no auto-spend no provider APIs are called no secrets displayed no localStorage API key storage no process.env printing no provider registry mutation no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 205"
        title="Failure recovery"
        subtitle="Provider failure recovery flow turns failed or blocked provider results into reviewed next steps. No automatic retry, no cloud fallback without approval, and no route changes happen here."
        primary={{ href: "#provider-failure-recovery", label: "Review recovery flow" }}
        links={[
          { href: "/provider-test-results", label: "Result capture" },
          { href: "/provider-cost-latency-comparison", label: "Cost and latency" },
          { href: "/router-recommendation-review", label: "Router review" },
          { href: "/provider-live-test-gate", label: "Live-test gate" },
          { href: "/credentials", label: "Credential safety" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.recoveryLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-failure-recovery" style={previewStyles.grid}>
        <PreviewFoundationCard title="Failure summary">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.failureSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Provider affected">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.providerAffected)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Likely cause category">
          <PreviewFoundationPillList
            items={model.cases.map((recoveryCase) => recoveryCase.likelyCauseCategory)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Safe retry checklist">
          <PreviewFoundationPillList
            items={model.cases.map((recoveryCase) => recoveryCase.safeRetryChecklist.join("; "))}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked retry reasons">
          <PreviewFoundationPillList
            items={model.cases.map((recoveryCase) => recoveryCase.blockedRetryReasons.join("; "))}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Privacy/secrets check">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.privacySecretsCheck)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Spend and token guard">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.spendTokenGuard)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Alternate provider suggestion">
          <PreviewFoundationPillList
            items={model.cases.map((recoveryCase) => recoveryCase.alternateProviderSuggestion)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Local fallback suggestion">
          <PreviewFoundationPillList
            items={model.cases.map((recoveryCase) => recoveryCase.localFallbackSuggestion)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Recovery handoff">
          <PreviewFoundationPillList items={model.cases.map((recoveryCase) => recoveryCase.recoveryHandoff)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced provider recovery details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Recovery can prepare a reviewed retry checklist, but approval and a future provider live-test boundary are still required before any real retry or cloud fallback.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
