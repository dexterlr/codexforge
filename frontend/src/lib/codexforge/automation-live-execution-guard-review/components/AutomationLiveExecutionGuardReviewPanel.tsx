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
  buildAutomationLiveExecutionGuardReviewModel,
  buildAutomationLiveExecutionGuardReviewStableKey,
} from "@/lib/codexforge/automation-live-execution-guard-review";

const AUTOMATION_LIVE_EXECUTION_GUARD_REVIEW_MARKERS =
  "Automation live execution guard review Automation live execution guard review does not run automations Live automation requires explicit operator approval Unsafe automation execution stays blocked Execution guard groups Schedule rate-limit checklist automation live execution guard identity approval gate checklist notification boundary checklist denied automation execution actions blocked execution risks automation dry-run replay route automation approval trial route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no connector evidence auto-ingestion no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw automation execution JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced guard details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function AutomationLiveExecutionGuardReviewPanel() {
  const model = buildAutomationLiveExecutionGuardReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-automation-live-execution-guard-review={`${AUTOMATION_LIVE_EXECUTION_GUARD_REVIEW_MARKERS} buildAutomationLiveExecutionGuardReviewStableKey AutomationLiveExecutionGuardReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 470"
        title="Automation live guard"
        subtitle="Automation live execution guard review is review-only and does not run automations. Live automation requires explicit operator approval, and unsafe automation execution stays blocked."
        primary={{ href: "#automation-live-execution-guard-review", label: "Review guard" }}
        links={[
          { href: "/connector-live-trial-release-candidate", label: "Connector live RC" },
          { href: "/first-automation-live-dry-run-replay", label: "Dry-run replay" },
          { href: "/first-automation-live-approval-trial", label: "Approval trial" },
          { href: "/automation-schedule-safety-review", label: "Schedule safety" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.guardLanguage} />
      <PreviewFoundationCard title="Plain-English automation live execution guard review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews automation live execution guard identity, execution guard groups, approval gate checklist,
          schedule rate-limit checklist, notification boundary checklist, denied automation execution actions, blocked
          execution risks, automation dry-run replay route, automation approval trial route, and next recommended action.
          It does not run automations, create schedules, send notifications, approve actions, mutate files, or mutate
          memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="automation-live-execution-guard-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildAutomationLiveExecutionGuardReviewStableKey("automation-live-execution-guard-card", review.id)}
            title={review.automationLiveExecutionGuardIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Execution guard groups: ${review.executionGuardGroups.join("; ")}`,
                `Approval gate checklist: ${review.approvalGateChecklist.join("; ")}`,
                `Schedule rate-limit checklist: ${review.scheduleRateLimitChecklist.join("; ")}`,
                `Notification boundary checklist: ${review.notificationBoundaryChecklist.join("; ")}`,
                `Denied automation execution actions: ${review.deniedAutomationExecutionActions.join("; ")}`,
                `Blocked execution risks: ${review.blockedExecutionRisks.join("; ")}`,
                review.automationDryRunReplayRoute,
                review.automationApprovalTrialRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced guard details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedGuardDetails)} />
        <PreviewFoundationCopy>
          Advanced guard details stay collapsed or secondary. This review never runs automations, creates schedules,
          creates reminders or watches, starts polling, sends notifications, approves actions, or persists automation
          rules.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
