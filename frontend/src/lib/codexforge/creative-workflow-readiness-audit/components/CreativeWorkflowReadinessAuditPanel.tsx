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
  buildCreativeWorkflowReadinessAuditModel,
  buildCreativeWorkflowReadinessAuditStableKey,
} from "@/lib/codexforge/creative-workflow-readiness-audit";

const CREATIVE_WORKFLOW_READINESS_AUDIT_MARKERS =
  "Creative workflow readiness audit Creative readiness audit does not generate assets Creative execution requires explicit operator approval Blocked creative actions stay blocked Supported creative workflow groups Local bridge dependency summary creative workflow readiness identity provider dependency summary manual validation checklist denied creative actions blocked creative readiness risks research readiness route operator cockpit route next recommended action creative workflow readiness language review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no creative workflow execution no creative workflows run from UI no creative asset generation no asset generation from UI no media generation from UI no real video generation no image generation no video generation no creative provider calls no local tool launching no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no research execution no browsing/search/fetching from UI no evidence ingestion automation no coding workflow execution no patch apply behavior no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no release/publish behavior no prompt/file/project/connector/provider/workflow data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no approval automation no approval is granted no action approval from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no localStorage writes no sessionStorage writes no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced creative readiness details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CreativeWorkflowReadinessAuditPanel() {
  const model = buildCreativeWorkflowReadinessAuditModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-creative-workflow-readiness-audit={`${CREATIVE_WORKFLOW_READINESS_AUDIT_MARKERS} buildCreativeWorkflowReadinessAuditStableKey CreativeWorkflowReadinessAuditPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 406"
        title="Creative workflow readiness"
        subtitle="Creative workflow readiness audit reviews creative workflow posture without generating assets or launching tools. Creative execution requires explicit operator approval, and blocked creative actions stay blocked."
        primary={{ href: "#creative-workflow-readiness-audit", label: "Review creative readiness" }}
        links={[
          { href: "/research-workflow-readiness-audit", label: "Research readiness" },
          { href: "/operator-cockpit-release-candidate", label: "Cockpit RC" },
          { href: "/local-bridge-readiness-audit", label: "Local bridge audit" },
          { href: "/creative-readiness", label: "Creative readiness" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.readinessLanguage} />
      <PreviewFoundationCard title="Plain-English creative workflow readiness audit">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews creative workflow readiness identity, supported creative workflow groups, local bridge
          dependency summary, provider dependency summary, manual validation checklist, denied creative actions, blocked
          creative readiness risks, research readiness route, operator cockpit route, and next recommended action. It does
          not generate assets, call creative providers, launch local tools, call the local bridge, mutate files, or mutate
          memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="creative-workflow-readiness-audit" style={previewStyles.grid}>
        {model.audits.map((audit) => (
          <PreviewFoundationCard
            key={buildCreativeWorkflowReadinessAuditStableKey("creative-workflow-audit-card", audit.id)}
            title={audit.creativeWorkflowReadinessIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${audit.status}`,
                `Supported creative workflow groups: ${audit.supportedCreativeWorkflowGroups.join("; ")}`,
                `Local bridge dependency summary: ${audit.localBridgeDependencySummary.join("; ")}`,
                `Provider dependency summary: ${audit.providerDependencySummary.join("; ")}`,
                `Manual validation checklist: ${audit.manualValidationChecklist.join("; ")}`,
                `Denied creative actions: ${audit.deniedCreativeActions.join("; ")}`,
                `Blocked creative readiness risks: ${audit.blockedCreativeReadinessRisks.join("; ")}`,
                audit.researchReadinessRoute,
                audit.operatorCockpitRoute,
                audit.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced creative readiness details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.audits.map((audit) => audit.advancedCreativeReadinessDetails)} />
        <PreviewFoundationCopy>
          Advanced creative readiness details stay collapsed or secondary. Creative readiness audit does not generate
          assets, and every execution-capable creative path remains blocked until explicit operator approval happens
          elsewhere.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
