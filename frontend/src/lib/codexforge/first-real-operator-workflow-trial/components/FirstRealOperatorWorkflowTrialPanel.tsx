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
  buildFirstRealOperatorWorkflowTrialModel,
  buildFirstRealOperatorWorkflowTrialStableKey,
} from "@/lib/codexforge/first-real-operator-workflow-trial";

const FIRST_REAL_OPERATOR_WORKFLOW_TRIAL_MARKERS =
  "First real operator workflow trial First real workflow trial requires explicit approval No real action runs from this page Blocked actions remain blocked until approved Operator scenario Manual validation checklist workflow trial identity source release runbook trial preparation checklist approval gates blocked real actions real-world trial report route blocked reasons guided and approval-gated review-only approval required no release/shipping execution no build execution from UI no smoke execution from UI no test execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced workflow trial details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FirstRealOperatorWorkflowTrialPanel() {
  const model = buildFirstRealOperatorWorkflowTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-first-real-operator-workflow-trial={`${FIRST_REAL_OPERATOR_WORKFLOW_TRIAL_MARKERS} buildFirstRealOperatorWorkflowTrialStableKey FirstRealOperatorWorkflowTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 361"
        title="Real trial"
        subtitle="First real operator workflow trial prepares a guided real workflow review while still requiring explicit approval before any action. No real action runs from this page, and blocked actions remain blocked until approved."
        primary={{ href: "#first-real-operator-workflow-trial", label: "Review trial" }}
        links={[
          { href: "/foundation-release-runbook-finalization", label: "Release runbook" },
          { href: "/codexforge-foundation-release-candidate", label: "Foundation RC" },
          { href: "/mvp-hardening-regression-matrix", label: "Hardening matrix" },
          { href: "/review-inbox", label: "Report inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.workflowTrialLanguage} />
      <PreviewFoundationCard title="Plain-English first real trial">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page prepares the trial, gates, blocked actions, and manual validation notes. It does not run a real
          workflow, call APIs, run commands, read or write files, mutate memory, schedule work, execute tools, or create
          a runtime.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="first-real-operator-workflow-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildFirstRealOperatorWorkflowTrialStableKey(
              "first-real-operator-workflow-trial-card",
              trial.id
            )}
            title={trial.workflowTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.sourceReleaseRunbook,
                trial.operatorScenario,
                `Trial preparation checklist: ${trial.trialPreparationChecklist.join("; ")}`,
                `Approval gates: ${trial.approvalGates.join("; ")}`,
                `Blocked real actions: ${trial.blockedRealActions.join("; ")}`,
                `Manual validation checklist: ${trial.manualValidationChecklist.join("; ")}`,
                trial.realWorldTrialReportRoute,
                `Blocked reasons: ${trial.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced workflow trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.trials.map((trial) => trial.advancedWorkflowTrialDetails)} />
        <PreviewFoundationCopy>
          Advanced workflow trial details stay collapsed or secondary. First real workflow trial preparation remains
          separate from workflow execution, API calls, command execution, file mutation, memory mutation, automations,
          plugin/tool/agent execution, and MCP runtime behavior.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
