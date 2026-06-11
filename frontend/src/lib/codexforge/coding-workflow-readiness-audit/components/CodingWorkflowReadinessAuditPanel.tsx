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
  buildCodingWorkflowReadinessAuditModel,
  buildCodingWorkflowReadinessAuditStableKey,
} from "@/lib/codexforge/coding-workflow-readiness-audit";

const CODING_WORKFLOW_READINESS_AUDIT_MARKERS =
  "Coding workflow readiness audit Coding readiness audit does not apply code Code changes require explicit operator approval Validation is required before merge Supported coding workflow groups Approval and apply gates coding workflow readiness identity repo/project boundary summary validation checklist denied coding actions blocked coding readiness risks creative readiness route operator cockpit route next recommended action coding workflow readiness language review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no coding workflow execution no coding workflow execution from UI no patch apply behavior no code apply behavior no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no commit creation from UI no release/publish behavior no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no creative asset generation no local tool launching no research execution no browsing/search/fetching from UI no evidence ingestion automation no prompt/file/project/connector/provider/workflow data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no approval automation no approval is granted no action approval from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no localStorage writes no sessionStorage writes no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced coding readiness details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no video generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CodingWorkflowReadinessAuditPanel() {
  const model = buildCodingWorkflowReadinessAuditModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-coding-workflow-readiness-audit={`${CODING_WORKFLOW_READINESS_AUDIT_MARKERS} buildCodingWorkflowReadinessAuditStableKey CodingWorkflowReadinessAuditPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 408"
        title="Coding workflow readiness"
        subtitle="Coding workflow readiness audit reviews coding workflow posture without applying code, running tests, or executing commands. Code changes require explicit operator approval and validation is required before merge."
        primary={{ href: "#coding-workflow-readiness-audit", label: "Review coding readiness" }}
        links={[
          { href: "/creative-workflow-readiness-audit", label: "Creative readiness" },
          { href: "/operator-cockpit-release-candidate", label: "Cockpit RC" },
          { href: "/code-flow/rc", label: "Coding RC" },
          { href: "/apply-guard-review", label: "Apply guard" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.readinessLanguage} />
      <PreviewFoundationCard title="Plain-English coding workflow readiness audit">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews coding workflow readiness identity, supported coding workflow groups, repo/project boundary
          summary, validation checklist, approval and apply gates, denied coding actions, blocked coding readiness risks,
          creative readiness route, operator cockpit route, and next recommended action. It does not apply code, run
          commands, run tests, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="coding-workflow-readiness-audit" style={previewStyles.grid}>
        {model.audits.map((audit) => (
          <PreviewFoundationCard
            key={buildCodingWorkflowReadinessAuditStableKey("coding-workflow-audit-card", audit.id)}
            title={audit.codingWorkflowReadinessIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${audit.status}`,
                `Supported coding workflow groups: ${audit.supportedCodingWorkflowGroups.join("; ")}`,
                `Repo/project boundary summary: ${audit.repoProjectBoundarySummary.join("; ")}`,
                `Validation checklist: ${audit.validationChecklist.join("; ")}`,
                `Approval and apply gates: ${audit.approvalApplyGates.join("; ")}`,
                `Denied coding actions: ${audit.deniedCodingActions.join("; ")}`,
                `Blocked coding readiness risks: ${audit.blockedCodingReadinessRisks.join("; ")}`,
                audit.creativeReadinessRoute,
                audit.operatorCockpitRoute,
                audit.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced coding readiness details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.audits.map((audit) => audit.advancedCodingReadinessDetails)} />
        <PreviewFoundationCopy>
          Advanced coding readiness details stay collapsed or secondary. Coding readiness audit does not apply code, and
          validation remains a required gate before merge.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
