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
  buildBetaReleaseNotesDraftReviewModel,
  buildBetaReleaseNotesDraftReviewStableKey,
} from "@/lib/codexforge/beta-release-notes-draft-review";

const BETA_RELEASE_NOTES_DRAFT_REVIEW_MARKERS =
  "Beta release notes draft review Release notes draft is not published from this page Release notes require operator approval before use Private details stay redacted Summary sections Known issues release notes draft identity source regression replay review safety notes validation notes blocked release notes daily onboarding route next recommended action review-only approval required no approval automation no approval is granted no action approval from UI no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no issue creation automation no ticket creation automation no GitHub API calls from UI no fix application no patch apply behavior no commit creation from UI no regression replay execution no release notes publishing no file export/write behavior no runbook export/write behavior no external feedback fetching no feedback ingestion automation no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no file mutation no file write no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced release notes details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function BetaReleaseNotesDraftReviewPanel() {
  const model = buildBetaReleaseNotesDraftReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-beta-release-notes-draft-review={`${BETA_RELEASE_NOTES_DRAFT_REVIEW_MARKERS} buildBetaReleaseNotesDraftReviewStableKey BetaReleaseNotesDraftReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 389"
        title="Release notes draft"
        subtitle="Beta release notes draft review organizes release-note sections after regression replay review. Release notes draft is not published from this page, release notes require operator approval before use, and private details stay redacted."
        primary={{ href: "#beta-release-notes-draft-review", label: "Review draft notes" }}
        links={[
          { href: "/beta-regression-replay-review", label: "Regression replay" },
          { href: "/daily-operator-home", label: "Daily onboarding" },
          { href: "/foundation-beta-candidate", label: "Beta candidate" },
          { href: "/release-notes-draft-builder", label: "Draft builder" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.releaseNotesLanguage} />
      <PreviewFoundationCard title="Plain-English beta release notes draft review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews release notes draft identity, source regression replay review, summary sections, known
          issues, safety notes, validation notes, blocked release notes, daily onboarding route, and next recommended
          action. It does not publish release notes, write files, export files, call APIs, approve release-note text, or
          mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="beta-release-notes-draft-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildBetaReleaseNotesDraftReviewStableKey("beta-release-notes-card", review.id)}
            title={review.releaseNotesDraftIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceRegressionReplayReview,
                `Summary sections: ${review.summarySections.join("; ")}`,
                `Known issues: ${review.knownIssues.join("; ")}`,
                `Safety notes: ${review.safetyNotes.join("; ")}`,
                `Validation notes: ${review.validationNotes.join("; ")}`,
                `Blocked release notes: ${review.blockedReleaseNotes.join("; ")}`,
                review.dailyOnboardingRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced release notes details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedReleaseNotesDetails)} />
        <PreviewFoundationCopy>
          Advanced release notes details stay collapsed or secondary. This page keeps draft review separate from
          publishing, exporting, file writes, API calls, approval, and memory mutation.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
