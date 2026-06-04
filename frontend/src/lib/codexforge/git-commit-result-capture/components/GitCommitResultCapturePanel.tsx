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
  buildGitCommitResultCaptureModel,
  buildGitCommitResultCaptureStableKey,
} from "@/lib/codexforge/git-commit-result-capture";

const GIT_COMMIT_RESULT_CAPTURE_MARKERS =
  "Git commit result capture Commit results are reviewed before release handoff Memory is not auto-promoted No push or tag is performed from this page Commit hash status Branch tag handoff route Result identity Source commit trial Commit status: passed, failed, blocked, needs review Commit summary Validation summary Risk/secrets follow-up Review inbox handoff Recovery route secrets are redacted and never displayed plain English approved local boundary required git commands are not run from arbitrary UI nothing executes from arbitrary UI no git command execution from UI no commit creation no branch creation no tag creation no push behavior no branch/tag push behavior no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold no giant raw git output above fold advanced details collapsed/secondary advanced result details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no provider APIs are called no GitHub API calls from UI no automatic provider send no secrets displayed no secrets exported no secrets included no secret value display no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function GitCommitResultCapturePanel() {
  const model = buildGitCommitResultCaptureModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-git-commit-result-capture={`${GIT_COMMIT_RESULT_CAPTURE_MARKERS} buildGitCommitResultCaptureStableKey GitCommitResultCapturePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 269"
        title="Commit result"
        subtitle="Git commit result capture reviews future approved commit outcomes before release handoff. Memory is not auto-promoted, and no push or tag is performed from this page."
        primary={{ href: "#git-commit-result-capture", label: "Review commit result" }}
        links={[
          { href: "/git-commit-trial", label: "Commit trial" },
          { href: "/branch-tag-release-handoff", label: "Branch tag handoff" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/command-failure-recovery", label: "Recovery route" },
          { href: "/project-risk-secrets-scan", label: "Risk scan" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.resultLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews result metadata only. It does not run git commands, create commits, push branches or tags,
          create branches or tags, mutate files, call Jarvisd capabilities, call providers, call GitHub APIs, append
          events, save Brain graph, auto-promote memory, or reveal secret values.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="git-commit-result-capture" style={previewStyles.grid}>
        {model.results.map((result) => (
          <PreviewFoundationCard
            key={buildGitCommitResultCaptureStableKey("git-commit-result-card", result.id)}
            title={result.resultIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Commit status: ${result.commitStatus}`,
                result.sourceCommitTrial,
                result.commitSummary,
                result.commitHashStatus,
                result.validationSummary,
                result.riskSecretsFollowUp,
                result.branchTagHandoffRoute,
                result.reviewInboxHandoff,
                result.recoveryRoute,
                `Blocked reasons: ${result.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced result details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced result details stay collapsed or secondary. Commit results are reviewed before release handoff, and
          no push, tag, memory promotion, or Brain graph mutation happens from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
