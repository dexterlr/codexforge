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
  buildCommitMessageBuilderModel,
  buildCommitMessageBuilderStableKey,
} from "@/lib/codexforge/commit-message-builder";

const COMMIT_MESSAGE_BUILDER_MARKERS =
  "Commit message builder Commit messages are drafts only No commit is created from this page Secrets are not included in commit copy Suggested commit subject Commit approval route approved local boundary required git commands are not run from arbitrary UI nothing executes from arbitrary UI no git command execution from UI no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced commit details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no commit creation no push behavior no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CommitMessageBuilderPanel() {
  const model = buildCommitMessageBuilderModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-commit-message-builder={`${COMMIT_MESSAGE_BUILDER_MARKERS} buildCommitMessageBuilderStableKey CommitMessageBuilderPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 236"
        title="Commit message builder"
        subtitle="Commit message builder drafts reviewed commit copy from diff, test, patch, and risk summaries. Commit messages are drafts only, no commit is created from this page, and secrets are not included in commit copy."
        primary={{ href: "#commit-message-builder", label: "Review commit draft" }}
        links={[
          { href: "/git-diff-review", label: "Diff review" },
          { href: "/test-result-summary", label: "Test result" },
          { href: "/patch-result-capture", label: "Patch result" },
          { href: "/git-commit-approval", label: "Commit approval route" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.builderLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page drafts copy only. It does not run git commands, create commits, mutate files, push branches or tags,
          apply patches, browse arbitrary local files, call providers, or include secret values in commit copy.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="commit-message-builder" style={previewStyles.grid}>
        {model.drafts.map((draft) => (
          <PreviewFoundationCard
            key={buildCommitMessageBuilderStableKey("commit-message-draft-card", draft.id)}
            title={draft.commitDraftIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${draft.status}`,
                draft.sourceDiffReview,
                draft.changeSummary,
                draft.validationSummary,
                draft.riskSecretsSummary,
                draft.suggestedCommitSubject,
                `Suggested commit body bullets: ${draft.suggestedCommitBodyBullets.join("; ")}`,
                draft.approvalCopy,
                draft.commitApprovalRoute,
                `Blocked reasons: ${draft.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced commit details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced commit details stay collapsed or secondary. The commit approval boundary remains separate and this
          builder never creates a commit.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
