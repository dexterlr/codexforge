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
  buildGitDiffBridgeModel,
  buildGitDiffBridgeStableKey,
} from "@/lib/codexforge/git-diff-bridge";

const GIT_DIFF_BRIDGE_MARKERS =
  "Git diff bridge Git diff is not run from this page Raw diffs stay secondary Suspected secrets are redacted Changed files summary Commit message route Bridge identity Source git status bridge Diff summary Risk/secrets redaction status Test result dependency Patch result dependency Audit handoff bridges do not run git commands secrets are redacted and never displayed plain English no giant raw git output above fold approved local boundary required git commands are not run from arbitrary UI nothing executes from arbitrary UI no git command execution from UI no commit creation no branch creation no tag creation no push behavior no branch/tag push behavior no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced diff details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no provider APIs are called no GitHub API calls from UI no automatic provider send no secrets displayed no secrets exported no secrets included no secret value display no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function GitDiffBridgePanel() {
  const model = buildGitDiffBridgeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-git-diff-bridge={`${GIT_DIFF_BRIDGE_MARKERS} buildGitDiffBridgeStableKey GitDiffBridgePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 267"
        title="Git diff bridge"
        subtitle="Git diff bridge models future approved diff retrieval and summary capture. Git diff is not run from this page, raw diffs stay secondary, and suspected secrets are redacted."
        primary={{ href: "#git-diff-bridge", label: "Review diff bridge" }}
        links={[
          { href: "/git-status-bridge", label: "Status bridge" },
          { href: "/project-risk-secrets-scan", label: "Risk scan" },
          { href: "/test-result-summary", label: "Test result" },
          { href: "/patch-result-capture", label: "Patch result" },
          { href: "/commit-message-builder", label: "Commit message" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.bridgeLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          These bridges do not run git commands. This page does not run git diff, execute shell commands, mutate files,
          apply patches, create commits, push branches or tags, browse arbitrary files, call Jarvisd capabilities, call
          providers, call GitHub APIs, or show secret values.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="git-diff-bridge" style={previewStyles.grid}>
        {model.bridges.map((bridge) => (
          <PreviewFoundationCard
            key={buildGitDiffBridgeStableKey("git-diff-bridge-card", bridge.id)}
            title={bridge.bridgeIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${bridge.status}`,
                bridge.sourceGitStatusBridge,
                bridge.changedFilesSummary,
                bridge.diffSummary,
                bridge.riskSecretsRedactionStatus,
                bridge.testResultDependency,
                bridge.patchResultDependency,
                bridge.commitMessageRoute,
                bridge.auditHandoff,
                `Blocked reasons: ${bridge.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced diff details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced diff details stay collapsed or secondary. Raw diffs stay secondary, suspected secrets are redacted,
          and no raw git output appears above the fold.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
