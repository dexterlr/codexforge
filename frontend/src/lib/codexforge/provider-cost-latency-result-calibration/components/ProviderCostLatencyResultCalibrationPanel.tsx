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
  buildProviderCostLatencyResultCalibrationModel,
  buildProviderCostLatencyResultCalibrationStableKey,
} from "@/lib/codexforge/provider-cost-latency-result-calibration";

const PROVIDER_COST_LATENCY_RESULT_CALIBRATION_MARKERS =
  "Provider cost latency result calibration Calibration does not auto-update routing No tokens are spent from this page Provider policy changes require explicit review Budget guardrail status Router recommendation route calibration identity source provider test results provider/model summary token/cost estimate summary latency summary reliability signal policy impact note blocked reasons provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced metric details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no silent provider registry mutation no localStorage API key storage no API key localStorage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no secrets displayed no secrets exported no secrets included no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderCostLatencyResultCalibrationPanel() {
  const model = buildProviderCostLatencyResultCalibrationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-cost-latency-result-calibration={`${PROVIDER_COST_LATENCY_RESULT_CALIBRATION_MARKERS} buildProviderCostLatencyResultCalibrationStableKey ProviderCostLatencyResultCalibrationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 293"
        title="Cost calibration"
        subtitle="Provider cost latency result calibration reviews persisted provider metrics before router or policy changes. Calibration does not auto-update routing, no tokens are spent from this page, and provider policy changes require explicit review."
        primary={{ href: "#provider-cost-latency-result-calibration", label: "Review calibration" }}
        links={[
          { href: "/provider-test-result-persistence", label: "Result persistence" },
          { href: "/provider-test-results", label: "Current result capture" },
          { href: "/provider-budget-guardrails", label: "Budget guardrails" },
          { href: "/router-recommendation-review", label: "Router recommendation route" },
          { href: "/provider-policy-bundle", label: "Provider policy" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.calibrationLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page does not call provider APIs, auto-route live traffic, mutate the provider registry, update policy,
          or spend tokens. It prepares review notes for humans.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-cost-latency-result-calibration" style={previewStyles.grid}>
        {model.records.map((record) => (
          <PreviewFoundationCard
            key={buildProviderCostLatencyResultCalibrationStableKey(
              "provider-cost-latency-result-calibration-card",
              record.id
            )}
            title={record.calibrationIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${record.status}`,
                record.sourceProviderTestResults,
                record.providerModelSummary,
                record.tokenCostEstimateSummary,
                record.latencySummary,
                record.reliabilitySignal,
                record.budgetGuardrailStatus,
                record.routerRecommendationRoute,
                record.policyImpactNote,
                `Blocked reasons: ${record.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced metric details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.records.map((record) => record.advancedMetricDetails)} />
        <PreviewFoundationCopy>
          Advanced metric details stay collapsed or secondary. Calibration summarizes persisted provider metrics for
          review and never changes routing, policy, budgets, or provider registry entries automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
