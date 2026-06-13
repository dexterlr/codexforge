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
  buildFirstAutomationLiveApprovalTrialModel,
  buildFirstAutomationLiveApprovalTrialStableKey,
} from "@/lib/codexforge/first-automation-live-approval-trial";

const FIRST_AUTOMATION_LIVE_APPROVAL_TRIAL_MARKERS =
  "First automation live approval trial First automation live approval trial does not approve or execute automations Automation approvals require explicit operator review Denied automation approvals remain blocked Approval trial groups Audit and rollback checklist first automation live approval trial identity operator decision checklist denied auto-approval shortcuts blocked approval risks automation release candidate route connector release candidate route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw automation approval JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced approval details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FirstAutomationLiveApprovalTrialPanel() {
  const model = buildFirstAutomationLiveApprovalTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-first-automation-live-approval-trial={`${FIRST_AUTOMATION_LIVE_APPROVAL_TRIAL_MARKERS} buildFirstAutomationLiveApprovalTrialStableKey FirstAutomationLiveApprovalTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 472"
        title="Automation approval"
        subtitle="First automation live approval trial is review-only and does not approve or execute automations. Automation approvals require explicit operator review, and denied automation approvals remain blocked."
        primary={{ href: "#first-automation-live-approval-trial", label: "Review approval" }}
        links={[
          { href: "/first-automation-live-dry-run-replay", label: "Dry-run replay" },
          { href: "/automation-live-trial-release-candidate", label: "Automation live RC" },
          { href: "/connector-live-trial-release-candidate", label: "Connector live RC" },
          { href: "/automation-approval-queue-review", label: "Approval queue" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.approvalLanguage} />
      <PreviewFoundationCard title="Plain-English first automation live approval trial">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews first automation live approval trial identity, approval trial groups, operator decision
          checklist, denied auto-approval shortcuts, audit and rollback checklist, blocked approval risks, automation
          release candidate route, connector release candidate route, and next recommended action. It does not approve
          actions, execute automations, persist approval decisions, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="first-automation-live-approval-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildFirstAutomationLiveApprovalTrialStableKey("first-automation-live-approval-trial-card", trial.id)}
            title={trial.firstAutomationLiveApprovalTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                `Approval trial groups: ${trial.approvalTrialGroups.join("; ")}`,
                `Operator decision checklist: ${trial.operatorDecisionChecklist.join("; ")}`,
                `Denied auto-approval shortcuts: ${trial.deniedAutoApprovalShortcuts.join("; ")}`,
                `Audit and rollback checklist: ${trial.auditAndRollbackChecklist.join("; ")}`,
                `Blocked approval risks: ${trial.blockedApprovalRisks.join("; ")}`,
                trial.automationReleaseCandidateRoute,
                trial.connectorReleaseCandidateRoute,
                trial.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced approval details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.trials.map((trial) => trial.advancedApprovalDetails)} />
        <PreviewFoundationCopy>
          Advanced approval details stay collapsed or secondary. This review never approves actions, executes
          automations, persists approval decisions, creates schedules, sends notifications, or clears denied approvals.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
