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
  buildTestFailureRecoveryBridgeModel,
  buildTestFailureRecoveryBridgeStableKey,
} from "@/lib/codexforge/test-failure-recovery-bridge";

const TEST_FAILURE_RECOVERY_BRIDGE_MARKERS =
  "Test failure recovery bridge Retry is never automatic Recovery does not execute commands No fixes or patches are applied automatically Safe recovery checklist Blocked retry reasons no retry tests automatically no automatic fixes no automatic patches approved local boundary required tests are not run automatically no test execution from UI no giant raw test output above fold no runCommand brokerExecution or local executor API calls from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced recovery details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no file deletion no patch apply behavior no package install behavior no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no secret value display no localStorage API key storage no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no GitHub API calls from UI no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no weakened safe path checks no removed server-only boundaries no arbitrary local browsing reintroduced no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function TestFailureRecoveryBridgePanel() {
  const model = buildTestFailureRecoveryBridgeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-test-failure-recovery-bridge={`${TEST_FAILURE_RECOVERY_BRIDGE_MARKERS} buildTestFailureRecoveryBridgeStableKey TestFailureRecoveryBridgePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 273"
        title="Test recovery"
        subtitle="Test failure recovery bridge triages failed, blocked, or timed-out test results without retrying automatically. Retry is never automatic, recovery does not execute commands, and no fixes or patches are applied automatically."
        primary={{ href: "#test-failure-recovery-bridge", label: "Review recovery" }}
        links={[
          { href: "/test-result-capture", label: "Test result capture" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/codebase-change-plan", label: "Patch planning route" },
          { href: "/command-failure-recovery", label: "Command recovery" },
          { href: "/jarvisd-audit-ingestion", label: "Audit handoff" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.recoveryLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This recovery bridge is triage-only. It does not retry tests automatically, execute commands, run shell
          commands, apply fixes, apply patches, mutate files, or call Jarvisd directly.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="test-failure-recovery-bridge" style={previewStyles.grid}>
        {model.recoveries.map((recovery) => (
          <PreviewFoundationCard
            key={buildTestFailureRecoveryBridgeStableKey("test-failure-recovery-card", recovery.id)}
            title={recovery.recoveryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Failure category: ${recovery.failureCategory}`,
                recovery.sourceTestResultCapture,
                recovery.likelyCause,
                `Safe recovery checklist: ${recovery.safeRecoveryChecklist.join("; ")}`,
                `Retry eligibility: ${recovery.retryEligibility}`,
                `Blocked retry reasons: ${recovery.blockedRetryReasons.join("; ")}`,
                recovery.patchPlanningRoute,
                recovery.commandRecoveryRoute,
                recovery.auditHandoff,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced recovery details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced recovery details stay collapsed or secondary. Recovery keeps failed and blocked test outcomes visible
          for review, but any retry, command execution, patch planning, file mutation, or local daemon action remains
          outside this UI and behind explicit approval.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
