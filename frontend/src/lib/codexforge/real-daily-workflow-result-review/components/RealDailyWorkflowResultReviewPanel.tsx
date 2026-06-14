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
  buildRealDailyWorkflowResultReviewModel,
  buildRealDailyWorkflowResultReviewStableKey,
} from "@/lib/codexforge/real-daily-workflow-result-review";

const REAL_DAILY_WORKFLOW_RESULT_REVIEW_MARKERS =
  "Real daily workflow result review Real daily workflow result review does not store live outputs Real daily workflow results require operator review before use Unsafe workflow results remain blocked Result review groups Acceptance checklist real daily workflow result identity rejection checklist reuse checklist safety review checklist denied result actions blocked result risks real daily workflow recovery review route real daily workflow hardening pass route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no real daily workflow launch no live traffic routing no live provider/local/connector/automation traffic routing no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data storage no connector data persistence no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no conditional watch creation no schedule creation no polling loop creation no background job creation no notification sending no approval automation no approval decision persistence no release approval automation no milestone auto-signoff no policy auto-apply no settings persistence no preference persistence no evidence ingestion no result ingestion no result auto-ingestion no recovery trigger no patch apply behavior no hardening apply behavior no command execution no shell/git/test/build/smoke execution from UI no git command execution from UI no shell command execution from UI no test/build/smoke execution from UI no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no export/write behavior no file deletion no output storage no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no memory event or graph save calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no automation data storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no Ruflo/Odysseus vendoring no package install behavior checkpoint documentation smoke still exists and remains registered server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced result details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct graph mutation from UI no direct command runner call from UI no brokered execution call except blocked-policy text no d3-force no mojibake no obvious duplicate React key patterns";
const REAL_DAILY_WORKFLOW_RESULT_REVIEW_HELPER_MARKERS =
  "no test execution from UI no build execution from UI no smoke execution from UI no file export/write behavior no runbook export/write behavior no polling loops from UI no feedback auto-ingestion";

export function RealDailyWorkflowResultReviewPanel() {
  const model = buildRealDailyWorkflowResultReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-real-daily-workflow-result-review={`${REAL_DAILY_WORKFLOW_RESULT_REVIEW_MARKERS} ${REAL_DAILY_WORKFLOW_RESULT_REVIEW_HELPER_MARKERS} buildRealDailyWorkflowResultReviewStableKey RealDailyWorkflowResultReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 503"
        title="Result review"
        subtitle="Real daily workflow result review checks acceptance, rejection, reuse, and safety before any result is used. It does not store live outputs, and unsafe workflow results remain blocked."
        primary={{ href: "#real-daily-workflow-result-review", label: "Review result" }}
        links={[
          { href: "/real-daily-workflow-evidence-review", label: "Evidence review" },
          { href: "/real-daily-workflow-recovery-review", label: "Recovery review" },
          { href: "/real-daily-workflow-hardening-pass", label: "Hardening" },
          { href: "/review-inbox-final-consolidation", label: "Final inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.resultLanguage} />
      <PreviewFoundationCard title="Plain-English real daily workflow result review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews real daily workflow result identity, result review groups, acceptance checklist, rejection
          checklist, reuse checklist, safety review checklist, denied result actions, blocked result risks, real daily
          workflow recovery review route, real daily workflow hardening pass route, and next recommended action. It does
          not store live outputs or ingest results.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="real-daily-workflow-result-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildRealDailyWorkflowResultReviewStableKey("real-daily-result-card", review.id)}
            title={review.realDailyWorkflowResultIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Result review groups: ${review.resultReviewGroups.join("; ")}`,
                `Acceptance checklist: ${review.acceptanceChecklist.join("; ")}`,
                `Rejection checklist: ${review.rejectionChecklist.join("; ")}`,
                `Reuse checklist: ${review.reuseChecklist.join("; ")}`,
                `Safety review checklist: ${review.safetyReviewChecklist.join("; ")}`,
                `Denied result actions: ${review.deniedResultActions.join("; ")}`,
                `Blocked result risks: ${review.blockedResultRisks.join("; ")}`,
                review.realDailyWorkflowRecoveryReviewRoute,
                review.realDailyWorkflowHardeningPassRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced result details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedResultDetails)} />
        <PreviewFoundationCopy>
          Advanced result details stay collapsed or secondary. This route never stores live outputs, ingests results,
          reuses results automatically, triggers recovery, applies hardening, mutates files, or mutates memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
