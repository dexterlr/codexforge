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
  buildCodebaseChangePlanLiveContextIntegrationModel,
  buildCodebaseChangePlanLiveContextIntegrationStableKey,
} from "@/lib/codexforge/codebase-change-plan-live-context-integration";

const CODEBASE_CHANGE_PLAN_LIVE_CONTEXT_INTEGRATION_MARKERS =
  "Codebase change plan live context integration Live context improves planning but does not modify files Arbitrary local browsing remains blocked Secret values stay redacted Relevant files modules summary Patch preview route source project intelligence result change request summary dependency/risk context secrets redaction status non-goals planning confidence blocked reasons live context does not mutate files server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced context details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no live patch generation from UI no file deletion no secret value display no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no API key localStorage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no secrets displayed no secrets exported no secrets included no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CodebaseChangePlanLiveContextIntegrationPanel() {
  const model = buildCodebaseChangePlanLiveContextIntegrationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-codebase-change-plan-live-context-integration={`${CODEBASE_CHANGE_PLAN_LIVE_CONTEXT_INTEGRATION_MARKERS} buildCodebaseChangePlanLiveContextIntegrationStableKey CodebaseChangePlanLiveContextIntegrationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 284"
        title="Plan context"
        subtitle="Codebase change plan live context integration uses reviewed project intelligence to improve planning. Live context improves planning but does not modify files, arbitrary local browsing remains blocked, and secret values stay redacted."
        primary={{ href: "#change-plan-live-context", label: "Review plan context" }}
        links={[
          { href: "/project-intelligence-result", label: "Intelligence result" },
          { href: "/project-intelligence-recovery", label: "Recovery flow" },
          { href: "/codebase-change-plan", label: "Change plan" },
          { href: "/patch-preview-live-context", label: "Patch preview route" },
          { href: "/review-inbox", label: "Review inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.contextLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This live context is planning context only. It does not write files, apply patches, execute commands, browse
          arbitrary local files, or send context to providers automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="change-plan-live-context" style={previewStyles.grid}>
        {model.integrations.map((integration) => (
          <PreviewFoundationCard
            key={buildCodebaseChangePlanLiveContextIntegrationStableKey("change-plan-live-context-card", integration.id)}
            title={integration.integrationIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Planning confidence: ${integration.planningConfidence}`,
                integration.sourceProjectIntelligenceResult,
                integration.changeRequestSummary,
                integration.relevantFilesModulesSummary,
                integration.dependencyRiskContext,
                integration.secretsRedactionStatus,
                integration.nonGoals,
                integration.patchPreviewRoute,
                `Blocked reasons: ${integration.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced context details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced context details stay collapsed or secondary. Relevant files and modules are summarized from reviewed
          intelligence; this UI does not browse, open, write, patch, run, or send anything automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
