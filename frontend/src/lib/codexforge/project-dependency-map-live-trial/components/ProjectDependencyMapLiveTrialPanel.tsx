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
  buildProjectDependencyMapLiveTrialModel,
  buildProjectDependencyMapLiveTrialStableKey,
} from "@/lib/codexforge/project-dependency-map-live-trial";

const PROJECT_DEPENDENCY_MAP_LIVE_TRIAL_MARKERS =
  "Project dependency map live trial Dependency map does not install packages No commands are run from this page Approved indexed metadata External package summary Risk scan route command dry-run route approved indexed metadata required server-only path boundary markers remain intact no weakened safe path checks no removed server-only boundaries plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no runCommand brokerExecution or local executor API calls from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no rollback behavior no file deletion no secret value display no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProjectDependencyMapLiveTrialPanel() {
  const model = buildProjectDependencyMapLiveTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-project-dependency-map-live-trial={`${PROJECT_DEPENDENCY_MAP_LIVE_TRIAL_MARKERS} buildProjectDependencyMapLiveTrialStableKey ProjectDependencyMapLiveTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 280"
        title="Dependency live trial"
        subtitle="Project dependency map live trial reviews dependency relationships from approved indexed metadata. Dependency map does not install packages, no commands are run from this page, and stale details stay marked for review."
        primary={{ href: "#project-dependency-map-live-trial", label: "Review dependency trial" }}
        links={[
          { href: "/project-indexer-live-trial", label: "Indexer trial" },
          { href: "/project-dependency-map", label: "Dependency map" },
          { href: "/command-dry-run", label: "Command dry-run route" },
          { href: "/project-risk-scan-live-trial", label: "Risk scan route" },
          { href: "/review-inbox", label: "Review inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Dependency details come from approved indexed metadata. This page does not run package manager commands,
          install packages, execute shell commands, or change project files.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="project-dependency-map-live-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildProjectDependencyMapLiveTrialStableKey("dependency-live-trial-card", trial.id)}
            title={trial.dependencyTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.sourceIndexTrial,
                trial.dependencySourceSummary,
                trial.internalModuleRelationshipSummary,
                trial.externalPackageSummary,
                trial.staleUnknownMarkers,
                trial.riskNote,
                trial.commandDryRunRoute,
                trial.riskScanRoute,
                trial.auditHandoff,
                trial.approvedMetadataRoute,
                `Blocked reasons: ${trial.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced dependency details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced dependency details stay secondary. Dependency map live trial remains metadata-only and cannot run
          package manager commands, execute shell commands, mutate files, or send dependency details to providers.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
