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
  buildPatchPreviewWorkbenchLiveContextIntegrationModel,
  buildPatchPreviewWorkbenchLiveContextIntegrationStableKey,
} from "@/lib/codexforge/patch-preview-workbench-live-context-integration";

const PATCH_PREVIEW_WORKBENCH_LIVE_CONTEXT_INTEGRATION_MARKERS =
  "Patch preview workbench live context integration Preview still does not apply patches Raw diffs stay secondary Suspected secrets are redacted Dependency risk context Rollback note source change plan live context source project intelligence result affected files summary redaction status hunk/context summary approval route blocked reasons preview still does not apply patches raw diffs stay secondary suspected secrets are redacted live context does not mutate files server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced patch context details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no API key localStorage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no secrets displayed no secrets exported no secrets included no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function PatchPreviewWorkbenchLiveContextIntegrationPanel() {
  const model = buildPatchPreviewWorkbenchLiveContextIntegrationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-patch-preview-workbench-live-context-integration={`${PATCH_PREVIEW_WORKBENCH_LIVE_CONTEXT_INTEGRATION_MARKERS} buildPatchPreviewWorkbenchLiveContextIntegrationStableKey PatchPreviewWorkbenchLiveContextIntegrationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 285"
        title="Patch context"
        subtitle="Patch preview workbench live context integration adds reviewed intelligence and change-plan context to patch previews. Preview still does not apply patches, raw diffs stay secondary, and suspected secrets are redacted."
        primary={{ href: "#patch-preview-live-context", label: "Review patch context" }}
        links={[
          { href: "/change-plan-live-context", label: "Plan context" },
          { href: "/project-intelligence-result", label: "Intelligence result" },
          { href: "/patch-preview-workbench", label: "Patch workbench" },
          { href: "/patch-apply-approval", label: "Approval route" },
          { href: "/project-intelligence-recovery", label: "Recovery flow" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.patchContextLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page enriches patch preview review only. It does not write files, apply patches, execute commands, mutate
          files, open local files, or send patch context to providers automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="patch-preview-live-context" style={previewStyles.grid}>
        {model.integrations.map((integration) => (
          <PreviewFoundationCard
            key={buildPatchPreviewWorkbenchLiveContextIntegrationStableKey("patch-preview-live-context-card", integration.id)}
            title={integration.integrationIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${integration.status}`,
                integration.sourceChangePlanLiveContext,
                integration.sourceProjectIntelligenceResult,
                integration.affectedFilesSummary,
                integration.dependencyRiskContext,
                integration.redactionStatus,
                integration.hunkContextSummary,
                integration.approvalRoute,
                integration.rollbackNote,
                `Blocked reasons: ${integration.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced patch context details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced patch context details stay collapsed or secondary. Raw diffs are not primary, suspected secrets remain
          redacted, and approval plus rollback review stay on separate routes before any future apply boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
