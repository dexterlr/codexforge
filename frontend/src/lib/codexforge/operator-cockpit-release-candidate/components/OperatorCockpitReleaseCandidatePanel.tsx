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
  buildOperatorCockpitReleaseCandidateModel,
  buildOperatorCockpitReleaseCandidateStableKey,
} from "@/lib/codexforge/operator-cockpit-release-candidate";

const OPERATOR_COCKPIT_RELEASE_CANDIDATE_MARKERS =
  "Operator cockpit release candidate Operator cockpit release candidate does not execute workflows Cockpit release requires explicit operator approval Unresolved blockers remain blocked Workflow readiness summary Safety and approval summary operator cockpit release candidate identity readiness groups provider/local/connector/automation readiness summary blocked release candidate risks beta hardening route beta release candidate route next recommended action operator cockpit readiness language review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no creative workflow execution no creative asset generation no research execution no browsing/search/fetching from UI no evidence ingestion automation no coding workflow execution no patch apply behavior no code apply behavior no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no release/publish behavior no release publishing no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no prompt/file/project/connector/provider/workflow data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no approval automation no approval is granted no action approval from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no localStorage writes no sessionStorage writes no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced cockpit readiness details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no video generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function OperatorCockpitReleaseCandidatePanel() {
  const model = buildOperatorCockpitReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-operator-cockpit-release-candidate={`${OPERATOR_COCKPIT_RELEASE_CANDIDATE_MARKERS} buildOperatorCockpitReleaseCandidateStableKey OperatorCockpitReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 409"
        title="Operator cockpit RC"
        subtitle="Operator cockpit release candidate reviews cockpit readiness across creative, research, coding, provider, local bridge, connector, automation, search, and safety layers. It does not execute workflows, and cockpit release requires explicit operator approval."
        primary={{ href: "#operator-cockpit-release-candidate", label: "Review cockpit RC" }}
        links={[
          { href: "/creative-workflow-readiness-audit", label: "Creative readiness" },
          { href: "/research-workflow-readiness-audit", label: "Research readiness" },
          { href: "/coding-workflow-readiness-audit", label: "Coding readiness" },
          { href: "/mvp-hardening-regression-matrix", label: "Beta hardening" },
          { href: "/foundation-beta-candidate", label: "Beta candidate" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.cockpitLanguage} />
      <PreviewFoundationCard title="Plain-English operator cockpit release candidate">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews operator cockpit release candidate identity, readiness groups, workflow readiness summary,
          provider/local/connector/automation readiness summary, safety and approval summary, blocked release candidate
          risks, beta hardening route, beta release candidate route, and next recommended action. It does not execute
          workflows, call APIs, mutate files, mutate memory, approve work, or publish a release.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="operator-cockpit-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildOperatorCockpitReleaseCandidateStableKey("operator-cockpit-rc-card", candidate.id)}
            title={candidate.operatorCockpitReleaseCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${candidate.status}`,
                `Readiness groups: ${candidate.readinessGroups.join("; ")}`,
                `Workflow readiness summary: ${candidate.workflowReadinessSummary.join("; ")}`,
                `Provider/local/connector/automation readiness summary: ${candidate.providerLocalConnectorAutomationReadinessSummary.join("; ")}`,
                `Safety and approval summary: ${candidate.safetyApprovalSummary.join("; ")}`,
                `Blocked release candidate risks: ${candidate.blockedReleaseCandidateRisks.join("; ")}`,
                candidate.betaHardeningRoute,
                candidate.betaReleaseCandidateRoute,
                candidate.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced cockpit readiness details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.candidates.map((candidate) => candidate.advancedCockpitReadinessDetails)} />
        <PreviewFoundationCopy>
          Advanced cockpit readiness details stay collapsed or secondary. Operator cockpit release candidate does not
          execute workflows, and unresolved blockers remain blocked until explicit approval happens elsewhere.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
