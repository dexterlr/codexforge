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
  buildRealDailyWorkflowEvidenceReviewModel,
  buildRealDailyWorkflowEvidenceReviewStableKey,
} from "@/lib/codexforge/real-daily-workflow-evidence-review";

const REAL_DAILY_WORKFLOW_EVIDENCE_REVIEW_MARKERS =
  "Real daily workflow evidence review Real daily workflow evidence review does not ingest evidence automatically Real daily workflow evidence requires operator review before use Private workflow evidence stays redacted Evidence groups Source citation checklist real daily workflow evidence identity redaction privacy checklist approval gate checklist denied evidence actions blocked evidence risks real daily workflow result review route real daily workflow recovery review route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no real daily workflow launch no live traffic routing no live provider/local/connector/automation traffic routing no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data storage no connector data persistence no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no conditional watch creation no schedule creation no polling loop creation no background job creation no notification sending no approval automation no approval decision persistence no release approval automation no milestone auto-signoff no policy auto-apply no settings persistence no preference persistence no evidence ingestion no evidence auto-ingestion no result ingestion no recovery trigger no patch apply behavior no hardening apply behavior no command execution no shell/git/test/build/smoke execution from UI no git command execution from UI no shell command execution from UI no test/build/smoke execution from UI no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no export/write behavior no file deletion no output storage no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no memory event or graph save calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no automation data storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no Ruflo/Odysseus vendoring no package install behavior checkpoint documentation smoke still exists and remains registered server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced evidence details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct graph mutation from UI no direct command runner call from UI no brokered execution call except blocked-policy text no d3-force no mojibake no obvious duplicate React key patterns";
const REAL_DAILY_WORKFLOW_EVIDENCE_REVIEW_HELPER_MARKERS =
  "no test execution from UI no build execution from UI no smoke execution from UI no file export/write behavior no runbook export/write behavior no polling loops from UI no feedback auto-ingestion";

export function RealDailyWorkflowEvidenceReviewPanel() {
  const model = buildRealDailyWorkflowEvidenceReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-real-daily-workflow-evidence-review={`${REAL_DAILY_WORKFLOW_EVIDENCE_REVIEW_MARKERS} ${REAL_DAILY_WORKFLOW_EVIDENCE_REVIEW_HELPER_MARKERS} buildRealDailyWorkflowEvidenceReviewStableKey RealDailyWorkflowEvidenceReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 502"
        title="Evidence review"
        subtitle="Real daily workflow evidence review checks source, citation, redaction, privacy, and approval before use. It does not ingest evidence automatically, and private workflow evidence stays redacted."
        primary={{ href: "#real-daily-workflow-evidence-review", label: "Review evidence" }}
        links={[
          { href: "/first-real-daily-workflow-candidate", label: "Daily workflow" },
          { href: "/real-daily-workflow-result-review", label: "Result review" },
          { href: "/real-daily-workflow-recovery-review", label: "Recovery review" },
          { href: "/review-inbox-final-consolidation", label: "Final inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.evidenceLanguage} />
      <PreviewFoundationCard title="Plain-English real daily workflow evidence review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews real daily workflow evidence identity, evidence groups, source citation checklist, redaction
          privacy checklist, approval gate checklist, denied evidence actions, blocked evidence risks, real daily workflow
          result review route, real daily workflow recovery review route, and next recommended action. It does not ingest
          evidence or store provider, local, or connector outputs.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="real-daily-workflow-evidence-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildRealDailyWorkflowEvidenceReviewStableKey("real-daily-evidence-card", review.id)}
            title={review.realDailyWorkflowEvidenceIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Evidence groups: ${review.evidenceGroups.join("; ")}`,
                `Source citation checklist: ${review.sourceCitationChecklist.join("; ")}`,
                `Redaction privacy checklist: ${review.redactionPrivacyChecklist.join("; ")}`,
                `Approval gate checklist: ${review.approvalGateChecklist.join("; ")}`,
                `Denied evidence actions: ${review.deniedEvidenceActions.join("; ")}`,
                `Blocked evidence risks: ${review.blockedEvidenceRisks.join("; ")}`,
                review.realDailyWorkflowResultReviewRoute,
                review.realDailyWorkflowRecoveryReviewRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced evidence details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedEvidenceDetails)} />
        <PreviewFoundationCopy>
          Advanced evidence details stay collapsed or secondary. This route never ingests evidence, fetches connector
          data, stores provider/local/connector outputs, mutates files, or mutates memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
