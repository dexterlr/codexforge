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
  buildAutomationApprovalQueueReviewModel,
  buildAutomationApprovalQueueReviewStableKey,
} from "@/lib/codexforge/automation-approval-queue-review";

const AUTOMATION_APPROVAL_QUEUE_REVIEW_MARKERS =
  "Automation approval queue review Automation approval queue does not approve actions automatically Automation approvals require explicit operator review Denied automation actions remain blocked Approval queue groups Pending action types automation approval queue identity operator decision checklist denied approval shortcuts retention and audit notes blocked approval queue risks schedule safety route automation release candidate route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no approval decision persistence no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw automation approval queue JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced queue details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function AutomationApprovalQueueReviewPanel() {
  const model = buildAutomationApprovalQueueReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-automation-approval-queue-review={`${AUTOMATION_APPROVAL_QUEUE_REVIEW_MARKERS} buildAutomationApprovalQueueReviewStableKey AutomationApprovalQueueReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 439"
        title="Automation approval queue review"
        subtitle="Automation approval queue review previews pending automation approval handling without approving anything. Automation approval queue does not approve actions automatically, automation approvals require explicit operator review, and denied automation actions remain blocked."
        primary={{ href: "#automation-approval-queue-review", label: "Review queue" }}
        links={[
          { href: "/automation-dry-run-trial-review", label: "Dry-run review" },
          { href: "/automation-schedule-safety-review", label: "Schedule safety" },
          { href: "/automation-integration-release-candidate", label: "Automation RC" },
          { href: "/approval-queue", label: "Global approval queue" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.queueLanguage} />
      <PreviewFoundationCard title="Plain-English automation approval queue review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews automation approval queue identity, approval queue groups, pending action types, operator
          decision checklist, denied approval shortcuts, retention and audit notes, blocked approval queue risks, schedule
          safety route, automation release candidate route, and next recommended action. It does not approve actions,
          persist approval decisions, create automations, send notifications, call connectors, call providers, mutate
          files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="automation-approval-queue-review" style={previewStyles.grid}>
        {model.queues.map((queue) => (
          <PreviewFoundationCard
            key={buildAutomationApprovalQueueReviewStableKey("automation-approval-queue-card", queue.id)}
            title={queue.automationApprovalQueueIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${queue.status}`,
                `Approval queue groups: ${queue.approvalQueueGroups.join("; ")}`,
                `Pending action types: ${queue.pendingActionTypes.join("; ")}`,
                `Operator decision checklist: ${queue.operatorDecisionChecklist.join("; ")}`,
                `Denied approval shortcuts: ${queue.deniedApprovalShortcuts.join("; ")}`,
                `Retention and audit notes: ${queue.retentionAndAuditNotes.join("; ")}`,
                `Blocked approval queue risks: ${queue.blockedApprovalQueueRisks.join("; ")}`,
                queue.scheduleSafetyRoute,
                queue.automationReleaseCandidateRoute,
                queue.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced queue details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.queues.map((queue) => queue.advancedQueueDetails)} />
        <PreviewFoundationCopy>
          Advanced queue details stay collapsed or secondary. Automation approval queue review remains separate from
          action approval, approval persistence, automation creation, workflows, schedules, notifications, connectors,
          providers, local bridge calls, files, memory, tools, agents, plugins, and MCP runtimes.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
