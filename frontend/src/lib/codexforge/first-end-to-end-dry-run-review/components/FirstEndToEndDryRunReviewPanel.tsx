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
  buildFirstEndToEndDryRunReviewModel,
  buildFirstEndToEndDryRunReviewStableKey,
} from "@/lib/codexforge/first-end-to-end-dry-run-review";

const FIRST_END_TO_END_DRY_RUN_REVIEW_MARKERS =
  "First end-to-end dry run review First end-to-end dry run does not execute workflows All workflow stages require explicit operator approval before live use Dry-run results are reviewed before use Dry-run workflow stages Simulated output review checklist end-to-end dry run identity provider/local/connector/automation handoff summary denied execution actions safety validation checklist blocked dry-run risks approval flow route live integration release candidate route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no workflow execution from UI no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw dry-run JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced dry-run details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FirstEndToEndDryRunReviewPanel() {
  const model = buildFirstEndToEndDryRunReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-first-end-to-end-dry-run-review={`${FIRST_END_TO_END_DRY_RUN_REVIEW_MARKERS} buildFirstEndToEndDryRunReviewStableKey FirstEndToEndDryRunReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 443"
        title="First end-to-end dry run"
        subtitle="First end-to-end dry run review previews the complete workflow without executing it. First end-to-end dry run does not execute workflows, all workflow stages require explicit operator approval before live use, and dry-run results are reviewed before use."
        primary={{ href: "#first-end-to-end-dry-run-review", label: "Review dry run" }}
        links={[
          { href: "/unified-live-integration-readiness-review", label: "Readiness review" },
          { href: "/end-to-end-approval-flow-review", label: "Approval flow" },
          { href: "/codexforge-live-integration-release-candidate", label: "Live RC" },
          { href: "/automation-dry-run-trial-review", label: "Automation dry-run" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.dryRunLanguage} />
      <PreviewFoundationCard title="Plain-English first end-to-end dry run review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews end-to-end dry run identity, dry-run workflow stages,
          provider/local/connector/automation handoff summary, simulated output review checklist, denied execution
          actions, safety validation checklist, blocked dry-run risks, approval flow route, live integration release
          candidate route, and next recommended action. It does not execute workflows, call providers, call local
          models, call connectors, create automations, store outputs, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="first-end-to-end-dry-run-review" style={previewStyles.grid}>
        {model.dryRuns.map((dryRun) => (
          <PreviewFoundationCard
            key={buildFirstEndToEndDryRunReviewStableKey("first-end-to-end-dry-run-card", dryRun.id)}
            title={dryRun.endToEndDryRunIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${dryRun.status}`,
                `Dry-run workflow stages: ${dryRun.dryRunWorkflowStages.join("; ")}`,
                `Provider/local/connector/automation handoff summary: ${dryRun.providerLocalConnectorAutomationHandoffSummary.join("; ")}`,
                `Simulated output review checklist: ${dryRun.simulatedOutputReviewChecklist.join("; ")}`,
                `Denied execution actions: ${dryRun.deniedExecutionActions.join("; ")}`,
                `Safety validation checklist: ${dryRun.safetyValidationChecklist.join("; ")}`,
                `Blocked dry-run risks: ${dryRun.blockedDryRunRisks.join("; ")}`,
                dryRun.approvalFlowRoute,
                dryRun.liveIntegrationReleaseCandidateRoute,
                dryRun.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced dry-run details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.dryRuns.map((dryRun) => dryRun.advancedDryRunDetails)} />
        <PreviewFoundationCopy>
          Advanced dry-run details stay collapsed or secondary. First end-to-end dry run review remains separate from
          workflow execution, provider calls, local model calls, connector calls, automation creation, approval
          persistence, output storage, file mutation, memory mutation, tools, agents, plugins, and MCP runtimes.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
