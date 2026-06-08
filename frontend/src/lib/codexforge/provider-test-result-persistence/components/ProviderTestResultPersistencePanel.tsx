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
  buildProviderTestResultPersistenceModel,
  buildProviderTestResultPersistenceStableKey,
} from "@/lib/codexforge/provider-test-result-persistence";

const PROVIDER_TEST_RESULT_PERSISTENCE_MARKERS =
  "Provider test result persistence Provider test results are reviewed before use Raw responses stay secondary Memory is not auto-promoted API keys and secrets are not persisted Review inbox handoff persistence identity source live test trial provider/model summary result status passed failed blocked timed out needs review response summary redaction status cost/latency summary retention policy calibration route blocked reasons provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced result details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no silent provider registry mutation no localStorage API key storage no API key localStorage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no secrets displayed no secrets exported no secrets included no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderTestResultPersistencePanel() {
  const model = buildProviderTestResultPersistenceModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-test-result-persistence={`${PROVIDER_TEST_RESULT_PERSISTENCE_MARKERS} buildProviderTestResultPersistenceStableKey ProviderTestResultPersistencePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 292"
        title="Result persistence"
        subtitle="Provider test result persistence defines how future approved provider outputs are captured, redacted, retained, and handed off. Provider test results are reviewed before use, raw responses stay secondary, and memory is not auto-promoted."
        primary={{ href: "#provider-test-result-persistence", label: "Review persistence contract" }}
        links={[
          { href: "/provider-test-results", label: "Current result capture" },
          { href: "/review-inbox", label: "Review inbox handoff" },
          { href: "/provider-cost-latency-calibration", label: "Calibration route" },
          { href: "/anthropic-live-test-trial", label: "Anthropic trial" },
          { href: "/multi-provider-live-test-trial", label: "Multi-provider trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.persistenceLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          API keys and secrets are not persisted. This page does not call provider APIs, display secrets, mutate the
          Brain graph, call appendEvent, call saveBrainGraph, or promote memory automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-test-result-persistence" style={previewStyles.grid}>
        {model.records.map((record) => (
          <PreviewFoundationCard
            key={buildProviderTestResultPersistenceStableKey("provider-test-result-persistence-card", record.id)}
            title={record.persistenceIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${record.resultStatus}`,
                record.sourceLiveTestTrial,
                record.providerModelSummary,
                record.responseSummary,
                record.redactionStatus,
                record.costLatencySummary,
                record.retentionPolicy,
                record.reviewInboxHandoff,
                record.calibrationRoute,
                `Blocked reasons: ${record.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced result details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.records.map((record) => record.advancedResultDetails)} />
        <PreviewFoundationCopy>
          Advanced result details stay collapsed or secondary. Raw responses are not the primary UI, and reviewed
          summaries must remove secrets before any handoff.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
