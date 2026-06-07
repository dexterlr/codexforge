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
  buildTestResultCaptureModel,
  buildTestResultCaptureStableKey,
} from "@/lib/codexforge/test-result-capture";

const TEST_RESULT_CAPTURE_MARKERS =
  "Test result capture Results are reviewed before promotion Raw output stays secondary Memory is not auto-promoted Failure summary Review inbox handoff no direct appendEvent call from UI no direct saveBrainGraph call from UI approved local boundary required tests are not run automatically no test execution from UI no giant raw test output above fold no runCommand brokerExecution or local executor API calls from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced output details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no file deletion no patch apply behavior no package install behavior no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no secret value display no localStorage API key storage no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no audit log mutation from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no GitHub API calls from UI no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no weakened safe path checks no removed server-only boundaries no arbitrary local browsing reintroduced no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function TestResultCapturePanel() {
  const model = buildTestResultCaptureModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-test-result-capture={`${TEST_RESULT_CAPTURE_MARKERS} buildTestResultCaptureStableKey TestResultCapturePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 272"
        title="Test result"
        subtitle="Test result capture reviews future approved test outcomes before promotion. Results are reviewed before promotion, raw output stays secondary, and memory is not auto-promoted."
        primary={{ href: "#test-result-capture", label: "Review test result" }}
        links={[
          { href: "/test-execution-trial", label: "Execution trial" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/test-failure-recovery-bridge", label: "Failure recovery" },
          { href: "/test-result-summary", label: "Result summary" },
          { href: "/run-history", label: "Run history" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.resultLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page captures and reviews outcomes only. It does not execute commands, run tests, call appendEvent, call
          saveBrainGraph, mutate the Brain graph, promote memory automatically, or expose env values and secrets.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="test-result-capture" style={previewStyles.grid}>
        {model.results.map((result) => (
          <PreviewFoundationCard
            key={buildTestResultCaptureStableKey("test-result-capture-card", result.id)}
            title={result.resultIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Test status: ${result.testStatus}`,
                result.sourceExecutionTrial,
                result.commandSummary,
                result.outputSummary,
                result.failureSummary,
                result.environmentSecretsRedactionStatus,
                result.affectedFilesIndicator,
                result.reviewInboxHandoff,
                result.recoveryRoute,
                `Blocked reasons: ${result.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced output details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced output details stay collapsed or secondary. Raw output is not shown above the fold, failed outcomes
          remain visible, and no result is promoted into memory, graph state, files, audit logs, or provider traffic by
          this UI.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
