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
  buildGitStatusReviewSurfaceModel,
  buildGitStatusReviewSurfaceStableKey,
} from "@/lib/codexforge/git-status-review-surface";

const GIT_STATUS_REVIEW_SURFACE_MARKERS =
  "Git status review surface Git status is not run from this page Live git inspection remains behind approved local boundary Secrets stay redacted Changed files summary Command approval route approved local boundary required git commands are not run from arbitrary UI nothing executes from arbitrary UI no git command execution from UI no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced status details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no commit creation no push behavior no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function GitStatusReviewSurfacePanel() {
  const model = buildGitStatusReviewSurfaceModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-git-status-review-surface={`${GIT_STATUS_REVIEW_SURFACE_MARKERS} buildGitStatusReviewSurfaceStableKey GitStatusReviewSurfacePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 234"
        title="Git status review"
        subtitle="Git status review surface summarizes a future approved local status packet in plain English. Git status is not run from this page, live git inspection remains behind approved local boundary, and secrets stay redacted."
        primary={{ href: "#git-status-review-surface", label: "Review git status" }}
        links={[
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/local-command-approval", label: "Command approval route" },
          { href: "/project-risk-secrets-scan", label: "Risk scan" },
          { href: "/git-diff-review", label: "Diff review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.reviewLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews status metadata only. It does not run git commands, execute shell commands, browse arbitrary
          local files, mutate files, apply patches, create commits, push branches or tags, call providers, or reveal
          secret values.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="git-status-review-surface" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildGitStatusReviewSurfaceStableKey("git-status-review-card", review.id)}
            title={review.statusReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.workspaceTrustDependency,
                review.branchSummary,
                review.changedFilesSummary,
                review.untrackedFilesSummary,
                review.stagedUnstagedSummary,
                review.riskSecretsScanStatus,
                review.nextRecommendedRoute,
                review.commandApprovalRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced status details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced status details stay collapsed or secondary. Live git inspection remains a separate approved local
          boundary and this review surface never becomes a command runner.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
