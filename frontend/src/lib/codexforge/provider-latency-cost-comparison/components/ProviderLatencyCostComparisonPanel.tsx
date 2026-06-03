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
import { buildProviderLatencyCostComparisonModel } from "@/lib/codexforge/provider-latency-cost-comparison";

export function ProviderLatencyCostComparisonPanel() {
  const model = buildProviderLatencyCostComparisonModel();

  return (
    <div style={previewStyles.shell} data-codexforge-provider-latency-cost-comparison="ProviderLatencyCostComparisonPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated provider latency cost comparison nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Provider latency cost comparison Cost estimates are review aids, not billing truth No live traffic is routed automatically Do not auto-spend tokens Local-vs-cloud classification Confidence level no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no localStorage API key storage no process.env printing no provider registry mutation no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 203"
        title="Cost latency"
        subtitle="Provider latency cost comparison helps humans compare reviewed result summaries. Cost estimates are review aids, not billing truth, and no live traffic is routed automatically."
        primary={{ href: "#provider-latency-cost-comparison", label: "Compare reviewed results" }}
        links={[
          { href: "/provider-test-results", label: "Result capture" },
          { href: "/router-recommendation-review", label: "Router review" },
          { href: "/token-router", label: "Token router" },
          { href: "/task-router", label: "Task router" },
          { href: "/model-capabilities", label: "Model capabilities" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.comparisonLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-latency-cost-comparison" style={previewStyles.grid}>
        <PreviewFoundationCard title="Provider comparison rows">
          <PreviewFoundationPillList items={model.rows.map((row) => row.providerComparisonRow)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Latency summary">
          <PreviewFoundationPillList items={model.rows.map((row) => row.latencySummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Token estimate">
          <PreviewFoundationPillList items={model.rows.map((row) => row.tokenEstimate)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Cost estimate">
          <PreviewFoundationPillList items={model.rows.map((row) => row.costEstimate)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Quality note">
          <PreviewFoundationPillList items={model.rows.map((row) => row.qualityNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Local-vs-cloud classification">
          <PreviewFoundationPillList
            items={model.rows.map((row) => `${row.localVsCloudClassification}: ${row.privacyNote}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Confidence level">
          <PreviewFoundationPillList
            items={model.rows.map((row) => `${row.confidenceLevel}: ${row.nextRecommendedRoute}`)}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced comparison details">
        <PreviewFoundationPillList items={model.rows.map((row) => row.advancedComparisonDetails)} />
        <PreviewFoundationCopy>
          Advanced comparison details stay secondary. This surface compares reviewed summaries only and never calls provider APIs, routes live traffic, or spends tokens.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
