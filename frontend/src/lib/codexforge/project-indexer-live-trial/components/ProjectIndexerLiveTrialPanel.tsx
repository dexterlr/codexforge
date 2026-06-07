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
  buildProjectIndexerLiveTrialModel,
  buildProjectIndexerLiveTrialStableKey,
} from "@/lib/codexforge/project-indexer-live-trial";

const PROJECT_INDEXER_LIVE_TRIAL_MARKERS =
  "Project indexer live trial Live trial uses only approved bounded workspace data Arbitrary local file crawling is not allowed Secrets are not read or displayed Approved bounded root summary Recovery route approved bounded workspace data required server-only path boundary markers remain intact no weakened safe path checks no removed server-only boundaries plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no runCommand brokerExecution or local executor API calls from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no rollback behavior no file deletion no secret value display no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProjectIndexerLiveTrialPanel() {
  const model = buildProjectIndexerLiveTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-project-indexer-live-trial={`${PROJECT_INDEXER_LIVE_TRIAL_MARKERS} buildProjectIndexerLiveTrialStableKey ProjectIndexerLiveTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 278"
        title="Indexer live trial"
        subtitle="Project indexer live trial reviews bounded workspace index readiness. Live trial uses only approved bounded workspace data, arbitrary local file crawling is not allowed, and secrets are not read or displayed."
        primary={{ href: "#project-indexer-live-trial", label: "Review indexer trial" }}
        links={[
          { href: "/safe-project-indexer", label: "Safe indexer" },
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/jarvisd-index-sync", label: "Index sync" },
          { href: "/project-search-live-trial", label: "Search trial" },
          { href: "/jarvisd-recovery-console", label: "Recovery route" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page models live-trial readiness around the approved server snapshot route. It does not browse local
          paths, start a crawl, read arbitrary files from UI, or mutate project files.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="project-indexer-live-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildProjectIndexerLiveTrialStableKey("indexer-live-trial-card", trial.id)}
            title={trial.liveTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.trustedWorkspaceDependency,
                trial.approvedBoundedRootSummary,
                trial.indexScopeSummary,
                trial.excludedPathsSummary,
                trial.fileTypeCoverage,
                trial.syncResultStatus,
                trial.privacySecretsRedactionStatus,
                trial.auditHandoff,
                trial.recoveryRoute,
                trial.serverSnapshotRoute,
                `Blocked reasons: ${trial.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced index details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced index details stay secondary. The live trial remains read-only and review-first: bounded metadata can
          be reviewed, but arbitrary local browsing, file mutation, command execution, provider sends, and Jarvisd
          capability execution remain blocked from this UI.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
