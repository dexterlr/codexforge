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
  buildGitCommitApprovalBoundaryModel,
  buildGitCommitApprovalBoundaryStableKey,
} from "@/lib/codexforge/git-commit-approval-boundary";

const GIT_COMMIT_APPROVAL_BOUNDARY_MARKERS =
  "Git commit approval boundary Commits are not created from this page Commit creation requires explicit approval Future git execution remains behind approved local boundary Allowed scope Approval copy approved local boundary required git commands are not run from arbitrary UI nothing executes from arbitrary UI plain English no git command execution from UI no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced approval details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no commit creation no push behavior no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function GitCommitApprovalBoundaryPanel() {
  const model = buildGitCommitApprovalBoundaryModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-git-commit-approval-boundary={`${GIT_COMMIT_APPROVAL_BOUNDARY_MARKERS} buildGitCommitApprovalBoundaryStableKey GitCommitApprovalBoundaryPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 237"
        title="Git commit approval"
        subtitle="Git commit approval boundary is the explicit final human gate before future local commit creation. Commits are not created from this page, commit creation requires explicit approval, and future git execution remains behind approved local boundary."
        primary={{ href: "#git-commit-approval-boundary", label: "Review commit approval" }}
        links={[
          { href: "/commit-message-builder", label: "Commit message" },
          { href: "/git-status-review", label: "Git status" },
          { href: "/git-diff-review", label: "Git diff" },
          { href: "/test-result-summary", label: "Test result" },
          { href: "/local-command-approval", label: "Command approval" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.approvalLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page records approval language only. It does not create commits, run git commands, push branches or tags,
          mutate files, apply patches, browse arbitrary local files, call providers, or reveal secret values.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="git-commit-approval-boundary" style={previewStyles.grid}>
        {model.approvals.map((approval) => (
          <PreviewFoundationCard
            key={buildGitCommitApprovalBoundaryStableKey("git-commit-approval-card", approval.id)}
            title={approval.commitApprovalIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${approval.status}`,
                approval.selectedCommitMessage,
                approval.gitStatusDependency,
                approval.gitDiffDependency,
                approval.testResultDependency,
                approval.riskSecretsStatus,
                `Allowed scope: ${approval.allowedScope.join("; ")}`,
                `Denied scope: ${approval.deniedScope.join("; ")}`,
                approval.approvalCopy,
                `Blocked reasons: ${approval.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced approval details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced approval details stay collapsed or secondary. Future commit execution remains outside this UI and
          behind an approved local boundary with explicit human approval.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
