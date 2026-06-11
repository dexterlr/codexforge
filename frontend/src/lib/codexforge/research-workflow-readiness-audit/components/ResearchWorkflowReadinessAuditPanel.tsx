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
  buildResearchWorkflowReadinessAuditModel,
  buildResearchWorkflowReadinessAuditStableKey,
} from "@/lib/codexforge/research-workflow-readiness-audit";

const RESEARCH_WORKFLOW_READINESS_AUDIT_MARKERS =
  "Research workflow readiness audit Research readiness audit does not run research Research execution requires explicit operator approval Evidence is not ingested automatically Supported research workflow groups Freshness conflict checklist research workflow readiness identity evidence dependency summary connector/provider boundary summary denied research actions blocked research readiness risks coding readiness route operator cockpit route next recommended action research workflow readiness language review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no research execution no research execution from UI no browsing/search/fetching from UI no automatic web browsing no browse from UI no search execution from UI no source fetching from UI no external data fetching no evidence ingestion automation no evidence auto-ingestion no source auto-fetching no source auto-ingestion no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no creative asset generation no local tool launching no coding workflow execution no patch apply behavior no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no release/publish behavior no prompt/file/project/connector/provider/workflow data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no approval automation no approval is granted no action approval from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no localStorage writes no sessionStorage writes no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced research readiness details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no video generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResearchWorkflowReadinessAuditPanel() {
  const model = buildResearchWorkflowReadinessAuditModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-research-workflow-readiness-audit={`${RESEARCH_WORKFLOW_READINESS_AUDIT_MARKERS} buildResearchWorkflowReadinessAuditStableKey ResearchWorkflowReadinessAuditPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 407"
        title="Research workflow readiness"
        subtitle="Research workflow readiness audit reviews research workflow posture without browsing, searching, fetching, or ingesting evidence. Research execution requires explicit operator approval."
        primary={{ href: "#research-workflow-readiness-audit", label: "Review research readiness" }}
        links={[
          { href: "/coding-workflow-readiness-audit", label: "Coding readiness" },
          { href: "/operator-cockpit-release-candidate", label: "Cockpit RC" },
          { href: "/research-workspace-release-candidate", label: "Research RC" },
          { href: "/research-report-export-review", label: "Report review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.readinessLanguage} />
      <PreviewFoundationCard title="Plain-English research workflow readiness audit">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews research workflow readiness identity, supported research workflow groups, evidence dependency
          summary, connector/provider boundary summary, freshness conflict checklist, denied research actions, blocked
          research readiness risks, coding readiness route, operator cockpit route, and next recommended action. It does
          not browse, search, fetch, ingest evidence, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="research-workflow-readiness-audit" style={previewStyles.grid}>
        {model.audits.map((audit) => (
          <PreviewFoundationCard
            key={buildResearchWorkflowReadinessAuditStableKey("research-workflow-audit-card", audit.id)}
            title={audit.researchWorkflowReadinessIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${audit.status}`,
                `Supported research workflow groups: ${audit.supportedResearchWorkflowGroups.join("; ")}`,
                `Evidence dependency summary: ${audit.evidenceDependencySummary.join("; ")}`,
                `Connector/provider boundary summary: ${audit.connectorProviderBoundarySummary.join("; ")}`,
                `Freshness conflict checklist: ${audit.freshnessConflictChecklist.join("; ")}`,
                `Denied research actions: ${audit.deniedResearchActions.join("; ")}`,
                `Blocked research readiness risks: ${audit.blockedResearchReadinessRisks.join("; ")}`,
                audit.codingReadinessRoute,
                audit.operatorCockpitRoute,
                audit.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced research readiness details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.audits.map((audit) => audit.advancedResearchReadinessDetails)} />
        <PreviewFoundationCopy>
          Advanced research readiness details stay collapsed or secondary. Research readiness audit does not run research,
          and evidence is not ingested automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
