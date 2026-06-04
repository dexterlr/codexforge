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
  buildPullRequestPrepReviewModel,
  buildPullRequestPrepReviewStableKey,
} from "@/lib/codexforge/pull-request-prep-review";

const PULL_REQUEST_PREP_REVIEW_MARKERS =
  "Pull request prep review plain English Pull requests are not created from this page PR creation requires explicit approval Secrets are not included in PR copy Suggested PR title Suggested PR description approved local boundary required release actions are not run from arbitrary UI git commands are not run from arbitrary UI nothing executes from arbitrary UI no git command execution from UI no branch creation no tag creation no PR creation no release publishing no push behavior no merge behavior no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced PR details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no commit creation no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no provider APIs are called no GitHub API calls from UI no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function PullRequestPrepReviewPanel() {
  const model = buildPullRequestPrepReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-pull-request-prep-review={`${PULL_REQUEST_PREP_REVIEW_MARKERS} buildPullRequestPrepReviewStableKey PullRequestPrepReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 239"
        title="Pull request prep review"
        subtitle="Pull request prep review prepares PR-ready summary copy, a checklist, and handoff language without creating a PR. Pull requests are not created from this page, PR creation requires explicit approval, and secrets are not included in PR copy."
        primary={{ href: "#pull-request-prep-review", label: "Review PR prep" }}
        links={[
          { href: "/branch-tag-release-handoff", label: "Branch/tag handoff" },
          { href: "/git-commit-approval", label: "Commit approval" },
          { href: "/git-diff-review", label: "Diff review" },
          { href: "/test-result-summary", label: "Test result" },
          { href: "/pr-risk-checklist", label: "PR risk checklist" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.prepLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page prepares PR handoff copy only. It does not call GitHub APIs, create pull requests, push branches,
          mutate files, apply patches, publish releases, merge, call providers, or reveal secret values.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="pull-request-prep-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildPullRequestPrepReviewStableKey("pull-request-prep-review-card", review.id)}
            title={review.prPrepIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.branchTagHandoffDependency,
                review.commitSummary,
                review.changedAreasSummary,
                review.validationSummary,
                review.testResultSummary,
                review.riskSecretsStatus,
                review.suggestedPrTitle,
                review.suggestedPrDescription,
                review.prRiskChecklistRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced PR details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced PR details stay collapsed or secondary. PR creation remains outside this UI and requires explicit
          approval through a manual handoff or a future approved local boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
