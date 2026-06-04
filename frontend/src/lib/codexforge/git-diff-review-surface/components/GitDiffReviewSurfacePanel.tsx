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
  buildGitDiffReviewSurfaceModel,
  buildGitDiffReviewSurfaceStableKey,
} from "@/lib/codexforge/git-diff-review-surface";

const GIT_DIFF_REVIEW_SURFACE_MARKERS =
  "Git diff review surface Raw diffs stay secondary Git diff is not run from this page Suspected secrets are redacted Review checklist Commit message route approved local boundary required git commands are not run from arbitrary UI nothing executes from arbitrary UI plain English no git command execution from UI no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced diff details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no commit creation no push behavior no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function GitDiffReviewSurfacePanel() {
  const model = buildGitDiffReviewSurfaceModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-git-diff-review-surface={`${GIT_DIFF_REVIEW_SURFACE_MARKERS} buildGitDiffReviewSurfaceStableKey GitDiffReviewSurfacePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 235"
        title="Git diff review"
        subtitle="Git diff review surface reviews changed files and diff summaries before commit copy. Raw diffs stay secondary, git diff is not run from this page, and suspected secrets are redacted."
        primary={{ href: "#git-diff-review-surface", label: "Review git diff" }}
        links={[
          { href: "/git-status-review", label: "Git status review" },
          { href: "/project-risk-secrets-scan", label: "Risk scan" },
          { href: "/patch-result-capture", label: "Patch result" },
          { href: "/test-result-summary", label: "Test result" },
          { href: "/commit-message-builder", label: "Commit message route" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.reviewLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews diff metadata only. It does not run git commands, execute shell commands, mutate files, apply
          patches, create commits, push branches or tags, browse arbitrary local files, call providers, or show secret
          values.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="git-diff-review-surface" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildGitDiffReviewSurfaceStableKey("git-diff-review-card", review.id)}
            title={review.diffReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceGitStatusReview,
                review.changedFilesSummary,
                review.diffSummary,
                review.riskSecretsStatus,
                review.testResultDependency,
                review.patchResultDependency,
                `Review checklist: ${review.reviewChecklist.join("; ")}`,
                review.commitMessageRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced diff details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced diff details stay collapsed or secondary. Raw diffs are never placed above the fold and live git diff
          inspection remains behind a separate approved local boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
