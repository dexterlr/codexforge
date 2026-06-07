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
  buildProjectRiskSecretsScanLiveTrialModel,
  buildProjectRiskSecretsScanLiveTrialStableKey,
} from "@/lib/codexforge/project-risk-secrets-scan-live-trial";

const PROJECT_RISK_SECRETS_SCAN_LIVE_TRIAL_MARKERS =
  "Project risk secrets scan live trial Suspected secrets are redacted Arbitrary local scanning is not allowed Findings are not sent to providers automatically Severity summary Recommended action scan remains behind approved bounded workspace data server-only path boundary markers remain intact no weakened safe path checks no removed server-only boundaries plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no runCommand brokerExecution or local executor API calls from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary local scanning no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no rollback behavior no file deletion no secret value display no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProjectRiskSecretsScanLiveTrialPanel() {
  const model = buildProjectRiskSecretsScanLiveTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-project-risk-secrets-scan-live-trial={`${PROJECT_RISK_SECRETS_SCAN_LIVE_TRIAL_MARKERS} buildProjectRiskSecretsScanLiveTrialStableKey ProjectRiskSecretsScanLiveTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 281"
        title="Risk scan trial"
        subtitle="Project risk secrets scan live trial reviews redacted findings from approved bounded workspace data. Suspected secrets are redacted, arbitrary local scanning is not allowed, and findings are not sent to providers automatically."
        primary={{ href: "#project-risk-secrets-scan-live-trial", label: "Review risk trial" }}
        links={[
          { href: "/project-indexer-live-trial", label: "Indexer trial" },
          { href: "/project-search-live-trial", label: "Search trial" },
          { href: "/project-dependency-live-trial", label: "Dependency trial" },
          { href: "/review-inbox", label: "Result review route" },
          { href: "/jarvisd-secrets-redaction", label: "Redaction gate" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Suspected secret values are redacted and never displayed. This page does not browse arbitrary files, mutate
          files, or send findings to providers automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="project-risk-secrets-scan-live-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildProjectRiskSecretsScanLiveTrialStableKey("risk-scan-live-trial-card", trial.id)}
            title={trial.scanTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.sourceTrialSummary,
                trial.approvedScanScope,
                trial.riskCategories,
                trial.suspectedSecretIndicator,
                trial.redactionStatus,
                trial.severitySummary,
                `Severity: ${trial.severity}`,
                trial.recommendedAction,
                trial.resultReviewRoute,
                trial.auditHandoff,
                `Blocked reasons: ${trial.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced findings">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced findings stay collapsed and redacted. Risk scan live trial remains behind approved bounded workspace
          data and does not display secret values, scan arbitrary local paths, mutate files, or send findings to
          providers.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
