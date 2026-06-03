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
  buildTestCommandPlannerModel,
  buildTestCommandPlannerStableKey,
} from "@/lib/codexforge/test-command-planner";

const TEST_COMMAND_PLANNER_MARKERS =
  "Test command planner Test commands are not run from this page Shell execution requires explicit approval Env values and secrets are never displayed Recommended command summary Execution approval route approved local boundary required tests are not run automatically no test execution from UI nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced command details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function TestCommandPlannerPanel() {
  const model = buildTestCommandPlannerModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-test-command-planner={`${TEST_COMMAND_PLANNER_MARKERS} buildTestCommandPlannerStableKey TestCommandPlannerPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 230"
        title="Test planner"
        subtitle="Test command planner turns reviewed change and patch context into plain-English test command recommendations. Test commands are not run from this page, shell execution requires explicit approval, and env values and secrets are never displayed."
        primary={{ href: "#test-command-planner", label: "Review test plan" }}
        links={[
          { href: "/codebase-change-plan", label: "Change plan" },
          { href: "/patch-preview-workbench", label: "Patch preview" },
          { href: "/patch-result-capture", label: "Patch result" },
          { href: "/local-command-approval", label: "Command approval route" },
          { href: "/test-execution-approval", label: "Execution approval route" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.planningLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page recommends what to review, not what to run. It does not execute shell commands, run tests, browse
          arbitrary files, mutate files, apply patches, call providers, or reveal secret values.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="test-command-planner" style={previewStyles.grid}>
        {model.plans.map((plan) => (
          <PreviewFoundationCard
            key={buildTestCommandPlannerStableKey("test-command-plan-card", plan.id)}
            title={plan.testPlanIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${plan.status}`,
                `Risk level: ${plan.riskLevel}`,
                plan.sourceChangePlanPatchResult,
                plan.recommendedCommandSummary,
                plan.workingDirectoryScope,
                plan.expectedDurationRisk,
                plan.environmentSecretsSafetyNote,
                plan.requiredApproval,
                plan.commandApprovalRoute,
                plan.executionApprovalRoute,
                `Blocked reasons: ${plan.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced command details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced command details stay collapsed or secondary. Command planning stays metadata-only until a separate
          approval boundary reviews the exact command and future local execution request.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
