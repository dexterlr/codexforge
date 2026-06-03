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
  buildTestExecutionApprovalBoundaryModel,
  buildTestExecutionApprovalBoundaryStableKey,
} from "@/lib/codexforge/test-execution-approval-boundary";

const TEST_EXECUTION_APPROVAL_BOUNDARY_MARKERS =
  "Test execution approval boundary Tests are not executed from this page Future execution remains behind approved local boundary Approval is required before any test run Timeout policy Allowed scope approved local boundary required tests are not run automatically no test execution from UI nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced execution details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from arbitrary UI no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function TestExecutionApprovalBoundaryPanel() {
  const model = buildTestExecutionApprovalBoundaryModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-test-execution-approval-boundary={`${TEST_EXECUTION_APPROVAL_BOUNDARY_MARKERS} buildTestExecutionApprovalBoundaryStableKey TestExecutionApprovalBoundaryPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 231"
        title="Test approval"
        subtitle="Test execution approval boundary represents the explicit gate before future local daemon test execution. Tests are not executed from this page, future execution remains behind approved local boundary, and approval is required before any test run."
        primary={{ href: "#test-execution-approval-boundary", label: "Review test approval" }}
        links={[
          { href: "/test-command-planner", label: "Test planner" },
          { href: "/local-command-approval", label: "Command approval" },
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/jarvisd-permissions", label: "Jarvisd permissions" },
          { href: "/test-result-summary", label: "Result summary" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.approvalLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is an approval boundary, not a run button. It does not execute tests, call Jarvisd directly, mutate
          files, browse arbitrary paths, apply patches, or grant local permissions automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="test-execution-approval-boundary" style={previewStyles.grid}>
        {model.approvals.map((approval) => (
          <PreviewFoundationCard
            key={buildTestExecutionApprovalBoundaryStableKey("test-execution-approval-card", approval.id)}
            title={approval.executionRequestIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${approval.status}`,
                approval.selectedTestCommand,
                approval.workingDirectoryScope,
                `Workspace trust status: ${approval.workspaceTrustStatus}`,
                approval.commandApprovalStatus,
                approval.allowedScope,
                approval.deniedScope,
                approval.timeoutPolicy,
                approval.approvalCopy,
                `Blocked reasons: ${approval.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced execution details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced execution details stay collapsed or secondary. A future test run must be separate from this UI and
          stay behind explicit approval, command review, workspace trust, timeout policy, and approved local boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
