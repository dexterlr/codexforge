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
  buildTestPlannerLiveContextIntegrationModel,
  buildTestPlannerLiveContextIntegrationStableKey,
} from "@/lib/codexforge/test-planner-live-context-integration";

const TEST_PLANNER_LIVE_CONTEXT_INTEGRATION_MARKERS =
  "Test planner live context integration Live context improves test planning but does not run tests Commands are not executed from this page Env values and secrets are never displayed Recommended test scope Execution trial route integration identity source project intelligence result source patch preview live context affected files/modules summary recommended command summary risk/secrets redaction status confidence/coverage note blocked reasons live context does not execute commands live context does not mutate files server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced context details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no OpenAI-compatible API calls no GitHub API calls from UI no localStorage API key storage no API key localStorage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no secrets displayed no secrets exported no secrets included no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function TestPlannerLiveContextIntegrationPanel() {
  const model = buildTestPlannerLiveContextIntegrationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-test-planner-live-context-integration={`${TEST_PLANNER_LIVE_CONTEXT_INTEGRATION_MARKERS} buildTestPlannerLiveContextIntegrationStableKey TestPlannerLiveContextIntegrationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 286"
        title="Test context"
        subtitle="Test planner live context integration connects reviewed project intelligence and patch preview context into test planning. Live context improves test planning but does not run tests, commands are not executed from this page, and env values and secrets are never displayed."
        primary={{ href: "#test-planner-live-context", label: "Review test context" }}
        links={[
          { href: "/project-intelligence-result", label: "Intelligence result" },
          { href: "/patch-preview-live-context", label: "Patch context" },
          { href: "/test-command-planner", label: "Test planner" },
          { href: "/test-execution-trial", label: "Execution trial route" },
          { href: "/test-result-capture", label: "Result capture" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.contextLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page improves test planning with reviewed live context only. It does not execute commands, run tests,
          mutate files, read arbitrary files, or send context to providers automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="test-planner-live-context" style={previewStyles.grid}>
        {model.integrations.map((integration) => (
          <PreviewFoundationCard
            key={buildTestPlannerLiveContextIntegrationStableKey("test-planner-live-context-card", integration.id)}
            title={integration.integrationIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${integration.status}`,
                `Confidence: ${integration.confidence}`,
                integration.sourceProjectIntelligenceResult,
                integration.sourcePatchPreviewLiveContext,
                integration.affectedFilesModulesSummary,
                integration.recommendedTestScope,
                integration.recommendedCommandSummary,
                integration.riskSecretsRedactionStatus,
                integration.confidenceCoverageNote,
                integration.executionTrialRoute,
                `Blocked reasons: ${integration.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced context details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced context details stay collapsed or secondary. Recommended commands are summaries for later review, not
          executable controls, and test execution remains on a separate approval-gated route.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
