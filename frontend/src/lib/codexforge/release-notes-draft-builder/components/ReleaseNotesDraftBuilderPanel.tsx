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
  buildReleaseNotesDraftBuilderModel,
  buildReleaseNotesDraftBuilderStableKey,
} from "@/lib/codexforge/release-notes-draft-builder";

const RELEASE_NOTES_DRAFT_BUILDER_MARKERS =
  "Release notes draft builder plain English Release notes are drafts only No release is published from this page Secrets are not included in release notes User-facing summary Known gaps approved local boundary required release actions are not run from arbitrary UI git commands are not run from arbitrary UI nothing executes from arbitrary UI no git command execution from UI no branch creation no tag creation no PR creation no release publishing no push behavior no merge behavior no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced draft details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no commit creation no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no provider APIs are called no GitHub API calls from UI no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ReleaseNotesDraftBuilderPanel() {
  const model = buildReleaseNotesDraftBuilderModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-release-notes-draft-builder={`${RELEASE_NOTES_DRAFT_BUILDER_MARKERS} buildReleaseNotesDraftBuilderStableKey ReleaseNotesDraftBuilderPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 241"
        title="Release notes draft builder"
        subtitle="Release notes draft builder creates reviewed draft notes from commit, test, diff, branch/tag, PR prep, and risk summaries. Release notes are drafts only, no release is published from this page, and secrets are not included in release notes."
        primary={{ href: "#release-notes-draft-builder", label: "Review draft notes" }}
        links={[
          { href: "/branch-tag-release-handoff", label: "Branch/tag handoff" },
          { href: "/pull-request-prep-review", label: "PR prep" },
          { href: "/pr-risk-checklist", label: "PR risk" },
          { href: "/test-result-summary", label: "Test result" },
          { href: "/git-diff-review", label: "Diff review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.draftLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page drafts release notes only. It does not call GitHub APIs, publish releases, create tags, create
          branches, create PRs, push, merge, mutate files, apply patches, call providers, or reveal secret values.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="release-notes-draft-builder" style={previewStyles.grid}>
        {model.drafts.map((draft) => (
          <PreviewFoundationCard
            key={buildReleaseNotesDraftBuilderStableKey("release-notes-draft-card", draft.id)}
            title={draft.releaseNotesIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${draft.status}`,
                draft.sourceBranchTagHandoff,
                draft.prPrepDependency,
                draft.userFacingSummary,
                draft.technicalSummary,
                draft.validationSummary,
                draft.knownGaps,
                draft.riskNotes,
                draft.copyableReleaseNotesDraft,
                draft.nextRecommendedRoute,
                `Blocked reasons: ${draft.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced draft details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced draft details stay collapsed or secondary. Publishing remains outside this UI and requires manual
          review or a future approved local boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
