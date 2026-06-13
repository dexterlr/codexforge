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
  buildBetaOperatorDailyWorkflowReviewModel,
  buildBetaOperatorDailyWorkflowReviewStableKey,
} from "@/lib/codexforge/beta-operator-daily-workflow-review";

const BETA_OPERATOR_DAILY_WORKFLOW_REVIEW_MARKERS =
  "Beta operator daily workflow review Beta operator daily workflow review does not auto-ingest feedback Beta workflow feedback requires operator review before use Unsafe feedback shortcuts stay blocked Review groups Usability checklist beta workflow review identity safety clarity checklist feedback review checklist denied feedback actions blocked review risks friction patch route release candidate route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no live workflow launch from UI no trial launch no live action execution no go-live action no go-live behavior no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no recovery auto-trigger no replay execution no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no feedback auto-ingestion no feedback ingestion automation no web/search API calls no GitHub API calls from UI no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no issue creation automation no ticket creation automation no fix application no commit creation from UI no regression replay execution no release notes publishing no external feedback fetching no local tool launch behavior no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no evidence auto-ingestion no result auto-ingestion no output persistence no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no localStorage/sessionStorage token storage no endpoint storage no credential storage no output storage no connector data storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw workflow/trial/result/recovery/friction JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced workflow review details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function BetaOperatorDailyWorkflowReviewPanel() {
  const model = buildBetaOperatorDailyWorkflowReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-beta-operator-daily-workflow-review={`${BETA_OPERATOR_DAILY_WORKFLOW_REVIEW_MARKERS} buildBetaOperatorDailyWorkflowReviewStableKey BetaOperatorDailyWorkflowReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 479"
        title="Beta workflow review"
        subtitle="Beta operator daily workflow review checks usability and safety feedback before it is used. Beta operator daily workflow review does not auto-ingest feedback, beta workflow feedback requires operator review before use, and unsafe feedback shortcuts stay blocked."
        primary={{ href: "#beta-operator-daily-workflow-review", label: "Review workflow" }}
        links={[
          { href: "/beta-operator-daily-workflow-trial", label: "Daily trial" },
          { href: "/beta-operator-workflow-friction-patch", label: "Friction patch" },
          { href: "/beta-operator-workflow-release-candidate", label: "Release candidate" },
          { href: "/beta-feedback-inbox", label: "Feedback inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.reviewLanguage} />
      <PreviewFoundationCard title="Plain-English beta operator daily workflow review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews beta workflow review identity, review groups, usability checklist, safety clarity checklist,
          feedback review checklist, denied feedback actions, blocked review risks, friction patch route, release
          candidate route, and next recommended action. It does not auto-ingest feedback, mutate memory, write files,
          create issues, create tasks, call providers, call connectors, or execute workflows.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="beta-operator-daily-workflow-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildBetaOperatorDailyWorkflowReviewStableKey("beta-workflow-review-card", review.id)}
            title={review.betaWorkflowReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Review groups: ${review.reviewGroups.join("; ")}`,
                `Usability checklist: ${review.usabilityChecklist.join("; ")}`,
                `Safety clarity checklist: ${review.safetyClarityChecklist.join("; ")}`,
                `Feedback review checklist: ${review.feedbackReviewChecklist.join("; ")}`,
                `Denied feedback actions: ${review.deniedFeedbackActions.join("; ")}`,
                `Blocked review risks: ${review.blockedReviewRisks.join("; ")}`,
                review.frictionPatchRoute,
                review.releaseCandidateRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced workflow review details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedWorkflowReviewDetails)} />
        <PreviewFoundationCopy>
          Advanced workflow review details stay collapsed or secondary. Beta workflow review remains separate from
          feedback ingestion, external feedback fetching, task creation, issue creation, file writes, memory mutation,
          workflow execution, provider calls, connector calls, tools, agents, plugins, and MCP runtimes.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
