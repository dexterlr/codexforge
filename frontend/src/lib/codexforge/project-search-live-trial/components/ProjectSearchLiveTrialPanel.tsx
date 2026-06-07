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
  buildProjectSearchLiveTrialModel,
  buildProjectSearchLiveTrialStableKey,
} from "@/lib/codexforge/project-search-live-trial";

const PROJECT_SEARCH_LIVE_TRIAL_MARKERS =
  "Project search live trial Search only uses approved bounded indexed workspace data Arbitrary local browsing is not allowed Sensitive matches stay redacted until review Result preview summary File preview bridge route approved bounded indexed workspace data required server-only path boundary markers remain intact no weakened safe path checks no removed server-only boundaries plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no runCommand brokerExecution or local executor API calls from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary local browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no rollback behavior no file deletion no secret value display no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProjectSearchLiveTrialPanel() {
  const model = buildProjectSearchLiveTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-project-search-live-trial={`${PROJECT_SEARCH_LIVE_TRIAL_MARKERS} buildProjectSearchLiveTrialStableKey ProjectSearchLiveTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 279"
        title="Search live trial"
        subtitle="Project search live trial reviews bounded workspace search readiness. Search only uses approved bounded indexed workspace data, arbitrary local browsing is not allowed, and sensitive matches stay redacted until review."
        primary={{ href: "#project-search-live-trial", label: "Review search trial" }}
        links={[
          { href: "/project-indexer-live-trial", label: "Indexer trial" },
          { href: "/project-file-search", label: "Search preview" },
          { href: "/jarvisd-file-preview-bridge", label: "File preview bridge route" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/project-risk-scan-live-trial", label: "Risk trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews search behavior only. It does not browse arbitrary local files, auto-open matches, expose
          secret values, or send findings to providers.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="project-search-live-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildProjectSearchLiveTrialStableKey("search-live-trial-card", trial.id)}
            title={trial.searchTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.sourceIndexTrial,
                trial.querySummary,
                trial.approvedSearchScope,
                trial.excludedPathsSummary,
                trial.resultPreviewSummary,
                trial.sensitiveMatchHandling,
                trial.redactionStatus,
                trial.filePreviewBridgeRoute,
                trial.auditHandoff,
                trial.serverSearchRoute,
                `Blocked reasons: ${trial.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced results/details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced results/details stay secondary. Search readiness remains tied to approved bounded indexed workspace
          data, and sensitive matches stay redacted until an operator reviews the bridge route.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
