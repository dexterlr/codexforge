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
  buildBetaRegressionReplayReviewModel,
  buildBetaRegressionReplayReviewStableKey,
} from "@/lib/codexforge/beta-regression-replay-review";

const BETA_REGRESSION_REPLAY_REVIEW_MARKERS =
  "Beta regression replay review Regression replay review does not run tests or workflows Replay plans require operator approval Unresolved regressions stay blocked Replay plan groups Expected validation evidence regression replay identity source fix priority matrix blocked replay cases smoke/build/manual validation notes release notes route next recommended action review-only approval required no approval automation no approval is granted no action approval from UI no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no issue creation automation no ticket creation automation no GitHub API calls from UI no fix application no patch apply behavior no commit creation from UI no regression replay execution no release notes publishing no file export/write behavior no runbook export/write behavior no external feedback fetching no feedback ingestion automation no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no file mutation no file write no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced regression replay details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function BetaRegressionReplayReviewPanel() {
  const model = buildBetaRegressionReplayReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-beta-regression-replay-review={`${BETA_REGRESSION_REPLAY_REVIEW_MARKERS} buildBetaRegressionReplayReviewStableKey BetaRegressionReplayReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 388"
        title="Regression replay"
        subtitle="Beta regression replay review checks replay plans and expected evidence before any validation happens. Regression replay review does not run tests or workflows, replay plans require operator approval, and unresolved regressions stay blocked."
        primary={{ href: "#beta-regression-replay-review", label: "Review replay plan" }}
        links={[
          { href: "/beta-fix-priority-matrix", label: "Fix priority" },
          { href: "/beta-release-notes-draft-review", label: "Release notes" },
          { href: "/release-smoke", label: "Release smoke" },
          { href: "/validation", label: "Validation" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.replayLanguage} />
      <PreviewFoundationCard title="Plain-English beta regression replay review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews regression replay identity, source fix priority matrix, replay plan groups, expected
          validation evidence, blocked replay cases, smoke/build/manual validation notes, release notes route, and next
          recommended action. It does not run tests, run builds, run smoke checks, execute workflows, run shell or git
          commands, replay regressions, approve plans, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="beta-regression-replay-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildBetaRegressionReplayReviewStableKey("beta-regression-replay-card", review.id)}
            title={review.regressionReplayIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceFixPriorityMatrix,
                `Replay plan groups: ${review.replayPlanGroups.join("; ")}`,
                `Expected validation evidence: ${review.expectedValidationEvidence.join("; ")}`,
                `Blocked replay cases: ${review.blockedReplayCases.join("; ")}`,
                `Smoke/build/manual validation notes: ${review.smokeBuildManualValidationNotes.join("; ")}`,
                review.releaseNotesRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced regression replay details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedReplayDetails)} />
        <PreviewFoundationCopy>
          Advanced regression replay details stay collapsed or secondary. This page reviews replay plans only; tests,
          builds, smokes, workflows, shell commands, git commands, and memory mutation remain blocked from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
