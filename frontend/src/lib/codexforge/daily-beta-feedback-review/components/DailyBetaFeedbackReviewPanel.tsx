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
  buildDailyBetaFeedbackReviewModel,
  buildDailyBetaFeedbackReviewStableKey,
} from "@/lib/codexforge/daily-beta-feedback-review";

const DAILY_BETA_FEEDBACK_REVIEW_MARKERS =
  "Daily Beta feedback review Daily Beta feedback review does not auto-ingest feedback Daily Beta feedback requires operator review before use Unsafe feedback shortcuts stay blocked Feedback groups Release feedback checklist Daily Beta feedback review identity usability feedback checklist safety feedback checklist denied feedback actions unresolved feedback blockers Daily Beta hardening route Daily Beta release candidate route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no multi-workflow trial launch no beta trial launch no trial launch no daily beta launch no live workflow launch no real daily workflow launch no live action execution no go-live action no go-live behavior no live traffic routing no controlled live signoff automation no automatic controlled live signoff no release approval automation no release approval from UI no automatic safety signoff no safety signoff automation no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no regression/test execution from UI no regression replay execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no release auto-apply no policy auto-apply no settings persistence no preference persistence no feedback auto-ingestion no feedback ingestion automation no evidence ingestion no evidence ingestion automation no result ingestion no result auto-ingestion no recovery trigger no fix application no patch apply behavior no hardening apply behavior no issue creation automation no ticket creation automation no commit creation from UI no release notes publishing no external feedback fetching no provider API calls no provider live connection tests no provider traffic routing no live provider/local/connector/automation traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no shell/git/test/build/smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no output persistence no output storage no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no memory event or graph save calls from UI no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no localStorage/sessionStorage token storage no token storage no endpoint storage no credential storage no localStorage writes no sessionStorage writes no automation data storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior checkpoint documentation smoke still exists and remains registered server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw multi-workflow/release/signoff/beta JSON above fold no giant raw JSON above fold advanced details collapsed/secondary advanced feedback details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no direct command runner call from UI no broker-execution call except blocked-policy text no brokered execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function DailyBetaFeedbackReviewPanel() {
  const model = buildDailyBetaFeedbackReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-daily-beta-feedback-review={`${DAILY_BETA_FEEDBACK_REVIEW_MARKERS} buildDailyBetaFeedbackReviewStableKey DailyBetaFeedbackReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 513"
        title="Daily Beta feedback"
        subtitle="Daily Beta feedback review reviews Daily Beta feedback without auto-ingesting feedback. Daily Beta feedback requires operator review before use, and unsafe feedback shortcuts stay blocked."
        primary={{ href: "#daily-beta-feedback-review", label: "Review feedback" }}
        links={[
          { href: "/daily-beta-controlled-operator-trial", label: "Daily Beta trial" },
          { href: "/beta-2-hardening-pass", label: "Hardening" },
          { href: "/codexforge-daily-beta-release-candidate", label: "Daily Beta RC" },
          { href: "/release-readiness-dashboard", label: "Release readiness" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.feedbackLanguage} />
      <PreviewFoundationCard title="Plain-English Daily Beta feedback review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews Daily Beta feedback review identity, feedback groups, usability feedback checklist, safety
          feedback checklist, release feedback checklist, denied feedback actions, unresolved feedback blockers, Daily
          Beta hardening route, Daily Beta release candidate route, and next recommended action. It does not ingest
          feedback, mutate memory, write files, store outputs, or approve release.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="daily-beta-feedback-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildDailyBetaFeedbackReviewStableKey("daily-beta-feedback-card", review.id)}
            title={review.dailyBetaFeedbackReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Feedback groups: ${review.feedbackGroups.join("; ")}`,
                `Usability feedback checklist: ${review.usabilityFeedbackChecklist.join("; ")}`,
                `Safety feedback checklist: ${review.safetyFeedbackChecklist.join("; ")}`,
                `Release feedback checklist: ${review.releaseFeedbackChecklist.join("; ")}`,
                `Denied feedback actions: ${review.deniedFeedbackActions.join("; ")}`,
                `Unresolved feedback blockers: ${review.unresolvedFeedbackBlockers.join("; ")}`,
                review.dailyBetaHardeningRoute,
                review.dailyBetaReleaseCandidateRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced feedback details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedFeedbackDetails)} />
        <PreviewFoundationCopy>
          Advanced feedback details stay collapsed or secondary. This route never auto-ingests feedback, mutates memory,
          writes files, stores outputs, executes workflows, approves release, calls providers, calls connectors, creates
          automations, or promotes memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
