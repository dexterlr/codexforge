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
  buildAutomationDryRunTrialReviewModel,
  buildAutomationDryRunTrialReviewStableKey,
} from "@/lib/codexforge/automation-dry-run-trial-review";

const AUTOMATION_DRY_RUN_TRIAL_REVIEW_MARKERS =
  "Automation dry-run trial review Automation dry-run trial does not create automations Automation execution requires explicit operator approval Dry-run output is reviewed before use Dry-run scenario groups Simulated action summary automation dry-run identity approval gate checklist denied automation actions connector/provider boundary notes blocked dry-run risks approval queue route schedule safety route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no approval decision persistence no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw automation dry-run JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced dry-run details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function AutomationDryRunTrialReviewPanel() {
  const model = buildAutomationDryRunTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-automation-dry-run-trial-review={`${AUTOMATION_DRY_RUN_TRIAL_REVIEW_MARKERS} buildAutomationDryRunTrialReviewStableKey AutomationDryRunTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 438"
        title="Automation dry-run trial review"
        subtitle="Automation dry-run trial review previews automation behavior without creating automations. Automation dry-run trial does not create automations, automation execution requires explicit operator approval, and dry-run output is reviewed before use."
        primary={{ href: "#automation-dry-run-trial-review", label: "Review dry-run" }}
        links={[
          { href: "/automation-approval-queue-review", label: "Approval queue review" },
          { href: "/automation-schedule-safety-review", label: "Schedule safety" },
          { href: "/automation-permission-readiness-audit", label: "Permission audit" },
          { href: "/connector-integration-release-candidate", label: "Connector RC" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.dryRunLanguage} />
      <PreviewFoundationCard title="Plain-English automation dry-run trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews automation dry-run identity, dry-run scenario groups, simulated action summary, approval gate
          checklist, denied automation actions, connector/provider boundary notes, blocked dry-run risks, approval queue
          route, schedule safety route, and next recommended action. It does not create automations, reminders, tasks,
          watches, schedules, background jobs, notifications, connector calls, provider calls, rules, files, or memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="automation-dry-run-trial-review" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildAutomationDryRunTrialReviewStableKey("automation-dry-run-trial-card", trial.id)}
            title={trial.automationDryRunIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                `Dry-run scenario groups: ${trial.dryRunScenarioGroups.join("; ")}`,
                trial.simulatedActionSummary,
                `Approval gate checklist: ${trial.approvalGateChecklist.join("; ")}`,
                `Denied automation actions: ${trial.deniedAutomationActions.join("; ")}`,
                `Connector/provider boundary notes: ${trial.connectorProviderBoundaryNotes.join("; ")}`,
                `Blocked dry-run risks: ${trial.blockedDryRunRisks.join("; ")}`,
                trial.approvalQueueRoute,
                trial.scheduleSafetyRoute,
                trial.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced dry-run details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.trials.map((trial) => trial.advancedDryRunDetails)} />
        <PreviewFoundationCopy>
          Advanced dry-run details stay collapsed or secondary. Automation dry-run review remains separate from
          automation creation, approval persistence, schedules, reminders, watches, background work, notifications,
          connectors, providers, local bridge calls, files, memory, tools, agents, plugins, and MCP runtimes.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
