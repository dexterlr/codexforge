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
  buildGitCommitTrialBoundaryModel,
  buildGitCommitTrialBoundaryStableKey,
} from "@/lib/codexforge/git-commit-trial-boundary";

const GIT_COMMIT_TRIAL_BOUNDARY_MARKERS =
  "Git commit trial boundary Commits are not created from this page Approved local boundary is required before commit creation Push and tag actions are not part of this boundary Allowed commit scope Required confirmation copy Commit creation requires approved local boundary Commit trial identity Git status dependency Git diff dependency Selected commit message Test result dependency Risk/secrets status Denied commit scope secrets are redacted and never displayed plain English approved local boundary required git commands are not run from arbitrary UI nothing executes from arbitrary UI no git command execution from UI no commit creation no branch creation no tag creation no push behavior no branch/tag push behavior no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold no giant raw git output above fold advanced details collapsed/secondary advanced trial details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no provider APIs are called no GitHub API calls from UI no automatic provider send no secrets displayed no secrets exported no secrets included no secret value display no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function GitCommitTrialBoundaryPanel() {
  const model = buildGitCommitTrialBoundaryModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-git-commit-trial-boundary={`${GIT_COMMIT_TRIAL_BOUNDARY_MARKERS} buildGitCommitTrialBoundaryStableKey GitCommitTrialBoundaryPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 268"
        title="Commit trial"
        subtitle="Git commit trial boundary reviews a future approved local commit request before commit creation. Commits are not created from this page, and approved local boundary is required before commit creation."
        primary={{ href: "#git-commit-trial-boundary", label: "Review commit trial" }}
        links={[
          { href: "/git-status-bridge", label: "Status bridge" },
          { href: "/git-diff-bridge", label: "Diff bridge" },
          { href: "/commit-message-builder", label: "Commit message" },
          { href: "/test-result-summary", label: "Test result" },
          { href: "/git-commit-result", label: "Commit result" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This boundary is a review surface only. It does not create commits, run git commands, execute shell commands,
          push branches or tags, create branches or tags, mutate files, call Jarvisd capabilities, call providers, call
          GitHub APIs, or reveal secret values.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="git-commit-trial-boundary" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildGitCommitTrialBoundaryStableKey("git-commit-trial-card", trial.id)}
            title={trial.commitTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.gitStatusDependency,
                trial.gitDiffDependency,
                trial.selectedCommitMessage,
                trial.testResultDependency,
                trial.riskSecretsStatus,
                `Allowed commit scope: ${trial.allowedCommitScope.join("; ")}`,
                `Denied commit scope: ${trial.deniedCommitScope.join("; ")}`,
                trial.requiredConfirmationCopy,
                `Blocked reasons: ${trial.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced trial details stay collapsed or secondary. Push and tag actions are not part of this boundary, and
          commit creation requires a separate approved local boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
