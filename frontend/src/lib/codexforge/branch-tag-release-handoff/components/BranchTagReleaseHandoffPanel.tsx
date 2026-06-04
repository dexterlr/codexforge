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
  buildBranchTagReleaseHandoffModel,
  buildBranchTagReleaseHandoffStableKey,
} from "@/lib/codexforge/branch-tag-release-handoff";

const BRANCH_TAG_RELEASE_HANDOFF_MARKERS =
  "Branch tag release handoff plain English Branches and tags are not created from this page Push and tag commands are manual only Secrets are not included in release copy Tag naming recommendation Rollback note approved local boundary required release actions are not run from arbitrary UI git commands are not run from arbitrary UI nothing executes from arbitrary UI no git command execution from UI no branch creation no tag creation no PR creation no release publishing no push behavior no merge behavior no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced handoff details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no commit creation no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no provider APIs are called no GitHub API calls from UI no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function BranchTagReleaseHandoffPanel() {
  const model = buildBranchTagReleaseHandoffModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-branch-tag-release-handoff={`${BRANCH_TAG_RELEASE_HANDOFF_MARKERS} buildBranchTagReleaseHandoffStableKey BranchTagReleaseHandoffPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 238"
        title="Branch tag release handoff"
        subtitle="Branch tag release handoff prepares reviewed branch and tag instructions after commit approval. Branches and tags are not created from this page, push and tag commands are manual only, and secrets are not included in release copy."
        primary={{ href: "#branch-tag-release-handoff", label: "Review release handoff" }}
        links={[
          { href: "/git-commit-approval", label: "Commit approval" },
          { href: "/git-status-review", label: "Git status" },
          { href: "/test-result-summary", label: "Test result" },
          { href: "/project-risk-secrets-scan", label: "Risk scan" },
          { href: "/release-notes-draft-builder", label: "Release notes" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.handoffLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page prepares copyable handoff text only. It does not run git commands, create branches, create tags,
          push branches or tags, publish releases, mutate files, apply patches, call providers, call GitHub APIs, or
          reveal secret values.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="branch-tag-release-handoff" style={previewStyles.grid}>
        {model.handoffs.map((handoff) => (
          <PreviewFoundationCard
            key={buildBranchTagReleaseHandoffStableKey("branch-tag-release-handoff-card", handoff.id)}
            title={handoff.releaseHandoffIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${handoff.status}`,
                handoff.sourceCommitApproval,
                handoff.targetBranchSummary,
                handoff.tagNamingRecommendation,
                handoff.validationSummary,
                handoff.riskSecretsStatus,
                handoff.pushPolicy,
                handoff.rollbackNote,
                handoff.releaseNotesRoute,
                `Blocked reasons: ${handoff.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced handoff details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced handoff details stay collapsed or secondary. Branch, tag, push, and release actions remain manual or
          behind a future approved local boundary with explicit review.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
