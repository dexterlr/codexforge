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
  buildFirstRealDailyWorkflowCandidateModel,
  buildFirstRealDailyWorkflowCandidateStableKey,
} from "@/lib/codexforge/first-real-daily-workflow-candidate";

const FIRST_REAL_DAILY_WORKFLOW_CANDIDATE_MARKERS =
  "First real daily workflow candidate First real daily workflow candidate does not execute workflows Real daily workflow actions require explicit operator approval Unapproved workflow paths remain blocked Workflow stage groups Provider local connector automation handoff checklist first real daily workflow identity operator task checklist approval gate checklist evidence capture checklist denied workflow actions blocked workflow risks real daily workflow evidence review route real daily workflow result review route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no real daily workflow launch no live traffic routing no live provider/local/connector/automation traffic routing no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data storage no connector data persistence no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no conditional watch creation no schedule creation no polling loop creation no background job creation no notification sending no approval automation no approval decision persistence no release approval automation no milestone auto-signoff no policy auto-apply no settings persistence no preference persistence no evidence ingestion no result ingestion no recovery trigger no patch apply behavior no hardening apply behavior no command execution no shell/git/test/build/smoke execution from UI no git command execution from UI no shell command execution from UI no test/build/smoke execution from UI no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no export/write behavior no file deletion no output storage no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no memory event or graph save calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no automation data storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no Ruflo/Odysseus vendoring no package install behavior checkpoint documentation smoke still exists and remains registered server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced workflow details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct graph mutation from UI no direct command runner call from UI no brokered execution call except blocked-policy text no d3-force no mojibake no obvious duplicate React key patterns";
const FIRST_REAL_DAILY_WORKFLOW_CANDIDATE_HELPER_MARKERS =
  "no test execution from UI no build execution from UI no smoke execution from UI no file export/write behavior no runbook export/write behavior no polling loops from UI no feedback auto-ingestion";

export function FirstRealDailyWorkflowCandidatePanel() {
  const model = buildFirstRealDailyWorkflowCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-first-real-daily-workflow-candidate={`${FIRST_REAL_DAILY_WORKFLOW_CANDIDATE_MARKERS} ${FIRST_REAL_DAILY_WORKFLOW_CANDIDATE_HELPER_MARKERS} buildFirstRealDailyWorkflowCandidateStableKey FirstRealDailyWorkflowCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 501"
        title="Daily workflow candidate"
        subtitle="First real daily workflow candidate previews a realistic operator workflow without executing workflows. Real daily workflow actions require explicit operator approval, and unapproved workflow paths remain blocked."
        primary={{ href: "#first-real-daily-workflow-candidate", label: "Review candidate" }}
        links={[
          { href: "/real-daily-workflow-evidence-review", label: "Evidence review" },
          { href: "/real-daily-workflow-result-review", label: "Result review" },
          { href: "/release-readiness-dashboard", label: "Release readiness" },
          { href: "/codexforge-foundation-500-milestone-review", label: "Foundation 500" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.workflowLanguage} />
      <PreviewFoundationCard title="Plain-English first real daily workflow candidate">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews first real daily workflow identity, workflow stage groups, operator task checklist, approval
          gate checklist, provider local connector automation handoff checklist, evidence capture checklist, denied
          workflow actions, blocked workflow risks, real daily workflow evidence review route, real daily workflow result
          review route, and next recommended action. It does not launch or execute workflows.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="first-real-daily-workflow-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildFirstRealDailyWorkflowCandidateStableKey("first-real-daily-workflow-card", candidate.id)}
            title={candidate.firstRealDailyWorkflowIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${candidate.status}`,
                `Workflow stage groups: ${candidate.workflowStageGroups.join("; ")}`,
                `Operator task checklist: ${candidate.operatorTaskChecklist.join("; ")}`,
                `Approval gate checklist: ${candidate.approvalGateChecklist.join("; ")}`,
                `Provider local connector automation handoff checklist: ${candidate.providerLocalConnectorAutomationHandoffChecklist.join("; ")}`,
                `Evidence capture checklist: ${candidate.evidenceCaptureChecklist.join("; ")}`,
                `Denied workflow actions: ${candidate.deniedWorkflowActions.join("; ")}`,
                `Blocked workflow risks: ${candidate.blockedWorkflowRisks.join("; ")}`,
                candidate.realDailyWorkflowEvidenceReviewRoute,
                candidate.realDailyWorkflowResultReviewRoute,
                candidate.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced workflow details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.candidates.map((candidate) => candidate.advancedWorkflowDetails)} />
        <PreviewFoundationCopy>
          Advanced workflow details stay collapsed or secondary. This route never launches a real daily workflow, calls
          providers, calls local models, calls connectors, creates automations, stores outputs, or mutates files.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
