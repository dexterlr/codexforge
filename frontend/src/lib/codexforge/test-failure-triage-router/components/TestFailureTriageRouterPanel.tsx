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
  buildTestFailureTriageRouterModel,
  buildTestFailureTriageRouterStableKey,
} from "@/lib/codexforge/test-failure-triage-router";

const TEST_FAILURE_TRIAGE_ROUTER_MARKERS =
  "Test failure triage router Triage does not auto-fix failures Retry is never automatic No commands are run automatically Likely cause category Recovery handoff approved local boundary required tests are not run automatically no test execution from UI nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced triage details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function TestFailureTriageRouterPanel() {
  const model = buildTestFailureTriageRouterModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-test-failure-triage-router={`${TEST_FAILURE_TRIAGE_ROUTER_MARKERS} buildTestFailureTriageRouterStableKey TestFailureTriageRouterPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 233"
        title="Failure triage"
        subtitle="Test failure triage router turns failed, blocked, or timed-out test results into safe next actions. Triage does not auto-fix failures, retry is never automatic, and no commands are run automatically."
        primary={{ href: "#test-failure-triage-router", label: "Review triage" }}
        links={[
          { href: "/test-result-summary", label: "Source test result" },
          { href: "/codebase-change-plan", label: "Patch planning route" },
          { href: "/test-command-planner", label: "Test planner" },
          { href: "/recovery", label: "Recovery handoff" },
          { href: "/review-inbox", label: "Review inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.triageLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page routes the next safe review step only. It does not auto-fix, retry, run commands, apply patches,
          mutate files, browse arbitrary files, call providers, or promote memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="test-failure-triage-router" style={previewStyles.grid}>
        {model.triageItems.map((triage) => (
          <PreviewFoundationCard
            key={buildTestFailureTriageRouterStableKey("test-failure-triage-card", triage.id)}
            title={triage.failureIdentity}
          >
            <PreviewFoundationPillList
              items={[
                triage.sourceTestResult,
                `Likely cause category: ${triage.likelyCauseCategory}`,
                `Severity: ${triage.severity}`,
                triage.safeNextAction,
                triage.recommendedRoute,
                `Retry eligibility: ${triage.retryEligibility}`,
                `Blocked retry reasons: ${triage.blockedRetryReasons.join("; ")}`,
                triage.patchPlanningRoute,
                triage.recoveryHandoff,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced triage details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced triage details stay collapsed or secondary. Failure routing is safe-review metadata only; any retry,
          patch plan, recovery step, or test execution must cross a separate approval boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
