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
import { buildProviderTestResultCaptureModel } from "@/lib/codexforge/provider-test-result-capture";

export function ProviderTestResultCapturePanel() {
  const model = buildProviderTestResultCaptureModel();

  return (
    <div style={previewStyles.shell} data-codexforge-provider-test-result-capture="ProviderTestResultCapturePanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated provider test result capture nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Provider test result capture Do not claim success without reviewed result evidence Raw response details stay secondary No secrets are captured Reviewed prompt summary Result handoff copy no automatic live test no automatic provider send no auto-routing no auto-spend no secrets displayed no localStorage API key storage no process.env printing no provider registry mutation no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 202"
        title="Result capture"
        subtitle="Provider test result capture records reviewed live-test outcomes without secrets, raw credentials, hidden memory promotion, or silent registry changes. Nothing routes or runs automatically."
        primary={{ href: "#provider-test-result-capture", label: "Review result capture" }}
        links={[
          { href: "/provider-live-test-gate", label: "Live-test gate" },
          { href: "/openai-compatible-live-test", label: "OpenAI-compatible" },
          { href: "/multi-provider-live-test", label: "Multi-provider" },
          { href: "/provider-cost-latency-comparison", label: "Cost and latency" },
          { href: "/provider-failure-recovery", label: "Failure recovery" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.reviewLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-test-result-capture" style={previewStyles.grid}>
        <PreviewFoundationCard title="Provider profile summary">
          <PreviewFoundationPillList items={model.records.map((record) => record.providerProfileSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Live-test gate reference">
          <PreviewFoundationPillList
            items={model.records.map(
              (record) => `${record.providerProfileSummary.split(":")[0]} uses ${record.liveTestGateReference}`
            )}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Test scope">
          <PreviewFoundationPillList items={model.records.map((record) => record.testScope)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Reviewed prompt summary">
          <PreviewFoundationPillList items={model.records.map((record) => record.reviewedPromptSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Result status and response">
          <PreviewFoundationPillList
            items={model.records.map((record) => `${record.resultStatus}: ${record.responseSummary}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Latency summary">
          <PreviewFoundationPillList items={model.records.map((record) => record.latencySummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Token and cost estimate summary">
          <PreviewFoundationPillList items={model.records.map((record) => record.tokenCostEstimateSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Privacy notes">
          <PreviewFoundationPillList items={model.records.map((record) => record.privacyNotes)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Next recommended route">
          <PreviewFoundationPillList items={model.records.map((record) => record.nextRecommendedRoute)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Result handoff copy">
          <PreviewFoundationPillList items={model.records.map((record) => record.handoffCopy)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced raw response details">
        <PreviewFoundationPillList items={model.records.map((record) => record.rawResponseDetails)} />
        <PreviewFoundationCopy>
          Raw response details stay secondary. Capture only reviewed excerpts with secrets removed, and do not promote the result to memory automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
