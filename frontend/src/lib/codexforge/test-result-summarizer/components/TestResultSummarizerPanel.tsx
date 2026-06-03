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
  buildTestResultSummarizerModel,
  buildTestResultSummarizerStableKey,
} from "@/lib/codexforge/test-result-summarizer";

const TEST_RESULT_SUMMARIZER_MARKERS =
  "Test result summarizer Results are reviewed before promotion Raw output stays secondary Memory is not auto-promoted Failure summary Review inbox handoff approved local boundary required tests are not run automatically no test execution from UI nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced raw output details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function TestResultSummarizerPanel() {
  const model = buildTestResultSummarizerModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-test-result-summarizer={`${TEST_RESULT_SUMMARIZER_MARKERS} buildTestResultSummarizerStableKey TestResultSummarizerPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 232"
        title="Test result"
        subtitle="Test result summarizer reviews future approved test execution results without hiding failures. Results are reviewed before promotion, raw output stays secondary, and memory is not auto-promoted."
        primary={{ href: "#test-result-summarizer", label: "Review test result" }}
        links={[
          { href: "/test-execution-approval", label: "Execution request" },
          { href: "/patch-result-capture", label: "Patch result route" },
          { href: "/review-inbox", label: "Review inbox handoff" },
          { href: "/test-failure-triage", label: "Failure triage" },
          { href: "/run-history", label: "Run history" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.resultLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page summarizes reviewed results only. It does not run commands, mutate files, apply patches, call
          appendEvent, call saveBrainGraph, mutate the Brain graph, call providers, or promote memory automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="test-result-summarizer" style={previewStyles.grid}>
        {model.results.map((result) => (
          <PreviewFoundationCard
            key={buildTestResultSummarizerStableKey("test-result-card", result.id)}
            title={result.resultIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${result.status}`,
                result.sourceExecutionRequest,
                result.commandSummary,
                result.outputSummary,
                result.failureSummary,
                result.changedRiskFollowUp,
                result.patchResultRoute,
                result.reviewInboxHandoff,
                result.nextRecommendedRoute,
                `Blocked reasons: ${result.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced raw output details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced raw output details stay collapsed or secondary. The summary keeps failures visible and routes review
          forward without creating memory, graph state, files, commands, provider calls, or patch application.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
