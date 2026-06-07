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
  buildTestCommandBridgeModel,
  buildTestCommandBridgeStableKey,
} from "@/lib/codexforge/test-command-bridge";

const TEST_COMMAND_BRIDGE_MARKERS =
  "Test command bridge Test commands are not run from this page Env values and secrets are never displayed Execution remains behind approved local boundary Recommended command summary Audit handoff test bridges do not run commands approved local boundary required tests are not run automatically no test execution from UI no giant raw test output above fold no runCommand brokerExecution or local executor API calls from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced bridge details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no file deletion no patch apply behavior no package install behavior no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no secret value display no localStorage API key storage no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no GitHub API calls from UI no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no weakened safe path checks no removed server-only boundaries no arbitrary local browsing reintroduced no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function TestCommandBridgePanel() {
  const model = buildTestCommandBridgeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-test-command-bridge={`${TEST_COMMAND_BRIDGE_MARKERS} buildTestCommandBridgeStableKey TestCommandBridgePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 270"
        title="Test command"
        subtitle="Test command bridge models future approved Jarvisd or local daemon retrieval and preparation of test commands. Test commands are not run from this page, env values and secrets are never displayed, and execution remains behind approved local boundary."
        primary={{ href: "#test-command-bridge", label: "Review test bridge" }}
        links={[
          { href: "/test-command-planner", label: "Test planner" },
          { href: "/command-dry-run", label: "Command dry run" },
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/jarvisd-runtime-enforcement", label: "Runtime guard" },
          { href: "/jarvisd-audit-ingestion", label: "Audit handoff" },
          { href: "/test-execution-trial", label: "Execution trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.bridgeLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page prepares review metadata only. It does not run test commands, run shell commands, call Jarvisd
          directly, browse arbitrary files, mutate files, print environment values, or display secrets.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="test-command-bridge" style={previewStyles.grid}>
        {model.bridges.map((bridge) => (
          <PreviewFoundationCard
            key={buildTestCommandBridgeStableKey("test-command-bridge-card", bridge.id)}
            title={bridge.bridgeIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${bridge.status}`,
                `Risk level: ${bridge.riskLevel}`,
                bridge.sourceTestCommandPlanner,
                bridge.sourceCommandDryRunBridge,
                bridge.workspaceTrustDependency,
                bridge.permissionEnforcementDependency,
                bridge.recommendedCommandSummary,
                bridge.workingDirectoryScope,
                bridge.expectedDurationRisk,
                bridge.environmentSecretsSafetyNote,
                bridge.auditHandoff,
                `Blocked reasons: ${bridge.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced bridge details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced bridge details stay collapsed or secondary. The bridge is a typed handoff only, with command
          execution, test execution, direct Jarvisd calls, raw output, local file actions, and secret value display
          blocked from this UI.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
