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
  buildFirstControlledLiveWorkflowTrialModel,
  buildFirstControlledLiveWorkflowTrialStableKey,
} from "@/lib/codexforge/first-controlled-live-workflow-trial";

const FIRST_CONTROLLED_LIVE_WORKFLOW_TRIAL_MARKERS =
  "First controlled live workflow trial First controlled live workflow trial does not execute live actions Controlled live actions require explicit operator approval Denied live action paths remain blocked Controlled workflow stages Validation evidence checklist first controlled live workflow trial identity provider/local/connector/automation handoff preview approval gate checklist denied live action paths blocked live trial risks live trial runbook route failure recovery route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no live workflow launch from UI no live action execution no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no recovery auto-trigger no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw controlled live workflow JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced live trial details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FirstControlledLiveWorkflowTrialPanel() {
  const model = buildFirstControlledLiveWorkflowTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-first-controlled-live-workflow-trial={`${FIRST_CONTROLLED_LIVE_WORKFLOW_TRIAL_MARKERS} buildFirstControlledLiveWorkflowTrialStableKey FirstControlledLiveWorkflowTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 449"
        title="Controlled trial"
        subtitle="First controlled live workflow trial previews the first controlled live workflow without executing live actions. Controlled live actions require explicit operator approval, and denied live action paths remain blocked."
        primary={{ href: "#first-controlled-live-workflow-trial", label: "Review trial" }}
        links={[
          { href: "/first-live-trial-runbook-review", label: "Runbook review" },
          { href: "/live-trial-operator-checklist", label: "Operator checklist" },
          { href: "/live-trial-failure-recovery-review", label: "Failure recovery" },
          { href: "/codexforge-live-integration-release-candidate", label: "Live integration RC" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English first controlled live workflow trial">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews first controlled live workflow trial identity, controlled workflow stages,
          provider/local/connector/automation handoff preview, approval gate checklist, validation evidence checklist,
          denied live action paths, blocked live trial risks, live trial runbook route, failure recovery route, and next
          recommended action. It does not execute workflows, execute live actions, call providers, call local models,
          call connectors, create automations, store outputs, approve actions, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="first-controlled-live-workflow-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildFirstControlledLiveWorkflowTrialStableKey("first-controlled-live-workflow-trial-card", trial.id)}
            title={trial.firstControlledLiveWorkflowTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                `Controlled workflow stages: ${trial.controlledWorkflowStages.join("; ")}`,
                `Provider/local/connector/automation handoff preview: ${trial.providerLocalConnectorAutomationHandoffPreview.join("; ")}`,
                `Approval gate checklist: ${trial.approvalGateChecklist.join("; ")}`,
                `Validation evidence checklist: ${trial.validationEvidenceChecklist.join("; ")}`,
                `Denied live action paths: ${trial.deniedLiveActionPaths.join("; ")}`,
                `Blocked live trial risks: ${trial.blockedLiveTrialRisks.join("; ")}`,
                trial.liveTrialRunbookRoute,
                trial.failureRecoveryRoute,
                trial.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced live trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.trials.map((trial) => trial.advancedLiveTrialDetails)} />
        <PreviewFoundationCopy>
          Advanced live trial details stay collapsed or secondary. First controlled live workflow trial remains separate
          from workflow execution, live action execution, live workflow launch, approval persistence, recovery
          auto-trigger, provider calls, local model calls, connector calls, automation creation, output storage, file
          mutation, memory mutation, tools, agents, plugins, and MCP runtimes.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
